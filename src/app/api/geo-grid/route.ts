import { geoGridEngine } from '@/lib/audit/geo-grid-engine';
import { DEMO_PROFILES } from '@/lib/audit/demo-data';
import { Coordinates } from '@/types/audit';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');
    const radiusKm = parseFloat(searchParams.get('radiusKm') || searchParams.get('radius') || '5');
    const gridSize = (searchParams.get('gridSize') as '3x3' | '5x5') || '5x5';
    const keyword = searchParams.get('keyword') || searchParams.get('q') || 'emergency locksmith';
    const profileKey = searchParams.get('profile') || 'mikes_locksmith';

    // Default to demo profile coordinates if not provided
    const demo = DEMO_PROFILES[profileKey] || DEMO_PROFILES.mikes_locksmith;
    const center: Coordinates = {
      lat: latParam ? parseFloat(latParam) : demo.profile.coordinates.lat,
      lng: lngParam ? parseFloat(lngParam) : demo.profile.coordinates.lng
    };

    const result = geoGridEngine.simulateRankings(center, {
      gridSize,
      radiusKm: isNaN(radiusKm) ? 5 : radiusKm,
      keyword,
      targetProfile: demo.profile
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Geo-grid generation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const center: Coordinates = {
      lat: Number(body.lat ?? body.center?.lat ?? 41.8904),
      lng: Number(body.lng ?? body.center?.lng ?? -87.6241)
    };
    const radiusKm = Number(body.radiusKm || body.radius || 5);
    const gridSize = body.gridSize === '3x3' ? '3x3' : '5x5';
    const keyword = body.keyword || 'local service';
    const targetProfile = body.targetProfile || {
      name: body.businessName || "Target Business",
      rating: body.rating || 4.7,
      reviewCount: body.reviewCount || 150,
      primaryCategory: body.primaryCategory || 'Service'
    };

    const result = geoGridEngine.simulateRankings(center, {
      gridSize,
      radiusKm,
      keyword,
      targetProfile
    });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Geo-grid calculation failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
