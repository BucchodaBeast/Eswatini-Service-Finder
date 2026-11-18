// Offline Storage & Data Saver Service for Eswatini Service Finder
// Caches directory data locally so users use 0 mobile data when offline or in Lite mode

const CACHE_KEYS = {
  PROVIDERS: "esf_cached_providers",
  CATEGORIES: "esf_cached_categories",
  NODES: "esf_cached_nodes",
  REQUESTS: "esf_cached_requests",
  DATA_SAVER_ENABLED: "esf_data_saver_active"
};

export const offlineStorage = {
  isDataSaverActive(): boolean {
    try {
      return localStorage.getItem(CACHE_KEYS.DATA_SAVER_ENABLED) === "true";
    } catch {
      return false;
    }
  },

  setDataSaverActive(active: boolean) {
    try {
      localStorage.setItem(CACHE_KEYS.DATA_SAVER_ENABLED, active ? "true" : "false");
    } catch (e) {
      console.warn("Could not save Data Saver preference", e);
    }
  },

  // Save cached data
  saveProviders(providers: any[]) {
    try {
      localStorage.setItem(CACHE_KEYS.PROVIDERS, JSON.stringify(providers));
    } catch (e) {}
  },

  getProviders(): any[] | null {
    try {
      const data = localStorage.getItem(CACHE_KEYS.PROVIDERS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveCategories(categories: any[]) {
    try {
      localStorage.setItem(CACHE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {}
  },

  getCategories(): any[] | null {
    try {
      const data = localStorage.getItem(CACHE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveNodes(nodes: any[]) {
    try {
      localStorage.setItem(CACHE_KEYS.NODES, JSON.stringify(nodes));
    } catch (e) {}
  },

  getNodes(): any[] | null {
    try {
      const data = localStorage.getItem(CACHE_KEYS.NODES);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};
