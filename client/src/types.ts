export interface Category {
  id: string;
  name: string;
  sector: string;
  spectrum: "INFORMAL" | "FORMAL" | "DUAL";
  defaultRadiusKm: number;
  description: string;
  keywords: string[];
  popularLocations: string[];
}

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

export interface LandmarkSuggestion {
  id: string;
  landmark: string;
  directionsGuide?: string;
  submittedBy: string;
  date: string;
}

export interface Provider {
  id: string;
  fullName: string;
  businessName: string;
  phoneNumber: string;
  tier: "INFORMAL_UNVERIFIED" | "TIER1_ID_VERIFIED" | "TIER2_BUSINESS_VERIFIED";
  nationalIdNumber?: string;
  taxPin?: string;
  town: string;
  neighborhood: string;
  exactLocation: string;
  closestLandmark: string; // Key Eswatini landmark! e.g. "Near Ka-Gogo Grocery", "Opposite Eswatini Post"
  directionsGuide?: string; // e.g. "Turn left after the blue container, 2nd house with black gate"
  userSuggestedLandmarks?: LandmarkSuggestion[];
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  categoryIds: string[];
  servicesOffered: string[];
  startingPriceSzl?: number;
  completedJobsCount: number;
  rating: number;
  reviewsCount: number;
  reviews?: ProviderReview[];
  isAvailable: boolean;
  bio: string;
  createdAt: string;
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
  neighborhood: string;
  closestLandmark?: string;
  directionsGuide?: string;
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
  totalVerifiedReviews: number;
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
