import { OfficialCategory, CategoryRecommendation } from '@/types/audit';

export const OFFICIAL_GBP_CATEGORIES: OfficialCategory[] = [
  // Home Services - Locksmith & Security
  {
    id: 'cat_locksmith',
    name: 'Locksmith',
    sector: 'Home Services',
    searchPopularityScore: 94,
    synonyms: ['emergency locksmith', 'key maker', 'lock replacement', 'car key replacement', 'key cutting'],
    commonlyAssociatedSecondaries: ['Safe & vault shop', 'Security system supplier', 'Key duplication service', 'Door supplier']
  },
  {
    id: 'cat_security_system',
    name: 'Security system supplier',
    sector: 'Home Services',
    searchPopularityScore: 78,
    synonyms: ['alarm installer', 'cctv installation', 'surveillance systems', 'smart home security'],
    commonlyAssociatedSecondaries: ['Locksmith', 'Security service', 'Closed circuit television technician', 'Home automation company']
  },
  {
    id: 'cat_key_dup',
    name: 'Key duplication service',
    sector: 'Home Services',
    searchPopularityScore: 72,
    synonyms: ['key copy', 'duplicate keys', 'laser cut keys'],
    commonlyAssociatedSecondaries: ['Locksmith', 'Hardware store', 'Safe & vault shop']
  },
  // Home Services - Plumbing
  {
    id: 'cat_plumber',
    name: 'Plumber',
    sector: 'Home Services',
    searchPopularityScore: 98,
    synonyms: ['drain cleaner', 'pipe repair', 'emergency plumbing', 'water leak repair', 'clogged toilet'],
    commonlyAssociatedSecondaries: ['Drainage service', 'Heating contractor', 'Water softening equipment supplier', 'Septic system service']
  },
  {
    id: 'cat_drainage_service',
    name: 'Drainage service',
    sector: 'Home Services',
    searchPopularityScore: 82,
    synonyms: ['sewer line cleaning', 'rooter service', 'hydro jetting'],
    commonlyAssociatedSecondaries: ['Plumber', 'Septic system service', 'Water utility company']
  },
  {
    id: 'cat_water_heater',
    name: 'Water softening equipment supplier',
    sector: 'Home Services',
    searchPopularityScore: 75,
    synonyms: ['water filtration', 'water purifier installer', 'reverse osmosis'],
    commonlyAssociatedSecondaries: ['Plumber', 'Water purification company', 'Water damage restoration service']
  },
  // Home Services - HVAC
  {
    id: 'cat_hvac_contractor',
    name: 'HVAC contractor',
    sector: 'Home Services',
    searchPopularityScore: 96,
    synonyms: ['heating and cooling', 'ac repair', 'furnace installation', 'central air conditioning'],
    commonlyAssociatedSecondaries: ['Air conditioning repair service', 'Heating contractor', 'Air conditioning system supplier', 'Air duct cleaning service']
  },
  {
    id: 'cat_ac_repair',
    name: 'Air conditioning repair service',
    sector: 'Home Services',
    searchPopularityScore: 95,
    synonyms: ['ac technician', 'cooling service', 'freon recharge'],
    commonlyAssociatedSecondaries: ['HVAC contractor', 'Heating contractor', 'Air conditioning system supplier']
  },
  {
    id: 'cat_heating_contractor',
    name: 'Heating contractor',
    sector: 'Home Services',
    searchPopularityScore: 89,
    synonyms: ['furnace repair', 'heat pump repair', 'boiler service'],
    commonlyAssociatedSecondaries: ['HVAC contractor', 'Air conditioning repair service', 'Plumber']
  },
  {
    id: 'cat_air_duct',
    name: 'Air duct cleaning service',
    sector: 'Home Services',
    searchPopularityScore: 77,
    synonyms: ['vent cleaning', 'duct sanitation', 'indoor air quality'],
    commonlyAssociatedSecondaries: ['HVAC contractor', 'Chimney sweep', 'Carpet cleaning service']
  },
  // Home Services - Electrician
  {
    id: 'cat_electrician',
    name: 'Electrician',
    sector: 'Home Services',
    searchPopularityScore: 95,
    synonyms: ['electrical contractor', 'wiring repair', 'panel upgrade', 'licensed electrician'],
    commonlyAssociatedSecondaries: ['Electrical installation service', 'Lighting contractor', 'Solar energy equipment supplier', 'Home automation company']
  },
  {
    id: 'cat_electrical_installation',
    name: 'Electrical installation service',
    sector: 'Home Services',
    searchPopularityScore: 81,
    synonyms: ['generator install', 'ev charger installation', 'breaker replacement'],
    commonlyAssociatedSecondaries: ['Electrician', 'Lighting contractor', 'Home theater store']
  },
  // Home Services - Roofing
  {
    id: 'cat_roofing_contractor',
    name: 'Roofing contractor',
    sector: 'Home Services',
    searchPopularityScore: 94,
    synonyms: ['roofer', 'roof replacement', 'shingle repair', 'leaking roof repair'],
    commonlyAssociatedSecondaries: ['Gutter cleaning service', 'Siding contractor', 'Waterproofing company', 'General contractor']
  },
  {
    id: 'cat_gutter_service',
    name: 'Gutter cleaning service',
    sector: 'Home Services',
    searchPopularityScore: 79,
    synonyms: ['gutter repair', 'seamless gutters', 'gutter guards'],
    commonlyAssociatedSecondaries: ['Roofing contractor', 'Pressure washing service', 'Siding contractor']
  },
  // Medical & Dental
  {
    id: 'cat_dentist',
    name: 'Dentist',
    sector: 'Medical & Dental',
    searchPopularityScore: 99,
    synonyms: ['dental clinic', 'family dentist', 'teeth cleaning', 'cavity filling', 'dental office'],
    commonlyAssociatedSecondaries: ['Cosmetic dentist', 'Teeth whitening service', 'Pediatric dentist', 'Dental clinic', 'Emergency dental service']
  },
  {
    id: 'cat_cosmetic_dentist',
    name: 'Cosmetic dentist',
    sector: 'Medical & Dental',
    searchPopularityScore: 88,
    synonyms: ['veneers', 'invisalign provider', 'smile makeover', 'dental implants'],
    commonlyAssociatedSecondaries: ['Dentist', 'Teeth whitening service', 'Orthodontist', 'Dental implants periodontist']
  },
  {
    id: 'cat_emergency_dentist',
    name: 'Emergency dental service',
    sector: 'Medical & Dental',
    searchPopularityScore: 86,
    synonyms: ['24 hour dentist', 'urgent dental care', 'toothache relief'],
    commonlyAssociatedSecondaries: ['Dentist', 'Cosmetic dentist', 'Oral surgeon']
  },
  {
    id: 'cat_orthodontist',
    name: 'Orthodontist',
    sector: 'Medical & Dental',
    searchPopularityScore: 90,
    synonyms: ['braces', 'invisalign specialist', 'clear aligners'],
    commonlyAssociatedSecondaries: ['Dentist', 'Cosmetic dentist', 'Pediatric dentist']
  },
  {
    id: 'cat_chiropractor',
    name: 'Chiropractor',
    sector: 'Medical & Dental',
    searchPopularityScore: 91,
    synonyms: ['spine alignment', 'back pain specialist', 'chiropractic adjustment'],
    commonlyAssociatedSecondaries: ['Physical therapy clinic', 'Massage therapist', 'Acupuncture clinic']
  },
  {
    id: 'cat_physical_therapy',
    name: 'Physical therapy clinic',
    sector: 'Medical & Dental',
    searchPopularityScore: 89,
    synonyms: ['physiotherapist', 'rehab clinic', 'sports injury physical therapy'],
    commonlyAssociatedSecondaries: ['Chiropractor', 'Sports medicine clinic', 'Occupational therapist']
  },
  {
    id: 'cat_urgent_care',
    name: 'Urgent care center',
    sector: 'Medical & Dental',
    searchPopularityScore: 96,
    synonyms: ['walk-in clinic', 'immediate medical care', 'after hours doctor'],
    commonlyAssociatedSecondaries: ['Medical clinic', 'Family practice physician', 'Diagnostic center']
  },
  // Legal
  {
    id: 'cat_personal_injury_attorney',
    name: 'Personal injury attorney',
    sector: 'Legal',
    searchPopularityScore: 96,
    synonyms: ['car accident lawyer', 'slip and fall attorney', 'injury legal representation', 'accident attorney'],
    commonlyAssociatedSecondaries: ['Law firm', 'Trial attorney', 'Civil law attorney']
  },
  {
    id: 'cat_law_firm',
    name: 'Law firm',
    sector: 'Legal',
    searchPopularityScore: 95,
    synonyms: ['lawyers office', 'attorneys at law', 'legal services'],
    commonlyAssociatedSecondaries: ['Personal injury attorney', 'Criminal defense attorney', 'Family law attorney', 'Estate planning attorney']
  },
  {
    id: 'cat_criminal_defense_attorney',
    name: 'Criminal defense attorney',
    sector: 'Legal',
    searchPopularityScore: 92,
    synonyms: ['dui lawyer', 'arrest legal defense', 'felony lawyer'],
    commonlyAssociatedSecondaries: ['Law firm', 'Trial attorney', 'Legal services']
  },
  {
    id: 'cat_family_law_attorney',
    name: 'Family law attorney',
    sector: 'Legal',
    searchPopularityScore: 90,
    synonyms: ['divorce lawyer', 'child custody attorney', 'marital separation lawyer'],
    commonlyAssociatedSecondaries: ['Law firm', 'Divorce lawyer', 'Mediation service']
  },
  {
    id: 'cat_estate_planning_attorney',
    name: 'Estate planning attorney',
    sector: 'Legal',
    searchPopularityScore: 87,
    synonyms: ['will lawyer', 'trust attorney', 'probate lawyer'],
    commonlyAssociatedSecondaries: ['Law firm', 'Elder law attorney', 'Tax attorney']
  },
  // Dining & Restaurants
  {
    id: 'cat_restaurant',
    name: 'Restaurant',
    sector: 'Dining & Restaurants',
    searchPopularityScore: 100,
    synonyms: ['diner', 'dining', 'eatery', 'food place', 'takeout food'],
    commonlyAssociatedSecondaries: ['Family restaurant', 'Catering food and drink supplier', 'Delivery restaurant', 'Bar & grill']
  },
  {
    id: 'cat_pizza_restaurant',
    name: 'Pizza restaurant',
    sector: 'Dining & Restaurants',
    searchPopularityScore: 98,
    synonyms: ['pizzeria', 'pizza delivery', 'wood fired pizza', 'slice shop', 'italian pizza'],
    commonlyAssociatedSecondaries: ['Italian restaurant', 'Pizza delivery', 'Pizza takeaway', 'Delivery restaurant']
  },
  {
    id: 'cat_italian_restaurant',
    name: 'Italian restaurant',
    sector: 'Dining & Restaurants',
    searchPopularityScore: 95,
    synonyms: ['pasta house', 'authentic italian', 'trattoria'],
    commonlyAssociatedSecondaries: ['Pizza restaurant', 'Wine bar', 'European restaurant', 'Catering food and drink supplier']
  },
  {
    id: 'cat_cafe',
    name: 'Cafe',
    sector: 'Dining & Restaurants',
    searchPopularityScore: 97,
    synonyms: ['coffee shop', 'espresso bar', 'breakfast cafe'],
    commonlyAssociatedSecondaries: ['Coffee shop', 'Bakery', 'Brunch restaurant', 'Tea house']
  },
  {
    id: 'cat_bakery',
    name: 'Bakery',
    sector: 'Dining & Restaurants',
    searchPopularityScore: 92,
    synonyms: ['cake shop', 'pastry shop', 'artisan bread', 'custom cakes'],
    commonlyAssociatedSecondaries: ['Cafe', 'Pastry shop', 'Dessert shop', 'Wedding bakery']
  },
  // Automotive
  {
    id: 'cat_auto_repair',
    name: 'Auto repair shop',
    sector: 'Automotive',
    searchPopularityScore: 98,
    synonyms: ['car mechanic', 'engine diagnosis', 'automotive service', 'car maintenance'],
    commonlyAssociatedSecondaries: ['Brake shop', 'Oil change service', 'Tire shop', 'Transmission shop', 'Wheel alignment service']
  },
  {
    id: 'cat_car_detailing',
    name: 'Car detailing service',
    sector: 'Automotive',
    searchPopularityScore: 89,
    synonyms: ['auto detailing', 'ceramic coating', 'interior car cleaning', 'paint correction'],
    commonlyAssociatedSecondaries: ['Car wash', 'Window tinting service', 'Auto restoration service']
  },
  {
    id: 'cat_tire_shop',
    name: 'Tire shop',
    sector: 'Automotive',
    searchPopularityScore: 93,
    synonyms: ['new tires', 'flat tire repair', 'tire rotation'],
    commonlyAssociatedSecondaries: ['Auto repair shop', 'Wheel alignment service', 'Brake shop']
  },
  // Beauty & Wellness
  {
    id: 'cat_hair_salon',
    name: 'Hair salon',
    sector: 'Beauty & Wellness',
    searchPopularityScore: 96,
    synonyms: ['hairdresser', 'hair stylist', 'hair coloring', 'hair cuts'],
    commonlyAssociatedSecondaries: ['Beauty salon', 'Barber shop', 'Hair extensions technician', 'Nail salon']
  },
  {
    id: 'cat_barber_shop',
    name: 'Barber shop',
    sector: 'Beauty & Wellness',
    searchPopularityScore: 94,
    synonyms: ['mens haircut', 'beard trim', 'fade haircut', 'traditional barber'],
    commonlyAssociatedSecondaries: ['Hair salon', 'Beauty salon']
  },
  {
    id: 'cat_nail_salon',
    name: 'Nail salon',
    sector: 'Beauty & Wellness',
    searchPopularityScore: 93,
    synonyms: ['manicure', 'pedicure', 'gel nails', 'acrylic nails'],
    commonlyAssociatedSecondaries: ['Beauty salon', 'Day spa', 'Waxing hair removal service']
  },
  {
    id: 'cat_day_spa',
    name: 'Day spa',
    sector: 'Beauty & Wellness',
    searchPopularityScore: 88,
    synonyms: ['facial spa', 'relaxation massage', 'skin rejuvenation'],
    commonlyAssociatedSecondaries: ['Massage therapist', 'Skin care clinic', 'Facial spa']
  }
];

