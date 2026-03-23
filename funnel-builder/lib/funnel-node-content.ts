import type { CreateNodePayload, FunnelFlowNode } from "@/lib/funnel-node";

export function buildNodeTitle(
  payload: CreateNodePayload,
  currentNodes: FunnelFlowNode[],
  excludeNodeId?: string,
): string {
  const sanitizedTitle = payload.title.trim();

  if (sanitizedTitle) {
    return sanitizedTitle;
  }

  const nodesInCurrentCategory = currentNodes.filter(
    (node) => node.id !== excludeNodeId && node.data.category === payload.category,
  ).length;

  return `${payload.category} ${nodesInCurrentCategory + 1}`;
}

export function buildNodeDescription(payload: CreateNodePayload): string {
  return payload.description.trim();
}
