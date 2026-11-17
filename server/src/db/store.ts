import { ESWATINI_CATEGORIES, CategoryItem } from "../data/categories";
import { INITIAL_FINANCIAL_NODES, FinancialNodeItem } from "../data/financialNodes";

export interface ProviderReview {
  id: string;
  providerId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  serviceRendered?: string;
  verifiedClient: boolean;
}

export interface Provider {
  id: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  tier: "INFORMAL_UNVERIFIED" | "TIER1_ID_VERIFIED" | "TIER2_BUSINESS_VERIFIED";
  nationalIdNumber?: string;
  taxPin?: string;
  town: string; // "Mbabane"
  neighborhood: string; // e.g. "Msunduza", "Swazi Plaza", "Bus Rank", "Sheffield Road", "Eveni", "Sidwashini"
  exactLocation: string; // e.g. "Container 8, Bus Rank" or "Mobile / Travel to Client"
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  categoryIds: string[];
  servicesOffered: string[]; // Granular offerings: e.g. ["Knotless Braids", "Cornrows", "Wig Wash"]
  startingPriceSzl?: number;
  completedJobsCount: number; // System-tracked jobs completed (determines trust level!)
  rating: number; // Average 1.0 - 5.0
  reviewsCount: number;
  isAvailable: boolean;
  bio: string;
  createdAt: string;
}

export interface CustomerRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  budgetSzl: number;
  town: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  deliveryNeeded: boolean;
  biddingWindowHours: number;
  status: "OPEN" | "UNDER_REVIEW" | "AWARDED" | "EXPIRED" | "CANCELLED";
  expiresAt: string;
  createdAt: string;
  selectedBidId?: string;
}

export interface BidOffer {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerBusiness: string;
  providerPhone: string;
  providerTier: string;
  priceSzl: number;
  deliveryFeeSzl: number;
  estimatedHours: number;
  notes: string;
  status: "SUBMITTED" | "ACCEPTED" | "REJECTED" | "WITHDRAWN";
  createdAt: string;
}

export interface EieAnalyticsEvent {
  id: string;
  eventType: "REQUEST_CREATED" | "BID_SUBMITTED" | "OFFER_ACCEPTED" | "NODE_REPORTED" | "REVIEW_POSTED";
  categoryId: string;
  categoryName: string;
  town: string;
  amountSzl?: number;
  timestamp: string;
}

// In-Memory Data Store (Optimized for Hyper-Local Mbabane Services)
class MbabaneDataStore {
  private categories: CategoryItem[] = [...ESWATINI_CATEGORIES];
  private financialNodes: FinancialNodeItem[] = [...INITIAL_FINANCIAL_NODES];

  private reviews: ProviderReview[] = [
    {
      id: "rev-01",
      providerId: "mb-prov-01",
      userName: "Nelsiwe M.",
      rating: 5,
      comment: "Zodwa did my knotless braids in Eveni at my house. Extremely neat, painless, and took exactly 3 hours! Highly recommend her.",
      date: "2026-11-14",
      serviceRendered: "Medium Knotless Braids",
      verifiedClient: true
    },
    {
      id: "rev-02",
      providerId: "mb-prov-01",
      userName: "Siphesihle K.",
      rating: 5,
      comment: "Best self-employed hairstylist in Mbabane. Very professional and friendly.",
      date: "2026-11-10",
      serviceRendered: "Twists & Wash",
      verifiedClient: true
    },
    {
      id: "rev-03",
      providerId: "mb-prov-02",
      userName: "Themba D.",
      rating: 5,
      comment: "Best chicken dust in Mbabane Bus Rank. Portions are huge, pap is fresh and the tomato-onion slaai is top tier.",
      date: "2026-11-16",
      serviceRendered: "Full Quarter Leg & Pap",
      verifiedClient: true
    },
    {
      id: "rev-04",
      providerId: "mb-prov-03",
      userName: "Nontobeko Z.",
      rating: 5,
      comment: "Lindiwe did my ombre acrylic nails at Container 8. They lasted 4 weeks without lifting! Will be returning.",
      date: "2026-11-12",
      serviceRendered: "Ombre Acrylic Full Set",
      verifiedClient: true
    },
    {
      id: "rev-05",
      providerId: "mb-prov-04",
      userName: "Melusi G.",
      rating: 4,
      comment: "Fast colour photocopy and passport photos for passport renewal. Very reasonable prices in Sheffield Road.",
      date: "2026-11-15",
      serviceRendered: "Passport Photos & Document Binding",
      verifiedClient: true
    },
    {
      id: "rev-06",
      providerId: "mb-prov-06",
      userName: "Bongani S.",
      rating: 5,
      comment: "Fixed my burst pipe in Fonteyn on a Sunday evening within 45 minutes. Lifesaver!",
      date: "2026-11-08",
      serviceRendered: "Emergency Geyser Pipe Repair",
      verifiedClient: true
    }
  ];

