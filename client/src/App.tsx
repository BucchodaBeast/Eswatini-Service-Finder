import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { RequestModal } from "./components/RequestModal";
import { MarketplacePage } from "./pages/MarketplacePage";
import { ProviderFeedPage } from "./pages/ProviderFeedPage";
import { FinancialNodesPage } from "./pages/FinancialNodesPage";
import { RegisterProviderPage } from "./pages/RegisterProviderPage";
import { EieAnalyticsPage } from "./pages/EieAnalyticsPage";
import { Category } from "./types";

export function App() {
  const [activeTab, setActiveTab] = useState<"marketplace" | "provider-feed" | "nodes" | "register" | "eie">("marketplace");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
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
      />

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "marketplace" && (
          <MarketplacePage
            categories={categories}
            onOpenPostModal={() => setIsPostModalOpen(true)}
          />
        )}

        {activeTab === "provider-feed" && (
          <ProviderFeedPage categories={categories} />
        )}

        {activeTab === "nodes" && (
          <FinancialNodesPage />
        )}

        {activeTab === "register" && (
          <RegisterProviderPage categories={categories} />
        )}

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
          setActiveTab("marketplace");
          alert("Your request is live! Providers in your area will receive alerts and submit structured bids.");
        }}
      />

      {/* Neumorphic & Frosted Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200/60 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 rounded-lg neu-flat flex items-center justify-center text-[10px] font-black text-swazi-blue">
              SZ
            </div>
            <p className="text-xs font-black text-slate-700 tracking-tight">
              Eswatini Service & Product Finder
            </p>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Reverse Auctions • Proximity Node Discovery • Dual-Spectrum Registry • Economic Telemetry
          </p>
          <p className="text-[10px] text-slate-400">
            Connecting Mbabane, Ezulwini, Matsapha & Manzini
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
