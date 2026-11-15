import React, { useState } from "react";
import { UserCheck, ShieldCheck, Building2, Store, MapPin, Tag, Sparkles } from "lucide-react";
import { Category } from "../types";

interface RegisterProviderPageProps {
  categories: Category[];
}

export const RegisterProviderPage: React.FC<RegisterProviderPageProps> = ({ categories }) => {
  const [providerType, setProviderType] = useState<"INFORMAL" | "FORMAL">("INFORMAL");
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [town, setTown] = useState("Manzini");
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [taxPin, setTaxPin] = useState("");
  const [serviceRadiusKm, setServiceRadiusKm] = useState(25);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(c => c !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phoneNumber || !town) {
      alert("Please fill required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          businessName,
          phoneNumber,
          tier: providerType === "FORMAL" ? "TIER2_BUSINESS_VERIFIED" : (nationalIdNumber ? "TIER1_ID_VERIFIED" : "INFORMAL_UNVERIFIED"),
          nationalIdNumber: providerType === "INFORMAL" ? nationalIdNumber : undefined,
          taxPin: providerType === "FORMAL" ? taxPin : undefined,
          town,
          serviceRadiusKm,
          categoryIds: selectedCategoryIds
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Registration successful! You are now listed in the Eswatini Provider Registry and will receive matching customer reverse auctions.");
      }
    } catch (err) {
      alert("Error registering provider.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header and Spectrum Switcher */}
      <div className="neu-flat p-6 sm:p-8 text-center">
        <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          MOD-03: Dual-Spectrum Provider Registry
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
          Join as a Service Provider
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          From informal township artisans and street vendors to registered companies in Matsapha—receive direct customer leads across Eswatini.
        </p>

        {/* Dual Spectrum Sunken Switch */}
        <div className="mt-6 neu-pressed p-1.5 inline-flex rounded-2xl">
          <button
            type="button"
            onClick={() => setProviderType("INFORMAL")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              providerType === "INFORMAL"
                ? "neu-btn text-swazi-blue bg-[#e9eef5]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Informal Micro-Vendor</span>
          </button>
          <button
            type="button"
            onClick={() => setProviderType("FORMAL")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              providerType === "FORMAL"
                ? "neu-btn text-swazi-blue bg-[#e9eef5]"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Formal Business / Institution</span>
          </button>
        </div>
      </div>

      {successMessage ? (
        <div className="glass-card p-8 text-center space-y-3 border-2 border-emerald-400">
          <div className="w-14 h-14 rounded-2xl neu-flat flex items-center justify-center text-emerald-600 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-800">{successMessage}</h2>
          <p className="text-xs text-slate-600">
            Head over to the Provider Bids feed to start submitting offers for customer requests in your area.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="neu-flat p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                {providerType === "INFORMAL" ? "Trade / Stall / Service Name *" : "Registered Company Name *"}
              </label>
              <input
                type="text"
                required
                placeholder={providerType === "INFORMAL" ? "e.g. Sindi's Fresh Braai & Chicken Dust" : "e.g. Eswatini Industrial Hydraulics Ltd"}
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Person Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sindi Dlamini"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (WhatsApp / Calls) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Operating Town *
              </label>
              <select
                value={town}
                onChange={e => setTown(e.target.value)}
                className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
              >
                <option value="Manzini">Manzini</option>
                <option value="Mbabane">Mbabane</option>
                <option value="Ezulwini">Ezulwini</option>
                <option value="Matsapha">Matsapha</option>
                <option value="Nhlangano">Nhlangano</option>
                <option value="Siteki">Siteki</option>
                <option value="Piggs Peak">Piggs Peak</option>
              </select>
            </div>
          </div>

          {/* Verification Tier Fields */}
          {providerType === "INFORMAL" ? (
            <div className="neu-pressed p-4 rounded-xl space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Optional Tier 1 Verification (National ID / MoMo link)
              </span>
              <p className="text-[11px] text-slate-500">
                Entering your Swazi National ID awards you a "Verified Vendor" trust badge on submitted bids.
              </p>
              <input
                type="text"
                placeholder="National ID Number (e.g. 950101...)"
                value={nationalIdNumber}
                onChange={e => setNationalIdNumber(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-lg text-slate-800 text-xs mt-1"
              />
            </div>
          ) : (
            <div className="neu-pressed p-4 rounded-xl space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Tier 2 Formal Verification (Tax PIN / Trading License)
              </span>
              <p className="text-[11px] text-slate-500">
                Unlocks institutional contracts and formal procurement tenders.
              </p>
              <input
                type="text"
                placeholder="ERS Tax Identification Number (TIN)"
                value={taxPin}
                onChange={e => setTaxPin(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-lg text-slate-800 text-xs mt-1"
              />
            </div>
          )}

          {/* Service Radius Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Service Radius: <span className="text-swazi-blue font-black">{serviceRadiusKm} km</span>
              </label>
              <span className="text-xs text-slate-400">Around {town}</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              value={serviceRadiusKm}
              onChange={e => setServiceRadiusKm(Number(e.target.value))}
              className="w-full accent-swazi-blue cursor-pointer"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Offerings ({selectedCategoryIds.length} selected)
            </label>
            <div className="neu-pressed p-2.5 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
              {categories.map(c => {
                const isSelected = selectedCategoryIds.includes(c.id);
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => toggleCategory(c.id)}
                    className={`p-2 text-left rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "neu-btn-primary shadow-sm"
                        : "neu-btn text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-btn-primary w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? "Registering Provider..." : "Complete Provider Registration"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