  // Highly Detailed Mbabane Providers (Self-hired micro-vendors, stalls, and vital facilities)
  private providers: Provider[] = [
    // 1. Self-hired Hairstylist
    {
      id: "mb-prov-01",
      fullName: "Zodwa Khumalo",
      businessName: "Zodwa Knotless Braids & Natural Hair",
      phoneNumber: "26876345678",
      tier: "TIER1_ID_VERIFIED",
      nationalIdNumber: "9408151234081",
      town: "Mbabane",
      neighborhood: "Msunduza",
      exactLocation: "Msunduza (Near Market) & Mobile home visits across Eveni / Woodlands",
      latitude: -26.3210,
      longitude: 31.1480,
      serviceRadiusKm: 12,
      categoryIds: ["hair-styling-braids"],
      servicesOffered: [
        "Knotless Braids (All sizes)",
        "Passion Twists",
        "Cornrows & Straight Back",
        "Wig Installation & Customizing",
        "Dreadlock Retwist & Wash",
        "Home Calls / House Visits"
      ],
      startingPriceSzl: 150,
      completedJobsCount: 42,
      rating: 5.0,
      reviewsCount: 2,
      isAvailable: true,
      bio: "Self-hired passionate hairstylist with 6+ years experience. I travel to clients around Mbabane or you can visit my clean home studio in Msunduza.",
      createdAt: "2026-10-01T08:00:00Z"
    },

    // 2. Self-hired Food Stall / Chicken Dust
    {
      id: "mb-prov-02",
      fullName: "Make Gogo Dlamini",
      businessName: "Gogo Dlamini's Authentic Chicken Dust & Pap",
      phoneNumber: "26878129876",
      tier: "INFORMAL_UNVERIFIED",
      town: "Mbabane",
      neighborhood: "Bus Rank & Market",
      exactLocation: "Stall 14, Mbabane Central Bus Rank Market",
      latitude: -26.3290,
      longitude: 31.1460,
      serviceRadiusKm: 4,
      categoryIds: ["food-stalls-street-braai"],
      servicesOffered: [
        "Flame-Grilled Chicken Dust (Quarter & Half)",
        "Hot Pap (Lipaleshi) & Chakalaka",
        "Beef Stew & Beef Braai Plates",
        "Fresh Magwinya (Fat Cakes) - Mornings",
        "Office Lunch Delivery (Mbabane CBD & Plaza)"
      ],
      startingPriceSzl: 35,
      completedJobsCount: 128,
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      bio: "Mbabane Bus Rank's favourite flame-roasted braai chicken, served with steaming pap, coleslaw, and homemade gravy.",
      createdAt: "2026-09-15T09:00:00Z"
    },

    // 3. Self-hired Nail Tech
    {
      id: "mb-prov-03",
      fullName: "Lindiwe Mthethwa",
      businessName: "Lindiwe Glam Nails & Lashes",
      phoneNumber: "26879887766",
      tier: "TIER1_ID_VERIFIED",
      nationalIdNumber: "9802047890123",
      town: "Mbabane",
      neighborhood: "Bus Rank & Market",
      exactLocation: "Container 8 (Pink door), Top of Bus Rank Walkway",
      latitude: -26.3285,
      longitude: 31.1455,
      serviceRadiusKm: 6,
      categoryIds: ["nail-tech-services"],
      servicesOffered: [
        "Acrylic Full Set & Tips",
        "Gel Overlay & French Tips",
        "Custom Nail Art & Charms",
        "Express Manicure & Pedicure",
        "Individual Eyelash Extensions"
      ],
      startingPriceSzl: 120,
      completedJobsCount: 38,
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      bio: "Certified independent nail artist creating durable, trendy acrylic and gel sets in central Mbabane.",
      createdAt: "2026-10-10T10:00:00Z"
    },

    // 4. Printing & Stationery Shop
    {
      id: "mb-prov-04",
      fullName: "Simphiwe Ginindza",
      businessName: "Sheffield QuickPrint & Passport Photo Studio",
      phoneNumber: "26876001122",
      tier: "TIER2_BUSINESS_VERIFIED",
      taxPin: "TIN-89312-SZ",
      town: "Mbabane",
      neighborhood: "Sheffield Road",
      exactLocation: "Building 4, Sheffield Road Industrial Sites (Opposite Eswatini Post)",
      latitude: -26.3235,
      longitude: 31.1390,
      serviceRadiusKm: 15,
      categoryIds: ["printing-copying-internet"],
      servicesOffered: [
        "Instant Official Passport Photos (4 copies)",
        "High-Speed Colour & Black/White Photocopying",
        "Document Spiral Binding & Laminating",
        "CV Typing, Printing & PDF Scanning",
        "Graphic Design & Flyers Printing"
      ],
      startingPriceSzl: 5,
      completedJobsCount: 85,
      rating: 4.8,
      reviewsCount: 1,
      isAvailable: true,
      bio: "One-stop digital printing, copying, and official passport photo hub on Sheffield Road.",
      createdAt: "2026-08-20T08:30:00Z"
    },

    // 5. Fueling Station & 24h Express
    {
      id: "mb-prov-05",
      fullName: "Mbabane Energy Ltd",
      businessName: "TotalEnergies Mbabane By-Pass Express",
      phoneNumber: "26824043120",
      tier: "TIER2_BUSINESS_VERIFIED",
      town: "Mbabane",
      neighborhood: "Checkers",
      exactLocation: "Mbabane By-Pass Highway (Near Checkers intersection)",
      latitude: -26.3310,
      longitude: 31.1370,
      serviceRadiusKm: 25,
      categoryIds: ["fueling-stations"],
      servicesOffered: [
        "24-Hour Unleaded Petrol & 50ppm Low-Sulphur Diesel",
        "Bonjour Convenience 24h Express Shop",
        "Digital Tyre Air Inflation & Water",
        "Engine Oil Check & Battery Jumpstart",
        "MoMo & CashPlus Payment Accepted"
      ],
      startingPriceSzl: 50,
      completedJobsCount: 310,
      rating: 4.9,
      reviewsCount: 0,
      isAvailable: true,
      bio: "24/7 multi-service service station with clean restrooms, ATM access, and quick snacks on the Mbabane By-Pass.",
      createdAt: "2026-01-01T00:00:00Z"
    },

    // 6. Plumber / Appliance & Handyman
    {
      id: "mb-prov-06",
      fullName: "Muzi Sithole",
      businessName: "Muzi Emergency Plumbing & Appliance Fix",
      phoneNumber: "26876554433",
      tier: "TIER1_ID_VERIFIED",
      nationalIdNumber: "8805123456789",
      town: "Mbabane",
      neighborhood: "Fonteyn",
      exactLocation: "Fonteyn (Covering Eveni, Woodlands, CBD, Mahwalala)",
      latitude: -26.3180,
      longitude: 31.1550,
      serviceRadiusKm: 20,
      categoryIds: ["plumbers-electricians-handyman"],
      servicesOffered: [
        "Emergency Burst Pipes & Geyser Leaks",
        "JoJo Water Tank & Booster Pump Installation",
        "Microwave, Kettle & Electric Stove Repairs",
        "Unblocking Toilets & Drains",
        "Bathroom & Kitchen Tap Fittings"
      ],
      startingPriceSzl: 200,
      completedJobsCount: 56,
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      bio: "Experienced Mbabane plumber and small home appliance repairman. 24/7 callouts for burst pipes and water emergencies.",
      createdAt: "2026-09-01T08:00:00Z"
    },

    // 7. Hospital / Medical Facility
    {
      id: "mb-prov-07",
      fullName: "Ministry of Health Eswatini",
      businessName: "Mbabane Government Hospital",
      phoneNumber: "26824042111",
      tier: "TIER2_BUSINESS_VERIFIED",
      town: "Mbabane",
      neighborhood: "Mbabane CBD",
      exactLocation: "Mhlambanyatsi Road, Mbabane Central",
      latitude: -26.3325,
      longitude: 31.1448,
      serviceRadiusKm: 50,
      categoryIds: ["hospitals-clinics-pharmacy"],
      servicesOffered: [
        "24/7 Emergency & Trauma Casualty Unit",
        "Outpatient Consultation (OPD)",
        "Maternity & Child Health Clinic",
        "Government Dispensary & Pharmacy",
        "Laboratory Testing & X-Ray Radiology"
      ],
      startingPriceSzl: 10,
      completedJobsCount: 1200,
      rating: 4.2,
      reviewsCount: 0,
      isAvailable: true,
      bio: "The premier national referral hospital in Eswatini offering 24-hour trauma, surgery, maternity, and outpatient medical services.",
      createdAt: "2026-01-01T00:00:00Z"
    },

    // 8. Roadside Mechanic & Tyres
    {
      id: "mb-prov-08",
      fullName: "Sipho Dlamini",
      businessName: "Sipho Roadside Mechanics & Tyre Puncture Bay",
      phoneNumber: "26876123456",
      tier: "TIER1_ID_VERIFIED",
      nationalIdNumber: "9201018901234",
      town: "Mbabane",
      neighborhood: "Sheffield Road",
      exactLocation: "Corner of Sheffield Rd & Industrial bypass (near Malagwane)",
      latitude: -26.3260,
      longitude: 31.1380,
      serviceRadiusKm: 25,
      categoryIds: ["mechanics-tyres-puncture"],
      servicesOffered: [
        "Mobile Roadside Assistance (Malagwane & MR3)",
        "Puncture Plug & Tube Vulcanizing",
        "12V Battery Testing & Charging",
        "Brake Pad Replacements & Clutch Adjustments",
        "Starter Motor & Alternator Diagnostics"
      ],
      startingPriceSzl: 80,
      completedJobsCount: 74,
      rating: 4.9,
      reviewsCount: 0,
      isAvailable: true,
      bio: "Fast, reliable on-site mechanical troubleshooting and 24-hour roadside tyre repair anywhere around Mbabane.",
      createdAt: "2026-07-10T08:00:00Z"
    },

    // 9. Traditional Attire & Seamstress
    {
      id: "mb-prov-09",
      fullName: "Make Shongwe",
      businessName: "Make Shongwe Traditional Attire & Alterations",
      phoneNumber: "26878443322",
      tier: "INFORMAL_UNVERIFIED",
      town: "Mbabane",
      neighborhood: "Bus Rank & Market",
      exactLocation: "Mbabane Craft Market Stall 29",
      latitude: -26.3292,
      longitude: 31.1458,
      serviceRadiusKm: 10,
      categoryIds: ["tailoring-traditional-attire"],
      servicesOffered: [
        "Traditional Emahiya Tailoring & Pinning",
        "Custom Sidvwaba (Cowhide Skirt) Conditioning",
        "Incwancwa & Cultural Beadwork",
        "School Uniform Hemming & Resizing",
        "Zip Replacements & Trouser Shortening"
      ],
      startingPriceSzl: 40,
      completedJobsCount: 63,
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true,
      bio: "Handmade authentic Swazi cultural attire, regalia, and fast wardrobe alterations located in the heart of Mbabane Market.",
      createdAt: "2026-08-14T09:00:00Z"
    },

    // 10. Car Wash & Mobile Valet
    {
      id: "mb-prov-10",
      fullName: "Khulekani Nxumalo",
      businessName: "Checkers Eco Car Wash & Interior Shampoo",
      phoneNumber: "26879119988",
      tier: "INFORMAL_UNVERIFIED",
      town: "Mbabane",
      neighborhood: "Checkers",
      exactLocation: "Checkers Complex Lower Parking, Mbabane",
      latitude: -26.3315,
      longitude: 31.1385,
      serviceRadiusKm: 8,
      categoryIds: ["car-wash-valet"],
      servicesOffered: [
        "Exterior Foam Wash & High-Pressure Rinse",
        "Full Interior Vacuum & Dashboard Shine",
        "Seat Shampoo & Stain Extraction",
        "Engine Bay Steam Cleaning",
        "Mobile Driveway Wash (Eveni / Woodlands)"
      ],
      startingPriceSzl: 60,
      completedJobsCount: 110,
      rating: 4.8,
      reviewsCount: 0,
      isAvailable: true,
      bio: "Sparkling hand-wash and deep upholstery shampoo while you shop or relax at home.",
      createdAt: "2026-06-01T07:30:00Z"
    }
  ];

