import { RATE_URL, STORAGE_RATE } from "../constant";
import { createStore } from "../store";
const createCurrencyStore = (set) => ({
  rates: [],
  loading: false,
  error: null,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchRates: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(RATE_URL);
      if (!response.ok) throw new Error("Failed to fetch rates");
      const data = await response.json();

      const sortedRates = Object.values(data).sort((a, b) => a.rate - b.rate);
      set({ rates: sortedRates, loading: false });
    } catch (error) {
      console.error("Error fetching currency rates:", error);
      set({ loading: false, error: error.message });
    }
  },
});

export const useCurrencyStore = createStore(createCurrencyStore, STORAGE_RATE);
