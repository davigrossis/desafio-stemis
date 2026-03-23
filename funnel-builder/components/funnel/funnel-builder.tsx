"use client";

import Interactivity from "@/components/funnel/interactivity";
import type { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type FunnelBuilderProps = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: OnConnect;
};

export default function FunnelBuilder({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: FunnelBuilderProps) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Interactivity
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