  // Active Requests in Mbabane for Reverse Auction
  private requests: CustomerRequest[] = [
    {
      id: "req-mb-01",
      customerId: "cust-01",
      customerName: "Thabo Simelane",
      customerPhone: "26876543210",
      categoryId: "hair-styling-braids",
      categoryName: "Hair Styling, Braiding & Salons",
      title: "Need Knotless Braids at home in Eveni this Saturday",
      description: "Looking for a skilled braider to come to my house in Eveni. Waist-length medium knotless braids, have my own extensions.",
      budgetSzl: 350,
      town: "Mbabane",
      neighborhood: "Eveni",
      latitude: -26.3265,
      longitude: 31.1442,
      deliveryNeeded: true,
      biddingWindowHours: 12,
      status: "OPEN",
      expiresAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: "req-mb-02",
      customerId: "cust-02",
      customerName: "Nomcebo Zwane",
      customerPhone: "26878112233",
      categoryId: "printing-copying-internet",
      categoryName: "Printing, Photocopying & Stationery",
      title: "Printing 50 colour booklets with spiral binding for workshop",
      description: "Need 50 copies of a 12-page training booklet printed in full colour and wire/spiral bound by tomorrow afternoon in Mbabane CBD.",
      budgetSzl: 800,
      town: "Mbabane",
      neighborhood: "Swazi Plaza & The Mall",
      latitude: -26.3278,
      longitude: 31.1429,
      deliveryNeeded: false,
      biddingWindowHours: 6,
      status: "OPEN",
      expiresAt: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    }
  ];

