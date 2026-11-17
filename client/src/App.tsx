import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RequestModal } from "./components/RequestModal";
import { OnboardingInquiryModal } from "./components/OnboardingInquiryModal";
import { ProximitySearchPage } from "./pages/ProximitySearchPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import { FinancialNodesPage } from "./pages/FinancialNodesPage";
import { RegisterProviderPage } from "./pages/RegisterProviderPage";
import { EieAnalyticsPage } from "./pages/EieAnalyticsPage";
import { Category } from "./types";

export function App() {
  const [activeTab, setActiveTab] = useState<"search" | "auction" | "nodes" | "register" | "eie">("search");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isInquiryKitOpen, setIsInquiryKitOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#e9eef5] text-slate-800 flex flex-col font-sans selection:bg-swazi-blue selection:text-white">
      {/* Frosted Glass Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => setIsPostModalOpen(true)}
        onOpenInquiryKit={() => setIsInquiryKitOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Mode 1: Natural Prompting & Proximity Search */}
        {activeTab === "search" && (
          <ProximitySearchPage onOpenInquiryKit={() => setIsInquiryKitOpen(true)} />
        )}

        {/* Mode 2: Reverse Auction (Post Need with Budget & Receive Bids) */}
        {activeTab === "auction" && (
          <MarketplacePage
            categories={categories}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        )}

        {/* Financial Utility: ATMs & MoMo Locator */}
        {activeTab === "nodes" && (
          <FinancialNodesPage />
        )}

        {/* Provider Onboarding (Informal Micro-vendors & Formal Businesses) */}
        {activeTab === "register" && (
          <RegisterProviderPage
            categories={categories}
            onOpenInquiryKit={() => setIsInquiryKitOpen(true)}
          />
        )}

        {/* Mbabane Economic Index */}
        {activeTab === "eie" && (
          <EieAnalyticsPage />
        )}
      </main>

      {/* Global Post Request Modal */}
      <RequestModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        categories={categories}
        onSubmitSuccess={() => {
          setActiveTab("auction");
          alert("Your request is live! Providers in your Mbabane neighborhood have been notified to submit structured bids.");
        }}
      />

      {/* Field Onboarding & Handout Inquiry Kit Modal */}
      <OnboardingInquiryModal
        isOpen={isInquiryKitOpen}
        onClose={() => setIsInquiryKitOpen(false)}
      />

      {/* Neumorphic & Frosted Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200/60 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-lg neu-flat flex items-center justify-center text-[10px] font-black text-swazi-blue">
              SZ
            </div>
            <p className="text-xs font-black text-slate-700 tracking-tight">
              Mbabane Service & Product Finder • Hyper-Local Proximity & Reverse Auctions
            </p>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Mbabane CBD • Swazi Plaza • Bus Rank • Sheffield Rd • Msunduza • Fonteyn • Eveni • Sidwashini
          </p>
          <div className="pt-2 flex justify-center gap-4 text-xs font-bold text-swazi-blue">
            <button onClick={() => setIsInquiryKitOpen(true)} className="hover:underline">
              Vendor Recruitment Handout Kit
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab("register")} className="hover:underline">
              List a Self-Hired Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
