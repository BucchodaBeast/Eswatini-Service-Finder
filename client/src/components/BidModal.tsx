import React, { useState } from "react";
import { X, DollarSign, Clock, Truck, ShieldCheck, Sparkles } from "lucide-react";
import { CustomerRequest } from "../types";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: CustomerRequest | null;
  onSubmitSuccess: () => void;
}

export const BidModal: React.FC<BidModalProps> = ({
  isOpen,
  onClose,
  request,
  onSubmitSuccess
}) => {
  const [priceSzl, setPriceSzl] = useState("");
  const [deliveryFeeSzl, setDeliveryFeeSzl] = useState("0");
  const [estimatedHours, setEstimatedHours] = useState("2");
  const [providerBusiness, setProviderBusiness] = useState("");
  const [providerPhone, setProviderPhone] = useState("");
  const [providerTier, setProviderTier] = useState("INFORMAL_UNVERIFIED");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !request) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!priceSzl || !providerBusiness || !providerPhone) {
      setError("Please fill out price, business name and phone.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: request.id,
          priceSzl: parseFloat(priceSzl),
          deliveryFeeSzl: parseFloat(deliveryFeeSzl) || 0,
          estimatedHours: parseInt(estimatedHours) || 2,
          providerBusiness,
          providerPhone,
          providerTier,
          notes
        })
      });

      const data = await res.json();
      if (data.success) {
        onSubmitSuccess();
        onClose();
      } else {
        setError(data.error || "Failed to submit bid.");
      }
    } catch (err: any) {
      setError(err.message || "Network error submitting bid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 relative my-8 border border-white/80 shadow-2xl">
        <button
          onClick={onClose}
          className="neu-btn w-9 h-9 rounded-full flex items-center justify-center absolute top-5 right-5 text-slate-500 hover:text-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-emerald-700 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Structured Provider Bid
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Bid on: {request.title}
          </h2>
          <div className="mt-2 neu-pressed p-2.5 rounded-xl flex items-center justify-between text-xs text-slate-600">
            <span>Target Budget: <strong className="text-emerald-700 font-black">SZL {request.budgetSzl.toLocaleString()}</strong></span>
            <span>Location: <strong className="text-slate-800 font-black">{request.town}</strong></span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Trade / Business Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sipho Auto Services"
                value={providerBusiness}
                onChange={e => setProviderBusiness(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={providerPhone}
                onChange={e => setProviderPhone(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Provider Spectrum / Verification Tier
            </label>
            <select
              value={providerTier}
              onChange={e => setProviderTier(e.target.value)}
              className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
            >
              <option value="INFORMAL_UNVERIFIED">Informal Micro-Vendor (Self-declared)</option>
              <option value="TIER1_ID_VERIFIED">Tier 1: National ID / MoMo Verified</option>
              <option value="TIER2_BUSINESS_VERIFIED">Tier 2: Registered Business (Tax PIN / License)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                Price (SZL) *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="1100"
                value={priceSzl}
                onChange={e => setPriceSzl(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 font-bold placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <Truck className="w-3.5 h-3.5 inline mr-1 text-blue-500" />
                Delivery (SZL)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={deliveryFeeSzl}
                onChange={e => setDeliveryFeeSzl(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 font-bold placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                ETA (Hours)
              </label>
              <input
                type="number"
                min="1"
                placeholder="2"
                value={estimatedHours}
                onChange={e => setEstimatedHours(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 font-bold placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Proposal Notes & Warranty
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Includes 6-month warranty, can start immediately at your premises..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-btn-success w-full py-3 px-6 rounded-2xl font-black text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Offer..." : "Submit Structured Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
