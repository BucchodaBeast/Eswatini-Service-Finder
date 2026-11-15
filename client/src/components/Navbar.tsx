import React from "react";
import { Hammer, MapPin, PlusCircle, BarChart3, UserCheck, ShieldCheck, Sparkles } from "lucide-react";

interface NavbarProps {
  activeTab: "marketplace" | "provider-feed" | "nodes" | "register" | "eie";
  setActiveTab: (tab: "marketplace" | "provider-feed" | "nodes" | "register" | "eie") => void;
  onOpenPostModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPostModal }) => {
  return (
    <header className="sticky top-0 z-40 glass-nav transition-all">
      {/* Top Bar with Branding & Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-flat flex items-center justify-center text-swazi-blue shadow-sm">
              <span className="font-black text-sm tracking-tighter bg-gradient-to-br from-swazi-blue to-blue-700 bg-clip-text text-transparent">
                SZ
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-800">
                  Eswatini Finder
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full glass-pill text-blue-700">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Hyper-Local Marketplace
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Mbabane • Ezulwini • Matsapha • Manzini
              </p>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={onOpenPostModal}
            className="neu-btn-primary flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide"
          >
            <PlusCircle className="w-4 h-4 text-amber-300" />
            <span>Post a Need</span>
          </button>
        </div>

        {/* Sunken Neumorphic Tab Bar */}
        <div className="mt-3 overflow-x-auto no-scrollbar py-1">
          <nav className="neu-pressed p-1.5 inline-flex items-center gap-1 sm:gap-2 rounded-2xl min-w-full sm:min-w-0">
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "marketplace"
                  ? "neu-btn text-swazi-blue shadow-md bg-[#e9eef5]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>Reverse Auctions</span>
            </button>

            <button
              onClick={() => setActiveTab("provider-feed")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "provider-feed"
                  ? "neu-btn text-swazi-blue shadow-md bg-[#e9eef5]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Provider Bids</span>
            </button>

            <button
              onClick={() => setActiveTab("nodes")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "nodes"
                  ? "neu-btn text-swazi-blue shadow-md bg-[#e9eef5]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>ATMs & MoMo</span>
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "register"
                  ? "neu-btn text-swazi-blue shadow-md bg-[#e9eef5]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Join as Provider</span>
            </button>

            <button
              onClick={() => setActiveTab("eie")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "eie"
                  ? "neu-btn text-swazi-blue shadow-md bg-[#e9eef5]"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Economic Index (EIE)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
