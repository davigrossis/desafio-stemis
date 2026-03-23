import { ensureNodeWithMetrics, isFunnelFlowNodeLike } from "@/lib/funnel-node-guards";
import type { FunnelFlowNode } from "@/lib/funnel-node";
import type { Edge } from "@xyflow/react";

export const FUNNEL_NODES_STORAGE_KEY = "funnel-builder:nodes";
export const FUNNEL_EDGES_STORAGE_KEY = "funnel-builder:edges";

type StoredFunnelGraph = {
  nodes?: FunnelFlowNode[];
  edges?: Edge[];
};

export function loadFunnelGraph(): StoredFunnelGraph {
  const storedNodes = localStorage.getItem(FUNNEL_NODES_STORAGE_KEY);
  const storedEdges = localStorage.getItem(FUNNEL_EDGES_STORAGE_KEY);

  const result: StoredFunnelGraph = {};

  if (storedNodes) {
    const parsedNodes = JSON.parse(storedNodes) as unknown;

    if (Array.isArray(parsedNodes)) {
      result.nodes = parsedNodes.filter(isFunnelFlowNodeLike).map(ensureNodeWithMetrics);
    }
  }

  if (storedEdges) {
    const parsedEdges = JSON.parse(storedEdges) as unknown;

    if (Array.isArray(parsedEdges)) {
      result.edges = parsedEdges as Edge[];
    }
  }

  return result;
}

export function saveFunnelGraph(nodes: FunnelFlowNode[], edges: Edge[]): void {
  localStorage.setItem(FUNNEL_NODES_STORAGE_KEY, JSON.stringify(nodes));
  localStorage.setItem(FUNNEL_EDGES_STORAGE_KEY, JSON.stringify(edges));
}
