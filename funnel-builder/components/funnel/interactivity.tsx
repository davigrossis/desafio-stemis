"use client";

import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { formatNodeLabel } from "@/lib/funnel-node";

export const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: {
      category: "Anuncio",
      name: "Campanha Inicial",
      label: formatNodeLabel("Anuncio", "Campanha Inicial"),
    },
    type: "input",
  },
  {
    id: "n2",
    position: { x: 100, y: 100 },
    data: {
      category: "Pagina",
      name: "Landing Principal",
      label: formatNodeLabel("Pagina", "Landing Principal"),
    },
  },
];

export const initialEdges: Edge[] = [];

type InteractivityProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
};

export default function Interactivity({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: InteractivityProps) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
