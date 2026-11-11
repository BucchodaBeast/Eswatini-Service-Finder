import React, { useState, useEffect } from "react";
import { Hammer, MapPin, DollarSign, Clock, ShieldCheck, Filter } from "lucide-react";
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
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-black px-2.5 py-0.5 rounded uppercase">
              Provider Dispatch Feed
            </span>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Live Customer Opportunities in Eswatini
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Find verified customers looking for services in your area. Submit your price, estimated time, and delivery terms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-bold uppercase">Town:</span>
            <select
              value={selectedTown}
              onChange={e => setSelectedTown(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-swazi-blue"
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

        {/* Quick Category filter pills */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setSelectedCategory("ALL")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === "ALL"
                ? "bg-swazi-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Categories ({categories.length})
          </button>
          {categories.slice(0, 10).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-swazi-blue text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-400 text-sm">
            Searching for active requests...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-gray-200 text-center">
            <Hammer className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-bold text-gray-700">No open requests right now</h3>
            <p className="text-xs text-gray-400 mt-1">Check back in a few minutes or widen your location filter.</p>
          </div>
        ) : (
          filtered.map(req => (
            <div
              key={req.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-swazi-blue">
                    {req.categoryName}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Seeker Budget</span>
                    <span className="text-base font-black text-green-700">
                      SZL {req.budgetSzl.toLocaleString()}
                    </span>
                  </div>
                </div>

                <h3 className="font-black text-base text-gray-900 mt-2">{req.title}</h3>
                <p className="text-xs text-gray-600 mt-1.5">{req.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {req.town}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    Window: {req.biddingWindowHours}h
                  </span>
                  {req.deliveryNeeded && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Client needs delivery
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {req.bids?.length || 0} existing offers
                </span>
                <button
                  onClick={() => setActiveRequestForBid(req)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Bid on this Job</span>
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
