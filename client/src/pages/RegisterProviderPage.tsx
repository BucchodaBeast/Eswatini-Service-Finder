import React, { useState } from "react";
import { UserCheck, ShieldCheck, Building2, Store, MapPin, Tag, Sparkles, DollarSign, FileText } from "lucide-react";
import { Category } from "../types";

interface RegisterProviderPageProps {
  categories: Category[];
  onOpenInquiryKit: () => void;
}

export const RegisterProviderPage: React.FC<RegisterProviderPageProps> = ({
  categories,
  onOpenInquiryKit
}) => {
  const [providerType, setProviderType] = useState<"INFORMAL" | "FORMAL">("INFORMAL");
  const [businessName, setBusinessName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("Mbabane CBD");
  const [exactLocation, setExactLocation] = useState("");
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [taxPin, setTaxPin] = useState("");
  const [serviceRadiusKm, setServiceRadiusKm] = useState(10);
  const [servicesOfferedText, setServicesOfferedText] = useState("");
  const [startingPriceSzl, setStartingPriceSzl] = useState("");
  const [bio, setBio] = useState("");
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
    if (!businessName || !phoneNumber || !exactLocation) {
      alert("Please fill in business name, phone number, and exact location.");
      return;
    }

    const servicesList = servicesOfferedText
      ? servicesOfferedText.split(",").map(s => s.trim()).filter(Boolean)
      : [businessName];

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
          neighborhood,
          exactLocation,
          serviceRadiusKm,
          categoryIds: selectedCategoryIds.length > 0 ? selectedCategoryIds : ["general"],
          servicesOffered: servicesList,
          startingPriceSzl: startingPriceSzl ? parseFloat(startingPriceSzl) : undefined,
          bio
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Your service profile is live in Mbabane! Customers searching for nearest services can now discover and contact you directly.");
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
      <div className="neu-flat anim-card p-6 sm:p-8 text-center">
        <span className="glass-pill text-[11px] font-black uppercase tracking-wider text-swazi-blue px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Mbabane Provider Hub
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
          List Your Service in Mbabane
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Whether you are a self-hired hairstylist, nail tech, chicken dust stall in the market, or mobile mechanic—get discovered by nearby clients in Mbabane.
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
            <span>Self-Hired / Micro-Vendor</span>
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
            <span>Registered Business / Facility</span>
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenInquiryKit}
            className="text-xs font-bold text-swazi-blue hover:underline flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Need a paper enquiry slip to sign up vendors on the street? Click here.</span>
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
            You are now discoverable when clients search for the nearest services in your Mbabane neighborhood.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="neu-flat anim-card p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                {providerType === "INFORMAL" ? "Trade / Service / Stall Name *" : "Registered Business Name *"}
              </label>
              <input
                type="text"
                required
                placeholder={providerType === "INFORMAL" ? "e.g. Sindi Knotless Braids / Lindiwe Nails" : "e.g. Mbabane Industrial Hydraulics"}
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Proprietor / Contact Name
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
                Phone Number (WhatsApp & Direct Calls) *
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
                Mbabane Neighborhood Hub *
              </label>
              <select
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                className="neu-input w-full px-3 py-2.5 rounded-xl text-slate-800 text-xs"
              >
                <option value="Mbabane CBD">Mbabane CBD / Central</option>
                <option value="Swazi Plaza & The Mall">Swazi Plaza & The Mall</option>
                <option value="Bus Rank & Market">Bus Rank & Market</option>
                <option value="Sheffield Road">Sheffield Road Industrial</option>
                <option value="Msunduza">Msunduza</option>
                <option value="Fonteyn">Fonteyn</option>
                <option value="Sidwashini">Sidwashini</option>
                <option value="Eveni">Eveni</option>
                <option value="Mahwalala">Mahwalala</option>
                <option value="Checkers">Checkers / Mountain View</option>
                <option value="Woodlands">Woodlands</option>
                <option value="Nkoyoyo">Nkoyoyo / Motshane</option>
              </select>
            </div>
          </div>

          {/* Exact Location or Mobile */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Exact Stall / Shop / Mobile Address in Mbabane *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Container 8 (Pink Door), Bus Rank Walkway OR Mobile - Travel to client's house in Eveni"
              value={exactLocation}
              onChange={e => setExactLocation(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Detailed Services Menu */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Granular Offerings (Comma-separated) *
            </label>
            <input
              type="text"
              placeholder="e.g. Knotless Braids, Passion Twists, Straight Back Cornrows, Wig Wash, House Calls"
              value={servicesOfferedText}
              onChange={e => setServicesOfferedText(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                <DollarSign className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                Starting / Average Price (SZL)
              </label>
              <input
                type="number"
                placeholder="e.g. 150"
                value={startingPriceSzl}
                onChange={e => setStartingPriceSzl(e.target.value)}
                className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Operating Radius (km around Mbabane): {serviceRadiusKm} km
              </label>
              <input
                type="range"
                min="2"
                max="30"
                value={serviceRadiusKm}
                onChange={e => setServiceRadiusKm(Number(e.target.value))}
                className="w-full accent-swazi-blue cursor-pointer mt-2"
              />
            </div>
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Short Description / Experience
            </label>
            <textarea
              rows={2}
              placeholder="Tell clients about your quality, working hours, and whether you do house visits..."
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="neu-input w-full px-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Verification Badges */}
          {providerType === "INFORMAL" ? (
            <div className="neu-pressed p-4 rounded-xl space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Optional Tier 1 Trust Badge (National ID / MoMo)
              </span>
              <p className="text-[11px] text-slate-500">
                Entering your Swazi National ID awards you an "ID-Verified" badge to boost client trust.
              </p>
              <input
                type="text"
                placeholder="Swazi National ID (e.g. 940815...)"
                value={nationalIdNumber}
                onChange={e => setNationalIdNumber(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-lg text-slate-800 text-xs mt-1"
              />
            </div>
          ) : (
            <div className="neu-pressed p-4 rounded-xl space-y-1.5">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                Tier 2 Formal Verification (Tax PIN / License)
              </span>
              <input
                type="text"
                placeholder="ERS Tax Identification Number (TIN)"
                value={taxPin}
                onChange={e => setTaxPin(e.target.value)}
                className="neu-input w-full px-3 py-2 rounded-lg text-slate-800 text-xs mt-1"
              />
            </div>
          )}

          {/* Categories */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
              Select Matching Categories
            </label>
            <div className="neu-pressed p-2.5 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-btn-primary w-full py-3.5 px-6 rounded-2xl font-black text-sm tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? "Publishing Profile..." : "List My Service in Mbabane"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
