import React, { useState } from "react";
import { X, DollarSign, Clock, Truck, ShieldCheck } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 rounded-full">
            Submit Structured Offer
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-1">
            Bid on: {request.title}
          </h2>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>Target Budget: <strong>SZL {request.budgetSzl.toLocaleString()}</strong></span>
            <span>•</span>
            <span>Location: <strong>{request.town}</strong></span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Business / Trade Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sipho Auto Services"
                value={providerBusiness}
                onChange={e => setProviderBusiness(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Contact Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={providerPhone}
                onChange={e => setProviderPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Provider Spectrum / Verification Tier
            </label>
            <select
              value={providerTier}
              onChange={e => setProviderTier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
            >
              <option value="INFORMAL_UNVERIFIED">Informal Micro-Vendor (Self-declared)</option>
              <option value="TIER1_ID_VERIFIED">Tier 1: National ID / MoMo Verified</option>
              <option value="TIER2_BUSINESS_VERIFIED">Tier 2: Registered Business (Tax PIN / License)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-green-600" />
                Your Price (SZL) *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="1100"
                value={priceSzl}
                onChange={e => setPriceSzl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <Truck className="w-3.5 h-3.5 inline mr-1 text-blue-500" />
                Delivery Fee (SZL)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={deliveryFeeSzl}
                onChange={e => setDeliveryFeeSzl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                ETA (Hours)
              </label>
              <input
                type="number"
                min="1"
                placeholder="2"
                value={estimatedHours}
                onChange={e => setEstimatedHours(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Proposal Notes & Guarantee
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Includes 6-month warranty, can start immediately at your premises..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting Offer..." : "Submit Structured Bid"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
