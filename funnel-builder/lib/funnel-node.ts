import type { Node } from "@xyflow/react";

export const NODE_CATEGORIES = ["Anuncio", "Pagina", "Formulario", "Checkout"] as const;

export const FUNNEL_NODE_TYPE = "funnel" as const;

export type NodeCategory = (typeof NODE_CATEGORIES)[number];

export type CreateNodePayload = {
  category: NodeCategory;
  title: string;
  description: string;
};

export type FunnelNodeData = {
  category: NodeCategory;
  title: string;
  description: string;
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