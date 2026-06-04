import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VIPMember {
  isVIP: boolean;
  creditBalance: number; // in dollars, decrements by $10
  deliveryCount: number; // how many deliveries they've made
  lastGiftBagDate: string | null; // ISO date of last free gift bag
  joinDate: string; // ISO date when they joined
}

interface VIPStore {
  vipMember: VIPMember;
  signupVIP: () => void;
  cancelVIP: () => void;
  addDelivery: () => void;
  useCredit: (amount: number) => boolean; // returns true if successful
  addCredit: (amount: number) => void; // refund credit
  getAvailableCredit: () => number;
  hasMonthlyGiftBag: () => boolean;
  claimMonthlyGiftBag: () => void;
}

const DEFAULT_VIP: VIPMember = {
  isVIP: false,
  creditBalance: 0,
  deliveryCount: 0,
  lastGiftBagDate: null,
  joinDate: "",
};

export const useVIPStore = create<VIPStore>()(
  persist(
    (set, get) => ({
      vipMember: DEFAULT_VIP,

      signupVIP: () => {
        set({
          vipMember: {
            isVIP: true,
            creditBalance: 50, // $50 store credit from signup ($10 × 5 deliveries)
            deliveryCount: 0,
            lastGiftBagDate: null,
            joinDate: new Date().toISOString(),
          },
        });
      },

      cancelVIP: () => {
        set({ vipMember: DEFAULT_VIP });
      },

      addDelivery: () => {
        set((state) => ({
          vipMember: {
            ...state.vipMember,
            deliveryCount: state.vipMember.deliveryCount + 1,
          },
        }));
      },

       useCredit: (amount: number) => {
         const state = get();
         if (state.vipMember.creditBalance >= amount) {
           set((state) => ({
             vipMember: {
               ...state.vipMember,
               creditBalance: state.vipMember.creditBalance - amount,
             },
           }));
           return true;
         }
         return false;
       },

       addCredit: (amount: number) => {
         set((state) => ({
           vipMember: {
             ...state.vipMember,
             creditBalance: state.vipMember.creditBalance + amount,
           },
         }));
       },

       getAvailableCredit: () => {
         return get().vipMember.creditBalance;
       },

      hasMonthlyGiftBag: () => {
        const state = get();
        if (!state.vipMember.isVIP) return false;

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        if (!state.vipMember.lastGiftBagDate) {
          return today.getDate() === 15; // First time check if today is 15th
        }

        const lastDate = new Date(state.vipMember.lastGiftBagDate);
        const lastMonth = lastDate.getMonth();
        const lastYear = lastDate.getFullYear();

        // Return true if we're on the 15th and haven't claimed this month yet
        return (
          today.getDate() === 15 &&
          (currentMonth !== lastMonth || currentYear !== lastYear)
        );
      },

      claimMonthlyGiftBag: () => {
        set((state) => ({
          vipMember: {
            ...state.vipMember,
            lastGiftBagDate: new Date().toISOString(),
          },
        }));
      },
    }),
    {
      name: "vip-store",
    }
  )
);
