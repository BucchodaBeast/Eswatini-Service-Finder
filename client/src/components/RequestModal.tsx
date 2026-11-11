import React, { useState } from "react";
import { X, Clock, DollarSign, MapPin, Tag } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-swazi-blue bg-blue-50 rounded-full">
            Reverse Auction Engine
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-1">
            Describe Your Need & Get Bids
          </h2>
          <p className="text-xs text-gray-500">
            Nearby verified informal vendors and formal providers in Eswatini will submit competitive offers.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              What do you need? *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 12V Car Battery replacement / 30-person Spit Braai"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <Tag className="w-3.5 h-3.5 inline mr-1 text-swazi-blue" />
                Category
              </label>
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    [{c.sector}] {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-red-500" />
                Town / Area *
              </label>
              <select
                value={town}
                onChange={e => setTown(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
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

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Detailed Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide exact details: car model, dietary preferences, dimensions, or specific location..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-green-600" />
                Target Budget (SZL) *
              </label>
              <input
                type="number"
                required
                min="10"
                placeholder="e.g. 1200"
                value={budgetSzl}
                onChange={e => setBudgetSzl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                <Clock className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                Bidding Window
              </label>
              <select
                value={biddingWindowHours}
                onChange={e => setBiddingWindowHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
              >
                <option value={2}>2 Hours (Urgent)</option>
                <option value={4}>4 Hours</option>
                <option value={12}>12 Hours (Standard)</option>
                <option value={24}>24 Hours (Best price)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Optional"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="delivery"
              checked={deliveryNeeded}
              onChange={e => setDeliveryNeeded(e.target.checked)}
              className="rounded text-swazi-blue focus:ring-swazi-blue"
            />
            <label htmlFor="delivery" className="text-xs text-gray-700 font-medium">
              Requires delivery or mobile provider to travel to my location
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-swazi-blue hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Request to Local Providers"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
