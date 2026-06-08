import { create } from "zustand";
import { persist } from "zustand/middleware";

// Simple admin credentials (legacy localStorage mode)
// When Supabase is configured, admin access is managed via database roles
const ADMIN_PASSWORD = "TrinidadAdmin2024!";

type AuthMethod = "password" | "supabase";

interface AdminStore {
  isAuthenticated: boolean;
  adminUser: string | null;
  authMethod: AuthMethod | null;
  login: (password: string) => boolean;
  loginWithSupabase: () => void;
  logout: () => void;
  setUser: (user: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminUser: null,
      authMethod: null,

      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true, adminUser: "Admin", authMethod: "password" });
          return true;
        }
        return false;
      },

      loginWithSupabase: () => {
        set({ isAuthenticated: true, adminUser: "Admin", authMethod: "supabase" });
      },

      logout: () => {
        set({ isAuthenticated: false, adminUser: null, authMethod: null });
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
