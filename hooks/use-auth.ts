"use-client";

import { apiRequest } from "@/lib/api";
import { useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest("/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    register,
    loading,
    error,
  };
}
