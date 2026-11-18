import React, { useState, useEffect } from "react";
import { Search, MapPin, Star, ShieldCheck, Phone, MessageCircle, Sparkles, CheckCircle2, ChevronRight, Award, UserCheck, Flame } from "lucide-react";
import { Provider } from "../types";
import { ProviderProfileModal } from "../components/ProviderProfileModal";

interface ProximitySearchPageProps {
  onOpenInquiryKit: () => void;
}

export const ProximitySearchPage: React.FC<ProximitySearchPageProps> = ({ onOpenInquiryKit }) => {
  const [query, setQuery] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("ALL");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProviderForModal, setActiveProviderForModal] = useState<Provider | null>(null);

  const fetchProviders = async (q: string = query, hood: string = selectedNeighborhood) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (hood && hood !== "ALL") params.set("neighborhood", hood);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProviders(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders(query, selectedNeighborhood);
  }, [selectedNeighborhood]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProviders(query, selectedNeighborhood);
  };

  const handleQuickPrompt = (promptText: string) => {
    setQuery(promptText);
    fetchProviders(promptText, selectedNeighborhood);
  };

  const neighborhoods = [
    "ALL",
    "CBD / The Mall",
    "Swazi Plaza",
    "Bus Rank & Market",
    "Sheffield Road",
    "Msunduza",
    "Fonteyn",
    "Sidwashini",
    "Eveni",
    "Mahwalala",
    "Checkers",
    "Woodlands"
  ];

  const quickPrompts = [
    { label: "💇‍♀️ Nearest Hairstylist", text: "nearest hairstylist" },
    { label: "💅 Nearest Nail Tech", text: "nearest nail tech" },
    { label: "🍗 Nearest Food Stall / Braai", text: "nearest food stall chicken dust" },
    { label: "🖨️ Nearest Printing Shop", text: "nearest printing shop photocopy" },
    { label: "⛽ Nearest Fueling Station", text: "nearest fueling station petrol" },
    { label: "🏥 Nearest Hospital / Clinic", text: "nearest hospital clinic" },
    { label: "🔧 Nearest Mechanic & Tyres", text: "nearest mechanic tyre puncture" },
    { label: "🚰 Nearest Plumber & Geysers", text: "nearest plumber geyser" },
    { label: "👗 Nearest Tailor / Regalia", text: "nearest tailor traditional attire" },
    { label: "📱 Nearest Phone Fixer", text: "nearest phone repair screen" }
  ];

  return (
    <div className="space-y-6">
      {/* Search & Prompt Header */}
      <div className="neu-flat p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Mbabane Proximity Radar
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              Direct access to self-hired & local providers
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-snug">
            Find the Nearest Service in Mbabane
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Prompt anything you need: self-hired hairstylists, nail technicians, braai food stalls, printing shops, mechanics, 24h fueling stations, or hospitals.
          </p>

          {/* AI-Style Natural Prompt Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-5 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Prompt e.g. nearest hairstylist, nearest hospital, nearest food stall, printing shop..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="neu-input w-full pl-10 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              className="neu-btn-primary px-5 sm:px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5"
            >
              <span>Search</span>
            </button>
          </form>

          {/* Quick 1-Click Prompt Chips */}
          <div className="mt-3.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex-shrink-0">
              Quick prompts:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPrompt(p.text)}
                className="neu-flat-sm anim-chip px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-700 whitespace-nowrap hover:text-swazi-blue hover:scale-105 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Neighborhood Filter Well */}
      <div className="neu-flat p-4 sm:p-5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex-shrink-0">
            Mbabane Hubs:
          </span>
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
      </div>

      {/* Results Header with Onboarding Inquiry CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span>Available Providers & Facilities</span>
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-xs font-bold text-swazi-blue">
              {providers.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400">Ranked by trust level, completed jobs, and verified reviews</p>
        </div>

        <button
          onClick={onOpenInquiryKit}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-swazi-blue flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserCheck className="w-4 h-4 text-swazi-blue" />
          <span>Vendor Inquiry Handout Kit</span>
        </button>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full neu-flat anim-shimmer p-12 text-center text-slate-400 text-sm">
            Scanning Mbabane for nearest providers...
          </div>
        ) : providers.length === 0 ? (
          <div className="col-span-full neu-flat p-12 text-center space-y-3">
            <MapPin className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-extrabold text-slate-700">No providers found for this search in Mbabane</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Know someone offering this service? Use our Enquiry Kit to recruit them or add their stall onto the platform!
            </p>
            <button
              onClick={onOpenInquiryKit}
              className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Open Vendor Enquiry Handout
            </button>
          </div>
        ) : (
          providers.map(prov => {
            const cleanPhone = prov.phoneNumber.replace(/[^0-9]/g, "");
            const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${prov.businessName}! I found your listing on the Mbabane Service Finder for "${prov.servicesOffered[0] || "services"}" and would like to inquire.`
            )}`;

            return (
              <div
                key={prov.id}
                className="neu-flat anim-card p-5 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Badge Row */}
                  <div className="flex items-start justify-between gap-1 mb-2">
                    {prov.tier === "TIER1_ID_VERIFIED" ? (
                      <span className="glass-pill text-[10px] font-black text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        ID-Verified
                      </span>
                    ) : prov.tier === "TIER2_BUSINESS_VERIFIED" ? (
                      <span className="glass-pill text-[10px] font-black text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3 text-blue-600" />
                        Registered
                      </span>
                    ) : (
                      <span className="glass-pill text-[10px] font-black text-slate-600 px-2 py-0.5 rounded-full">
                        Self-Hired
                      </span>
                    )}

                    {/* Trust Ranking & Rating */}
                    <div className="flex items-center gap-1 text-xs">
                      <div className="flex items-center text-amber-500 font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                        <span>{prov.rating > 0 ? prov.rating : "New"}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({prov.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Business Title */}
                  <h3 className="font-black text-base text-slate-800 tracking-tight leading-snug">
                    {prov.businessName}
                  </h3>

                  {/* Specific Location Spot */}
                  <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      <strong className="text-slate-800">{prov.neighborhood}:</strong> {prov.exactLocation}
                    </span>
                  </div>

                  {/* Trust indicator: Completed jobs through system */}
                  <div className="mt-2.5 neu-pressed p-2 rounded-xl flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">Platform Trust:</span>
                    <span className="font-black text-emerald-700 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {prov.completedJobsCount} jobs completed
                    </span>
                  </div>

                  {/* Services Chips */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {prov.servicesOffered.slice(0, 3).map((svc, idx) => (
                      <span
                        key={idx}
                        className="glass-pill text-[10px] font-bold text-slate-700 px-2 py-0.5 rounded-lg"
                      >
                        {svc}
                      </span>
                    ))}
                    {prov.servicesOffered.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-semibold px-1 py-0.5">
                        +{prov.servicesOffered.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Starts: <strong className="text-slate-800">{prov.startingPriceSzl ? `SZL ${prov.startingPriceSzl}` : "Negotiable"}</strong>
                    </span>

                    <button
                      onClick={() => setActiveProviderForModal(prov)}
                      className="text-xs font-black text-swazi-blue hover:underline flex items-center gap-0.5"
                    >
                      <span>Profile & Reviews</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neu-btn-success flex-1 py-2 px-3 rounded-xl font-black text-[11px] flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-white" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${cleanPhone}`}
                      className="neu-btn flex-1 py-2 px-3 rounded-xl font-black text-[11px] text-slate-800 flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-swazi-blue" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Provider Details & Review Modal */}
      <ProviderProfileModal
        provider={activeProviderForModal}
        onClose={() => setActiveProviderForModal(null)}
        onReviewSubmitted={(updated) => {
          setProviders(providers.map(p => p.id === updated.id ? updated : p));
          setActiveProviderForModal(updated);
        }}
      />
    </div>
  );
};
