import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { db } from "./db/store";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Healthcheck for Render
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "healthy",
    platform: "Eswatini Service & Product Finder",
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || "development"
  });
});

// 2. Categories API
app.get("/api/categories", (_req: Request, res: Response) => {
  res.json({ success: true, count: db.getCategories().length, data: db.getCategories() });
});

// 3. Financial Nodes API (ATMs & MoMo / CashPlus agents)
app.get("/api/nodes", (req: Request, res: Response) => {
  const town = req.query.town as string | undefined;
  const nodes = db.getFinancialNodes(town);
  res.json({ success: true, count: nodes.length, data: nodes });
});

app.post("/api/nodes/:id/report", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { issueType } = req.body;
  const updated = db.reportFinancialNode(id, issueType || "USER_REPORTED_ISSUE");
  if (!updated) {
    return res.status(404).json({ success: false, error: "Node not found" });
  }
  res.json({ success: true, message: "Report submitted. Thank you for helping fellow Emaswati!", data: updated });
});

// 4. Reverse Auction Requests API
app.get("/api/requests", (req: Request, res: Response) => {
  const { status, categoryId, town } = req.query;
  const requests = db.getRequests(status as string, categoryId as string, town as string);
  res.json({ success: true, count: requests.length, data: requests });
});

app.get("/api/requests/:id", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const request = db.getRequestById(id);
  if (!request) {
    return res.status(404).json({ success: false, error: "Request not found" });
  }
  const bids = db.getBidsForRequest(id);
  res.json({ success: true, data: { ...request, bids } });
});

app.post("/api/requests", (req: Request, res: Response) => {
  const {
    customerId,
    customerName,
    customerPhone,
    categoryId,
    categoryName,
    title,
    description,
    budgetSzl,
    town,
    latitude,
    longitude,
    deliveryNeeded,
    biddingWindowHours
  } = req.body;

  if (!title || !description || !budgetSzl || !town || !customerPhone) {
    return res.status(400).json({ success: false, error: "Missing required fields (title, description, budget, town, phone)" });
  }

  const newRequest = db.createRequest({
    customerId: customerId || `cust-${Date.now()}`,
    customerName: customerName || "Anonymous Seeker",
    customerPhone,
    categoryId: categoryId || "general",
    categoryName: categoryName || "General Service",
    title,
    description,
    budgetSzl: Number(budgetSzl),
    town,
    latitude: Number(latitude) || -26.4960,
    longitude: Number(longitude) || 31.3735,
    deliveryNeeded: Boolean(deliveryNeeded),
    biddingWindowHours: Number(biddingWindowHours) || 12
  });

  res.status(201).json({ success: true, data: newRequest });
});

// 5. Provider Bids API
app.post("/api/bids", (req: Request, res: Response) => {
  const {
    requestId,
    providerId,
    providerName,
    providerBusiness,
    providerPhone,
    providerTier,
    priceSzl,
    deliveryFeeSzl,
    estimatedHours,
    notes
  } = req.body;

  if (!requestId || !providerBusiness || !providerPhone || priceSzl === undefined) {
    return res.status(400).json({ success: false, error: "Missing required bid fields" });
  }

  const newBid = db.submitBid({
    requestId,
    providerId: providerId || `prov-${Date.now()}`,
    providerName: providerName || providerBusiness,
    providerBusiness,
    providerPhone,
    providerTier: providerTier || "INFORMAL_UNVERIFIED",
    priceSzl: Number(priceSzl),
    deliveryFeeSzl: Number(deliveryFeeSzl) || 0,
    estimatedHours: Number(estimatedHours) || 2,
    notes: notes || ""
  });

  res.status(201).json({ success: true, data: newBid });
});

app.post("/api/bids/accept", (req: Request, res: Response) => {
  const { requestId, bidId } = req.body;
  const result = db.acceptBid(requestId, bidId);
  if (!result) {
    return res.status(400).json({ success: false, error: "Invalid request or bid ID" });
  }

  // Generate zero-cost instant WhatsApp deep-link for the seeker to contact the winning provider
  const cleanPhone = result.winningBid.providerPhone.replace(/[^0-9]/g, "");
  const waMessage = encodeURIComponent(
    `Hello ${result.winningBid.providerBusiness}! I accepted your bid of SZL ${result.winningBid.priceSzl} on Eswatini Service Finder for "${result.request.title}". Let's arrange fulfillment.`
  );
  const directWhatsAppLink = `https://wa.me/${cleanPhone}?text=${waMessage}`;
  const directCallLink = `tel:${cleanPhone}`;

  res.json({
    success: true,
    message: "Bid accepted successfully! Direct contact is now unlocked.",
    data: {
      ...result,
      contactActions: {
        whatsAppLink: directWhatsAppLink,
        phoneCallLink: directCallLink,
        providerPhone: result.winningBid.providerPhone
      }
    }
  });
});

// 6. Provider Registry API (Dual-Spectrum Onboarding)
app.get("/api/providers", (_req: Request, res: Response) => {
  res.json({ success: true, count: db.getProviders().length, data: db.getProviders() });
});

app.post("/api/providers", (req: Request, res: Response) => {
  const {
    fullName,
    businessName,
    phoneNumber,
    tier,
    nationalIdNumber,
    taxPin,
    town,
    serviceRadiusKm,
    categoryIds
  } = req.body;

  if (!businessName || !phoneNumber || !town) {
    return res.status(400).json({ success: false, error: "Business name, phone number, and town are required" });
  }

  const newProvider = db.registerProvider({
    fullName: fullName || businessName,
    businessName,
    phoneNumber,
    tier: tier || (nationalIdNumber ? "TIER1_ID_VERIFIED" : "INFORMAL_UNVERIFIED"),
    nationalIdNumber,
    taxPin,
    town,
    latitude: -26.4960, // default town centroid
    longitude: 31.3735,
    serviceRadiusKm: Number(serviceRadiusKm) || 20,
    categoryIds: categoryIds || [],
    isAvailable: true
  });

  res.status(201).json({
    success: true,
    message: "Provider registered successfully in the Eswatini dual-spectrum registry",
    data: newProvider
  });
});

// 7. Eswatini Informal Economic Index (EIE) Analytics API
app.get("/api/analytics/eie", (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getEieMetrics() });
});

// 8. Serve Client Static Build in Production (for Render Single-Service Deployment)
const clientDist = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDist));

app.get("*", (req: Request, res: Response) => {
  // If not an API route, send index.html
  if (!req.path.startsWith("/api/")) {
    res.sendFile(path.join(clientDist, "index.html"), err => {
      if (err) {
        res.status(200).send("Eswatini Service & Product Finder API is running. Client build in progress.");
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Eswatini Finder] Server running on http://localhost:${PORT}`);
});
