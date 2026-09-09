export interface BusinessProfile {
  id: string;
  name: string;
  industry: 'locksmith' | 'dental' | 'restaurant' | 'hvac';
  placeId: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  website: string;
  rating: number;
  totalReviews: number;
  healthScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  googleMapsUrl: string;
  claimedStatus: 'Claimed & Verified' | 'Unclaimed' | 'Suspension Risk';
  coordinates: { lat: number; lng: number };
  openingHours: string;
  establishedYear: number;
  primaryCategory: string;
  primaryCategoryId: string;
  secondaryCategories: SecondaryCategory[];
  metrics: AuditMetrics;
  geoGrid: GeoGridData;
  reviewsData: ReviewsAuditData;
  competitors: CompetitorData[];
  actionChecklist: ActionItem[];
  recentPosts: GooglePost[];
}

export interface SecondaryCategory {
  id: string;
  name: string;
  searchVolume: number;
  rankingDifficulty: 'Low' | 'Medium' | 'High';
  isCurrentlyUsed: boolean;
  matchScore: number;
}

export interface AuditMetrics {
  napConsistency: {
    score: number; // 0 - 100
    status: 'Optimal' | 'Minor Issues' | 'Severe Discrepancy';
    details: string;
  };
  categoriesHealth: {
    score: number;
    status: 'Optimal' | 'Under-optimized' | 'Missing Secondaries';
    details: string;
  };
  reviewsHealth: {
    score: number;
    status: 'Strong' | 'Needs Attention' | 'Critical';
    details: string;
  };
  photosHealth: {
    score: number;
    count: number;
    competitorAvg: number;
    freshnessDays: number;
    status: 'Great' | 'Fair' | 'Deficient';
    details: string;
  };
  postsHealth: {
    score: number;
    frequencyPerMonth: number;
    lastPostDaysAgo: number;
    status: 'Active' | 'Irregular' | 'Inactive';
    details: string;
  };
}

export interface GeoGridPoint {
  id: string;
  row: number;
  col: number;
  rank: number;
  lat: number;
  lng: number;
  distanceKm: number;
  competitorAbove?: string;
}

export interface GeoGridData {
  targetKeyword: string;
  radiusKm: number;
  gridSize: '3x3' | '5x5';
  agr: number; // Average Grid Rank
  amr: number; // Average Metric Rank (ranks <= 20)
  solv: number; // Share of Local Voice (% ranks in top 3)
  points: GeoGridPoint[];
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  hasOwnerReply: boolean;
  ownerReply?: string;
  keywords: string[];
}

export interface ReviewsAuditData {
  averageRating: number;
  totalReviews: number;
  starDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  sentimentSplit: {
    positive: number; // %
    neutral: number;
    negative: number;
  };
  responseRate: number; // %
  averageResponseTimeHours: number;
  topKeywords: { keyword: string; count: number; sentiment: 'positive' | 'negative' | 'neutral' }[];
  reviews: ReviewItem[];
}

export interface CompetitorData {
  id: string;
  name: string;
  isTarget?: boolean;
  rating: number;
  reviewsCount: number;
  primaryCategory: string;
  secondaryCategoriesCount: number;
  photosCount: number;
  postsPerMonth: number;
  domainAuthority: number;
  citationsScore: number;
  listingAgeYears: number;
  responseRate: number;
  gapSummary: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category: 'NAP' | 'Categories' | 'Reviews' | 'Photos' | 'Posts' | 'Website';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  effort: 'Quick Win' | 'Moderate' | 'Complex';
  completed: boolean;
  description: string;
  howToFix: string[];
  expectedImpact: string;
}

export interface GooglePost {
  id: string;
  type: 'OFFER' | 'EVENT' | 'UPDATE' | 'PRODUCT';
  title: string;
  content: string;
  ctaType: 'BOOK' | 'ORDER' | 'BUY' | 'LEARN_MORE' | 'CALL_NOW' | 'SIGN_UP';
  ctaUrl: string;
  couponCode?: string;
  startDate?: string;
  endDate?: string;
  dateCreated: string;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'Free Trial' | 'Agency Pro' | 'Enterprise';
  creditsRemaining: number;
  savedAuditsCount: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
