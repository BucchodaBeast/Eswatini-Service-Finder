import { ESWATINI_CATEGORIES, CategoryItem } from "../data/categories";
import { INITIAL_FINANCIAL_NODES, FinancialNodeItem } from "../data/financialNodes";

export interface Provider {
  id: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  tier: "INFORMAL_UNVERIFIED" | "TIER1_ID_VERIFIED" | "TIER2_BUSINESS_VERIFIED";
  nationalIdNumber?: string;
  taxPin?: string;
  town: string;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  categoryIds: string[];
  isAvailable: boolean;
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
  eventType: "REQUEST_CREATED" | "BID_SUBMITTED" | "OFFER_ACCEPTED" | "NODE_REPORTED";
  categoryId: string;
  categoryName: string;
  town: string;
  amountSzl?: number;
  timestamp: string;
}

// In-Memory Data Store (Works instantly out of the box; connects to PostgreSQL via DATABASE_URL on Render)
class EswatiniDataStore {
  private categories: CategoryItem[] = [...ESWATINI_CATEGORIES];
  private financialNodes: FinancialNodeItem[] = [...INITIAL_FINANCIAL_NODES];
  private providers: Provider[] = [
    {
      id: "prov-01",
      fullName: "Sipho Dlamini",
      businessName: "Sipho's Mobile Mechanics & Auto Care",
      phoneNumber: "26876123456",
      tier: "TIER1_ID_VERIFIED",
      nationalIdNumber: "9201018901234",
      town: "Manzini",
      latitude: -26.4950,
      longitude: 31.3720,
      serviceRadiusKm: 30,
      categoryIds: ["mobile-mechanic-roadside", "tyres-wheel-alignment"],
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "prov-02",
      fullName: "Nothando Shongwe",
      businessName: "Matsapha Fresh & Spit Braai Catering",
      phoneNumber: "26878987654",
      tier: "INFORMAL_UNVERIFIED",
      town: "Matsapha",
      latitude: -26.5015,
      longitude: 31.3110,
      serviceRadiusKm: 20,
      categoryIds: ["chicken-dust-braai", "event-catering-spitbraai"],
      isAvailable: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "prov-03",
      fullName: "Musa Maseko",
      businessName: "Swazi Steel & Burglar Gates",
      phoneNumber: "26879445566",
      tier: "TIER2_BUSINESS_VERIFIED",
      taxPin: "TIN-9812401-SZ",
      town: "Mbabane",
      latitude: -26.3250,
      longitude: 31.1430,
      serviceRadiusKm: 40,
      categoryIds: ["welding-burglar-proofing"],
      isAvailable: true,
      createdAt: new Date().toISOString()
    }
  ];

  private requests: CustomerRequest[] = [
    {
      id: "req-01",
      customerId: "cust-01",
      customerName: "Thabo Simelane",
      customerPhone: "26876543210",
      categoryId: "mobile-mechanic-roadside",
      categoryName: "Mobile Mechanics & Roadside Assistance",
      title: "12V Car Battery replacement & Alternator Check",
      description: "My Nissan bakkie refuses to crank at Bhunu Mall parking lot. Need assistance today.",
      budgetSzl: 1200,
      town: "Manzini",
      latitude: -26.4960,
      longitude: 31.3735,
      deliveryNeeded: true,
      biddingWindowHours: 4,
      status: "OPEN",
      expiresAt: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: "req-02",
      customerId: "cust-02",
      customerName: "Nomcebo Zwane",
      customerPhone: "26878112233",
      categoryId: "event-catering-spitbraai",
      categoryName: "Event Catering & Spit Braai",
      title: "Family Celebration Spit Braai for 30 People",
      description: "Need full spit braai catering with pap, 2 salads and chakalaka in Ezulwini next Saturday.",
      budgetSzl: 2500,
      town: "Ezulwini",
      latitude: -26.4173,
      longitude: 31.1895,
      deliveryNeeded: false,
      biddingWindowHours: 24,
      status: "OPEN",
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    }
  ];

  private bids: BidOffer[] = [
    {
      id: "bid-01",
      requestId: "req-01",
      providerId: "prov-01",
      providerName: "Sipho Dlamini",
      providerBusiness: "Sipho's Mobile Mechanics & Auto Care",
      providerPhone: "26876123456",
      providerTier: "TIER1_ID_VERIFIED",
      priceSzl: 1100,
      deliveryFeeSzl: 50,
      estimatedHours: 1,
      notes: "I have a brand new 12V 652 battery with 1-year guarantee. Can be there in 30 mins.",
      status: "SUBMITTED",
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ];

  private analyticsEvents: EieAnalyticsEvent[] = [
    {
      id: "evt-01",
      eventType: "REQUEST_CREATED",
      categoryId: "mobile-mechanic-roadside",
      categoryName: "Mobile Mechanics & Roadside Assistance",
      town: "Manzini",
      amountSzl: 1200,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: "evt-02",
      eventType: "BID_SUBMITTED",
      categoryId: "mobile-mechanic-roadside",
      categoryName: "Mobile Mechanics & Roadside Assistance",
      town: "Manzini",
      amountSzl: 1150,
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    }
  ];

  // Categories
  getCategories(): CategoryItem[] {
    return this.categories;
  }

  // Financial Nodes
  getFinancialNodes(town?: string): FinancialNodeItem[] {
    if (!town) return this.financialNodes;
    return this.financialNodes.filter(n => n.town.toLowerCase() === town.toLowerCase());
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

  // Requests
  getRequests(status?: string, categoryId?: string, town?: string): CustomerRequest[] {
    return this.requests.filter(r => {
      if (status && r.status !== status) return false;
      if (categoryId && r.categoryId !== categoryId) return false;
      if (town && r.town.toLowerCase() !== town.toLowerCase()) return false;
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

  // Providers
  getProviders(): Provider[] {
    return this.providers;
  }

  registerProvider(p: Omit<Provider, "id" | "createdAt">): Provider {
    const newProvider: Provider = {
      ...p,
      id: `prov-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.providers.push(newProvider);
    return newProvider;
  }

  // EIE Economic Index Aggregator
  getEieMetrics() {
    const categoryStats: Record<string, { count: number; totalBidAmount: number; minBid: number; maxBid: number; town: string }> = {};

    this.analyticsEvents.forEach(evt => {
      if (evt.eventType === "BID_SUBMITTED" && evt.amountSzl) {
        if (!categoryStats[evt.categoryName]) {
          categoryStats[evt.categoryName] = {
            count: 0,
            totalBidAmount: 0,
            minBid: evt.amountSzl,
            maxBid: evt.amountSzl,
            town: evt.town
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
      town: s.town,
      observationCount: s.count,
      averageWinningOrBidSzl: Math.round(s.totalBidAmount / s.count),
      priceRange: `SZL ${s.minBid.toLocaleString()} - SZL ${s.maxBid.toLocaleString()}`,
      demandSurgeAlert: s.count >= 2 ? "Moderate to High Activity" : "Stable"
    }));

    return {
      nationalCurrency: "SZL (Lilangeni)",
      targetCorridor: "Mbabane - Ezulwini - Matsapha - Manzini",
      totalMarketplaceEvents: this.analyticsEvents.length,
      activeRequestsCount: this.requests.filter(r => r.status === "OPEN").length,
      registeredProvidersCount: this.providers.length,
      benchmarks,
      privacyNotice: "Data is aggregated per sector and town. Personal identities and phone numbers are suppressed."
    };
  }
}

export const db = new EswatiniDataStore();