  private bids: BidOffer[] = [
    {
      id: "bid-mb-01",
      requestId: "req-mb-01",
      providerId: "mb-prov-01",
      providerName: "Zodwa Khumalo",
      providerBusiness: "Zodwa Knotless Braids & Natural Hair",
      providerPhone: "26876345678",
      providerTier: "TIER1_ID_VERIFIED",
      priceSzl: 300,
      deliveryFeeSzl: 30,
      estimatedHours: 3,
      notes: "I can come to Eveni at 9am Saturday with my hair clips and blowdryer. Beautiful clean parts guaranteed.",
      status: "SUBMITTED",
      createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    }
  ];

  private analyticsEvents: EieAnalyticsEvent[] = [
    {
      id: "evt-01",
      eventType: "REQUEST_CREATED",
      categoryId: "hair-styling-braids",
      categoryName: "Hair Styling, Braiding & Salons",
      town: "Mbabane",
      amountSzl: 350,
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    }
  ];

  // Natural Language & Proximity Prompt Search Engine
  searchProviders(query: string, neighborhood?: string): Provider[] {
    const q = (query || "").trim().toLowerCase();
    const targetHood = neighborhood && neighborhood !== "ALL" ? neighborhood.toLowerCase() : null;

    return this.providers
      .filter(p => {
        // Neighborhood filter if provided
        if (targetHood) {
          const hoodMatch =
            p.neighborhood.toLowerCase().includes(targetHood) ||
            p.exactLocation.toLowerCase().includes(targetHood);
          if (!hoodMatch) return false;
        }

        if (!q) return true; // If no query, return all in neighborhood

        // Keyword & prompt matching logic
        const queryTokens = q.split(/\s+/).filter(t => t.length > 2 && t !== "the" && t !== "and" && t !== "for");
        
        // Exact category matching
        const catMatch = this.categories.some(cat => {
          if (!p.categoryIds.includes(cat.id)) return false;
          if (cat.name.toLowerCase().includes(q) || cat.sector.toLowerCase().includes(q)) return true;
          return cat.keywords.some(k => q.includes(k) || k.includes(q));
        });

        // Direct service & bio match
        const businessMatch = p.businessName.toLowerCase().includes(q);
        const nameMatch = p.fullName.toLowerCase().includes(q);
        const bioMatch = p.bio.toLowerCase().includes(q);
        const serviceMatch = p.servicesOffered.some(s => s.toLowerCase().includes(q) || queryTokens.some(tok => s.toLowerCase().includes(tok)));
        const locationMatch = p.exactLocation.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q);

        return catMatch || businessMatch || nameMatch || bioMatch || serviceMatch || locationMatch;
      })
      .sort((a, b) => {
        // Rank by: 1) Verified status, 2) Completed jobs count (Trust score!), 3) Rating
        const scoreA = (a.tier !== "INFORMAL_UNVERIFIED" ? 20 : 0) + a.completedJobsCount * 2 + a.rating * 10;
        const scoreB = (b.tier !== "INFORMAL_UNVERIFIED" ? 20 : 0) + b.completedJobsCount * 2 + b.rating * 10;
        return scoreB - scoreA;
      });
  }

  // Categories
  getCategories(): CategoryItem[] {
    return this.categories;
  }

  // Financial Nodes
  getFinancialNodes(neighborhood?: string): FinancialNodeItem[] {
    if (!neighborhood || neighborhood === "ALL") return this.financialNodes;
    return this.financialNodes.filter(n => n.landmark.toLowerCase().includes(neighborhood.toLowerCase()) || n.town.toLowerCase() === "mbabane");
  }

  reportFinancialNode(nodeId: string, issueType: string): FinancialNodeItem | null {
    const node = this.financialNodes.find(n => n.id === nodeId);
    if (!node) return null;
    node.userReportsCount += 1;
    if (issueType === "OUT_OF_CASH") {
      node.operationalStatus = "OUT_OF_CASH";
    } else {
      node.operationalStatus = "USER_REPORTED_ISSUE";
    }
    node.lastVerified = new Date().toISOString();
    return node;
  }

  // Reviews System
  getReviewsForProvider(providerId: string): ProviderReview[] {
    return this.reviews.filter(r => r.providerId === providerId);
  }

  addReview(providerId: string, reviewData: Omit<ProviderReview, "id" | "providerId" | "date">): ProviderReview | null {
    const provider = this.getProviderById(providerId);
    if (!provider) return null;

    const newRev: ProviderReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      providerId,
      date: new Date().toISOString().split("T")[0]
    };
    this.reviews.unshift(newRev);

    // Recalculate provider average rating and review count
    const provReviews = this.reviews.filter(r => r.providerId === providerId);
    const totalRating = provReviews.reduce((sum, r) => sum + r.rating, 0);
    provider.reviewsCount = provReviews.length;
    provider.rating = Number((totalRating / provReviews.length).toFixed(1));

    this.analyticsEvents.push({
      id: `evt-${Date.now()}`,
      eventType: "REVIEW_POSTED",
      categoryId: provider.categoryIds[0] || "general",
      categoryName: provider.businessName,
      town: "Mbabane",
      amountSzl: reviewData.rating,
      timestamp: new Date().toISOString()
    });

    return newRev;
  }

  // Providers
  getProviders(neighborhood?: string): Provider[] {
    if (!neighborhood || neighborhood === "ALL") return this.providers;
    return this.providers.filter(p => p.neighborhood.toLowerCase() === neighborhood.toLowerCase());
  }

  getProviderById(id: string): (Provider & { reviews: ProviderReview[] }) | null {
    const p = this.providers.find(prov => prov.id === id);
    if (!p) return null;
    const revs = this.getReviewsForProvider(id);
    return { ...p, reviews: revs };
  }

  registerProvider(p: Omit<Provider, "id" | "completedJobsCount" | "rating" | "reviewsCount" | "createdAt">): Provider {
    const newProvider: Provider = {
      ...p,
      id: `mb-prov-${Date.now()}`,
      completedJobsCount: 0,
      rating: 5.0, // New listing starting trust score
      reviewsCount: 0,
      createdAt: new Date().toISOString()
    };
    this.providers.unshift(newProvider);
    return newProvider;
  }

  // Requests
  getRequests(status?: string, categoryId?: string, neighborhood?: string): CustomerRequest[] {
    return this.requests.filter(r => {
      if (status && r.status !== status) return false;
      if (categoryId && r.categoryId !== categoryId) return false;
      if (neighborhood && neighborhood !== "ALL" && r.neighborhood.toLowerCase() !== neighborhood.toLowerCase()) return false;
      return true;
    });
  }

  getRequestById(id: string): CustomerRequest | undefined {
    return this.requests.find(r => r.id === id);
  }

  createRequest(reqData: Omit<CustomerRequest, "id" | "status" | "createdAt" | "expiresAt">): CustomerRequest {
    const newReq: CustomerRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (reqData.biddingWindowHours || 12) * 3600 * 1000).toISOString()
    };
    this.requests.unshift(newReq);

    this.analyticsEvents.push({
      id: `evt-${Date.now()}`,
      eventType: "REQUEST_CREATED",
      categoryId: newReq.categoryId,
      categoryName: newReq.categoryName,
      town: newReq.town,
      amountSzl: newReq.budgetSzl,
      timestamp: newReq.createdAt
    });

    return newReq;
  }

  // Bids
  getBidsForRequest(requestId: string): BidOffer[] {
    return this.bids.filter(b => b.requestId === requestId);
  }

  submitBid(bidData: Omit<BidOffer, "id" | "status" | "createdAt">): BidOffer {
    const newBid: BidOffer = {
      ...bidData,
      id: `bid-${Date.now()}`,
      status: "SUBMITTED",
      createdAt: new Date().toISOString()
    };
    this.bids.push(newBid);

    const request = this.getRequestById(bidData.requestId);
    if (request) {
      this.analyticsEvents.push({
        id: `evt-${Date.now()}`,
        eventType: "BID_SUBMITTED",
        categoryId: request.categoryId,
        categoryName: request.categoryName,
        town: request.town,
        amountSzl: newBid.priceSzl + newBid.deliveryFeeSzl,
        timestamp: newBid.createdAt
      });
    }

    return newBid;
  }

  acceptBid(requestId: string, bidId: string): { request: CustomerRequest; winningBid: BidOffer } | null {
    const request = this.getRequestById(requestId);
    const bid = this.bids.find(b => b.id === bidId && b.requestId === requestId);
    if (!request || !bid) return null;

    request.status = "AWARDED";
    request.selectedBidId = bidId;

    // Mark winning bid accepted, others rejected
    this.bids.forEach(b => {
      if (b.requestId === requestId) {
        b.status = b.id === bidId ? "ACCEPTED" : "REJECTED";
      }
    });

    // Elevate provider trust score by incrementing completedJobsCount!
    const provider = this.providers.find(p => p.id === bid.providerId || p.phoneNumber === bid.providerPhone);
    if (provider) {
      provider.completedJobsCount += 1;
    }

    this.analyticsEvents.push({
      id: `evt-${Date.now()}`,
      eventType: "OFFER_ACCEPTED",
      categoryId: request.categoryId,
      categoryName: request.categoryName,
      town: request.town,
      amountSzl: bid.priceSzl + bid.deliveryFeeSzl,
      timestamp: new Date().toISOString()
    });

    return { request, winningBid: bid };
  }

  // EIE Economic Index Aggregator
  getEieMetrics() {
    const categoryStats: Record<string, { count: number; totalBidAmount: number; minBid: number; maxBid: number; neighborhood: string }> = {};

    this.analyticsEvents.forEach(evt => {
      if (evt.eventType === "BID_SUBMITTED" && evt.amountSzl) {
        if (!categoryStats[evt.categoryName]) {
          categoryStats[evt.categoryName] = {
            count: 0,
            totalBidAmount: 0,
            minBid: evt.amountSzl,
            maxBid: evt.amountSzl,
            neighborhood: "Mbabane"
          };
        }
        const stat = categoryStats[evt.categoryName];
        stat.count += 1;
        stat.totalBidAmount += evt.amountSzl;
        stat.minBid = Math.min(stat.minBid, evt.amountSzl);
        stat.maxBid = Math.max(stat.maxBid, evt.amountSzl);
      }
    });

    const benchmarks = Object.entries(categoryStats).map(([category, s]) => ({
      category,
      town: "Mbabane",
      observationCount: s.count,
      averageWinningOrBidSzl: Math.round(s.totalBidAmount / s.count),
      priceRange: `SZL ${s.minBid.toLocaleString()} - SZL ${s.maxBid.toLocaleString()}`,
      demandSurgeAlert: s.count >= 2 ? "High Activity" : "Normal"
    }));

    return {
      nationalCurrency: "SZL (Lilangeni)",
      targetCorridor: "Mbabane Metropolitan Core",
      totalMarketplaceEvents: this.analyticsEvents.length,
      activeRequestsCount: this.requests.filter(r => r.status === "OPEN").length,
      registeredProvidersCount: this.providers.length,
      totalVerifiedReviews: this.reviews.length,
      benchmarks,
      privacyNotice: "Data is aggregated per sector and neighborhood. Personal phone numbers and names are protected."
    };
  }
}

export const db = new MbabaneDataStore();
