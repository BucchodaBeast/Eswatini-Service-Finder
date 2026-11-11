export interface FinancialNodeItem {
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

export const INITIAL_FINANCIAL_NODES: FinancialNodeItem[] = [
  // Mbabane Nodes
  {
    id: "node-mb-01",
    name: "FNB ATM - Mbabane Swazi Plaza",
    operator: "FNB Eswatini",
    nodeType: "ATM",
    town: "Mbabane",
    landmark: "Swazi Plaza, Ground Level near OK Foods",
    latitude: -26.3265,
    longitude: 31.1442,
    services: ["Cash Withdrawal", "Cash Deposit", "Airtime/Prepaid", "eWallet"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-10T09:30:00Z",
    userReportsCount: 0
  },
  {
    id: "node-mb-02",
    name: "Standard Bank ATM - Corporate Place",
    operator: "Standard Bank",
    nodeType: "ATM",
    town: "Mbabane",
    landmark: "Corporate Place, Swazi Plaza bypass",
    latitude: -26.3278,
    longitude: 31.1429,
    services: ["Cash Withdrawal", "Mini Statement"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-09T14:00:00Z",
    userReportsCount: 0
  },
  {
    id: "node-mb-03",
    name: "MTN MoMo Hub - Mbabane Main Bus Rank",
    operator: "MTN MoMo",
    nodeType: "AGENT_POINT",
    town: "Mbabane",
    landmark: "Main Bus Rank Entrance, Container 14",
    latitude: -26.3291,
    longitude: 31.1465,
    services: ["MoMo Cash-in", "MoMo Cash-out", "Bill Payments", "SIM Registration"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-11T11:00:00Z",
    userReportsCount: 1
  },
  {
    id: "node-mb-04",
    name: "SBS Branch ATM - Mbabane Allister Miller St",
    operator: "SBS",
    nodeType: "ATM",
    town: "Mbabane",
    landmark: "Allister Miller Street near Post Office",
    latitude: -26.3248,
    longitude: 31.1415,
    services: ["Cash Withdrawal", "Account Balance"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-08T16:20:00Z",
    userReportsCount: 0
  },

  // Ezulwini Nodes
  {
    id: "node-ez-01",
    name: "FNB CashPlus - Pick n Pay The Gables",
    operator: "FNB Eswatini",
    nodeType: "AGENT_POINT",
    town: "Ezulwini",
    landmark: "The Gables Shopping Centre Customer Care",
    latitude: -26.4173,
    longitude: 31.1895,
    services: ["Cash Deposit", "Cash Withdrawal", "eWallet Collect"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-11T08:15:00Z",
    userReportsCount: 0
  },
  {
    id: "node-ez-02",
    name: "Nedbank ATM - Corner Plaza Ezulwini",
    operator: "Nedbank",
    nodeType: "ATM",
    town: "Ezulwini",
    landmark: "Corner Plaza Walkway next to Woolworths",
    latitude: -26.4210,
    longitude: 31.1920,
    services: ["Cash Withdrawal", "Unayo Cashout"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-10T12:00:00Z",
    userReportsCount: 0
  },

  // Matsapha Nodes
  {
    id: "node-mat-01",
    name: "Standard Bank ATM - Mahhala Shopping Centre",
    operator: "Standard Bank",
    nodeType: "ATM",
    town: "Matsapha",
    landmark: "Mahhala Complex entrance, opposite Spar",
    latitude: -26.5025,
    longitude: 31.3090,
    services: ["Cash Withdrawal", "Cardless Withdrawal"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-10T17:45:00Z",
    userReportsCount: 0
  },
  {
    id: "node-mat-02",
    name: "MTN MoMo Agent - Matsapha Mobeni",
    operator: "MTN MoMo",
    nodeType: "AGENT_POINT",
    town: "Matsapha",
    landmark: "Near Matsapha Police Station & Mobeni Kiosk",
    latitude: -26.4980,
    longitude: 31.3140,
    services: ["MoMo Cash-in", "MoMo Cash-out"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-11T10:00:00Z",
    userReportsCount: 0
  },

  // Manzini Nodes
  {
    id: "node-mz-01",
    name: "FNB ATM - Manzini Bhunu Mall",
    operator: "FNB Eswatini",
    nodeType: "ATM",
    town: "Manzini",
    landmark: "Bhunu Mall First Floor, opposite Shoprite",
    latitude: -26.4960,
    longitude: 31.3735,
    services: ["Cash Withdrawal", "Deposit Taking", "eWallet"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-11T13:30:00Z",
    userReportsCount: 0
  },
  {
    id: "node-mz-02",
    name: "Standard Bank ATM - The Hub Manzini",
    operator: "Standard Bank",
    nodeType: "ATM",
    town: "Manzini",
    landmark: "The Hub Shopping Complex, Villiers St",
    latitude: -26.4935,
    longitude: 31.3712,
    services: ["Cash Withdrawal", "Balance Inquiry"],
    operationalStatus: "USER_REPORTED_ISSUE",
    lastVerified: "2026-11-11T15:00:00Z",
    userReportsCount: 2
  },
  {
    id: "node-mz-03",
    name: "MTN MoMo Super Agent - Manzini Bus Rank",
    operator: "MTN MoMo",
    nodeType: "AGENT_POINT",
    town: "Manzini",
    landmark: "Central Satellite Bus Rank, Main Booth",
    latitude: -26.5010,
    longitude: 31.3780,
    services: ["MoMo Cash-in", "MoMo Cash-out", "Bulk Float Transfer"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-11T09:00:00Z",
    userReportsCount: 0
  },
  {
    id: "node-mz-04",
    name: "SBS Branch ATM - Ngwane Street Manzini",
    operator: "SBS",
    nodeType: "ATM",
    town: "Manzini",
    landmark: "Corner of Ngwane & Louw Street",
    latitude: -26.4948,
    longitude: 31.3751,
    services: ["Cash Withdrawal", "Statement Print"],
    operationalStatus: "VERIFIED_ACTIVE",
    lastVerified: "2026-11-09T18:00:00Z",
    userReportsCount: 0
  }
];
