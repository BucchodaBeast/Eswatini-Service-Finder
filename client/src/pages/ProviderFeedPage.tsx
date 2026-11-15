import React, { useState, useEffect } from "react";
import { Hammer, MapPin, DollarSign, Clock, ShieldCheck, Filter, Sparkles } from "lucide-react";
import { CustomerRequest, Category } from "../types";
import { BidModal } from "../components/BidModal";

interface ProviderFeedPageProps {
  categories: Category[];
}

export const ProviderFeedPage: React.FC<ProviderFeedPageProps> = ({ categories }) => {
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeRequestForBid, setActiveRequestForBid] = useState<CustomerRequest | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/requests?status=OPEN");
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const filtered = requests.filter(r => {
    if (selectedTown !== "ALL" && r.town !== selectedTown) return false;
    if (selectedCategory !== "ALL" && r.categoryId !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Neumorphic Header Card */}
      <div className="neu-flat p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              MOD-02: Provider Dispatch Radar
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Customer Opportunities
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Verified customer requests in your region. Review requirements, budget, and submit your competitive price and ETA.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Town:</span>
            <select
              value={selectedTown}
              onChange={e => setSelectedTown(e.target.value)}
              className="neu-input px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Locations</option>
              <option value="Mbabane">Mbabane</option>
              <option value="Ezulwini">Ezulwini</option>
              <option value="Matsapha">Matsapha</option>
              <option value="Manzini">Manzini</option>
              <option value="Nhlangano">Nhlangano</option>
            </select>
          </div>
        </div>

        {/* Quick Category Filter Pills in Sunken Well */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 overflow-x-auto no-scrollbar">
          <div className="neu-pressed p-1.5 rounded-2xl inline-flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "ALL"
                  ? "neu-btn text-swazi-blue bg-[#e9eef5]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All Categories ({categories.length})
            </button>
            {categories.slice(0, 10).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "neu-btn text-swazi-blue bg-[#e9eef5]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full neu-flat p-12 text-center text-slate-400 text-sm">
            Scanning for open requests...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full neu-flat p-12 text-center">
            <Hammer className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">No open requests right now</h3>
            <p className="text-xs text-slate-400 mt-1">Check back shortly or widen your location filter.</p>
          </div>
        ) : (
          filtered.map(req => (
            <div
              key={req.id}
              className="neu-flat p-5 sm:p-6 flex flex-col justify-between transition-all hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="glass-pill text-[10px] font-black uppercase text-swazi-blue px-2.5 py-0.5 rounded-full">
                    {req.categoryName}
                  </span>
                  <div className="neu-pressed px-3 py-1 rounded-xl text-right">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Budget</span>
                    <span className="text-sm sm:text-base font-black text-emerald-700">
                      SZL {req.budgetSzl.toLocaleString()}
                    </span>
                  </div>
                </div>

                <h3 className="font-black text-base text-slate-800 mt-2.5">{req.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{req.description}</p>

                <div className="mt-3.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-bold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {req.town}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Window: {req.biddingWindowHours}h
                  </span>
                  {req.deliveryNeeded && (
                    <span className="glass-pill text-[10px] font-bold text-amber-800 px-2 py-0.5 rounded-full">
                      Delivery Needed
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {req.bids?.length || 0} existing offers
                </span>
                <button
                  onClick={() => setActiveRequestForBid(req)}
                  className="neu-btn-success flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Bid on Job</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bid Modal */}
      <BidModal
        isOpen={!!activeRequestForBid}
        onClose={() => setActiveRequestForBid(null)}
        request={activeRequestForBid}
        onSubmitSuccess={() => {
          fetchRequests();
          alert("Your bid was submitted! The customer can now evaluate your offer.");
        }}
      />
    </div>
  );
};
