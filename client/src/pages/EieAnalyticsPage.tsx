import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, ShieldAlert, Layers, Activity, Lock, Sparkles } from "lucide-react";
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
    return <div className="neu-flat p-12 text-center text-slate-400 text-sm">Loading economic intelligence layer...</div>;
  }

  if (!metrics) {
    return <div className="neu-flat p-12 text-center text-slate-500 text-sm">No economic telemetry available yet.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Dark Frosted Glass Banner with Telemetry Counter Wells */}
      <div className="glass-card-dark p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="glass-pill text-[10px] font-black uppercase text-amber-300 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              EIE Layer (V2 Specification)
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Experimental Local Telemetry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Eswatini Informal Economic Index (EIE)
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Aggregating hyper-local reverse-auction bids, pricing benchmarks, and category supply-demand patterns across Mbabane, Ezulwini, and Manzini into privacy-safe local economic indicators.
          </p>

          {/* Stats Row with Sunken Glass Wells */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="glass-pill p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Marketplace Events</span>
              <span className="text-2xl font-black text-white mt-1 block">{metrics.totalMarketplaceEvents}</span>
            </div>
            <div className="glass-pill p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Active Requests</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">{metrics.activeRequestsCount}</span>
            </div>
            <div className="glass-pill p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Active Providers</span>
              <span className="text-2xl font-black text-sky-400 mt-1 block">{metrics.registeredProvidersCount}</span>
            </div>
            <div className="glass-pill p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">Target Corridor</span>
              <span className="text-sm font-black text-amber-300 mt-2 block">MR3 Urban Spine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Benchmarks Neumorphic Card */}
      <div className="neu-flat p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-swazi-blue" />
            <span>Observed Price Benchmarks by Category</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Derived from submitted structured bids and accepted customer offers in Eswatini.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-2">Trade / Service Category</th>
                <th className="pb-3 px-2">Town Hub</th>
                <th className="pb-3 px-2 text-right">Observations</th>
                <th className="pb-3 px-2 text-right">Avg Bid (SZL)</th>
                <th className="pb-3 px-2 text-right">Observed Spread</th>
                <th className="pb-3 px-2 text-right">Activity Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {metrics.benchmarks.map((b, idx) => (
                <tr key={idx} className="hover:bg-white/40 transition">
                  <td className="py-3 px-2 font-black text-slate-800">{b.category}</td>
                  <td className="py-3 px-2 text-slate-600 font-medium">{b.town}</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-700">{b.observationCount}</td>
                  <td className="py-3 px-2 text-right font-black text-emerald-700">
                    SZL {b.averageWinningOrBidSzl.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-600 font-mono font-bold text-[11px]">{b.priceRange}</td>
                  <td className="py-3 px-2 text-right">
                    <span className="glass-pill text-swazi-blue font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                      {b.demandSurgeAlert}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Governance & Privacy Notice (Frosted Glass Card) */}
      <div className="glass-card p-5 sm:p-6 text-xs text-amber-950 space-y-2 border border-amber-200/60 shadow-lg">
        <div className="flex items-center gap-2 font-extrabold text-amber-950">
          <Lock className="w-4 h-4 text-amber-700" />
          <span>EIE Governance & Privacy Safeguards</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-[11px]">
          {metrics.privacyNotice} In compliance with statistical integrity and the Eswatini Data Protection Act (2022), submitted bids are strictly distinguished from final settled payments. Micro-inflation indices require consistent repeat observations and cannot be presented as official CPI without Central Statistical Office (CSO) validation.
        </p>
      </div>
    </div>
  );
};
