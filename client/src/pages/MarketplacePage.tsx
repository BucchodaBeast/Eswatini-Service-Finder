import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Clock, MapPin, Tag, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { CustomerRequest, Category, BidOffer } from "../types";

interface MarketplacePageProps {
  categories: Category[];
  onOpenPostModal: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ categories, onOpenPostModal }) => {
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>("ALL");
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acceptedContact, setAcceptedContact] = useState<{
    requestId: string;
    whatsAppLink: string;
    phoneCallLink: string;
    providerPhone: string;
  } | null>(null);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests");
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error("Failed to load requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptBid = async (requestId: string, bidId: string) => {
    try {
      const res = await fetch("/api/bids/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, bidId })
      });
      const data = await res.json();
      if (data.success) {
        setAcceptedContact({
          requestId,
          whatsAppLink: data.data.contactActions.whatsAppLink,
          phoneCallLink: data.data.contactActions.phoneCallLink,
          providerPhone: data.data.contactActions.providerPhone
        });
        fetchRequests();
      }
    } catch (err) {
      alert("Failed to accept bid.");
    }
  };

  const sectors = ["ALL", ...Array.from(new Set(categories.map(c => c.sector)))];

  const filteredRequests = requests.filter(r => {
    if (selectedTown !== "ALL" && r.town !== selectedTown) return false;
    if (selectedSector !== "ALL") {
      const cat = categories.find(c => c.id === r.categoryId);
      if (cat && cat.sector !== selectedSector) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-swazi-blue to-blue-800 rounded-2xl p-6 text-white shadow-lg">
        <div className="max-w-3xl">
          <span className="bg-swazi-yellow text-swazi-dark text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
            Reverse Auction Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2 leading-tight">
            Name Your Need. Compare Structured Bids. Choose Local.
          </h1>
          <p className="text-blue-100 text-sm mt-2">
            Instead of searching through fragmented ads, post what you need and local informal vendors & formal businesses in Mbabane, Manzini, and Ezulwini will bid with their best prices and fulfillment times.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={onOpenPostModal}
              className="bg-swazi-yellow hover:bg-yellow-400 text-swazi-dark font-black px-5 py-2.5 rounded-xl text-sm shadow transition active:scale-95"
            >
              + Post a Request Now
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Town:</span>
            {["ALL", "Mbabane", "Ezulwini", "Matsapha", "Manzini", "Nhlangano"].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTown(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedTown === t
                    ? "bg-swazi-blue text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t === "ALL" ? "All Eswatini" : t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Sector:</span>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-swazi-blue"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Accepted Contact Banner if unlocked */}
      {acceptedContact && (
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-5 shadow-md animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-black text-green-900 text-base">
                  Bid Accepted! Direct Contact Unlocked
                </h3>
                <p className="text-xs text-green-800">
                  Connect with the provider directly via WhatsApp or phone call to confirm pickup or delivery:
                </p>
              </div>
            </div>
            <button
              onClick={() => setAcceptedContact(null)}
              className="text-gray-400 hover:text-gray-600 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={acceptedContact.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat Directly (Free)</span>
            </a>
            <a
              href={acceptedContact.phoneCallLink}
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call Provider ({acceptedContact.providerPhone})</span>
            </a>
          </div>
        </div>
      )}

      {/* Requests Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">
            Active Reverse Auction Requests ({filteredRequests.length})
          </h2>
          <span className="text-xs text-gray-500">Live updating</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-bold text-gray-700">No active requests in this filter</h3>
            <p className="text-xs text-gray-400 mt-1">Be the first to post a need in this category or town!</p>
            <button
              onClick={onOpenPostModal}
              className="mt-4 px-4 py-2 bg-swazi-blue text-white rounded-lg text-xs font-bold"
            >
              Post a Request
            </button>
          </div>
        ) : (
          filteredRequests.map(req => {
            const isExpanded = expandedRequestId === req.id;
            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-swazi-blue">
                        {req.categoryName}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {req.town}
                      </span>
                      {req.deliveryNeeded && (
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded">
                          Delivery Needed
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-gray-900">{req.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Budget</span>
                      <span className="text-lg font-black text-green-700">
                        SZL {req.budgetSzl.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                      className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                      aria-label="Toggle bids"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{req.description}</p>

                {/* Footer status & bids count */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-400 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Window: {req.biddingWindowHours}h ({req.status})</span>
                  </div>

                  <button
                    onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                    className="font-bold text-swazi-blue hover:underline flex items-center gap-1"
                  >
                    <span>View Bids / Offers</span>
                    <span className="bg-swazi-blue text-white rounded-full px-2 py-0.5 text-[10px]">
                      {req.bids?.length || 0}
                    </span>
                  </button>
                </div>

                {/* Expanded Bids Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 bg-gray-50 -mx-5 -mb-5 p-5 rounded-b-2xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-700">
                        Submitted Provider Bids
                      </h4>
                      <span className="text-[11px] text-gray-500">
                        Compare price, ETA & guarantee before selecting
                      </span>
                    </div>

                    {!req.bids || req.bids.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-500 bg-white rounded-xl border border-gray-200">
                        No bids submitted yet. Providers in {req.town} have been alerted.
                      </div>
                    ) : (
                      req.bids.map(bid => (
                        <div
                          key={bid.id}
                          className={`bg-white p-4 rounded-xl border ${
                            bid.status === "ACCEPTED"
                              ? "border-green-500 bg-green-50/40"
                              : "border-gray-200"
                          } shadow-sm space-y-2`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">
                                {bid.providerTier.replace(/_/g, " ")}
                              </span>
                              <h5 className="font-black text-sm text-gray-900">{bid.providerBusiness}</h5>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-gray-900">
                                SZL {(bid.priceSzl + bid.deliveryFeeSzl).toLocaleString()}
                              </span>
                              {bid.deliveryFeeSzl > 0 && (
                                <span className="text-[10px] text-gray-500 block">
                                  (SZL {bid.priceSzl} + SZL {bid.deliveryFeeSzl} delivery)
                                </span>
                              )}
                            </div>
                          </div>

                          {bid.notes && (
                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg italic">
                              "{bid.notes}"
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-gray-500">
                              Estimated Time: <strong>{bid.estimatedHours} Hours</strong>
                            </span>

                            {req.status === "AWARDED" ? (
                              bid.status === "ACCEPTED" ? (
                                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-xs">
                                  ✓ Selected Winning Bid
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">Closed</span>
                              )
                            ) : (
                              <button
                                onClick={() => handleAcceptBid(req.id, bid.id)}
                                className="bg-swazi-blue hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs shadow-sm transition active:scale-95"
                              >
                                Accept Offer & Contact
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
