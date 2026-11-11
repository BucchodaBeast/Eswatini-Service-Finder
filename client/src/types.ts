export interface Category {
  id: string;
  name: string;
  sector: string;
  spectrum: "INFORMAL" | "FORMAL" | "DUAL";
  defaultRadiusKm: number;
  description: string;
  popularLocations: string[];
}

export interface FinancialNode {
  id: string;
  name: string;
  operator: "FNB Eswatini" | "Standard Bank" | "Nedbank" | "SBS" | "MTN MoMo" | "Instacash";
  nodeType: "ATM" | "AGENT_POINT" | "BRANCH";
  town: string;
  landmark: string;
  latitude: number;
  longitude: number;
  services: string[];
  operationalStatus: "VERIFIED_ACTIVE" | "USER_REPORTED_ISSUE" | "OUT_OF_CASH" | "UNKNOWN";
  lastVerified: string;
  userReportsCount: number;
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
  bids?: BidOffer[];
}

export interface EieMetrics {
  nationalCurrency: string;
  targetCorridor: string;
  totalMarketplaceEvents: number;
  activeRequestsCount: number;
  registeredProvidersCount: number;
  benchmarks: Array<{
    category: string;
    town: string;
    observationCount: number;
    averageWinningOrBidSzl: number;
    priceRange: string;
    demandSurgeAlert: string;
  }>;
  privacyNotice: string;
}
