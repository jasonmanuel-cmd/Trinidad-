"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSupabaseConfigured: false,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isSupabaseConfigured: !!supabase,
  });
  const router = useRouter();

  useEffect(() => {
    const client = supabase;
    if (!client) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    const getUser = async () => {
      const { data } = await client.auth.getUser();
      setState({
        user: data?.user ?? null,
        loading: false,
        isSupabaseConfigured: true,
      });
    };

    getUser();

    const { data: listener } = client.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          user: session?.user ?? null,
          loading: false,
          isSupabaseConfigured: true,
        });
        router.refresh();
      }
    );

    return () => listener?.subscription.unsubscribe();
  }, [router]);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setState({ user: null, loading: false, isSupabaseConfigured: true });
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ ...state, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
