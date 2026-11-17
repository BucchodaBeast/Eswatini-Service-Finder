import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, Clock, MapPin, Tag, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Sparkles, PlusCircle, DollarSign } from "lucide-react";
import { CustomerRequest, Category, BidOffer } from "../types";
import { BidModal } from "../components/BidModal";

interface MarketplacePageProps {
  categories: Category[];
  onOpenPostModal: () => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ categories, onOpenPostModal }) => {
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("ALL");
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [activeRequestForBid, setActiveRequestForBid] = useState<CustomerRequest | null>(null);
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

  const neighborhoods = [
    "ALL",
    "Mbabane CBD",
    "Swazi Plaza & The Mall",
    "Bus Rank & Market",
    "Sheffield Road",
    "Msunduza",
    "Fonteyn",
    "Sidwashini",
    "Eveni",
    "Checkers"
  ];

  const sectors = ["ALL", ...Array.from(new Set(categories.map(c => c.sector)))];

  const filteredRequests = requests.filter(r => {
    if (selectedNeighborhood !== "ALL" && !r.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) return false;
    if (selectedSector !== "ALL") {
      const cat = categories.find(c => c.id === r.categoryId);
      if (cat && cat.sector !== selectedSector) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Neumorphic Hero Banner */}
      <div className="neu-flat p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-swazi-blue text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Mode 2: Demand-Driven Reverse Auction</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-snug">
            Post What You Need in Mbabane & Compare Provider Bids
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Specify your location in Mbabane, describe your requirement, and set your target budget in SZL. Local providers bid with their lowest price and fastest turnaround.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onOpenPostModal}
              className="neu-btn-primary px-6 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Post a New Request (with Budget)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls (Mbabane Neighborhoods) */}
      <div className="neu-flat p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Neighborhood:</span>
            <div className="neu-pressed p-1 rounded-2xl flex items-center gap-1">
              {neighborhoods.map(hood => (
                <button
                  key={hood}
                  onClick={() => setSelectedNeighborhood(hood)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedNeighborhood === hood
                      ? "neu-btn text-swazi-blue bg-[#e9eef5] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {hood === "ALL" ? "All Mbabane" : hood}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Sector:</span>
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="neu-input px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Accepted Contact Banner */}
      {acceptedContact && (
        <div className="glass-card p-5 sm:p-6 border-2 border-emerald-400/80 shadow-xl animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center text-emerald-600 flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base">
                  Bid Accepted! Direct Contact Unlocked
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Reach out directly via native WhatsApp or phone call without platform fees:
                </p>
              </div>
            </div>
            <button
              onClick={() => setAcceptedContact(null)}
              className="neu-btn px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={acceptedContact.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="neu-btn-success flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Open WhatsApp Chat Directly (Free)</span>
            </a>
            <a
              href={acceptedContact.phoneCallLink}
              className="neu-btn flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold text-slate-800"
            >
              <Phone className="w-4 h-4 text-swazi-blue" />
              <span>Call Provider ({acceptedContact.providerPhone})</span>
            </a>
          </div>
        </div>
      )}

      {/* Requests Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span>Mbabane Job Requests ({filteredRequests.length})</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-time live updates
          </span>
        </div>

        {loading ? (
          <div className="neu-flat p-12 text-center text-slate-400 text-sm">
            Loading active auctions...
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="neu-flat p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-extrabold text-slate-700">No active requests in this neighborhood</h3>
            <p className="text-xs text-slate-400 mt-1">Be the first to post a need!</p>
            <button
              onClick={onOpenPostModal}
              className="mt-4 neu-btn-primary px-5 py-2 rounded-2xl text-xs font-bold"
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
                className="neu-flat p-5 sm:p-6 transition-all hover:scale-[1.005]"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="glass-pill text-[10px] font-black uppercase text-swazi-blue px-2.5 py-0.5 rounded-full">
                        {req.categoryName}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {req.neighborhood}, Mbabane
                      </span>
                      {req.deliveryNeeded && (
                        <span className="glass-pill text-[10px] text-amber-700 font-bold px-2.5 py-0.5 rounded-full">
                          Travel to premises
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                      {req.title}
                    </h3>
                  </div>

                  {/* Budget & Toggle */}
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="neu-pressed px-3.5 py-1.5 rounded-xl text-right">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Budget</span>
                      <span className="text-base font-black text-emerald-700">
                        SZL {req.budgetSzl.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                      className="neu-btn p-2.5 rounded-2xl text-slate-600 hover:text-slate-900"
                      aria-label="Toggle bids"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                  {req.description}
                </p>

                {/* Footer status & Action */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Window: {req.biddingWindowHours}h • Status: <strong className="text-slate-600 uppercase font-bold">{req.status}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveRequestForBid(req)}
                      className="neu-btn-success px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Bid on This</span>
                    </button>

                    <button
                      onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                      className="neu-btn px-3 py-1 rounded-xl text-xs font-black text-swazi-blue flex items-center gap-1.5"
                    >
                      <span>Bids ({req.bids?.length || 0})</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Bids Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                        Submitted Provider Bids
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        Compare price, ETA & guarantee before selecting
                      </span>
                    </div>

                    {!req.bids || req.bids.length === 0 ? (
                      <div className="neu-pressed p-4 text-center text-xs text-slate-500 rounded-xl">
                        No bids submitted yet for this Mbabane request. Be the first provider to bid!
                      </div>
                    ) : (
                      req.bids.map(bid => (
                        <div
                          key={bid.id}
                          className={`neu-flat-sm p-4 space-y-2 transition-all ${
                            bid.status === "ACCEPTED"
                              ? "border-2 border-emerald-400 bg-emerald-50/20"
                              : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="glass-pill text-[9px] font-black text-slate-500 uppercase px-2 py-0.5 rounded-full">
                                {bid.providerTier.replace(/_/g, " ")}
                              </span>
                              <h5 className="font-black text-sm text-slate-800 mt-1">{bid.providerBusiness}</h5>
                            </div>
                            <div className="text-right">
                              <span className="text-base font-black text-slate-800">
                                SZL {(bid.priceSzl + bid.deliveryFeeSzl).toLocaleString()}
                              </span>
                              {bid.deliveryFeeSzl > 0 && (
                                <span className="text-[10px] text-slate-500 block">
                                  (SZL {bid.priceSzl} + SZL {bid.deliveryFeeSzl} travel)
                                </span>
                              )}
                            </div>
                          </div>

                          {bid.notes && (
                            <p className="neu-pressed text-xs text-slate-600 p-2.5 rounded-xl italic">
                              "{bid.notes}"
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-slate-500 text-[11px]">
                              Estimated Completion: <strong className="text-slate-800">{bid.estimatedHours} Hours</strong>
                            </span>

                            {req.status === "AWARDED" ? (
                              bid.status === "ACCEPTED" ? (
                                <span className="neu-pressed px-3 py-1 rounded-xl text-emerald-700 font-black text-xs flex items-center gap-1">
                                  ✓ Selected Winning Bid
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs">Closed</span>
                              )
                            ) : (
                              <button
                                onClick={() => handleAcceptBid(req.id, bid.id)}
                                className="neu-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-black"
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

      {/* Bid Modal */}
      <BidModal
        isOpen={!!activeRequestForBid}
        onClose={() => setActiveRequestForBid(null)}
        request={activeRequestForBid}
        onSubmitSuccess={() => {
          fetchRequests();
          alert("Your bid was submitted! The seeker has been notified.");
        }}
      />
    </div>
  );
};
