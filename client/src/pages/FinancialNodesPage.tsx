import React, { useState, useEffect } from "react";
import { MapPin, AlertTriangle, CheckCircle, RefreshCw, Smartphone, Landmark, Building2, ThumbsUp } from "lucide-react";
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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-lg">
        <span className="bg-swazi-yellow text-swazi-dark text-xs font-black px-2.5 py-0.5 rounded uppercase">
          MOD-04: Geospatial & Financial Node Engine
        </span>
        <h1 className="text-2xl font-black mt-2">
          Everyday Financial Access Points in Eswatini
        </h1>
        <p className="text-blue-200 text-xs mt-1 max-w-2xl">
          Locate nearby ATMs (FNB, Standard Bank, Nedbank, SBS) and CashPlus / MTN MoMo cash-out agents across Mbabane, Ezulwini, Matsapha, and Manzini. Real-time community reported status helps avoid dead trips.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Town:</span>
          {["ALL", "Mbabane", "Ezulwini", "Matsapha", "Manzini"].map(t => (
            <button
              key={t}
              onClick={() => setSelectedTown(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedTown === t
                  ? "bg-swazi-blue text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t === "ALL" ? "All Towns" : t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase">Type:</span>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-swazi-blue"
          >
            <option value="ALL">All Nodes</option>
            <option value="ATM">Bank ATMs Only</option>
            <option value="AGENT_POINT">MoMo / CashPlus Agents</option>
          </select>
        </div>
      </div>

      {/* Nodes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-400 text-sm">
            Loading financial nodes...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-gray-200 text-center">
            <Landmark className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-bold text-gray-700">No access points found</h3>
            <p className="text-xs text-gray-400 mt-1">Try selecting another town or type.</p>
          </div>
        ) : (
          filtered.map(node => {
            const isAtm = node.nodeType === "ATM";
            const isMoMo = node.operator === "MTN MoMo";
            const isFnb = node.operator === "FNB Eswatini";

            return (
              <div
                key={node.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 ${
                        isAtm
                          ? "bg-purple-100 text-purple-800"
                          : isMoMo
                          ? "bg-yellow-100 text-yellow-900"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isAtm ? <Building2 className="w-3 h-3" /> : <Smartphone className="w-3 h-3" />}
                      {node.operator}
                    </span>

                    {/* Operational Status Tag */}
                    {node.operationalStatus === "VERIFIED_ACTIVE" ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        Active & Dispensing
                      </span>
                    ) : node.operationalStatus === "OUT_OF_CASH" ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        Reported Out of Cash
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <RefreshCw className="w-3 h-3 text-amber-600" />
                        Issue Reported
                      </span>
                    )}
                  </div>

                  <h3 className="font-black text-base text-gray-900 mt-2">{node.name}</h3>

                  <div className="mt-2 flex items-start gap-1.5 text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{node.landmark}, <strong>{node.town}</strong></span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {node.services.map((svc, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-400">
                    {node.userReportsCount > 0 ? `${node.userReportsCount} user report(s)` : "No issues"}
                  </span>

                  {reportingNodeId === node.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleReportIssue(node.id, "OUT_OF_CASH")}
                        className="text-[10px] bg-red-600 text-white font-bold px-2 py-1 rounded"
                      >
                        No Cash
                      </button>
                      <button
                        onClick={() => handleReportIssue(node.id, "NETWORK_OFFLINE")}
                        className="text-[10px] bg-amber-600 text-white font-bold px-2 py-1 rounded"
                      >
                        Offline
                      </button>
                      <button
                        onClick={() => setReportingNodeId(null)}
                        className="text-[10px] text-gray-400 px-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReportingNodeId(node.id)}
                      className="text-xs text-gray-500 hover:text-red-600 font-semibold flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
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
