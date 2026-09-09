/**
 * TypeScript definitions for GBP Auditor and Local SEO Analysis Engine
 * Equivalent to GMB Everywhere and Local Falcon capabilities.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BusinessHoursSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface BusinessHours {
  status: 'OPERATIONAL' | 'PERMANENTLY_CLOSED' | 'TEMPORARILY_CLOSED';
  openNow: boolean;
  weeklySchedule: BusinessHoursSchedule[];
  specialHours?: Array<{ date: string; open?: string; close?: string; isClosed: boolean }>;
}

export interface BusinessAttributes {
  accessibility?: string[];
  payment?: string[];
  amenities?: string[];
  offerings?: string[];
  crowd?: string[];
  diningOptions?: string[];
  highlights?: string[];
  planning?: string[];
  serviceOptions?: string[];
  [category: string]: string[] | undefined;
}

export interface PhotosCount {
  total: number;
  owner: number;
  customer: number;
  logoPresent: boolean;
  coverPresent: boolean;
  interiorCount?: number;
  exteriorCount?: number;
  teamCount?: number;
}

export interface PostsMetric {
  count: number;
  lastPostDate: string | null; // ISO string
  averageFrequencyDays?: number;
  lastPostType?: 'UPDATE' | 'OFFER' | 'EVENT' | null;
  activeOffer?: boolean;
}

export interface AddressDetails {
  formattedAddress: string;
  streetNumber?: string;
  route?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface GBPProfile {
  name: string;
  placeId: string;
  cid: string;
  address: AddressDetails;
  phone: string;
  website: string;
  coordinates: Coordinates;
  primaryCategory: string;
  secondaryCategories: string[];
  rating: number;
  reviewCount: number;
  businessHours: BusinessHours;
  attributes: BusinessAttributes;
  photosCount: PhotosCount;
  posts: PostsMetric;
  productsCount: number;
  verified: boolean;
  description?: string;
  serviceArea?: string[];
  placeUrl?: string;
  openingDate?: string;
}

export interface SubScoreDetail {
  score: number; // 0 - 100
  weight: number; // 0.0 - 1.0
  weightedScore: number; // score * weight
  maxPoints: number;
  earnedPoints: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  metrics: Record<string, { label: string; passed: boolean; score: number; feedback: string }>;
}

export interface AuditScoreBreakdown {
  overallScore: number; // 0 - 100
  letterGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  categoriesScore: SubScoreDetail; // 25%
  napScore: SubScoreDetail; // 20%
  reviewsScore: SubScoreDetail; // 25%
  photosScore: SubScoreDetail; // 15%
  engagementScore: SubScoreDetail; // 15%
  summaryHighlights: string[];
}

export interface CategoryRecommendation {
  category: string;
  searchPopularityScore: number; // 0 - 100
  relevanceScore: number; // 0 - 100
  adoptionByTopCompetitorsPct: number; // e.g. 75%
  reason: string;
}

export interface CategoryAnalysis {
  primaryCategory: string;
  primaryCategoryEffectiveness: {
    score: number; // 0 - 100
    searchVolumeIndex: 'Very High' | 'High' | 'Medium' | 'Low';
    rankingPower: 'Strong' | 'Moderate' | 'Weak';
    isOptimal: boolean;
    betterAlternative?: string;
  };
  competitorCategoryAdoption: Array<{
    category: string;
    count: number;
    percentage: number;
    usedByTopRanked: boolean;
  }>;
  recommendedSecondaryCategories: CategoryRecommendation[];
  missingHighOpportunityCategories: string[];
  targetSecondaryCategories: string[];
}

export interface StarDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  hasOwnerResponse: boolean;
  ownerResponseText?: string;
  ownerResponseDate?: string;
  extractedKeywords: string[];
  urgentActionNeeded?: boolean;
}

export interface KeywordMention {
  keyword: string;
  count: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  sampleQuote?: string;
  localSeoValue: 'High' | 'Medium' | 'Low';
}

export interface UrgentNegativeReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  daysAgo: number;
  text: string;
  coreIssue: string;
  recommendedAction: string;
  suggestedReply: string;
}

export interface ReviewSentimentAnalysis {
  totalReviews: number;
  averageRating: number;
  starDistribution: StarDistribution;
  responseRatePercentage: number;
  unansweredReviewsCount: number;
  averageResponseTime: string; // e.g. "1.4 days", "Unresponsive"
  sentimentBreakdown: {
    positivePercentage: number;
    neutralPercentage: number;
    negativePercentage: number;
  };
  topMentionedKeywords: KeywordMention[];
  urgentUnansweredNegativeReviews: UrgentNegativeReview[];
  recentReviewsSample: ReviewItem[];
  reputationHealthGrade: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
}

export interface GeoGridPoint {
  id: string;
  row: number;
  col: number;
  lat: number;
  lng: number;
  distanceKm: number;
  rank: number; // 1 - 20 (or 21 for 20+)
  isTargetInTop3: boolean;
  isTargetInTop10: boolean;
  competitorAtRank1?: string;
}

export interface GeoGridResult {
  gridSize: '3x3' | '5x5';
  matrixDimension: number; // 3 or 5
  centerCoordinates: Coordinates;
  radiusKm: number;
  keyword: string;
  points: GeoGridPoint[];
  averageGridRank: number; // AGR: Average rank across all points (points > 20 counted as 21)
  averageMapRank: number; // AMR: Average rank only where the business appears in top 20
  shareOfLocalVoice: number; // SoLV: % of points ranking in top 3
  top3Percentage: number;
  top10Percentage: number;
  rankedPointsCount: number;
  unrankedPointsCount: number;
  competitiveLeader: {
    name: string;
    solv: number;
    avgRank: number;
  };
}

export interface CompetitorProfile {
  name: string;
  placeId: string;
  primaryCategory: string;
  secondaryCategoriesCount: number;
  secondaryCategories: string[];
  rating: number;
  reviewCount: number;
  reviewsPerMonth: number;
  responseRatePct: number;
  photosCount: number;
  attributesCount: number;
  postsPerMonth: number;
  distanceKm: number;
  estimatedSolv: number;
  estimatedAuditScore: number;
}

export interface MetricComparisonItem {
  metricName: string;
  targetValue: string | number;
  marketAverage: string | number;
  topCompetitorValue: string | number;
  gapStatus: 'Winning' | 'Competitive' | 'Lagging' | 'Critical Deficit';
  recommendation: string;
}

export interface CompetitorComparison {
  targetBusinessName: string;
  competitors: CompetitorProfile[];
  metricsTable: MetricComparisonItem[];
  targetMarketPosition: 'Market Leader' | 'Strong Contender' | 'Middle of Pack' | 'Falling Behind';
  keyAdvantages: string[];
  keyVulnerabilities: string[];
}

export interface ActionItem {
  id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'Categories' | 'NAP & Info' | 'Reviews' | 'Photos' | 'Posts & Engagement' | 'Local SEO';
  title: string;
  description: string;
  howToFix: string;
  estimatedImpact: string; // e.g. "+18% in local pack 3-pack appearances"
  timeToImplement: string; // e.g. "10-15 minutes"
}

export interface GBPAuditReport {
  business: GBPProfile;
  auditDate: string; // ISO String
  scoreBreakdown: AuditScoreBreakdown;
  categoryAnalysis: CategoryAnalysis;
  reviewSentimentAnalysis: ReviewSentimentAnalysis;
  geoGridPreview: GeoGridResult;
  competitorComparison: CompetitorComparison;
  actionItems: ActionItem[];
  summary: {
    executiveSummary: string;
    topStrengths: string[];
    criticalWeaknesses: string[];
    projectedRankingLiftPct: number;
  };
}

export interface OfficialCategory {
  id: string;
  name: string;
  sector: 'Home Services' | 'Medical & Dental' | 'Legal' | 'Dining & Restaurants' | 'Retail' | 'Automotive' | 'Beauty & Wellness' | 'Professional Services' | 'Other';
  searchPopularityScore: number; // 0 - 100
  synonyms: string[];
  commonlyAssociatedSecondaries: string[];
}
