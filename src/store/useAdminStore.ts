import { create } from "zustand";
import { persist } from "zustand/middleware";

// Simple admin credentials (in production, this should be handled server-side)
const ADMIN_PASSWORD = "TrinidadAdmin2024!";

interface AdminStore {
  isAuthenticated: boolean;
  adminUser: string | null;
  login: (password: string) => boolean;
  logout: () => void;
  setUser: (user: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminUser: null,

      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true, adminUser: "Admin" });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, adminUser: null });
      },

      setUser: (user: string) => {
        set({ adminUser: user });
      },
    }),
    {
      name: "admin-store",
    }
  )
);
