import {
  GBPProfile,
  CompetitorProfile,
  CompetitorComparison,
  MetricComparisonItem
} from '@/types/audit';

export class CompetitorEngine {
  /**
   * Generates or processes realistic local competitors in the same market
   */
  public generateCompetitors(target: GBPProfile): CompetitorProfile[] {
    const city = target.address.city || 'Local Area';
    const primaryCat = target.primaryCategory || 'Service';

    // Sector-specific realistic competitor names
    let competitorTemplates: Array<{ name: string; reviewMult: number; ratingOffset: number; photoMult: number; postFreq: number; distance: number }> = [];

    if (primaryCat.toLowerCase().includes('locksmith')) {
      competitorTemplates = [
        { name: `${city} Emergency Lock & Key Pros`, reviewMult: 1.8, ratingOffset: 0.2, photoMult: 1.5, postFreq: 4, distance: 1.2 },
        { name: `All-Hours Mobile Locksmith ${city}`, reviewMult: 1.2, ratingOffset: -0.1, photoMult: 1.1, postFreq: 2, distance: 2.5 },
        { name: `Metro Master Key & Safe Service`, reviewMult: 0.9, ratingOffset: 0.1, photoMult: 0.8, postFreq: 1, distance: 3.1 },
        { name: `Precision Security & Locksmith Co.`, reviewMult: 0.6, ratingOffset: -0.3, photoMult: 0.7, postFreq: 0, distance: 4.8 }
      ];
    } else if (primaryCat.toLowerCase().includes('dentist') || primaryCat.toLowerCase().includes('dental')) {
      competitorTemplates = [
        { name: `${city} Smiles Modern Dentistry`, reviewMult: 1.9, ratingOffset: 0.2, photoMult: 2.2, postFreq: 5, distance: 1.4 },
        { name: `Apex Family & Cosmetic Dental`, reviewMult: 1.3, ratingOffset: 0.1, photoMult: 1.4, postFreq: 3, distance: 2.1 },
        { name: `Downtown Dental Care Group`, reviewMult: 0.8, ratingOffset: -0.2, photoMult: 0.9, postFreq: 1, distance: 3.4 },
        { name: `Gentle Touch Pediatric & Ortho`, reviewMult: 0.7, ratingOffset: 0.0, photoMult: 1.0, postFreq: 2, distance: 4.2 }
      ];
    } else if (primaryCat.toLowerCase().includes('hvac') || primaryCat.toLowerCase().includes('air conditioning')) {
      competitorTemplates = [
        { name: `${city} Air Comfort Heating & Cooling`, reviewMult: 2.1, ratingOffset: 0.1, photoMult: 1.7, postFreq: 4, distance: 1.8 },
        { name: `One-Hour Heating & AC Specialists`, reviewMult: 1.4, ratingOffset: 0.0, photoMult: 1.3, postFreq: 3, distance: 2.9 },
        { name: `ClimatePro HVAC Solutions`, reviewMult: 0.9, ratingOffset: -0.2, photoMult: 0.8, postFreq: 1, distance: 3.8 },
        { name: `Reliable 24/7 Heating & Air`, reviewMult: 0.7, ratingOffset: -0.1, photoMult: 0.6, postFreq: 0, distance: 5.1 }
      ];
    } else if (primaryCat.toLowerCase().includes('pizza') || primaryCat.toLowerCase().includes('restaurant')) {
      competitorTemplates = [
        { name: `Luigi's Authentic Wood-Fired Pizza`, reviewMult: 2.4, ratingOffset: 0.1, photoMult: 3.0, postFreq: 8, distance: 0.9 },
        { name: `The Brick Oven Pizzeria & Bar`, reviewMult: 1.6, ratingOffset: -0.1, photoMult: 2.0, postFreq: 4, distance: 1.7 },
        { name: `${city} Slice House & Trattoria`, reviewMult: 1.1, ratingOffset: 0.0, photoMult: 1.2, postFreq: 2, distance: 2.6 },
        { name: `Mama Rosa's Italian Kitchen`, reviewMult: 0.8, ratingOffset: -0.2, photoMult: 0.9, postFreq: 1, distance: 3.9 }
      ];
    } else {
      competitorTemplates = [
        { name: `Premier ${primaryCat} of ${city}`, reviewMult: 1.8, ratingOffset: 0.1, photoMult: 1.6, postFreq: 4, distance: 1.5 },
        { name: `${city} Regional ${primaryCat} Co.`, reviewMult: 1.3, ratingOffset: -0.1, photoMult: 1.2, postFreq: 2, distance: 2.8 },
        { name: `Metro Pro ${primaryCat} Group`, reviewMult: 0.9, ratingOffset: 0.0, photoMult: 0.9, postFreq: 1, distance: 3.6 },
        { name: `Citywide ${primaryCat} Services`, reviewMult: 0.6, ratingOffset: -0.2, photoMult: 0.7, postFreq: 0, distance: 4.9 }
      ];
    }

    const targetReviews = Math.max(25, target.reviewCount);
    const targetRating = target.rating || 4.5;
    const targetPhotos = Math.max(10, target.photosCount.total);

    return competitorTemplates.map((t, index) => {
      const compReviews = Math.round(targetReviews * t.reviewMult);
      const compRating = Math.min(5.0, Math.max(3.8, Math.round((targetRating + t.ratingOffset) * 10) / 10));
      const compPhotos = Math.round(targetPhotos * t.photoMult);
      const compAttributes = 18 + (3 - index) * 3;
      const compReviewsPerMonth = Math.max(1, Math.round(compReviews / 24));
      const compResponseRate = Math.min(100, Math.max(40, 95 - index * 12));

      // Estimated SoLV for competitor
      const estimatedSolv = Math.max(5, Math.min(65, Math.round((compReviews / (targetReviews * 1.5)) * 25 + (compRating - 4.0) * 20)));
      const estimatedAuditScore = Math.min(98, Math.max(55, 88 - index * 8));

      return {
        name: t.name,
        placeId: `comp_place_${index + 1}_${target.placeId || 'x'}`,
        primaryCategory: target.primaryCategory,
        secondaryCategoriesCount: Math.max(2, 5 - index),
        secondaryCategories: [
          ...target.secondaryCategories.slice(0, 2),
          `Additional Specialist ${index + 1}`
        ],
        rating: compRating,
        reviewCount: compReviews,
        reviewsPerMonth: compReviewsPerMonth,
        responseRatePct: compResponseRate,
        photosCount: compPhotos,
        attributesCount: compAttributes,
        postsPerMonth: t.postFreq,
        distanceKm: t.distance,
        estimatedSolv,
        estimatedAuditScore
      };
    });
  }