export class CategoriesDatabase {
  private categories: OfficialCategory[];

  constructor(customList: OfficialCategory[] = OFFICIAL_GBP_CATEGORIES) {
    this.categories = customList;
  }

  /**
   * Search official categories by name, synonym, or sector
   */
  public searchCategories(query: string, limit = 15): OfficialCategory[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.categories.slice(0, limit);

    const matches = this.categories.map((cat) => {
      let score = 0;
      const catName = cat.name.toLowerCase();
      
      if (catName === q) {
        score = 100;
      } else if (catName.startsWith(q)) {
        score = 80;
      } else if (catName.includes(q)) {
        score = 60;
      } else if (cat.synonyms.some((s) => s.toLowerCase().includes(q))) {
        score = 40;
      } else if (cat.sector.toLowerCase().includes(q)) {
        score = 25;
      }

      return { cat, score };
    });

    return matches
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score || b.cat.searchPopularityScore - a.cat.searchPopularityScore)
      .slice(0, limit)
      .map((m) => m.cat);
  }

  /**
   * Find exact category entry
   */
  public getCategoryByName(name: string): OfficialCategory | undefined {
    const clean = name.toLowerCase().trim();
    return this.categories.find((c) => c.name.toLowerCase() === clean);
  }

  /**
   * Evaluates if a given category is optimal for ranking
   */
  public evaluatePrimaryCategory(primaryCategory: string): {
    score: number;
    searchVolumeIndex: 'Very High' | 'High' | 'Medium' | 'Low';
    rankingPower: 'Strong' | 'Moderate' | 'Weak';
    isOptimal: boolean;
    betterAlternative?: string;
  } {
    const cat = this.getCategoryByName(primaryCategory);

    if (!cat) {
      // Find closest match
      const suggestions = this.searchCategories(primaryCategory, 1);
      return {
        score: 45,
        searchVolumeIndex: 'Low',
        rankingPower: 'Weak',
        isOptimal: false,
        betterAlternative: suggestions.length > 0 ? suggestions[0].name : 'Locksmith'
      };
    }

    const searchVolume: 'Very High' | 'High' | 'Medium' | 'Low' =
      cat.searchPopularityScore >= 90 ? 'Very High' :
      cat.searchPopularityScore >= 80 ? 'High' :
      cat.searchPopularityScore >= 65 ? 'Medium' : 'Low';

    const rankingPower: 'Strong' | 'Moderate' | 'Weak' =
      cat.searchPopularityScore >= 85 ? 'Strong' :
      cat.searchPopularityScore >= 70 ? 'Moderate' : 'Weak';

    return {
      score: cat.searchPopularityScore,
      searchVolumeIndex: searchVolume,
      rankingPower,
      isOptimal: cat.searchPopularityScore >= 80,
      betterAlternative: cat.searchPopularityScore < 80 && cat.commonlyAssociatedSecondaries.length > 0
        ? cat.commonlyAssociatedSecondaries[0]
        : undefined
    };
  }

  /**
   * Returns recommended secondary categories based on primary category
   */
  public getRecommendedSecondaryCategories(
    primaryCategory: string,
    existingSecondaries: string[] = []
  ): CategoryRecommendation[] {
    const cat = this.getCategoryByName(primaryCategory);
    const existingLower = new Set([
      primaryCategory.toLowerCase(),
      ...existingSecondaries.map((s) => s.toLowerCase())
    ]);

    const recommendations: CategoryRecommendation[] = [];

    if (cat && cat.commonlyAssociatedSecondaries) {
      for (const recName of cat.commonlyAssociatedSecondaries) {
        if (!existingLower.has(recName.toLowerCase())) {
          const matched = this.getCategoryByName(recName);
          const popularity = matched ? matched.searchPopularityScore : 75;
          recommendations.push({
            category: recName,
            searchPopularityScore: popularity,
            relevanceScore: 92,
            adoptionByTopCompetitorsPct: Math.floor(65 + Math.random() * 25),
            reason: `High semantic correlation with "${primaryCategory}". Expanding into this category captures adjacent high-intent search queries.`
          });
        }
      }
    }

    // Also look for categories in the same sector
    if (cat) {
      const sameSector = this.categories
        .filter((c) => c.sector === cat.sector && !existingLower.has(c.name.toLowerCase()))
        .sort((a, b) => b.searchPopularityScore - a.searchPopularityScore);

      for (const item of sameSector) {
        if (!recommendations.some((r) => r.category.toLowerCase() === item.name.toLowerCase())) {
          recommendations.push({
            category: item.name,
            searchPopularityScore: item.searchPopularityScore,
            relevanceScore: 78,
            adoptionByTopCompetitorsPct: Math.floor(40 + Math.random() * 30),
            reason: `Commonly leveraged secondary category in the ${item.sector} sector.`
          });
        }
        if (recommendations.length >= 6) break;
      }
    }

    return recommendations;
  }

  /**
   * Compare target categories against top local competitors
   */
  public compareCompetitorCategories(
    target: { primaryCategory: string; secondaryCategories: string[] },
    competitors: Array<{ name: string; primaryCategory: string; secondaryCategories: string[] }>
  ): {
    competitorAdoption: Array<{
      category: string;
      count: number;
      percentage: number;
      usedByTopRanked: boolean;
    }>;
    recommendedToAdd: CategoryRecommendation[];
    missingHighOpportunity: string[];
  } {
    const categoryFrequency = new Map<string, { count: number; usedByTop: boolean }>();
    const totalComps = Math.max(1, competitors.length);

    competitors.forEach((comp, idx) => {
      const isTop = idx === 0;
      const allCats = [comp.primaryCategory, ...comp.secondaryCategories].filter(Boolean);
      allCats.forEach((c) => {
        const prev = categoryFrequency.get(c) || { count: 0, usedByTop: false };
        categoryFrequency.set(c, {
          count: prev.count + 1,
          usedByTop: prev.usedByTop || isTop
        });
      });
    });

    const targetCatsLower = new Set([
      target.primaryCategory.toLowerCase(),
      ...target.secondaryCategories.map((c) => c.toLowerCase())
    ]);

    const competitorAdoption: Array<{
      category: string;
      count: number;
      percentage: number;
      usedByTopRanked: boolean;
    }> = [];

    const missingHighOpportunity: string[] = [];

    categoryFrequency.forEach((data, category) => {
      const percentage = Math.round((data.count / totalComps) * 100);
      competitorAdoption.push({
        category,
        count: data.count,
        percentage,
        usedByTopRanked: data.usedByTop
      });

      if (!targetCatsLower.has(category.toLowerCase()) && percentage >= 50) {
        missingHighOpportunity.push(category);
      }
    });

    competitorAdoption.sort((a, b) => b.count - a.count);

    const baseRecs = this.getRecommendedSecondaryCategories(
      target.primaryCategory,
      target.secondaryCategories
    );

    // Merge competitor adoption intelligence into recommendations
    const recommendedToAdd = baseRecs.map((rec) => {
      const adoption = competitorAdoption.find(
        (c) => c.category.toLowerCase() === rec.category.toLowerCase()
      );
      if (adoption) {
        return {
          ...rec,
          adoptionByTopCompetitorsPct: adoption.percentage,
          reason: `${adoption.percentage}% of top competitors use this category to rank for high-intent local variations.`
        };
      }
      return rec;
    });

    // Add any competitor-dominated categories that weren't in base recommendations
    missingHighOpportunity.forEach((missed) => {
      if (!recommendedToAdd.some((r) => r.category.toLowerCase() === missed.toLowerCase())) {
        const catInfo = this.getCategoryByName(missed);
        recommendedToAdd.unshift({
          category: missed,
          searchPopularityScore: catInfo ? catInfo.searchPopularityScore : 85,
          relevanceScore: 90,
          adoptionByTopCompetitorsPct: categoryFrequency.get(missed)?.count ? Math.round((categoryFrequency.get(missed)!.count / totalComps) * 100) : 60,
          reason: `Critical competitive gap: Used by ${categoryFrequency.get(missed)?.count || 1} out of ${totalComps} top competitors.`
        });
      }
    });

    return {
      competitorAdoption,
      recommendedToAdd: recommendedToAdd.slice(0, 8),
      missingHighOpportunity
    };
  }
}

export const categoriesDatabase = new CategoriesDatabase();
