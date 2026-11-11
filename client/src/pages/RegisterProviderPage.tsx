import React, { useState } from "react";
import { UserCheck, ShieldCheck, Building2, Store, MapPin, Tag } from "lucide-react";
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
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
        <span className="bg-blue-100 text-swazi-blue text-xs font-black px-2.5 py-0.5 rounded uppercase">
          MOD-03: Dual-Spectrum Provider Registry
        </span>
        <h1 className="text-2xl font-black text-gray-900 mt-2">
          Join the Eswatini Service & Product Finder
        </h1>
        <p className="text-xs text-gray-500 mt-1 max-w-lg mx-auto">
          Whether you are an informal micro-vendor in Manzini market or a formal company in Matsapha industrial sites, get direct access to local demand.
        </p>

        {/* Dual Spectrum Toggle */}
        <div className="mt-6 inline-flex p-1 bg-gray-100 rounded-xl">
          <button
            type="button"
            onClick={() => setProviderType("INFORMAL")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition ${
              providerType === "INFORMAL"
                ? "bg-white text-swazi-blue shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Informal Micro-Vendor</span>
          </button>
          <button
            type="button"
            onClick={() => setProviderType("FORMAL")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition ${
              providerType === "FORMAL"
                ? "bg-white text-swazi-blue shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Formal Business / Institution</span>
          </button>
        </div>
      </div>

      {successMessage ? (
        <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-xl font-black text-green-900">{successMessage}</h2>
          <p className="text-xs text-green-700">Check the Provider Feed to bid on jobs matching your categories and location.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                {providerType === "INFORMAL" ? "Trade / Stall / Service Name *" : "Registered Company Name *"}
              </label>
              <input
                type="text"
                required
                placeholder={providerType === "INFORMAL" ? "e.g. Sindi's Fresh Braai & Chicken Dust" : "e.g. Eswatini Industrial Hydraulics Ltd"}
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sindi Dlamini"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Phone Number (WhatsApp / Calls) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 26876123456"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swazi-blue focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Primary Operating Town *
              </label>
              <select
                value={town}
                onChange={e => setTown(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
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
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase block mb-1">
                Optional Tier 1 Verification (National ID / MoMo link)
              </span>
              <p className="text-[11px] text-gray-500 mb-2">
                Providing your Swazi National ID grants you a "Verified Vendor" badge on your bids.
              </p>
              <input
                type="text"
                placeholder="National ID Number (e.g. 950101...)"
                value={nationalIdNumber}
                onChange={e => setNationalIdNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
              />
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase block mb-1">
                Tier 2 Formal Verification (Tax PIN / Trading License)
              </span>
              <p className="text-[11px] text-gray-500 mb-2">
                Enables corporate reverse-auction participation and procurement verification.
              </p>
              <input
                type="text"
                placeholder="ERS Tax Identification Number (TIN)"
                value={taxPin}
                onChange={e => setTaxPin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-swazi-blue focus:outline-none text-xs"
              />
            </div>
          )}

          {/* Service Radius Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700 uppercase">
                Service Radius: {serviceRadiusKm} km
              </label>
              <span className="text-xs text-gray-400">Around {town}</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              value={serviceRadiusKm}
              onChange={e => setServiceRadiusKm(Number(e.target.value))}
              className="w-full accent-swazi-blue"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
              Select Your Specialties ({selectedCategoryIds.length} selected)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50">
              {categories.map(c => {
                const isSelected = selectedCategoryIds.includes(c.id);
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => toggleCategory(c.id)}
                    className={`p-2 text-left rounded-lg text-xs font-medium border transition ${
                      isSelected
                        ? "bg-swazi-blue text-white border-swazi-blue"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-swazi-blue hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Complete Provider Registration"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