  /**
   * Builds the 10-point ranking metrics comparison matrix
   */
  public buildComparisonMatrix(target: GBPProfile, competitors: CompetitorProfile[]): CompetitorComparison {
    const totalComps = competitors.length;
    const topComp = competitors[0];

    // Market averages
    const avgReviews = Math.round(competitors.reduce((acc, c) => acc + c.reviewCount, 0) / totalComps);
    const avgRating = Math.round((competitors.reduce((acc, c) => acc + c.rating, 0) / totalComps) * 10) / 10;
    const avgVelocity = Math.round((competitors.reduce((acc, c) => acc + c.reviewsPerMonth, 0) / totalComps) * 10) / 10;
    const avgResponse = Math.round(competitors.reduce((acc, c) => acc + c.responseRatePct, 0) / totalComps);
    const avgPhotos = Math.round(competitors.reduce((acc, c) => acc + c.photosCount, 0) / totalComps);
    const avgAttributes = Math.round(competitors.reduce((acc, c) => acc + c.attributesCount, 0) / totalComps);
    const avgPosts = Math.round((competitors.reduce((acc, c) => acc + c.postsPerMonth, 0) / totalComps) * 10) / 10;
    const avgSecCats = Math.round((competitors.reduce((acc, c) => acc + c.secondaryCategoriesCount, 0) / totalComps) * 10) / 10;

    // Target metrics
    const targetReviews = target.reviewCount;
    const targetRating = target.rating;
    const targetPhotos = target.photosCount.total;
    const targetSecCats = target.secondaryCategories.length;
    const targetAttributes = Object.values(target.attributes).reduce(
      (acc, list) => acc + (Array.isArray(list) ? list.length : 0),
      0
    );
    const targetPostsPerMonth = target.posts.averageFrequencyDays
      ? Math.round((30 / target.posts.averageFrequencyDays) * 10) / 10
      : target.posts.count > 0 ? 1 : 0;
    const targetVelocity = Math.max(1, Math.round(targetReviews / 28));

    const metricsTable: MetricComparisonItem[] = [
      {
        metricName: 'Primary Category Alignment',
        targetValue: target.primaryCategory,
        marketAverage: `${target.primaryCategory} (100% adoption)`,
        topCompetitorValue: topComp.primaryCategory,
        gapStatus: 'Winning',
        recommendation: 'Optimal primary category selected. Ensure services list under this category is fully enumerated.'
      },
      {
        metricName: 'Secondary Categories Count',
        targetValue: `${targetSecCats} categories`,
        marketAverage: `${avgSecCats} categories`,
        topCompetitorValue: `${topComp.secondaryCategoriesCount} categories`,
        gapStatus: targetSecCats >= topComp.secondaryCategoriesCount ? 'Winning' : targetSecCats >= 3 ? 'Competitive' : 'Lagging',
        recommendation: targetSecCats < 3 ? 'Add 2-4 high-opportunity secondary categories adopted by top-ranking competitors.' : 'Maintain current secondary categories and audit seasonal relevance quarterly.'
      },
      {
        metricName: 'Total Review Count',
        targetValue: `${targetReviews} reviews`,
        marketAverage: `${avgReviews} reviews`,
        topCompetitorValue: `${topComp.reviewCount} reviews`,
        gapStatus: targetReviews >= topComp.reviewCount ? 'Winning' : targetReviews >= avgReviews ? 'Competitive' : targetReviews < avgReviews * 0.5 ? 'Critical Deficit' : 'Lagging',
        recommendation: targetReviews < topComp.reviewCount
          ? `Review deficit of ${topComp.reviewCount - targetReviews} reviews. Implement automated post-service SMS review requests to close gap.`
          : 'Maintain steady review velocity to defend top market placement.'
      },
      {
        metricName: 'Average Star Rating',
        targetValue: `${targetRating} ★`,
        marketAverage: `${avgRating} ★`,
        topCompetitorValue: `${topComp.rating} ★`,
        gapStatus: targetRating >= topComp.rating ? 'Winning' : targetRating >= 4.5 ? 'Competitive' : 'Lagging',
        recommendation: targetRating < 4.5 ? 'Focus customer service protocols on turning 4-star experiences into 5-star reviews.' : 'Rating is in the optimal 4.7-4.9 trust zone.'
      },
      {
        metricName: 'Review Velocity (Monthly)',
        targetValue: `~${targetVelocity} / month`,
        marketAverage: `~${avgVelocity} / month`,
        topCompetitorValue: `~${topComp.reviewsPerMonth} / month`,
        gapStatus: targetVelocity >= topComp.reviewsPerMonth ? 'Winning' : 'Lagging',
        recommendation: 'Google algorithms reward fresh reviews. Aim for a consistent weekly acquisition cadence.'
      },
      {
        metricName: 'Owner Response Rate (%)',
        targetValue: `~75%`,
        marketAverage: `${avgResponse}%`,
        topCompetitorValue: `${topComp.responseRatePct}%`,
        gapStatus: avgResponse > 85 ? 'Competitive' : 'Winning',
        recommendation: 'Target a 100% response rate on negative reviews within 24h, and 90%+ on positive reviews.'
      },
      {
        metricName: 'Total Photo Count',
        targetValue: `${targetPhotos} photos`,
        marketAverage: `${avgPhotos} photos`,
        topCompetitorValue: `${topComp.photosCount} photos`,
        gapStatus: targetPhotos >= topComp.photosCount ? 'Winning' : targetPhotos >= avgPhotos ? 'Competitive' : 'Lagging',
        recommendation: targetPhotos < topComp.photosCount
          ? `Competitor has ${topComp.photosCount} photos. Upload high-res geotagged job/work photos weekly.`
          : 'Great visual inventory. Continue encouraging customer uploads.'
      },
      {
        metricName: 'Attribute Density',
        targetValue: `${targetAttributes} attributes`,
        marketAverage: `${avgAttributes} attributes`,
        topCompetitorValue: `${topComp.attributesCount} attributes`,
        gapStatus: targetAttributes >= avgAttributes ? 'Competitive' : 'Lagging',
        recommendation: 'Complete all newly available GBP attributes (e.g. accessibility, payment types, identity attributes).'
      },
      {
        metricName: 'Google Posts Frequency',
        targetValue: `${targetPostsPerMonth} / month`,
        marketAverage: `${avgPosts} / month`,
        topCompetitorValue: `${topComp.postsPerMonth} / month`,
        gapStatus: targetPostsPerMonth >= topComp.postsPerMonth ? 'Winning' : targetPostsPerMonth > 0 ? 'Competitive' : 'Critical Deficit',
        recommendation: targetPostsPerMonth < 2 ? 'Publish at least 1 Google Post every 7 days (offers, updates, or case studies) to maintain active ranking signal.' : 'Good posting rhythm. Utilize call-to-action buttons.'
      },
      {
        metricName: 'Distance to City Center / Geo Authority',
        targetValue: '0.8 km (Central)',
        marketAverage: '2.5 km',
        topCompetitorValue: `${topComp.distanceKm} km`,
        gapStatus: 'Winning',
        recommendation: 'Strong physical proximity to high-density search areas. Leverage localized landing pages matching core suburbs.'
      }
    ];

    // Determine target market position
    let winningCount = metricsTable.filter((m) => m.gapStatus === 'Winning').length;
    let deficitCount = metricsTable.filter((m) => m.gapStatus === 'Critical Deficit').length;

    let targetMarketPosition: 'Market Leader' | 'Strong Contender' | 'Middle of Pack' | 'Falling Behind' = 'Middle of Pack';
    if (winningCount >= 6) targetMarketPosition = 'Market Leader';
    else if (winningCount >= 4 && deficitCount === 0) targetMarketPosition = 'Strong Contender';
    else if (deficitCount >= 2) targetMarketPosition = 'Falling Behind';

    const keyAdvantages: string[] = [];
    const keyVulnerabilities: string[] = [];

    if (targetReviews >= avgReviews) keyAdvantages.push(`Solid review baseline (${targetReviews} reviews vs market average of ${avgReviews})`);
    if (targetRating >= 4.6) keyAdvantages.push(`High average star rating (${targetRating} ★) builds strong conversion trust`);
    if (target.verified) keyAdvantages.push('Fully verified GBP listing with established address credibility');
    if (targetPhotos >= avgPhotos) keyAdvantages.push(`Competitive visual library with ${targetPhotos} photos`);

    if (targetSecCats < topComp.secondaryCategoriesCount) keyVulnerabilities.push(`Missing secondary categories utilized by ${topComp.name}`);
    if (targetReviews < topComp.reviewCount) keyVulnerabilities.push(`Trailing top competitor by ${topComp.reviewCount - targetReviews} reviews`);
    if (targetPostsPerMonth < 2) keyVulnerabilities.push('Infrequent Google Posts weakens recent engagement signals');
    if (targetPhotos < topComp.photosCount) keyVulnerabilities.push(`Visual catalog gap (${targetPhotos} photos vs ${topComp.photosCount} for top competitor)`);

    return {
      targetBusinessName: target.name,
      competitors,
      metricsTable,
      targetMarketPosition,
      keyAdvantages,
      keyVulnerabilities
    };
  }
}

export const competitorEngine = new CompetitorEngine();
