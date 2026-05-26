import { useState, useCallback } from "react";
import { api } from "../services/api";
import { getAccessToken } from "../services/api";
import type { Branch } from "../types";

export function useBranch() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async (conversationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const data = await api.getConversationBranches(token, conversationId);
      setBranches(data);
      // Auto-select the first (main) branch if none selected
      if (data.length > 0 && !activeBranchId) {
        setActiveBranchId(data[0].id);
      }
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createBranch = useCallback(
    async (conversationId: string, parentNodeId: string, name: string, modelId?: string) => {
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        const branch = await api.createBranch(
          token,
          conversationId,
          parentNodeId,
          name,
          modelId
        );
        setBranches((prev) => [...prev, branch]);
        setActiveBranchId(branch.id);
        return branch;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to create";
        setError(message);
        return null;
      }
    },
    []
  );

  const switchBranch = useCallback((branchId: string) => {
    setActiveBranchId(branchId);
  }, []);

  const updateBranch = useCallback(
    async (branchId: string, data: { name?: string, model_id?: string, user_initiated_model_change?: boolean }) => {
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Not authenticated");
        const updated = await api.updateBranch(token, branchId, data);
        setBranches((prev) => 
          prev.map((b) => (b.id === branchId ? updated : b))
        );
        return updated;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to update";
        setError(message);
        return null;
      }
    },
    []
  );

  const activeBranch = branches.find((b) => b.id === activeBranchId) ?? null;

  return {
    branches,
    activeBranch,
    activeBranchId,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    switchBranch,
    setActiveBranchId,
  };
}
