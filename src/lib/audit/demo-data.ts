import { GBPProfile, ReviewItem } from '@/types/audit';

export interface DemoEntry {
  profile: GBPProfile;
  sampleReviews: ReviewItem[];
}

export const DEMO_PROFILES: Record<string, DemoEntry> = {
  mikes_locksmith: {
    profile: {
      name: "Mike's 24/7 Locksmith & Security",
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      cid: '1249827491823749182',
      address: {
        formattedAddress: '456 N Michigan Ave, Chicago, IL 60611, United States',
        streetNumber: '456',
        route: 'N Michigan Ave',
        city: 'Chicago',
        state: 'IL',
        postalCode: '60611',
        country: 'US'
      },
      phone: '+1 (312) 555-0149',
      website: 'https://mikeslocksmithchicago.com',
      coordinates: { lat: 41.8904, lng: -87.6241 },
      primaryCategory: 'Locksmith',
      secondaryCategories: ['Key duplication service', 'Safe & vault shop'],
      rating: 4.8,
      reviewCount: 184,
      businessHours: {
        status: 'OPERATIONAL',
        openNow: true,
        weeklySchedule: [
          { day: 'Monday', open: '00:00', close: '23:59' },
          { day: 'Tuesday', open: '00:00', close: '23:59' },
          { day: 'Wednesday', open: '00:00', close: '23:59' },
          { day: 'Thursday', open: '00:00', close: '23:59' },
          { day: 'Friday', open: '00:00', close: '23:59' },
          { day: 'Saturday', open: '00:00', close: '23:59' },
          { day: 'Sunday', open: '00:00', close: '23:59' }
        ]
      },
      attributes: {
        accessibility: ['Wheelchair accessible entrance', 'Wheelchair accessible parking lot'],
        payment: ['Credit cards', 'Debit cards', 'NFC mobile payments', 'Cash'],
        offerings: ['Emergency lockouts', 'Commercial rekeying', 'Car key fob programming', 'Smart lock installation'],
        serviceOptions: ['On-site services', 'Online estimates']
      },
      photosCount: {
        total: 68,
        owner: 42,
        customer: 26,
        logoPresent: true,
        coverPresent: true,
        interiorCount: 14,
        exteriorCount: 18,
        teamCount: 10
      },
      posts: {
        count: 12,
        lastPostDate: '2026-08-25T14:30:00Z',
        averageFrequencyDays: 14,
        lastPostType: 'UPDATE',
        activeOffer: false
      },
      productsCount: 15,
      verified: true,
      description: "Mike's 24/7 Locksmith & Security provides premier commercial, residential, and automotive locksmith services across Chicago and Cook County. Certified technicians specialized in emergency lockouts, deadbolt installation, high-security master keys, and smart lock integration. Call (312) 555-0149 for immediate 15-minute emergency dispatch.",
      serviceArea: ['Chicago', 'Evanston', 'Oak Park', 'Cicero', 'Skokie'],
      placeUrl: 'https://maps.google.com/?cid=1249827491823749182',
      openingDate: '2016-04-12'
    },
    sampleReviews: [
      {
        id: 'rev_ml_1',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '2026-08-30T10:15:00Z',
        text: 'Locked out of my apartment late Sunday evening. Mike arrived within 20 minutes, provided fast service, and had my deadbolt opened without a scratch. Fair pricing and transparent quote up front!',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Thank you Sarah! Glad our team could get you safely back inside quickly.',
        ownerResponseDate: '2026-08-30T16:00:00Z',
        extractedKeywords: ['fast service', 'fair pricing']
      },
      {
        id: 'rev_ml_2',
        author: 'David Rodriguez',
        rating: 5,
        date: '2026-08-22T17:40:00Z',
        text: 'Very professional service. Upgraded our office entry to digital keypads. The technician was on time and explained how to program user codes thoroughly.',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'David, thanks for trusting us with your office security setup!',
        ownerResponseDate: '2026-08-23T09:00:00Z',
        extractedKeywords: ['professional service', 'on time']
      },
      {
        id: 'rev_ml_3',
        author: 'Marcus Vance',
        rating: 1,
        date: '2026-08-18T21:10:00Z',
        text: 'Technician took over an hour to arrive for an emergency lockout and charged extra for high-security key cutting that was not disclosed beforehand.',
        sentiment: 'negative',
        hasOwnerResponse: false,
        extractedKeywords: ['expensive / overpriced'],
        urgentActionNeeded: true
      },
      {
        id: 'rev_ml_4',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-08-05T12:00:00Z',
        text: 'Great communication and friendly staff. Cut new transponder keys for my Honda in under 15 minutes. Half the price of the dealership!',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Thank you Elena! Dealerships always charge too much for key fobs.',
        ownerResponseDate: '2026-08-06T11:00:00Z',
        extractedKeywords: ['friendly staff', 'fast service']
      },
      {
        id: 'rev_ml_5',
        author: 'Brian Kowalski',
        rating: 3,
        date: '2026-07-28T14:20:00Z',
        text: 'Work was solid, but technician arrived 35 minutes later than promised window. Good price though.',
        sentiment: 'neutral',
        hasOwnerResponse: false,
        extractedKeywords: ['fair pricing']
      }
    ]
  },

  apex_dental: {
    profile: {
      name: 'Apex Dental Care & Implant Center',
      placeId: 'ChIJd_b5T6W1RIYRO5U0r487v_U',
      cid: '9847120938472918234',
      address: {
        formattedAddress: '3200 S Congress Ave, Austin, TX 78704, United States',
        streetNumber: '3200',
        route: 'S Congress Ave',
        city: 'Austin',
        state: 'TX',
        postalCode: '78704',
        country: 'US'
      },
      phone: '+1 (512) 555-0182',
      website: 'https://apexdentalcareatx.com',
      coordinates: { lat: 30.2335, lng: -97.7612 },
      primaryCategory: 'Dentist',
      secondaryCategories: ['Cosmetic dentist', 'Dental clinic', 'Teeth whitening service'],
      rating: 4.9,
      reviewCount: 342,
      businessHours: {
        status: 'OPERATIONAL',
        openNow: true,
        weeklySchedule: [
          { day: 'Monday', open: '08:00', close: '17:00' },
          { day: 'Tuesday', open: '08:00', close: '17:00' },
          { day: 'Wednesday', open: '08:00', close: '17:00' },
          { day: 'Thursday', open: '08:00', close: '17:00' },
          { day: 'Friday', open: '08:00', close: '14:00' },
          { day: 'Saturday', open: '09:00', close: '13:00' },
          { day: 'Sunday', open: '00:00', close: '00:00', isClosed: true }
        ]
      },
      attributes: {
        accessibility: ['Wheelchair accessible entrance', 'Wheelchair accessible restroom', 'Wheelchair accessible seating'],
        amenities: ['Gender-neutral restroom', 'Free Wi-Fi', 'Complimentary beverages'],
        payment: ['Credit cards', 'CareCredit', 'Dental insurance accepted'],
        planning: ['Appointment required', 'Accepts new patients']
      },
      photosCount: {
        total: 124,
        owner: 86,
        customer: 38,
        logoPresent: true,
        coverPresent: true,
        interiorCount: 35,
        exteriorCount: 15,
        teamCount: 36
      },
      posts: {
        count: 28,
        lastPostDate: '2026-09-02T11:00:00Z',
        averageFrequencyDays: 7,
        lastPostType: 'OFFER',
        activeOffer: true
      },
      productsCount: 8,
      verified: true,
      description: "Apex Dental Care & Implant Center is Austin's top-rated comprehensive dental practice. Led by Dr. Christopher Sterling, our clinic specializes in general dentistry, porcelain veneers, dental implants, Invisalign, and gentle teeth whitening. Modern high-tech facility featuring sedation dentistry and digital 3D scans. Schedule your consultation online or call (512) 555-0182.",
      placeUrl: 'https://maps.google.com/?cid=9847120938472918234',
      openingDate: '2018-09-15'
    },
    sampleReviews: [
      {
        id: 'rev_ad_1',
        author: 'Jessica Miller',
        rating: 5,
        date: '2026-09-04T15:20:00Z',
        text: 'The friendliest staff and cleanest dental clinic I have ever visited! Dr. Sterling made my crown replacement completely painless. Highly recommend Apex Dental!',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Jessica, thank you so much! We are thrilled your visit was painless and comfortable.',
        ownerResponseDate: '2026-09-05T09:12:00Z',
        extractedKeywords: ['friendly staff', 'clean environment', 'high quality work']
      },
      {
        id: 'rev_ad_2',
        author: 'Robert Sterling',
        rating: 5,
        date: '2026-08-27T11:45:00Z',
        text: 'Had an emergency dental issue with a cracked molar. They got me in within 2 hours. Fast service, gentle care, and clear pricing upfront.',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Robert, so glad we could relieve your pain quickly. Thank you for your review!',
        ownerResponseDate: '2026-08-27T17:30:00Z',
        extractedKeywords: ['fast service', 'emergency availability', 'fair pricing']
      },
      {
        id: 'rev_ad_3',
        author: 'Amanda Collins',
        rating: 2,
        date: '2026-08-14T09:30:00Z',
        text: 'Doctor was wonderful, but billing department charged my credit card twice for my copay and took 3 weeks to refund.',
        sentiment: 'negative',
        hasOwnerResponse: false,
        extractedKeywords: ['expensive / overpriced'],
        urgentActionNeeded: true
      }
    ]
  },

  bella_napoli: {
    profile: {
      name: 'Bella Napoli Wood-Fired Pizzeria & Trattoria',
      placeId: 'ChIJh8L62d1ZwokR6m373a9N48g',
      cid: '3819482918471928374',
      address: {
        formattedAddress: '142 Bleecker St, New York, NY 10012, United States',
        streetNumber: '142',
        route: 'Bleecker St',
        city: 'New York',
        state: 'NY',
        postalCode: '10012',
        country: 'US'
      },
      phone: '+1 (212) 555-0193',
      website: 'https://bellanapolinewyork.com',
      coordinates: { lat: 40.7291, lng: -73.9998 },
      primaryCategory: 'Pizza restaurant',
      secondaryCategories: ['Italian restaurant', 'Pizza delivery', 'Catering food and drink supplier'],
      rating: 4.7,
      reviewCount: 685,
      businessHours: {
        status: 'OPERATIONAL',
        openNow: true,
        weeklySchedule: [
          { day: 'Monday', open: '11:30', close: '23:00' },
          { day: 'Tuesday', open: '11:30', close: '23:00' },
          { day: 'Wednesday', open: '11:30', close: '23:00' },
          { day: 'Thursday', open: '11:30', close: '23:30' },
          { day: 'Friday', open: '11:30', close: '00:30' },
          { day: 'Saturday', open: '11:30', close: '00:30' },
          { day: 'Sunday', open: '12:00', close: '22:30' }
        ]
      },
      attributes: {
        diningOptions: ['Dine-in', 'Takeout', 'No-contact delivery', 'Outdoor seating'],
        highlights: ['Fast service', 'Wood-fired crust', 'Vegan options', 'Organic ingredients'],
        atmosphere: ['Cozy', 'Romantic', 'Casual'],
        payment: ['Credit cards', 'Debit cards', 'Apple Pay']
      },
      photosCount: {
        total: 310,
        owner: 110,
        customer: 200,
        logoPresent: true,
        coverPresent: true
      },
      posts: {
        count: 45,
        lastPostDate: '2026-09-04T16:00:00Z',
        averageFrequencyDays: 5,
        lastPostType: 'OFFER',
        activeOffer: true
      },
      productsCount: 32,
      verified: true,
      description: "Authentic Neapolitan wood-fired pizza in Greenwich Village. Handcrafted sourdough fermented for 48 hours, San Marzano tomatoes, and fresh buffalo mozzarella baked at 900 degrees. Enjoy fresh handmade pasta, fine Italian wines, and artisan gelato. Reserve your table or order online for fast delivery.",
      placeUrl: 'https://maps.google.com/?cid=3819482918471928374',
      openingDate: '2014-06-01'
    },
    sampleReviews: [
      {
        id: 'rev_bn_1',
        author: 'Marco DiStefano',
        rating: 5,
        date: '2026-09-06T20:10:00Z',
        text: 'Hands down the most authentic Margherita pizza in NYC. The crust is light and airy, sauce is sweet and tangy. Fast service despite a packed Saturday night!',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Grazie mille Marco! Our pizzaiolo appreciates the kind words.',
        ownerResponseDate: '2026-09-07T10:00:00Z',
        extractedKeywords: ['fast service', 'high quality work']
      },
      {
        id: 'rev_bn_2',
        author: 'Chloe Simmons',
        rating: 4,
        date: '2026-08-31T19:30:00Z',
        text: 'Incredible truffle pizza and great Italian wine selection. It gets quite noisy during dinner rush, but food makes up for it.',
        sentiment: 'positive',
        hasOwnerResponse: false,
        extractedKeywords: ['high quality work']
      }
    ]
  },

  protech_hvac: {
    profile: {
      name: 'ProTech HVAC & Air Quality Services',
      placeId: 'ChIJz9_5vG7v9YgRo837x8P21Q0',
      cid: '7291840294827182930',
      address: {
        formattedAddress: '1850 Piedmont Ave NE, Atlanta, GA 30324, United States',
        streetNumber: '1850',
        route: 'Piedmont Ave NE',
        city: 'Atlanta',
        state: 'GA',
        postalCode: '30324',
        country: 'US'
      },
      phone: '+1 (404) 555-0177',
      website: 'https://protechheatingandcoolingatl.com',
      coordinates: { lat: 33.7998, lng: -84.3685 },
      primaryCategory: 'HVAC contractor',
      secondaryCategories: ['Air conditioning repair service', 'Heating contractor'],
      rating: 4.6,
      reviewCount: 215,
      businessHours: {
        status: 'OPERATIONAL',
        openNow: true,
        weeklySchedule: [
          { day: 'Monday', open: '07:00', close: '20:00' },
          { day: 'Tuesday', open: '07:00', close: '20:00' },
          { day: 'Wednesday', open: '07:00', close: '20:00' },
          { day: 'Thursday', open: '07:00', close: '20:00' },
          { day: 'Friday', open: '07:00', close: '20:00' },
          { day: 'Saturday', open: '08:00', close: '18:00' },
          { day: 'Sunday', open: '09:00', close: '16:00' }
        ]
      },
      attributes: {
        serviceOptions: ['On-site services', 'Online estimates'],
        planning: ['Appointment required', 'Emergency appointments'],
        payment: ['Financing available', 'Credit cards', 'Check']
      },
      photosCount: {
        total: 54,
        owner: 38,
        customer: 16,
        logoPresent: true,
        coverPresent: false,
        interiorCount: 12,
        exteriorCount: 20
      },
      posts: {
        count: 6,
        lastPostDate: '2026-07-15T10:00:00Z', // Old post > 45 days
        averageFrequencyDays: 35,
        lastPostType: 'UPDATE'
      },
      productsCount: 12,
      verified: true,
      description: "ProTech HVAC provides licensed heating and air conditioning repair, heat pump maintenance, and indoor air purification across Greater Atlanta. Rapid 24/7 emergency response and upfront flat-rate pricing on all Trane, Carrier, and Lennox HVAC systems.",
      placeUrl: 'https://maps.google.com/?cid=7291840294827182930',
      openingDate: '2017-03-20'
    },
    sampleReviews: [
      {
        id: 'rev_pt_1',
        author: 'Daniel Craig',
        rating: 5,
        date: '2026-08-29T14:10:00Z',
        text: 'AC died in 95 degree Atlanta heat. ProTech sent technician Marcus out within 90 minutes. He diagnosed a bad capacitor, had the part on his van, and fixed it fast. Honest and fair pricing.',
        sentiment: 'positive',
        hasOwnerResponse: true,
        ownerResponseText: 'Daniel, staying cool in Atlanta summers is vital! Glad Marcus took care of you.',
        ownerResponseDate: '2026-08-30T08:30:00Z',
        extractedKeywords: ['fast service', 'fair pricing', 'emergency availability']
      },
      {
        id: 'rev_pt_2',
        author: 'Patricia Harris',
        rating: 2,
        date: '2026-08-11T16:20:00Z',
        text: 'They missed the morning appointment window by three hours and never called to warn me.',
        sentiment: 'negative',
        hasOwnerResponse: false,
        extractedKeywords: ['poor communication'],
        urgentActionNeeded: true
      }
    ]
  }
};
