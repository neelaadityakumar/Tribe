import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createStore = (createCurrencyStore, storageName) => {
  return create(
    persist(createCurrencyStore, {
      name: storageName,
      storage: createJSONStorage(() => AsyncStorage),
    })
  );
};
