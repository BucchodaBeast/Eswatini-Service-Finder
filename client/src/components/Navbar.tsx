import React from "react";
import { Hammer, MapPin, PlusCircle, BarChart3, UserCheck, ShieldCheck } from "lucide-react";

interface NavbarProps {
  activeTab: "marketplace" | "provider-feed" | "nodes" | "register" | "eie";
  setActiveTab: (tab: "marketplace" | "provider-feed" | "nodes" | "register" | "eie") => void;
  onOpenPostModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPostModal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Banner */}
      <div className="bg-swazi-blue text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold tracking-tight text-lg flex items-center gap-1.5">
              <span className="bg-swazi-yellow text-swazi-dark px-1.5 py-0.5 rounded text-xs font-black">SZ</span>
              Eswatini Service & Product Finder
            </span>
            <span className="hidden sm:inline-block text-xs bg-blue-700 text-blue-100 px-2 py-0.5 rounded-full">
              Mbabane • Ezulwini • Matsapha • Manzini
            </span>
          </div>
          <button
            onClick={onOpenPostModal}
            className="flex items-center gap-1.5 bg-swazi-yellow hover:bg-yellow-400 text-swazi-dark font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-sm transition active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Need</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition ${
              activeTab === "marketplace"
                ? "bg-blue-50 text-swazi-blue font-bold border-b-2 border-swazi-blue"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>Reverse Auctions</span>
          </button>

          <button
            onClick={() => setActiveTab("provider-feed")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition ${
              activeTab === "provider-feed"
                ? "bg-blue-50 text-swazi-blue font-bold border-b-2 border-swazi-blue"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Provider Bidding Feed</span>
          </button>

          <button
            onClick={() => setActiveTab("nodes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition ${
              activeTab === "nodes"
                ? "bg-blue-50 text-swazi-blue font-bold border-b-2 border-swazi-blue"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>ATMs & MoMo Points</span>
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition ${
              activeTab === "register"
                ? "bg-blue-50 text-swazi-blue font-bold border-b-2 border-swazi-blue"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Join as Provider</span>
          </button>

          <button
            onClick={() => setActiveTab("eie")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md whitespace-nowrap transition ${
              activeTab === "eie"
                ? "bg-blue-50 text-swazi-blue font-bold border-b-2 border-swazi-blue"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Economic Index (EIE)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
