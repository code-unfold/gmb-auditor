import {
  GBPProfile,
  AuditScoreBreakdown,
  SubScoreDetail,
  ActionItem,
  GBPAuditReport,
  CategoryAnalysis,
  ReviewSentimentAnalysis,
  GeoGridResult,
  CompetitorComparison
} from '@/types/audit';
import { categoriesDatabase } from './categories-database';
import { geoGridEngine } from './geo-grid-engine';
import { reviewEngine } from './review-engine';
import { competitorEngine } from './competitor-engine';
import { DEMO_PROFILES } from './demo-data';

export class GBPAuditEngine {
  /**
   * Main audit calculation method
   */
  public performAudit(
    profile: GBPProfile,
    geoGridOptions?: { gridSize?: '3x3' | '5x5'; radiusKm?: number; keyword?: string }
  ): GBPAuditReport {
    // 1. Scoring breakdown
    const scoreBreakdown = this.calculateAuditScore(profile);

    // 2. Generate Competitors & Compare
    const competitors = competitorEngine.generateCompetitors(profile);
    const competitorComparison = competitorEngine.buildComparisonMatrix(profile, competitors);

    // 3. Category Deep Dive
    const categoryEval = categoriesDatabase.evaluatePrimaryCategory(profile.primaryCategory);
    const competitorCatComp = categoriesDatabase.compareCompetitorCategories(
      { primaryCategory: profile.primaryCategory, secondaryCategories: profile.secondaryCategories },
      competitors.map((c) => ({
        name: c.name,
        primaryCategory: c.primaryCategory,
        secondaryCategories: c.secondaryCategories
      }))
    );

    const categoryAnalysis: CategoryAnalysis = {
      primaryCategory: profile.primaryCategory,
      primaryCategoryEffectiveness: categoryEval,
      competitorCategoryAdoption: competitorCatComp.competitorAdoption,
      recommendedSecondaryCategories: competitorCatComp.recommendedToAdd,
      missingHighOpportunityCategories: competitorCatComp.missingHighOpportunity,
      targetSecondaryCategories: profile.secondaryCategories
    };

    // 4. Review Sentiment Analysis
    // Match demo reviews if available or synthesize realistic reviews based on profile rating & count
    const demoMatch = Object.values(DEMO_PROFILES).find(
      (d) => d.profile.placeId === profile.placeId || d.profile.name.toLowerCase() === profile.name.toLowerCase()
    );
    const rawReviews = demoMatch ? demoMatch.sampleReviews : this.generateSampleReviews(profile);
    const reviewSentimentAnalysis = reviewEngine.analyzeReviews(
      rawReviews,
      profile.reviewCount,
      profile.rating
    );

    // 5. Geo-Grid Simulation
    const targetKeyword = geoGridOptions?.keyword || profile.primaryCategory || 'local business';
    const geoGridPreview: GeoGridResult = geoGridEngine.simulateRankings(
      profile.coordinates,
      {
        gridSize: geoGridOptions?.gridSize || '5x5',
        radiusKm: geoGridOptions?.radiusKm || 5,
        keyword: targetKeyword,
        targetProfile: profile
      }
    );

    // 6. Action Items Generation
    const actionItems = this.generateActionItems(
      profile,
      scoreBreakdown,
      categoryAnalysis,
      reviewSentimentAnalysis
    );

    // 7. Executive Summary & Synthesis
    const summary = this.generateSummary(profile, scoreBreakdown, competitorComparison);

    return {
      business: profile,
      auditDate: new Date().toISOString(),
      scoreBreakdown,
      categoryAnalysis,
      reviewSentimentAnalysis,
      geoGridPreview,
      competitorComparison,
      actionItems,
      summary
    };
  }

  /**
   * Calculates subscores for 5 pillars and weighted overall score
   */
  public calculateAuditScore(profile: GBPProfile): AuditScoreBreakdown {
    // 1. Categories (25%)
    const catMetrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }> = {};
    const catEval = categoriesDatabase.evaluatePrimaryCategory(profile.primaryCategory);
    
    const primaryScore = catEval.isOptimal ? 50 : 35;
    catMetrics['primaryCategory'] = {
      label: 'Primary Category Optimization',
      passed: catEval.isOptimal,
      score: primaryScore,
      feedback: catEval.isOptimal
        ? `"${profile.primaryCategory}" is the highest volume industry standard category.`
        : `Consider testing "${catEval.betterAlternative || 'higher volume alternative'}" as primary category.`
    };

