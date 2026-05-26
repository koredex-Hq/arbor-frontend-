import { useState, useCallback } from "react";
import { api } from "../services/api";
import { getAccessToken } from "../services/api";
import type { Project } from "../types";

export function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const data = await api.listProjects(token || "");
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (name: string, description: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const newProject = await api.createProject(token || "", name, description);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      await api.deleteProject(token || "", id);
      setProjects(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    deleteProject,
  };
}
