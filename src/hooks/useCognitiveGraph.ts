import { useState, useCallback, useMemo } from "react";
import { api, getAccessToken } from "../services/api";
import type { VisibleGraph, GraphNode } from "../types/visibleGraph";
import type { Message } from "../types";

/**
 * Cognitive Graph Hook
 *
 * Replaces useMessages.fetchFullContext() as the primary data source.
 * Backend is the SINGLE graph authority — this hook does ZERO lineage inference.
 *
 * Provides:
 * - graph: the canonical VisibleGraph from backend
 * - messages: backward-compatible Message[] derived from graph nodes
 * - inheritedNodeIds: set of inherited node IDs for visual styling
 * - forkOriginId: the divergence point node ID
 */
export function useCognitiveGraph() {
  const [graph, setGraph] = useState<VisibleGraph | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGraph = useCallback(async (branchId: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      const data = await api.getVisibleGraph(token, branchId);
      setGraph(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch graph";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Derive backward-compatible Message[] from graph nodes
  const messages: Message[] = useMemo(() => {
    if (!graph) return [];
    return graph.nodes.map((node: GraphNode) => ({
      id: node.id,
      conversation_id: graph.branch.conversation_id,
      branch_id: node.branch_id,
      parent_id: node.parent_node_id,
      role: node.role as "user" | "assistant" | "system",
      content: node.content,
      sequence: node.node_sequence,
      is_pinned: node.is_pinned,
      metadata: {
        ...(node.metadata || {}),
        model_id: node.model_id,
        // Inject classification into metadata for downstream use
        _inherited: node.inherited,
        _local: node.local,
        _fork_origin: node.fork_origin,
        _has_snapshot: node.has_snapshot,
      },
      created_at: node.created_at || "",
    }));
  }, [graph]);

  // Classification sets for visual styling
  const inheritedNodeIds: Set<string> = useMemo(() => {
    if (!graph) return new Set();
    return new Set(graph.nodes.filter(n => n.inherited).map(n => n.id));
  }, [graph]);

  const forkOriginId: string | null = useMemo(() => {
    return graph?.fork_origin?.node_id ?? null;
  }, [graph]);

  const localNodeIds: Set<string> = useMemo(() => {
    if (!graph) return new Set();
    return new Set(graph.nodes.filter(n => n.local).map(n => n.id));
  }, [graph]);

  const clearGraph = useCallback(() => {
    setGraph(null);
  }, []);

  return {
    graph,
    messages,
    inheritedNodeIds,
    localNodeIds,
    forkOriginId,
    loading,
    error,
    fetchGraph,
    clearGraph,
  };
}
