import { gbpAuditEngine } from '@/lib/audit/audit-engine';
import { DEMO_PROFILES } from '@/lib/audit/demo-data';
import { GBPProfile } from '@/types/audit';

function resolveProfileFromInput(queryStr: string, placeIdStr?: string): GBPProfile {
  const q = (queryStr || '').toLowerCase().trim();
  const pid = (placeIdStr || '').trim();

  // Check demo profiles by placeId or key phrases
  if (pid) {
    for (const demo of Object.values(DEMO_PROFILES)) {
      if (demo.profile.placeId === pid) {
        return demo.profile;
      }
    }
  }

  if (q.includes('locksmith') || q.includes('mike')) {
    return DEMO_PROFILES.mikes_locksmith.profile;
  }
  if (q.includes('dent') || q.includes('apex') || q.includes('teeth')) {
    return DEMO_PROFILES.apex_dental.profile;
  }
  if (q.includes('pizza') || q.includes('bella') || q.includes('napoli') || q.includes('italian')) {
    return DEMO_PROFILES.bella_napoli.profile;
  }
  if (q.includes('hvac') || q.includes('protech') || q.includes('air conditioning') || q.includes('heating')) {
    return DEMO_PROFILES.protech_hvac.profile;
  }

  // Default fallback or dynamic generation based on query
  const cleanName = queryStr ? queryStr.replace(/^https?:\/\/[^/]+/i, '').replace(/[/_+-]+/g, ' ').trim() : "Mike's 24/7 Locksmith & Security";
  const name = cleanName.length > 2 ? cleanName : "Mike's 24/7 Locksmith & Security";

  // Infer category from name
  let primaryCategory = 'Local Service';
  let secondaryCategories = ['Customer Service', 'Emergency Service'];

  if (/plumb/i.test(name)) {
    primaryCategory = 'Plumber';
    secondaryCategories = ['Drainage service', 'Heating contractor'];
  } else if (/electric/i.test(name)) {
    primaryCategory = 'Electrician';
    secondaryCategories = ['Electrical installation service', 'Lighting contractor'];
  } else if (/roof/i.test(name)) {
    primaryCategory = 'Roofing contractor';
    secondaryCategories = ['Gutter cleaning service', 'Siding contractor'];
  } else if (/auto|car|mechanic/i.test(name)) {
    primaryCategory = 'Auto repair shop';
    secondaryCategories = ['Brake shop', 'Oil change service'];
  } else if (/salon|barber|hair/i.test(name)) {
    primaryCategory = 'Hair salon';
    secondaryCategories = ['Beauty salon', 'Nail salon'];
  } else if (/law|attorney|legal/i.test(name)) {
    primaryCategory = 'Personal injury attorney';
    secondaryCategories = ['Law firm', 'Trial attorney'];
  }

  return {
    name,
    placeId: pid || `place_custom_${Date.now()}`,
    cid: '8492049284019284012',
    address: {
      formattedAddress: '789 Commercial Blvd, Suite 200, Metro Area, United States',
      streetNumber: '789',
      route: 'Commercial Blvd',
      city: 'Metro City',
      state: 'IL',
      postalCode: '60601',
      country: 'US'
    },
    phone: '+1 (555) 012-3456',
    website: 'https://examplebusiness.com',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    primaryCategory,
    secondaryCategories,
    rating: 4.6,
    reviewCount: 95,
    businessHours: {
      status: 'OPERATIONAL',
      openNow: true,
      weeklySchedule: [
        { day: 'Monday', open: '08:00', close: '18:00' },
        { day: 'Tuesday', open: '08:00', close: '18:00' },
        { day: 'Wednesday', open: '08:00', close: '18:00' },
        { day: 'Thursday', open: '08:00', close: '18:00' },
        { day: 'Friday', open: '08:00', close: '18:00' },
        { day: 'Saturday', open: '09:00', close: '15:00' },
        { day: 'Sunday', open: '00:00', close: '00:00', isClosed: true }
      ]
    },
    attributes: {
      accessibility: ['Wheelchair accessible entrance'],
      payment: ['Credit cards', 'Debit cards'],
      serviceOptions: ['On-site services']
    },
    photosCount: {
      total: 35,
      owner: 25,
      customer: 10,
      logoPresent: true,
      coverPresent: true
    },
    posts: {
      count: 4,
      lastPostDate: new Date(Date.now() - 25 * 86400000).toISOString(),
      averageFrequencyDays: 28,
      lastPostType: 'UPDATE'
    },
    productsCount: 4,
    verified: true,
    description: `${name} is a trusted provider of high quality ${primaryCategory.toLowerCase()} services. Dedicated to rapid response times, transparent pricing, and complete customer satisfaction across the greater metropolitan region.`,
    placeUrl: 'https://maps.google.com/?cid=8492049284019284012'
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || searchParams.get('q') || '';
    const placeId = searchParams.get('placeId') || searchParams.get('place_id') || undefined;
    const url = searchParams.get('url') || undefined;
    const gridSize = (searchParams.get('gridSize') as '3x3' | '5x5') || '5x5';
    const radiusKm = parseFloat(searchParams.get('radiusKm') || '5');
    const keyword = searchParams.get('keyword') || undefined;

    const input = query || url || placeId || "Mike's 24/7 Locksmith & Security";
    const profile = resolveProfileFromInput(input, placeId);

    const report = gbpAuditEngine.performAudit(profile, {
      gridSize,
      radiusKm: isNaN(radiusKm) ? 5 : radiusKm,
      keyword: keyword || profile.primaryCategory
    });

    return new Response(JSON.stringify({ success: true, data: report }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Audit execution failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const query = body.query || body.q || '';
    const placeId = body.placeId || body.place_id || undefined;
    const url = body.url || undefined;
    const gridSize = body.gridSize || '5x5';
    const radiusKm = body.radiusKm || 5;
    const keyword = body.keyword || undefined;
    const customProfile: GBPProfile | undefined = body.customProfile;

    const profile = customProfile || resolveProfileFromInput(query || url || placeId || '', placeId);

    const report = gbpAuditEngine.performAudit(profile, {
      gridSize,
      radiusKm: Number(radiusKm) || 5,
      keyword: keyword || profile.primaryCategory
    });

    return new Response(JSON.stringify({ success: true, data: report }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Audit execution failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
