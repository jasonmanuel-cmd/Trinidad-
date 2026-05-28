import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AgeStore {
  isOfAge: boolean;
  setOfAge: (value: boolean) => void;
}

export const useAgeStore = create<AgeStore>()(
  persist(
    (set) => ({
      isOfAge: false,
      setOfAge: (value) => set({ isOfAge: value }),
    }),
    {
      name: "age-verification",
    }
  )
);
