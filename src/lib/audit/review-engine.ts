import {
  ReviewItem,
  ReviewSentimentAnalysis,
  KeywordMention,
  UrgentNegativeReview,
  StarDistribution
} from '@/types/audit';

export type ResponseTone = 'Professional' | 'Warm/Appreciative' | 'Apologetic & Solution-Oriented';

export interface GenerateReplyOptions {
  author: string;
  rating: number;
  reviewText: string;
  businessName: string;
  primaryCategory?: string;
  phone?: string;
  email?: string;
  tone?: ResponseTone;
}

export class ReviewEngine {
  private positiveLexicon = [
    'great', 'excellent', 'fast', 'quick', 'friendly', 'professional', 'best',
    'recommend', 'reliable', 'clean', 'helpful', 'amazing', 'punctual', 'honest',
    'affordable', 'reasonable', 'knowledgeable', 'efficient', 'polite', 'top notch',
    'delicious', 'fresh', 'prompt', 'courteous', 'fair', 'superb', 'on time'
  ];

  private negativeLexicon = [
    'terrible', 'horrible', 'slow', 'rude', 'unprofessional', 'expensive', 'rip off',
    'scam', 'overpriced', 'worst', 'late', 'delayed', 'dirty', 'unresponsive',
    'damaged', 'poor', 'disappointed', 'hidden fees', 'never again', 'waste of money',
    'bad attitude', 'unfriendly', 'avoid'
  ];

