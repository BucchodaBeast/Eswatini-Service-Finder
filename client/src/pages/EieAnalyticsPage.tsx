import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, ShieldAlert, Layers, Activity, Lock } from "lucide-react";
import { EieMetrics } from "../types";

export const EieAnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<EieMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics/eie")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMetrics(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-gray-400 text-sm">Loading economic intelligence layer...</div>;
  }

  if (!metrics) {
    return <div className="p-12 text-center text-gray-500 text-sm">No economic telemetry available yet.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-amber-400 text-black text-xs font-black px-2.5 py-0.5 rounded uppercase">
            Data Layer (V2 Specification)
          </span>
          <span className="text-xs text-gray-400">Experimental Micro-Telemetry</span>
        </div>
        <h1 className="text-2xl font-black">
          Eswatini Informal Economic Index (EIE)
        </h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
          Aggregating hyper-local reverse-auction bids, pricing benchmarks, and category supply-demand patterns across Mbabane, Ezulwini, and Manzini into privacy-safe local economic indicators.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Marketplace Events</span>
            <span className="text-xl font-black text-white">{metrics.totalMarketplaceEvents}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Active Requests</span>
            <span className="text-xl font-black text-emerald-400">{metrics.activeRequestsCount}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Active Providers</span>
            <span className="text-xl font-black text-sky-400">{metrics.registeredProvidersCount}</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Target Corridor</span>
            <span className="text-xs font-bold text-yellow-300">MR3 Urban Spine</span>
          </div>
        </div>
      </div>

      {/* Pricing Benchmarks Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-swazi-blue" />
              Observed Price Benchmarks by Category
            </h2>
            <p className="text-xs text-gray-500">
              Derived from submitted structured bids and accepted offers.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase">
                <th className="pb-3">Trade / Service Category</th>
                <th className="pb-3">Town Hub</th>
                <th className="pb-3 text-right">Observations</th>
                <th className="pb-3 text-right">Avg Bid (SZL)</th>
                <th className="pb-3 text-right">Observed Spread</th>
                <th className="pb-3 text-right">Activity Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {metrics.benchmarks.map((b, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-3 font-black text-gray-900">{b.category}</td>
                  <td className="py-3 text-gray-600 font-medium">{b.town}</td>
                  <td className="py-3 text-right font-semibold text-gray-700">{b.observationCount}</td>
                  <td className="py-3 text-right font-black text-green-700">
                    SZL {b.averageWinningOrBidSzl.toLocaleString()}
                  </td>
                  <td className="py-3 text-right text-gray-600 font-mono">{b.priceRange}</td>
                  <td className="py-3 text-right">
                    <span className="bg-blue-50 text-swazi-blue font-bold px-2 py-0.5 rounded text-[10px]">
                      {b.demandSurgeAlert}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Governance & Privacy Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-950">
          <Lock className="w-4 h-4 text-amber-700" />
          <span>EIE Governance & Privacy Safeguards</span>
        </div>
        <p>
          {metrics.privacyNotice} In compliance with statistical integrity and the Eswatini Data Protection Act (2022), submitted bids are strictly distinguished from final settled payments. Micro-inflation indices require consistent repeat observations and cannot be presented as official CPI without Central Statistical Office (CSO) validation.
        </p>
      </div>
    </div>
  );
};
