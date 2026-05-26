import { useState, useCallback } from "react";
import { api } from "../services/api";
import { getAccessToken } from "../services/api";
import type { Message, Source } from "../types";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [contextMeta, setContextMeta] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async (branchId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const data = await api.getBranchMessages(token, branchId);
      setMessages(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFullContext = useCallback(async (branchId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const data = await api.getBranchFullContext(token, branchId);
      setMessages(data.messages);
      setSources(data.sources);
      setContextMeta(data.context_meta);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (branchId: string, content: string) => {
      setSending(true);
      setError(null);
      
      // Optimistic UI update
      const tempId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
      const optimisticMessage: Message = {
        id: tempId,
        conversation_id: "",
        branch_id: branchId,
        parent_id: null,
        role: "user",
        content: content,
        sequence: 0,
        is_pinned: false,
        created_at: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, optimisticMessage]);
      
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        const response = await api.sendMessage(token, branchId, content);

        // Replace optimistic message and append assistant message
        setMessages((prev) => {
          const filtered = prev.filter(m => m.id !== tempId);
          return [
            ...filtered,
            response.user_message,
            response.assistant_message,
          ];
        });
        setSources(response.sources);
        setContextMeta(response.context_meta);

        return response;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to send";
        setError(message);
        return null;
      } finally {
        setSending(false);
      }
    },
    []
  );

  const pinMessage = useCallback(
    async (branchId: string, nodeId: string) => {
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        await api.pinMessage(token, branchId, nodeId);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === nodeId ? { ...m, is_pinned: true } : m
          )
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to pin";
        setError(message);
      }
    },
    []
  );

  const unpinMessage = useCallback(
    async (branchId: string, nodeId: string) => {
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        await api.unpinMessage(token, branchId, nodeId);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === nodeId ? { ...m, is_pinned: false } : m
          )
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to unpin";
        setError(message);
      }
    },
    []
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSources([]);
    setContextMeta({});
  }, []);

  const appendMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    messages,
    sources,
    contextMeta,
    loading,
    sending,
    error,
    fetchMessages,
    fetchFullContext,
    sendMessage,
    pinMessage,
    unpinMessage,
    clearMessages,
    appendMessage,
  };
}
