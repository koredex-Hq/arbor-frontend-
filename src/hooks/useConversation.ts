import { useState, useCallback } from "react";
import { api } from "../services/api";
import { getAccessToken } from "../services/api";
import type { Conversation } from "../types";

export function useConversation() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const data = await api.listConversations(token);
      setConversations(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createConversation = useCallback(async (title: string, projectId: string | null = null, treeId: string | null = null, modelId: string | null = "nemotron") => {
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const conv = await api.createConversation(token, title, projectId, treeId, modelId);
      setConversations((prev) => [conv, ...prev]);
      return conv;
    } catch (err: unknown) {
      console.error("useConversation: createConversation failed:", err);
      const message = err instanceof Error ? err.message : "Failed to create";
      setError(message);
      throw err; // Re-throw to ensure caller knows about failure
    }
  }, []);

  const deleteConversation = useCallback(async (id: string) => {
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      await api.deleteConversation(token, id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete";
      setError(message);
    }
  }, []);

  const renameConversation = useCallback(async (id: string, newTitle: string) => {
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      await fetch(`${import.meta.env.VITE_API_URL}/conversations/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
      setConversations(prev =>
        prev.map(c => c.id === id ? { ...c, title: newTitle } : c)
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to rename";
      setError(message);
    }
  }, []);

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    createConversation,
    deleteConversation,
    renameConversation,
  };
}
