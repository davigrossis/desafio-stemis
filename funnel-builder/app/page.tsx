"use client";

import { useCallback, useEffect, useState } from "react";
import FunnelBuilder from "@/components/funnel/funnel-builder";
import { initialEdges, initialNodes } from "@/components/funnel/interactivity";
import Header from "@/components/header/header";
import CreateNodeDialog from "@/components/modals/create-node-dialog";
import DeleteNodeDialog from "@/components/modals/delete-node-dialog";
import {
  type CreateNodePayload,
  type FunnelFlowNode,
} from "@/lib/funnel-node";
import {
  createNodeFromPayload,
  removeEdgesConnectedToNode,
  removeNodeById,
  updateNodeByPayload,
} from "@/lib/funnel-graph";
import { loadFunnelGraph, saveFunnelGraph } from "@/lib/funnel-storage";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";

export default function Home() {
  const [nodes, setNodes] = useState<FunnelFlowNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isStorageHydrated, setIsStorageHydrated] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [deleteNodeId, setDeleteNodeId] = useState<string | null>(null);
  const [editDialogVersion, setEditDialogVersion] = useState(0);

  const editingNode = nodes.find((node) => node.id === editingNodeId);
  const deletingNode = nodes.find((node) => node.id === deleteNodeId);

  const onNodesChange = useCallback((changes: NodeChange<FunnelFlowNode>[]) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  }, []);

  const onConnect = useCallback((params: Connection) => {
    setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
  }, []);

  const handleCreateNode = useCallback((payload: CreateNodePayload) => {
    setNodes((currentNodes) => {
      const nodeId = `n${Date.now()}`;
      const newNode = createNodeFromPayload(payload, currentNodes, nodeId);

      return [...currentNodes, newNode];
    });
  }, []);

  const handleOpenEditNode = useCallback((nodeId: string) => {
    setEditingNodeId(nodeId);
    setEditDialogVersion((current) => current + 1);
  }, []);

  const handleCloseEditNodeDialog = useCallback(() => {
    setEditingNodeId(null);
  }, []);

  const handleEditNode = useCallback(
    (payload: CreateNodePayload) => {
      if (!editingNodeId) {
        return;
      }

      setNodes((currentNodes) => {
        return currentNodes.map((node) => {
          if (node.id !== editingNodeId) {
            return node;
          }

          return updateNodeByPayload(node, payload, currentNodes, editingNodeId);
        });
      });

      setEditingNodeId(null);
    },
    [editingNodeId],
  );

  const handleOpenDeleteNodeDialog = useCallback((nodeId: string) => {
    setDeleteNodeId(nodeId);
  }, []);

  const handleCloseDeleteNodeDialog = useCallback(() => {
    setDeleteNodeId(null);
  }, []);

  const handleDeleteNode = useCallback(() => {
    if (!deleteNodeId) {
      return;
    }

    setNodes((currentNodes) => removeNodeById(deleteNodeId, currentNodes));
    setEdges((currentEdges) => removeEdgesConnectedToNode(deleteNodeId, currentEdges));

    if (editingNodeId === deleteNodeId) {
      setEditingNodeId(null);
    }

    setDeleteNodeId(null);
  }, [deleteNodeId, editingNodeId]);

  useEffect(() => {
    try {
      const storedGraph = loadFunnelGraph();

      if (storedGraph.nodes) {
        setNodes(storedGraph.nodes);
      }

      if (storedGraph.edges) {
        setEdges(storedGraph.edges);
      }
    } catch {

    } finally {
      setIsStorageHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isStorageHydrated) {
      return;
    }

    try {
      saveFunnelGraph(nodes, edges);
    } catch {
    }
  }, [nodes, edges, isStorageHydrated]);

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
          onEditNode={handleOpenEditNode}
          onDeleteRequest={handleOpenDeleteNodeDialog}
        />
      </section>

      <CreateNodeDialog
        key={editDialogVersion}
        isOpen={Boolean(editingNode)}
        onClose={handleCloseEditNodeDialog}
        onSubmit={handleEditNode}
        mode="edit"
        initialValues={
          editingNode
            ? {
                category: editingNode.data.category,
                title: editingNode.data.title,
                description: editingNode.data.description,
              }
            : undefined
        }
      />

      <DeleteNodeDialog
        isOpen={Boolean(deletingNode)}
        onClose={handleCloseDeleteNodeDialog}
        onConfirm={handleDeleteNode}
        nodeTitle={deletingNode?.data.title}
      />
    </main>
  );
}
