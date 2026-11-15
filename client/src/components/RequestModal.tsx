import React, { useState } from "react";
import { X, Clock, DollarSign, MapPin, Tag, Sparkles } from "lucide-react";
import { Category } from "../types";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmitSuccess: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSubmitSuccess
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budgetSzl, setBudgetSzl] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [town, setTown] = useState("Manzini");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [deliveryNeeded, setDeliveryNeeded] = useState(false);
  const [biddingWindowHours, setBiddingWindowHours] = useState(12);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title || !description || !budgetSzl || !customerPhone) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedCat = categories.find(c => c.id === categoryId);
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          budgetSzl: parseFloat(budgetSzl),
          categoryId,
          categoryName: selectedCat?.name || "General Service",
          town,
          customerPhone,
          customerName: customerName || "Customer",
          deliveryNeeded,
          biddingWindowHours
        })
      });

      const data = await res.json();
      if (data.success) {
        onSubmitSuccess();
        onClose();
      } else {
        setError(data.error || "Failed to publish request.");
      }
    } catch (err: any) {
      setError(err.message || "Network error. Make sure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-card max-w-lg w-full p-6 sm:p-8 relative my-8 border border-white/80 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="neu-btn w-9 h-9 rounded-full flex items-center justify-center absolute top-5 right-5 text-slate-500 hover:text-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Reverse Auction Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Describe Your Need
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Nearby providers in Eswatini will submit competitive offers within your timeframe.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              What do you need? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 12V Car Battery replacement / 30-person Spit Braai"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category & Town */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <Tag className="w-3.5 h-3.5 inline mr-1 text-swazi-blue" />
                Category
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    [{c.sector}] {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-red-500" />
                Town / Hub *
              </label>
              <select
                value={town}
                onChange={e => setTown(e.target.value)}
                className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
              >
                <option value="Mbabane">Mbabane</option>
                <option value="Ezulwini">Ezulwini</option>
                <option value="Matsapha">Matsapha</option>
                <option value="Manzini">Manzini</option>
                <option value="Nhlangano">Nhlangano</option>
                <option value="Siteki">Siteki</option>
                <option value="Piggs Peak">Piggs Peak</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific Requirements *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide exact details: car model, dimensions, delivery address, or date needed..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Budget & Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                Target Budget (SZL) *
              </label>
              <input
                type="number"
                required
                min="10"
                placeholder="e.g. 1200"
                value={budgetSzl}
                onChange={e => setBudgetSzl(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 font-bold placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                Bidding Window
              </label>
              <select
                value={biddingWindowHours}
                onChange={e => setBiddingWindowHours(Number(e.target.value))}
                className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
              >
                <option value={2}>2 Hours (Urgent need)</option>
                <option value={4}>4 Hours</option>
                <option value={12}>12 Hours (Standard)</option>
                <option value={24}>24 Hours (Best rates)</option>
              </select>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Contact Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Optional"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Delivery Checkbox */}
          <div className="neu-flat-sm p-3 flex items-center gap-2.5">
            <input
              type="checkbox"
              id="delivery"
              checked={deliveryNeeded}
              onChange={e => setDeliveryNeeded(e.target.checked)}
              className="w-4 h-4 rounded text-swazi-blue accent-swazi-blue cursor-pointer"
            />
            <label htmlFor="delivery" className="text-xs text-slate-700 font-semibold cursor-pointer">
              Requires delivery or mobile provider to travel to my premises
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-btn-primary w-full py-3 px-6 rounded-2xl font-black text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? "Publishing Request..." : "Publish to Local Providers"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
