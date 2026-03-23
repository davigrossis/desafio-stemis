"use client";

import Interactivity from "@/components/funnel/interactivity";
import type { FunnelFlowNode } from "@/lib/funnel-node";
import type { Edge, OnConnect, OnEdgesChange, OnNodesChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type FunnelBuilderProps = {
  nodes: FunnelFlowNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<FunnelFlowNode>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
  onEditNode: (nodeId: string) => void;
  onDeleteRequest: (nodeId: string) => void;
};

export default function FunnelBuilder({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onEditNode,
  onDeleteRequest,
}: FunnelBuilderProps) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Interactivity
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEditNode={onEditNode}
        onDeleteRequest={onDeleteRequest}
      />
    </div>
  );
}
