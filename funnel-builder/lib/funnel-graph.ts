import {
  FUNNEL_NODE_TYPE,
  generateSimulatedNodeMetrics,
  type CreateNodePayload,
  type FunnelFlowNode,
} from "@/lib/funnel-node";
import { buildNodeDescription, buildNodeTitle } from "@/lib/funnel-node-content";
import type { Edge } from "@xyflow/react";

function buildNextNodePosition(currentNodes: FunnelFlowNode[]): { x: number; y: number } {
  const lastNode = currentNodes[currentNodes.length - 1];

  return lastNode
    ? { x: lastNode.position.x + 100, y: lastNode.position.y + 100 }
    : { x: 0, y: 0 };
}

export function createNodeFromPayload(
  payload: CreateNodePayload,
  currentNodes: FunnelFlowNode[],
  nodeId: string,
): FunnelFlowNode {
  return {
    id: nodeId,
    type: FUNNEL_NODE_TYPE,
    position: buildNextNodePosition(currentNodes),
    data: {
      category: payload.category,
      title: buildNodeTitle(payload, currentNodes),
      description: buildNodeDescription(payload),
      metrics: generateSimulatedNodeMetrics(nodeId, payload.category),
    },
  };
}

export function updateNodeByPayload(
  node: FunnelFlowNode,
  payload: CreateNodePayload,
  currentNodes: FunnelFlowNode[],
  editingNodeId: string,
): FunnelFlowNode {
  const didCategoryChange = node.data.category !== payload.category;

  return {
    ...node,
    data: {
      ...node.data,
      category: payload.category,
      title: buildNodeTitle(payload, currentNodes, editingNodeId),
      description: buildNodeDescription(payload),
      metrics: didCategoryChange
        ? generateSimulatedNodeMetrics(node.id, payload.category)
        : node.data.metrics,
    },
  };
}

export function removeNodeAndConnectedEdges(
  nodeId: string,
  currentNodes: FunnelFlowNode[],
  currentEdges: Edge[],
): { nodes: FunnelFlowNode[]; edges: Edge[] } {
  return {
    nodes: removeNodeById(nodeId, currentNodes),
    edges: removeEdgesConnectedToNode(nodeId, currentEdges),
  };
}

export function removeNodeById(nodeId: string, currentNodes: FunnelFlowNode[]): FunnelFlowNode[] {
  return currentNodes.filter((node) => node.id !== nodeId);
}

export function removeEdgesConnectedToNode(nodeId: string, currentEdges: Edge[]): Edge[] {
  return currentEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
}
