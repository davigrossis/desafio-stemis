export const NODE_CATEGORIES = ["Anuncio", "Pagina", "Formulario", "Checkout"] as const;

export type NodeCategory = (typeof NODE_CATEGORIES)[number];

export type CreateNodePayload = {
  category: NodeCategory;
  name: string;
};

export type FunnelNodeData = {
  label: string;
  category: NodeCategory;
  name: string;
};

export const NODE_CATEGORY_COLORS: Record<NodeCategory, string> = {
  Anuncio: "var(--category-ad)",
  Pagina: "var(--category-landing)",
  Formulario: "var(--category-form)",
  Checkout: "var(--category-checkout)",
};

export function formatNodeLabel(category: NodeCategory, name: string) {
  return `[${category}] ${name}`;
}