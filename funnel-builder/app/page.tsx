"use client";

import { useCallback, useState } from "react";
import FunnelBuilder from "@/components/funnel/funnel-builder";
import { initialEdges, initialNodes } from "@/components/funnel/interactivity";
import Header from "@/components/header/header";
import CreateNodeDialog from "@/components/modals/create-node-dialog";
import DeleteNodeDialog from "@/components/modals/delete-node-dialog";
import {
  FUNNEL_NODE_TYPE,
  type CreateNodePayload,
  type FunnelFlowNode,
} from "@/lib/funnel-node";
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
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [deleteNodeId, setDeleteNodeId] = useState<string | null>(null);
  const [editDialogVersion, setEditDialogVersion] = useState(0);

  const editingNode = nodes.find((node) => node.id === editingNodeId);
  const deletingNode = nodes.find((node) => node.id === deleteNodeId);

  const buildNodeTitle = useCallback(
    (payload: CreateNodePayload, currentNodes: FunnelFlowNode[], excludeNodeId?: string) => {
      const sanitizedTitle = payload.title.trim();

      if (sanitizedTitle) {
        return sanitizedTitle;
      }

      const nodesInCurrentCategory = currentNodes.filter(
        (node) => node.id !== excludeNodeId && node.data.category === payload.category,
      ).length;

      return `${payload.category} ${nodesInCurrentCategory + 1}`;
    },
    [],
  );

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
      const nodeTitle = buildNodeTitle(payload, currentNodes);
      const nodeDescription = payload.description.trim();

      const lastNode = currentNodes[currentNodes.length - 1];
      const nextPosition = lastNode
        ? { x: lastNode.position.x + 100, y: lastNode.position.y + 100 }
        : { x: 0, y: 0 };

      const newNode: FunnelFlowNode = {
        id: `n${Date.now()}`,
        type: FUNNEL_NODE_TYPE,
        position: nextPosition,
        data: {
          category: payload.category,
          title: nodeTitle,
          description: nodeDescription,
        },
      };

      return [...currentNodes, newNode];
    });
  }, [buildNodeTitle]);

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
        const nodeTitle = buildNodeTitle(payload, currentNodes, editingNodeId);
        const nodeDescription = payload.description.trim();

        return currentNodes.map((node) => {
          if (node.id !== editingNodeId) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              category: payload.category,
              title: nodeTitle,
              description: nodeDescription,
            },
          };
        });
      });

      setEditingNodeId(null);
    },
    [buildNodeTitle, editingNodeId],
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

    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== deleteNodeId));
    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) => edge.source !== deleteNodeId && edge.target !== deleteNodeId,
      ),
    );

    if (editingNodeId === deleteNodeId) {
      setEditingNodeId(null);
    }

    setDeleteNodeId(null);
  }, [deleteNodeId, editingNodeId]);

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
