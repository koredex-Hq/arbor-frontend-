/**
 * Visible Graph Types (Lineage Visualization)
 *
 * Canonical types for the cognitive timeline graph.
 * Backend is the single graph authority — frontend does zero lineage inference.
 */

export interface GraphNode {
  id: string;
  branch_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  node_sequence: number;
  parent_node_id: string | null;
  inherited: boolean;
  local: boolean;
  fork_origin: boolean;
  is_pinned: boolean;
  has_snapshot: boolean;
  model_id?: string | null;
  created_at?: string;
  metadata?: Record<string, unknown>;
  position?: { x: number; y: number } | null;
}

export interface GraphEdge {
  source: string;  // from node_id (parent)
  target: string;  // to node_id (child)
  edge_type: "lineage" | "fork";
}

export interface ForkOriginInfo {
  node_id: string;
  branch_id: string;
  node_sequence: number;
}

export interface GraphBranch {
  id: string;
  name: string;
  depth: number;
  lineage_path: string[];
  conversation_id: string;
  model_id?: string | null;
  fork_origin_sequence?: number | null;
}

export interface GraphMetadata {
  total_nodes: number;
  inherited_count: number;
  local_count: number;
  lineage_depth: number;
  has_fork_origin: boolean;
}

export interface VisibleGraph {
  branch: GraphBranch;
  fork_origin: ForkOriginInfo | null;
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: GraphMetadata;
  graph_version: number;
}
