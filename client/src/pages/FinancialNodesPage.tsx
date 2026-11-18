import React, { useState, useEffect } from "react";
import { MapPin, AlertTriangle, CheckCircle, RefreshCw, Smartphone, Landmark, Building2, Sparkles } from "lucide-react";
import { FinancialNode } from "../types";

export const FinancialNodesPage: React.FC = () => {
  const [nodes, setNodes] = useState<FinancialNode[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [reportingNodeId, setReportingNodeId] = useState<string | null>(null);

  const fetchNodes = async () => {
    try {
      const url = selectedTown === "ALL" ? "/api/nodes" : `/api/nodes?town=${selectedTown}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setNodes(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodes();
  }, [selectedTown]);

  const handleReportIssue = async (nodeId: string, issueType: string) => {
    try {
      const res = await fetch(`/api/nodes/${nodeId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueType })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchNodes();
        setReportingNodeId(null);
      }
    } catch (err) {
      alert("Failed to submit report.");
    }
  };

  const filtered = nodes.filter(n => {
    if (selectedType !== "ALL" && n.nodeType !== selectedType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Neumorphic Header */}
      <div className="neu-flat p-6 sm:p-8">
        <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          MOD-04: Geospatial & Financial Node Locator
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Financial Access Points in Eswatini
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Locate nearby bank ATMs (FNB, Standard Bank, Nedbank, SBS) and CashPlus / MTN MoMo cash-out points across Mbabane, Ezulwini, Matsapha, and Manzini. Real-time community reporting prevents unnecessary journeys.
        </p>

        {/* Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Town:</span>
            <div className="neu-pressed p-1 rounded-2xl flex items-center gap-1">
              {["ALL", "Mbabane", "Ezulwini", "Matsapha", "Manzini"].map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTown(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedTown === t
                      ? "neu-btn text-swazi-blue bg-[#e9eef5]"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t === "ALL" ? "All Towns" : t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Type:</span>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="neu-input px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700"
            >
              <option value="ALL">All Nodes</option>
              <option value="ATM">Bank ATMs Only</option>
              <option value="AGENT_POINT">MoMo / CashPlus Agents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full neu-flat anim-shimmer p-12 text-center text-slate-400 text-sm">
            Locating nearby financial nodes...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full neu-flat p-12 text-center">
            <Landmark className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700">No access points found</h3>
            <p className="text-xs text-slate-400 mt-1">Try selecting another town or node filter.</p>
          </div>
        ) : (
          filtered.map(node => {
            const isAtm = node.nodeType === "ATM";
            const isMoMo = node.operator === "MTN MoMo";

            return (
              <div
                key={node.id}
                className="neu-flat anim-card p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`glass-pill text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        isAtm
                          ? "text-purple-800"
                          : isMoMo
                          ? "text-amber-900"
                          : "text-emerald-800"
                      }`}
                    >
                      {isAtm ? <Building2 className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {node.operator}
                    </span>

                    {/* Operational Status Tag */}
                    {node.operationalStatus === "VERIFIED_ACTIVE" ? (
                      <span className="glass-pill flex items-center gap-1 text-[10px] font-black text-emerald-700 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Active & Dispensing
                      </span>
                    ) : node.operationalStatus === "OUT_OF_CASH" ? (
                      <span className="glass-pill flex items-center gap-1 text-[10px] font-black text-red-700 px-2.5 py-1 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        Reported Empty
                      </span>
                    ) : (
                      <span className="glass-pill flex items-center gap-1 text-[10px] font-black text-amber-700 px-2.5 py-1 rounded-full">
                        <RefreshCw className="w-3 h-3 text-amber-600" />
                        Issue Reported
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-base text-slate-800 mt-3">{node.name}</h3>

                  <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{node.landmark}, <strong className="text-slate-800">{node.town}</strong></span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {node.services.map((svc, idx) => (
                      <span
                        key={idx}
                        className="neu-pressed text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-lg"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer and Report Action */}
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {node.userReportsCount > 0 ? `${node.userReportsCount} user report(s)` : "Verified working"}
                  </span>

                  {reportingNodeId === node.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReportIssue(node.id, "OUT_OF_CASH")}
                        className="neu-btn px-2 py-1 rounded-lg text-[10px] font-black text-red-600"
                      >
                        Out of Cash
                      </button>
                      <button
                        onClick={() => handleReportIssue(node.id, "NETWORK_OFFLINE")}
                        className="neu-btn px-2 py-1 rounded-lg text-[10px] font-black text-amber-600"
                      >
                        Offline
                      </button>
                      <button
                        onClick={() => setReportingNodeId(null)}
                        className="text-[10px] text-slate-400 px-1 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReportingNodeId(node.id)}
                      className="neu-btn px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-600 hover:text-red-600 flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span>Report Status</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
