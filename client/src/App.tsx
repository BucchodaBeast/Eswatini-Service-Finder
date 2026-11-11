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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => setIsPostModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-gray-700">
            Eswatini Service & Product Finder • Built for Mbabane, Ezulwini, Matsapha & Manzini
          </p>
          <p>
            Reverse Auction Engine • Proximity Discovery • MoMo & ATM Node Locator • Informal Economic Index
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
