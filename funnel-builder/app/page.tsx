"use client";

import { useCallback, useState } from "react";
import FunnelBuilder from "@/app/components/funnel/funnel-builder";
import { initialEdges, initialNodes } from "@/app/components/funnel/interactivity";
import Header from "@/app/components/header/header";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
  }, []);

  const handleCreateNode = useCallback(() => {
    setNodes((currentNodes) => {
      const highestNodeNumber = currentNodes.reduce((highest, node) => {
        const parsed = Number.parseInt(String(node.data?.label).replace(/\D/g, ""), 10);
        return Number.isNaN(parsed) ? highest : Math.max(highest, parsed);
      }, 0);

      const lastNode = currentNodes[currentNodes.length - 1];
      const nextPosition = lastNode
        ? { x: lastNode.position.x + 100, y: lastNode.position.y + 100 }
        : { x: 0, y: 0 };

      const newNode: Node = {
        id: `n${Date.now()}`,
        position: nextPosition,
        data: { label: `Node ${highestNodeNumber + 1}` },
      };

      return [...currentNodes, newNode];
    });
  }, []);

  return (
    <main className="flex h-screen w-screen flex-col bg-background text-foreground">
      <Header onCreateNode={handleCreateNode} />

      <section className="min-h-0 flex-1">
        <FunnelBuilder
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </section>
    </main>
  );
}
