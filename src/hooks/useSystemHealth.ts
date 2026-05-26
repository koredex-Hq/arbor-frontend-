import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../services/api";

export interface SubsystemDetail {
  status: "HEALTHY" | "DEGRADED" | "OFFLINE";
  last_failure_at: string | null;
  failure_count: number;
  last_recovery_at: string | null;
  success_count_since_failure: number;
  last_error: string | null;
}

export interface SystemHealthData {
  status: "HEALTHY" | "DEGRADED" | "OFFLINE";
  subsystems: {
    bootstrap: SubsystemDetail;
    embeddings: SubsystemDetail;
    snapshots: SubsystemDetail;
    audit: SubsystemDetail;
  };
  metrics: {
    embedding_queue_depth: number;
    snapshot_queue_depth: number;
    failed_tasks: number;
  };
}

export function useSystemHealth(pollingIntervalMs: number = 30000) {
  const [health, setHealth] = useState<SystemHealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchHealth = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const data = await api.getSystemHealth();
      setHealth(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch system health");
      // Keep previous health data but mark as degraded/stale if we can't connect at all
      setHealth((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: "DEGRADED" // Fall back to degraded status if api fails completely
        };
      });
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Initial fetch and setup periodic polling
  useEffect(() => {
    fetchHealth(true);

    intervalRef.current = setInterval(() => {
      fetchHealth(false);
    }, pollingIntervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchHealth, pollingIntervalMs]);

  // Expose on-demand refresh
  const refresh = useCallback(() => {
    return fetchHealth(false);
  }, [fetchHealth]);

  return {
    health,
    loading,
    error,
    refresh
  };
}
