"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/fetchClient";

interface User {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [storedUser, setStoredUserState] = useState<User | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
    setStoredUserState(getStoredUser());
  }, []);

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const u = await api.get<User>("/api/users/profiles/me");
      setStoredUser(u);
      setStoredUserState(u);
      return u;
    },
    enabled: !!token,
    retry: false,
    initialData: storedUser ?? undefined,
  });

  const login = useCallback(
    async (phone: string, password: string) => {
      const res = await api.post<{
        data: {
          access: string;
          refresh: string;
          user: User;
        };
      }>("/api/auth/login", { phoneNumber: phone, password });

      const data = res.data;
      api.setTokens(data.access, data.refresh);
      setToken(data.access);
      setStoredUser(data.user);
      setStoredUserState(data.user);
      queryClient.setQueryData(["user", "me"], data.user);
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    api.clearTokens();
    localStorage.removeItem("user");
    setToken(null);
    setStoredUserState(null);
    queryClient.removeQueries({ queryKey: ["user"] });
    window.location.href = "/login";
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? storedUser ?? null,
        isLoading,
        isAuthenticated: !!user || !!storedUser,
        login,
        logout,
        refetchUser: () => refetch(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
