import { categoriesDatabase, OFFICIAL_GBP_CATEGORIES } from '@/lib/audit/categories-database';
import { competitorEngine } from '@/lib/audit/competitor-engine';
import { DEMO_PROFILES } from '@/lib/audit/demo-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'search'; // 'search' | 'recommend' | 'spy' | 'all'
    const query = searchParams.get('query') || searchParams.get('q') || '';
    const primaryCategory = searchParams.get('primaryCategory') || searchParams.get('category') || '';
    const sector = searchParams.get('sector') || '';
    const limit = parseInt(searchParams.get('limit') || '15', 10);

    if (mode === 'all') {
      const grouped: Record<string, typeof OFFICIAL_GBP_CATEGORIES> = {};
      OFFICIAL_GBP_CATEGORIES.forEach((cat) => {
        if (!grouped[cat.sector]) grouped[cat.sector] = [];
        grouped[cat.sector].push(cat);
      });
      return new Response(JSON.stringify({ success: true, count: OFFICIAL_GBP_CATEGORIES.length, data: grouped }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (mode === 'recommend') {
      const targetCat = primaryCategory || query || 'Locksmith';
      const recommendations = categoriesDatabase.getRecommendedSecondaryCategories(targetCat);
      const evalInfo = categoriesDatabase.evaluatePrimaryCategory(targetCat);
      return new Response(
        JSON.stringify({
          success: true,
          primaryCategory: targetCat,
          effectiveness: evalInfo,
          recommendations
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (mode === 'spy') {
      const targetCat = primaryCategory || query || 'Dentist';
      // Find a matching demo profile or mock target
      const demoMatch = Object.values(DEMO_PROFILES).find(
        (d) => d.profile.primaryCategory.toLowerCase() === targetCat.toLowerCase()
      ) || DEMO_PROFILES.apex_dental;

      const competitors = competitorEngine.generateCompetitors(demoMatch.profile);
      const spyResult = categoriesDatabase.compareCompetitorCategories(
        {
          primaryCategory: demoMatch.profile.primaryCategory,
          secondaryCategories: demoMatch.profile.secondaryCategories
        },
        competitors.map((c) => ({
          name: c.name,
          primaryCategory: c.primaryCategory,
          secondaryCategories: c.secondaryCategories
        }))
      );

      return new Response(
        JSON.stringify({
          success: true,
          targetBusiness: demoMatch.profile.name,
          targetPrimaryCategory: demoMatch.profile.primaryCategory,
          targetSecondaryCategories: demoMatch.profile.secondaryCategories,
          competitorCount: competitors.length,
          data: spyResult
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Default: search categories
    let results = categoriesDatabase.searchCategories(query, limit);
    if (sector) {
      results = results.filter((c) => c.sector.toLowerCase() === sector.toLowerCase());
    }

    return new Response(
      JSON.stringify({
        success: true,
        query,
        count: results.length,
        data: results
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Category query failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const mode = body.mode || 'spy'; // 'spy' | 'recommend' | 'search'
    const target = body.target || {
      primaryCategory: body.primaryCategory || 'Locksmith',
      secondaryCategories: body.secondaryCategories || []
    };
    const competitors = body.competitors || [];

    if (mode === 'spy') {
      if (competitors.length > 0) {
        const spyResult = categoriesDatabase.compareCompetitorCategories(target, competitors);
        return new Response(JSON.stringify({ success: true, data: spyResult }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        // Synthesize competitor category data
        const demo = Object.values(DEMO_PROFILES).find(
          (d) => d.profile.primaryCategory.toLowerCase() === target.primaryCategory.toLowerCase()
        ) || DEMO_PROFILES.mikes_locksmith;

        const generatedComps = competitorEngine.generateCompetitors(demo.profile);
        const spyResult = categoriesDatabase.compareCompetitorCategories(
          target,
          generatedComps.map((c) => ({
            name: c.name,
            primaryCategory: c.primaryCategory,
            secondaryCategories: c.secondaryCategories
          }))
        );

        return new Response(JSON.stringify({ success: true, data: spyResult }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (mode === 'recommend') {
      const recs = categoriesDatabase.getRecommendedSecondaryCategories(
        target.primaryCategory,
        target.secondaryCategories
      );
      return new Response(JSON.stringify({ success: true, data: recs }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const searchResults = categoriesDatabase.searchCategories(body.query || '', body.limit || 15);
    return new Response(JSON.stringify({ success: true, data: searchResults }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Category operation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
