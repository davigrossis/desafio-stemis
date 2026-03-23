"use client";

import { useCallback, useMemo } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type NodeChange,
  type NodeTypes,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import FunnelCustomNode from "@/components/funnel/nodes/funnel-custom-node";
import {
  FUNNEL_NODE_TYPE,
  type FunnelFlowNode,
  type FunnelRenderNode,
} from "@/lib/funnel-node";

export const initialNodes: FunnelFlowNode[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: {
      category: "Anuncio",
      title: "Campanha Inicial",
      description: "Campanha principal de aquisição.",
    },
    type: FUNNEL_NODE_TYPE,
  },
  {
    id: "n2",
    position: { x: 100, y: 100 },
    data: {
      category: "Pagina",
      title: "Landing Principal",
      description: "Página com proposta e formulário de captura.",
    },
    type: FUNNEL_NODE_TYPE,
  },
];

export const initialEdges: Edge[] = [];

const nodeTypes = {
  [FUNNEL_NODE_TYPE]: FunnelCustomNode,
} satisfies NodeTypes;

type InteractivityProps = {
  nodes: FunnelFlowNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<FunnelFlowNode>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
  onEditNode: (nodeId: string) => void;
  onDeleteRequest: (nodeId: string) => void;
};

export default function Interactivity({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEditNode,
  onDeleteRequest,
}: InteractivityProps) {
  const nodesWithActions = useMemo<FunnelRenderNode[]>(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onEditNode,
          onDeleteRequest,
        },
      })),
    [nodes, onEditNode, onDeleteRequest],
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange<FunnelRenderNode>[]) => {
      onNodesChange(changes as NodeChange<FunnelFlowNode>[]);
    },
    [onNodesChange],
  );

  return (
    <ReactFlow<FunnelRenderNode, Edge>
      nodes={nodesWithActions}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={handleNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
