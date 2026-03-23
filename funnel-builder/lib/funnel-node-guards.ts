import {
  generateSimulatedNodeMetrics,
  type FunnelFlowNode,
  type NodeMetrics,
} from "@/lib/funnel-node";

export function isValidNodeMetrics(value: unknown): value is NodeMetrics {
  if (!value || typeof value !== "object") {
    return false;
  }

  const metrics = value as Partial<NodeMetrics>;

  if (
    typeof metrics.accesses !== "number" ||
    typeof metrics.conversions !== "number" ||
    typeof metrics.rate !== "number"
  ) {
    return false;
  }

  const { accesses, conversions, rate } = metrics;

  return (
    Number.isFinite(accesses) &&
    Number.isFinite(conversions) &&
    Number.isFinite(rate) &&
    accesses >= 0 &&
    conversions >= 0 &&
    conversions <= accesses &&
    rate >= 0 &&
    rate <= 100
  );
}

export function isFunnelFlowNodeLike(value: unknown): value is FunnelFlowNode {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<FunnelFlowNode>;

  return typeof candidate.id === "string" && Boolean(candidate.data) && typeof candidate.data === "object";
}

export function ensureNodeWithMetrics(node: FunnelFlowNode): FunnelFlowNode {
  if (isValidNodeMetrics(node.data.metrics)) {
    return node;
  }

  return {
    ...node,
    data: {
      ...node.data,
      metrics: generateSimulatedNodeMetrics(node.id, node.data.category),
    },
  };
}