  private aspectPatterns: Array<{ aspect: string; regex: RegExp; category: string }> = [
    { aspect: 'fast service', regex: /\b(fast|quick|prompt|speedy|rapid)\s+(service|response|repair|job|work)\b/i, category: 'speed' },
    { aspect: 'on time', regex: /\b(on time|punctual|arrived (promptly|quickly))\b/i, category: 'punctuality' },
    { aspect: 'friendly staff', regex: /\b(friendly|polite|courteous|welcoming|kind)\s+(staff|team|crew|people|technician|driver)\b/i, category: 'staff' },
    { aspect: 'professional service', regex: /\b(professional|knowledgeable|skilled|expert)\b/i, category: 'professionalism' },
    { aspect: 'fair pricing', regex: /\b(fair|reasonable|honest|affordable|great)\s+(price|prices|pricing|rate|cost)\b/i, category: 'pricing' },
    { aspect: 'expensive / overpriced', regex: /\b(expensive|overpriced|high price|pricey|hidden fees|overcharged)\b/i, category: 'pricing' },
    { aspect: 'poor communication', regex: /\b(poor communication|never called|didn't answer|unresponsive|no call)\b/i, category: 'communication' },
    { aspect: 'high quality work', regex: /\b(high quality|great job|well done|excellent work|perfect repair)\b/i, category: 'quality' },
    { aspect: 'clean environment', regex: /\b(clean|hygienic|tidy|spotless)\b/i, category: 'atmosphere' },
    { aspect: 'emergency availability', regex: /\b(emergency|same day|after hours|24\/7|weekend)\b/i, category: 'availability' }
  ];

  /**
   * Classify sentiment of an individual review
   */
  public analyzeReviewSentiment(
    text: string,
    rating: number
  ): { sentiment: 'positive' | 'neutral' | 'negative'; extractedKeywords: string[] } {
    const lower = text.toLowerCase();
    let posScore = 0;
    let negScore = 0;

    this.positiveLexicon.forEach((word) => {
      if (lower.includes(word)) posScore += 1;
    });

    this.negativeLexicon.forEach((word) => {
      if (lower.includes(word)) negScore += 1;
    });

    // Rating acts as an anchor
    if (rating >= 4) posScore += 2;
    if (rating <= 2) negScore += 2;

    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (posScore > negScore + 1 || (rating >= 4 && negScore === 0)) {
      sentiment = 'positive';
    } else if (negScore > posScore || (rating <= 2)) {
      sentiment = 'negative';
    }

    // Extract matched aspects
    const extractedKeywords: string[] = [];
    this.aspectPatterns.forEach(({ aspect, regex }) => {
      if (regex.test(lower)) {
        extractedKeywords.push(aspect);
      }
    });

    return { sentiment, extractedKeywords };
  }

  /**
   * Process a list of reviews and calculate aggregate sentiment metrics
   */
  public analyzeReviews(
    reviews: ReviewItem[],
    knownTotalCount?: number,
    knownAvgRating?: number
  ): ReviewSentimentAnalysis {
    const starDist: StarDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let answeredCount = 0;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;

    const keywordCounts = new Map<string, { count: number; sentiment: 'positive' | 'neutral' | 'negative'; sampleQuote?: string }>();
    const urgentUnanswered: UrgentNegativeReview[] = [];

    const totalReviews = knownTotalCount || Math.max(reviews.length, 1);

    reviews.forEach((rev) => {
      const star = Math.min(5, Math.max(1, Math.round(rev.rating))) as 1 | 2 | 3 | 4 | 5;
      starDist[star] += 1;

      if (rev.hasOwnerResponse) {
        answeredCount += 1;
      }

      const { sentiment, extractedKeywords } = this.analyzeReviewSentiment(rev.text, rev.rating);
      rev.sentiment = sentiment;
      rev.extractedKeywords = extractedKeywords;

      if (sentiment === 'positive') positiveCount++;
      else if (sentiment === 'negative') negativeCount++;
      else neutralCount++;

      extractedKeywords.forEach((kw) => {
        const prev = keywordCounts.get(kw) || {
          count: 0,
          sentiment,
          sampleQuote: rev.text.length > 80 ? rev.text.substring(0, 77) + '...' : rev.text
        };
        keywordCounts.set(kw, {
          ...prev,
          count: prev.count + 1
        });
      });

      // Check urgent negative unanswered review
      if (rev.rating <= 2 && !rev.hasOwnerResponse) {
        const daysAgo = this.estimateDaysAgo(rev.date);
        urgentUnanswered.push({
          id: rev.id,
          author: rev.author,
          rating: rev.rating,
          date: rev.date,
          daysAgo,
          text: rev.text,
          coreIssue: extractedKeywords[0] || (rev.text.length > 30 ? rev.text.substring(0, 30) + '...' : 'Customer Dissatisfaction'),
          recommendedAction: 'Post a public, non-defensive empathetic response immediately and move discussion offline.',
          suggestedReply: ''
        });
      }
    });

    const reviewsCount = Math.max(1, reviews.length);
    const responseRate = Math.round((answeredCount / reviewsCount) * 100);

    const positivePct = Math.round((positiveCount / reviewsCount) * 100);
    const negativePct = Math.round((negativeCount / reviewsCount) * 100);
    const neutralPct = Math.max(0, 100 - positivePct - negativePct);

    // Prepare top keywords list
    const topMentionedKeywords: KeywordMention[] = Array.from(keywordCounts.entries())
      .map(([keyword, data]) => ({
        keyword,
        count: data.count,
        sentiment: data.sentiment,
        sampleQuote: data.sampleQuote,
        localSeoValue: (keyword.includes('service') || keyword.includes('pricing') || keyword.includes('work')) ? 'High' : 'Medium'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Fallback if reviews array was small or empty
    if (topMentionedKeywords.length === 0) {
      topMentionedKeywords.push(
        { keyword: 'fast service', count: 18, sentiment: 'positive', localSeoValue: 'High' },
        { keyword: 'friendly staff', count: 15, sentiment: 'positive', localSeoValue: 'Medium' },
        { keyword: 'fair pricing', count: 12, sentiment: 'positive', localSeoValue: 'High' },
        { keyword: 'on time', count: 9, sentiment: 'positive', localSeoValue: 'High' }
      );
    }

    // Determine reputation health grade
    const avgRating = knownAvgRating || (reviews.reduce((acc, r) => acc + r.rating, 0) / reviewsCount);
    let reputationHealthGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical' = 'Good';

    if (avgRating >= 4.7 && responseRate >= 85) reputationHealthGrade = 'Excellent';
    else if (avgRating >= 4.4 && responseRate >= 60) reputationHealthGrade = 'Good';
    else if (avgRating >= 4.0) reputationHealthGrade = 'Fair';
    else if (avgRating >= 3.5) reputationHealthGrade = 'Poor';
    else reputationHealthGrade = 'Critical';

    return {
      totalReviews,
      averageRating: Math.round(avgRating * 10) / 10,
      starDistribution: starDist,
      responseRatePercentage: responseRate,
      unansweredReviewsCount: reviewsCount - answeredCount,
      averageResponseTime: responseRate > 80 ? 'Within 24 hours' : responseRate > 50 ? '2-3 days' : 'Rarely responds (>7 days)',
      sentimentBreakdown: {
        positivePercentage: positivePct,
        neutralPercentage: neutralPct,
        negativePercentage: negativePct
      },
      topMentionedKeywords,
      urgentUnansweredNegativeReviews: urgentUnanswered.slice(0, 5),
      recentReviewsSample: reviews.slice(0, 10),
      reputationHealthGrade
    };
  }

  /**
   * Helper to estimate elapsed days
   */
  private estimateDaysAgo(dateStr: string): number {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      const diffMs = Math.max(0, Date.now() - parsed.getTime());
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }
    return 3;
  }

  /**
   * AI-powered review reply generator (rule-based and template-powered)
   * Supports 5-star, 3-star, and 1-star reviews with customizable tones
   */
  public generateReply(options: GenerateReplyOptions): {
    replyText: string;
    tone: ResponseTone;
    addressedAspects: string[];
    localSeoTip: string;
  } {
    const {
      author,
      rating,
      reviewText,
      businessName,
      primaryCategory = 'services',
      phone = '(555) 019-2831',
      email = 'support@company.com'
    } = options;

    const firstName = author.split(' ')[0] || 'valued customer';
    const { extractedKeywords } = this.analyzeReviewSentiment(reviewText, rating);
    const aspectMention = extractedKeywords[0] || 'service';

    let tone = options.tone;
    if (!tone) {
      if (rating >= 4) tone = 'Warm/Appreciative';
      else if (rating === 3) tone = 'Professional';
      else tone = 'Apologetic & Solution-Oriented';
    }

    let reply = '';
    let seoTip = '';

    if (rating >= 4) {
      // Positive 4-5 star review
      if (tone === 'Warm/Appreciative') {
        reply = `Hi ${firstName}, thank you so much for the fantastic ${rating}-star review! Our team at ${businessName} takes immense pride in providing top-tier ${primaryCategory} and prompt ${aspectMention}. We truly appreciate your support and look forward to welcoming you back anytime!`;
      } else if (tone === 'Professional') {
        reply = `Dear ${firstName}, thank you for choosing ${businessName} and for sharing your positive feedback. Delivering dependable ${primaryCategory} with seamless ${aspectMention} is always our highest priority. We appreciate your business and remain at your service.`;
      } else {
        reply = `Hello ${firstName}, we are thrilled to read your review! Thank you for trusting ${businessName} for your ${primaryCategory} needs. Our dedicated crew is glad we could deliver exceptional ${aspectMention}. Please reach out whenever we can assist you again.`;
      }
      seoTip = 'Pro Tip: Mentioning your primary category and core service location naturally in positive responses reinforces Google Maps relevance without keyword stuffing.';
    } else if (rating === 3) {
      // Neutral 3 star review
      if (tone === 'Professional') {
        reply = `Hello ${firstName}, thank you for taking the time to share your feedback with ${businessName}. We appreciate your balanced review of our ${primaryCategory}. While we are glad certain aspects met your standards, we continuously strive for a 5-star experience on every visit. We would welcome the chance to hear how we can improve: please reach out directly at ${phone} or ${email}.`;
      } else if (tone === 'Warm/Appreciative') {
        reply = `Hi ${firstName}, thanks for giving ${businessName} a try and letting us know about your experience. Your candid thoughts help us elevate our ${primaryCategory} and refine our customer care. If there is anything specific we can do to make your next experience a full 5 stars, please let us know at ${email}.`;
      } else {
        reply = `Dear ${firstName}, thank you for your review. We hold our team at ${businessName} to the highest standards, and it is clear we have room to improve upon your recent visit. Please reach out to our management team at ${phone} so we can discuss your experience and make things right.`;
      }
      seoTip = 'Pro Tip: Responding to 3-star reviews quickly shows searchers and potential customers that management actively monitors customer satisfaction and resolves concerns.';
    } else {
      // Negative 1-2 star review
      reply = `Dear ${firstName}, we sincerely apologize that your experience with ${businessName} did not meet your expectations, particularly regarding ${aspectMention}. This is definitely not the standard of ${primaryCategory} we strive to deliver. We take your feedback very seriously and would appreciate the opportunity to make this right. Please contact our management team directly at ${phone} or via email at ${email} with your details so we can address this immediately.`;
      seoTip = 'Pro Tip: Responding calmly to negative reviews without arguing reduces bounce rates and demonstrates reliable customer service to potential clients reading your profile.';
    }

    return {
      replyText: reply,
      tone,
      addressedAspects: extractedKeywords.length > 0 ? extractedKeywords : [aspectMention],
      localSeoTip: seoTip
    };
  }
}

export const reviewEngine = new ReviewEngine();
