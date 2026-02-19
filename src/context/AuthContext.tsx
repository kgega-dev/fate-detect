import React, { createContext, useContext, useMemo, useState } from "react";

export type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "fate_detect_user";

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser());

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      isLoggedIn: user !== null,
      login: (u) => {
        setUser(u);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        } catch {}
      },
      logout: () => {
        setUser(null);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
      },
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}