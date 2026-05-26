import { useState, useEffect } from "react";
import { api, getAccessToken } from "../services/api";
import type { Model } from "../types";

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        const data = await api.getModels(token);
        setModels(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch models";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { models, loading, error };
}
