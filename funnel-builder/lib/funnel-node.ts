import type { Node } from "@xyflow/react";

export const NODE_CATEGORIES = ["Anuncio", "Pagina", "Formulario", "Checkout"] as const;

export const FUNNEL_NODE_TYPE = "funnel" as const;

export type NodeCategory = (typeof NODE_CATEGORIES)[number];

export type CreateNodePayload = {
  category: NodeCategory;
  title: string;
  description: string;
};

export type NodeMetrics = {
  accesses: number;
  conversions: number;
  rate: number;
};

export type FunnelNodeData = {
  category: NodeCategory;
  title: string;
  description: string;
  metrics: NodeMetrics;
};

export type FunnelNodeActionHandlers = {
  onEditNode: (nodeId: string) => void;
  onDeleteRequest: (nodeId: string) => void;
};

export type FunnelNodeRenderData = FunnelNodeData & FunnelNodeActionHandlers;

export type FunnelFlowNode = Node<FunnelNodeData, typeof FUNNEL_NODE_TYPE>;
export type FunnelRenderNode = Node<FunnelNodeRenderData, typeof FUNNEL_NODE_TYPE>;

export const NODE_CATEGORY_COLORS: Record<NodeCategory, string> = {
  Anuncio: "var(--category-ad)",
  Pagina: "var(--category-landing)",
  Formulario: "var(--category-form)",
  Checkout: "var(--category-checkout)",
};

type CategoryMetricRanges = {
  accesses: readonly [number, number];
  rate: readonly [number, number];
};

const CATEGORY_METRIC_RANGES: Record<NodeCategory, CategoryMetricRanges> = {
  Anuncio: {
    accesses: [8000, 20000],
    rate: [25, 55],
  },
  Pagina: {
    accesses: [2500, 9000],
    rate: [12, 35],
  },
  Formulario: {
    accesses: [600, 3200],
    rate: [20, 45],
  },
  Checkout: {
    accesses: [150, 1200],
    rate: [45, 85],
  },
};

function hashSeed(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function seededRandom(seed: number): () => number {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;

    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInteger(random: () => number, [min, max]: readonly [number, number]): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomRate(random: () => number, [min, max]: readonly [number, number]): number {
  const value = random() * (max - min) + min;
  return Number(value.toFixed(1));
}

export function generateSimulatedNodeMetrics(nodeId: string, category: NodeCategory): NodeMetrics {
  const ranges = CATEGORY_METRIC_RANGES[category];
  const random = seededRandom(hashSeed(`${nodeId}:${category}:metrics-v1`));
  const accesses = randomInteger(random, ranges.accesses);
  const suggestedRate = randomRate(random, ranges.rate);
  const conversions = Math.min(accesses, Math.max(0, Math.round(accesses * (suggestedRate / 100))));
  const rate = accesses > 0 ? Number(((conversions / accesses) * 100).toFixed(1)) : 0;

  return {
    accesses,
    conversions,
    rate,
  };
}