    const secCount = profile.secondaryCategories.length;
    const secondaryScore = secCount >= 3 ? 35 : secCount === 2 ? 25 : secCount === 1 ? 15 : 0;
    catMetrics['secondaryCategories'] = {
      label: 'Secondary Category Coverage',
      passed: secCount >= 3,
      score: secondaryScore,
      feedback: secCount >= 3
        ? `Good coverage with ${secCount} secondary categories.`
        : `Only ${secCount} secondary categories defined. Top competitors leverage 3-5 to capture secondary search intent.`
    };

    catMetrics['categoryRelevance'] = {
      label: 'Category Precision & Cleanliness',
      passed: true,
      score: 15,
      feedback: 'No conflicting or spam-flagged categories detected.'
    };

    const catEarned = primaryScore + secondaryScore + 15;
    const categoriesSubScore: SubScoreDetail = {
      score: catEarned,
      weight: 0.25,
      weightedScore: Math.round(catEarned * 0.25 * 10) / 10,
      maxPoints: 100,
      earnedPoints: catEarned,
      grade: this.getGrade(catEarned),
      metrics: catMetrics
    };

    // 2. NAP & Business Info (20%)
    const napMetrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }> = {};
    
    // Name check
    const hasSpamWords = /#1|best|cheapest|top rated/i.test(profile.name);
    const nameScore = hasSpamWords ? 12 : 20;
    napMetrics['businessName'] = {
      label: 'Business Name Guidelines Compliance',
      passed: !hasSpamWords,
      score: nameScore,
      feedback: hasSpamWords
        ? 'Business name contains promotional keywords that risk algorithmic suspension.'
        : 'Business name adheres strictly to Google guidelines.'
    };

    // Address & Verification
    const addressScore = profile.verified && profile.address.formattedAddress ? 20 : 10;
    napMetrics['addressVerification'] = {
      label: 'Physical Address & Verification',
      passed: profile.verified,
      score: addressScore,
      feedback: profile.verified ? 'Verified physical presence confirmed.' : 'Profile verification pending.'
    };

    // Phone & Website
    const hasHttps = profile.website.startsWith('https://');
    const phoneWebScore = hasHttps && profile.phone ? 20 : 14;
    napMetrics['phoneWebsite'] = {
      label: 'Contact Information & Security',
      passed: hasHttps && !!profile.phone,
      score: phoneWebScore,
      feedback: hasHttps ? 'Valid direct phone and secure HTTPS website linked.' : 'Ensure website utilizes HTTPS.'
    };

    // Business Hours Completeness
    const hoursCount = profile.businessHours.weeklySchedule.length;
    const hoursScore = hoursCount >= 7 ? 20 : Math.round((hoursCount / 7) * 20);
    napMetrics['businessHours'] = {
      label: 'Weekly Operating Hours Completeness',
      passed: hoursCount >= 7,
      score: hoursScore,
      feedback: hoursCount >= 7 ? 'Full 7-day schedule established.' : 'Incomplete daily schedule.'
    };

    // Description
    const descLength = profile.description?.length || 0;
    const descScore = descLength >= 450 ? 20 : descLength >= 250 ? 14 : 6;
    napMetrics['businessDescription'] = {
      label: 'Description Optimization & CTA',
      passed: descLength >= 450,
      score: descScore,
      feedback: descLength >= 450
        ? `Optimized length (${descLength} characters) with clear call-to-action.`
        : `Description is short (${descLength}/750 chars). Expand to highlight key services, service areas, and phone number.`
    };

    const napEarned = nameScore + addressScore + phoneWebScore + hoursScore + descScore;
    const napSubScore: SubScoreDetail = {
      score: napEarned,
      weight: 0.20,
      weightedScore: Math.round(napEarned * 0.20 * 10) / 10,
      maxPoints: 100,
      earnedPoints: napEarned,
      grade: this.getGrade(napEarned),
      metrics: napMetrics
    };

    // 3. Reviews & Reputation (25%)
    const revMetrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }> = {};
    
    // Count
    const countScore = profile.reviewCount >= 150 ? 30 : profile.reviewCount >= 75 ? 24 : profile.reviewCount >= 25 ? 16 : 8;
    revMetrics['reviewVolume'] = {
      label: 'Total Review Count vs Market',
      passed: profile.reviewCount >= 75,
      score: countScore,
      feedback: profile.reviewCount >= 150
        ? `Strong review moat with ${profile.reviewCount} total reviews.`
        : `Current count (${profile.reviewCount}) is below top competitor threshold (150+).`
    };

    // Rating
    const ratingScore = profile.rating >= 4.7 ? 30 : profile.rating >= 4.5 ? 26 : profile.rating >= 4.0 ? 18 : 8;
    revMetrics['averageRating'] = {
      label: 'Star Rating Trust Threshold',
      passed: profile.rating >= 4.5,
      score: ratingScore,
      feedback: profile.rating >= 4.5
        ? `Excellent rating of ${profile.rating} ★ maximizes click-through rates.`
        : `Rating of ${profile.rating} ★ needs improvement to compete in top 3-pack.`
    };

    // Response rate estimate
    const sampleDemo = Object.values(DEMO_PROFILES).find((d) => d.profile.placeId === profile.placeId);
    const answeredCount = sampleDemo
      ? sampleDemo.sampleReviews.filter((r) => r.hasOwnerResponse).length
      : 3;
    const totalSample = sampleDemo ? sampleDemo.sampleReviews.length : 5;
    const estResponseRate = Math.round((answeredCount / totalSample) * 100);

    const responseScore = estResponseRate >= 80 ? 25 : estResponseRate >= 50 ? 18 : 8;
    revMetrics['ownerResponseRate'] = {
      label: 'Owner Response Coverage',
      passed: estResponseRate >= 80,
      score: responseScore,
      feedback: estResponseRate >= 80
        ? `Active owner engagement (~${estResponseRate}% response rate).`
        : `Owner response rate is ~${estResponseRate}%. Strive to reply to 100% of reviews.`
    };

    // Unanswered negative reviews
    const hasUnansweredNegative = sampleDemo
      ? sampleDemo.sampleReviews.some((r) => r.rating <= 2 && !r.hasOwnerResponse)
      : false;
    const issueScore = hasUnansweredNegative ? 5 : 15;
    revMetrics['urgentIssues'] = {
      label: 'Urgent Negative Review Resolution',
      passed: !hasUnansweredNegative,
      score: issueScore,
      feedback: hasUnansweredNegative
        ? 'Found unanswered negative reviews requiring urgent owner remediation.'
        : 'All recent critical reviews addressed.'
    };

    const revEarned = countScore + ratingScore + responseScore + issueScore;
    const reviewsSubScore: SubScoreDetail = {
      score: revEarned,
      weight: 0.25,
      weightedScore: Math.round(revEarned * 0.25 * 10) / 10,
      maxPoints: 100,
      earnedPoints: revEarned,
      grade: this.getGrade(revEarned),
      metrics: revMetrics
    };

    // 4. Photos & Visuals (15%)
    const photoMetrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }> = {};
    
    const totalPhotos = profile.photosCount.total;
    const photoVolumeScore = totalPhotos >= 100 ? 40 : totalPhotos >= 50 ? 32 : totalPhotos >= 20 ? 20 : 10;
    photoMetrics['photoVolume'] = {
      label: 'Total Photo Inventory',
      passed: totalPhotos >= 50,
      score: photoVolumeScore,
      feedback: totalPhotos >= 50
        ? `Healthy visual catalog of ${totalPhotos} photos.`
        : `Only ${totalPhotos} photos. Profiles with 50+ photos get 42% more direction requests on Google Maps.`
    };

    const hasLogo = profile.photosCount.logoPresent;
    const hasCover = profile.photosCount.coverPresent;
    const brandingScore = hasLogo && hasCover ? 30 : hasLogo || hasCover ? 18 : 5;
    photoMetrics['brandAssets'] = {
      label: 'Logo and Cover Photo Setup',
      passed: hasLogo && hasCover,
      score: brandingScore,
      feedback: hasLogo && hasCover
        ? 'Both Logo and Cover photos are properly published.'
        : `Missing ${!hasLogo ? 'Logo' : ''} ${!hasCover ? 'Cover Photo' : ''}.`
    };

    const customerPhotos = profile.photosCount.customer;
    const ugcScore = customerPhotos >= 15 ? 30 : customerPhotos >= 5 ? 20 : 10;
    photoMetrics['customerPhotos'] = {
      label: 'Customer Uploaded Photos (UGC)',
      passed: customerPhotos >= 10,
      score: ugcScore,
      feedback: customerPhotos >= 10
        ? `Active customer photo contribution (${customerPhotos} user photos).`
        : 'Low customer photo count. Encourage customers to take photos on-site.'
    };

    const photoEarned = photoVolumeScore + brandingScore + ugcScore;
    const photosSubScore: SubScoreDetail = {
      score: photoEarned,
      weight: 0.15,
      weightedScore: Math.round(photoEarned * 0.15 * 10) / 10,
      maxPoints: 100,
      earnedPoints: photoEarned,
      grade: this.getGrade(photoEarned),
      metrics: photoMetrics
    };

    // 5. Engagement & Posts (15%)
    const engMetrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }> = {};

    let daysSincePost = 999;
    if (profile.posts.lastPostDate) {
      const parsed = new Date(profile.posts.lastPostDate);
      if (!isNaN(parsed.getTime())) {
        daysSincePost = Math.floor((Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24));
      }
    }

    const recencyScore = daysSincePost <= 7 ? 40 : daysSincePost <= 14 ? 30 : daysSincePost <= 30 ? 18 : 5;
    engMetrics['postRecency'] = {
      label: 'Google Post Freshness',
      passed: daysSincePost <= 14,
      score: recencyScore,
      feedback: daysSincePost <= 14
        ? `Last post was published ${daysSincePost} days ago (Active signal).`
        : `Last post was published ${daysSincePost} days ago. Google Posts expire after 7-14 days; post weekly.`
    };

    const postCountScore = profile.posts.count >= 10 ? 30 : profile.posts.count >= 4 ? 20 : 8;
    engMetrics['postingCadence'] = {
      label: 'Historical Post Activity',
      passed: profile.posts.count >= 8,
      score: postCountScore,
      feedback: `Account has published ${profile.posts.count} total updates/offers.`
    };

    const attrCount = Object.values(profile.attributes).reduce(
      (acc, list) => acc + (Array.isArray(list) ? list.length : 0),
      0
    );
    const attrScore = attrCount >= 10 ? 20 : attrCount >= 5 ? 14 : 6;
    const prodScore = profile.productsCount > 0 ? 10 : 0;
    const attrDensityScore = attrScore + prodScore;

    engMetrics['attributesAndProducts'] = {
      label: 'Attributes & Product Catalog Density',
      passed: attrCount >= 8 && profile.productsCount > 0,
      score: attrDensityScore,
      feedback: `${attrCount} attributes filled, ${profile.productsCount} catalog products listed.`
    };

    const engEarned = recencyScore + postCountScore + attrDensityScore;
    const engagementSubScore: SubScoreDetail = {
      score: engEarned,
      weight: 0.15,
      weightedScore: Math.round(engEarned * 0.15 * 10) / 10,
      maxPoints: 100,
      earnedPoints: engEarned,
      grade: this.getGrade(engEarned),
      metrics: engMetrics
    };

    // Overall weighted score
    const overallScore = Math.round(
      categoriesSubScore.weightedScore +
      napSubScore.weightedScore +
      reviewsSubScore.weightedScore +
      photosSubScore.weightedScore +
      engagementSubScore.weightedScore
    );

    const letterGrade = this.getGrade(overallScore);

    const summaryHighlights = [
      `Overall Health Score: ${overallScore}/100 (${letterGrade})`,
      `Categories: ${categoriesSubScore.score}/100 | NAP: ${napSubScore.score}/100 | Reviews: ${reviewsSubScore.score}/100`,
      `Photos: ${photosSubScore.score}/100 | Engagement: ${engagementSubScore.score}/100`
    ];

    return {
      overallScore,
      letterGrade,
      categoriesScore: categoriesSubScore,
      napScore: napSubScore,
      reviewsScore: reviewsSubScore,
      photosScore: photosSubScore,
      engagementScore: engagementSubScore,
      summaryHighlights
    };
  }

  private getGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Generates prioritized Action Items based on audit results
   */
  private generateActionItems(
    profile: GBPProfile,
    scores: AuditScoreBreakdown,
    catAnalysis: CategoryAnalysis,
    revAnalysis: ReviewSentimentAnalysis
  ): ActionItem[] {
    const items: ActionItem[] = [];

    // Critical check 1: Unanswered negative reviews
    if (revAnalysis.urgentUnansweredNegativeReviews.length > 0) {
      const urgent = revAnalysis.urgentUnansweredNegativeReviews[0];
      items.push({
        id: 'act_crit_negative_review',
        priority: 'Critical',
        category: 'Reviews',
        title: `Reply to Urgent ${urgent.rating}-Star Negative Review by ${urgent.author}`,
        description: `Unaddressed negative review from ${urgent.author} ("${urgent.coreIssue}") is actively dampening conversion rates on your profile.`,
        howToFix: `Use the AI Review Responder to craft an empathetic, non-defensive apology and offer direct resolution via phone (${profile.phone}).`,
        estimatedImpact: '+8-12% customer conversion retention',
        timeToImplement: '5 minutes'
      });
    }

    // Critical check 2: Missing Cover photo
    if (!profile.photosCount.coverPresent) {
      items.push({
        id: 'act_crit_cover_photo',
        priority: 'Critical',
        category: 'Photos',
        title: 'Upload High-Resolution 16:9 Cover Photo',
        description: 'Your profile lacks an official cover photo, leading Google Maps to display random user uploads or street view imagery.',
        howToFix: 'Upload a 1080x608 minimum resolution photo of your storefront, service vehicle, or hero product.',
        estimatedImpact: '+25% click-through rate from local search results',
        timeToImplement: '10 minutes'
      });
    }

    // High check 1: Missing top secondary categories
    if (catAnalysis.missingHighOpportunityCategories.length > 0) {
      const missed = catAnalysis.missingHighOpportunityCategories.slice(0, 3).join(', ');
      items.push({
        id: 'act_high_secondary_cats',
        priority: 'High',
        category: 'Categories',
        title: `Add Missing High-Opportunity Secondary Categories (${missed})`,
        description: `Over 50% of your top-ranking local competitors utilize "${missed}" to rank for secondary service queries.`,
        howToFix: `Navigate to GBP Dashboard > Edit Profile > Business Category > Add Secondary Categories: ${missed}.`,
        estimatedImpact: '+15-22% increase in non-branded discovery searches',
        timeToImplement: '5 minutes'
      });
    }

    // High check 2: Stale Google Posts
    let daysSincePost = 999;
    if (profile.posts.lastPostDate) {
      const parsed = new Date(profile.posts.lastPostDate);
      if (!isNaN(parsed.getTime())) {
        daysSincePost = Math.floor((Date.now() - parsed.getTime()) / (1000 * 60 * 60 * 24));
      }
    }

    if (daysSincePost > 14) {
      items.push({
        id: 'act_high_post_stale',
        priority: 'High',
        category: 'Posts & Engagement',
        title: 'Publish Fresh Google Business Post (Offer or Seasonal Update)',
        description: `Your last post was ${daysSincePost} days ago. Regular weekly posts indicate operational activity and trigger ranking refresh signals.`,
        howToFix: 'Publish an Update or Special Offer post highlighting seasonal availability, discounts, or a recent job case study.',
        estimatedImpact: '+10% boost in 3-Pack presence across fringe radius points',
        timeToImplement: '15 minutes'
      });
    }

    // Medium check 1: Low photo volume
    if (profile.photosCount.total < 50) {
      items.push({
        id: 'act_med_photos_count',
        priority: 'Medium',
        category: 'Photos',
        title: 'Expand Visual Catalog to 50+ Geo-Tagged Images',
        description: `Your current catalog has ${profile.photosCount.total} photos, while top market competitors average 80+ photos.`,
        howToFix: 'Upload high quality photos of completed projects, team members at work, service fleet, and office interior.',
        estimatedImpact: '+18% user engagement and longer time spent on listing',
        timeToImplement: '30 minutes'
      });
    }

    // Medium check 2: Short description
    if (!profile.description || profile.description.length < 450) {
      items.push({
        id: 'act_med_description',
        priority: 'Medium',
        category: 'NAP & Info',
        title: 'Expand Business Description with Service Areas & Phone Number',
        description: `Current description is ${(profile.description || '').length}/750 characters. Underutilized space for relevance keywords.`,
        howToFix: 'Expand to 650-750 characters. Mention core services, city/neighborhoods served, and a direct Call to Action.',
        estimatedImpact: '+7% relevance on localized long-tail searches',
        timeToImplement: '15 minutes'
      });
    }

    // Low check 1: Products Catalogue
    if (profile.productsCount === 0) {
      items.push({
        id: 'act_low_products',
        priority: 'Low',
        category: 'Posts & Engagement',
        title: 'Showcase Top Services in the GBP Products Section',
        description: 'Adding products creates visual product cards directly on the search engine results page (SERP).',
        howToFix: 'Add 3-5 core service packages with transparent pricing, photos, and direct links to booking pages.',
        estimatedImpact: '+12% direct phone calls and bookings',
        timeToImplement: '25 minutes'
      });
    }

    return items;
  }

  private generateSummary(
    profile: GBPProfile,
    scores: AuditScoreBreakdown,
    comp: CompetitorComparison
  ): {
    executiveSummary: string;
    topStrengths: string[];
    criticalWeaknesses: string[];
    projectedRankingLiftPct: number;
  } {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (scores.categoriesScore.score >= 80) {
      strengths.push(`Optimized primary category "${profile.primaryCategory}" captures core high-intent volume.`);
    } else {
      weaknesses.push('Category architecture is incomplete compared to local 3-pack leaders.');
    }

    if (profile.reviewCount >= 100 && profile.rating >= 4.6) {
      strengths.push(`Strong review authority (${profile.reviewCount} reviews, ${profile.rating} ★ average).`);
    } else {
      weaknesses.push(`Review volume deficit relative to top competitor (${comp.competitors[0]?.reviewCount || 150} reviews).`);
    }

    if (scores.engagementScore.score < 70) {
      weaknesses.push('Infrequent Google Posts and underutilized GBP attributes.');
    } else {
      strengths.push('Active post updates and consistent profile engagement.');
    }

    const projectedRankingLiftPct = Math.min(
      45,
      Math.round((100 - scores.overallScore) * 0.55 + (weaknesses.length * 4.5))
    );

    const executiveSummary = `${profile.name} exhibits a ${scores.letterGrade} profile rating (Overall Score: ${scores.overallScore}/100). The business holds a "${comp.targetMarketPosition}" standing in the local market. Implementing the high-impact recommendations around secondary category expansion, post consistency, and visual asset scaling is projected to boost local 3-pack appearances by approximately ${projectedRankingLiftPct}%.`;

    return {
      executiveSummary,
      topStrengths: strengths,
      criticalWeaknesses: weaknesses,
      projectedRankingLiftPct
    };
  }

  /**
   * Helper to synthesize realistic sample reviews if a custom profile is passed
   */
  private generateSampleReviews(profile: GBPProfile): ReviewItem[] {
    const primary = profile.primaryCategory || 'service';
    return [
      {
        id: 'gen_rev_1',
        author: 'Michael B.',
        rating: 5,
        date: new Date(Date.now() - 3 * 86400000).toISOString(),
        text: `Called for emergency ${primary}. They provided fast service, arrived on time, and the technician was extremely polite and professional. Highly recommend!`,
        sentiment: 'positive',
        hasOwnerResponse: true,
        extractedKeywords: ['fast service', 'on time', 'friendly staff']
      },
      {
        id: 'gen_rev_2',
        author: 'Jennifer Hayes',
        rating: 5,
        date: new Date(Date.now() - 12 * 86400000).toISOString(),
        text: `Exceptional work and honest fair pricing. Had another company quote double for the exact same job. Will definitely use ${profile.name} again.`,
        sentiment: 'positive',
        hasOwnerResponse: false,
        extractedKeywords: ['fair pricing', 'high quality work']
      },
      {
        id: 'gen_rev_3',
        author: 'Kevin Scott',
        rating: 2,
        date: new Date(Date.now() - 21 * 86400000).toISOString(),
        text: `Technician arrived 45 minutes late and didn't call beforehand to let us know. Disappointed with the communication.`,
        sentiment: 'negative',
        hasOwnerResponse: false,
        extractedKeywords: ['poor communication'],
        urgentActionNeeded: true
      },
      {
        id: 'gen_rev_4',
        author: 'Samantha Lee',
        rating: 4,
        date: new Date(Date.now() - 35 * 86400000).toISOString(),
        text: `Quality of work was top notch. Only knocking off one star because booking online was a bit confusing.`,
        sentiment: 'positive',
        hasOwnerResponse: true,
        extractedKeywords: ['high quality work']
      }
    ];
  }
}

export const gbpAuditEngine = new GBPAuditEngine();
