"use client";

import { MoreHorizontal } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NODE_CATEGORY_COLORS,
	type FunnelRenderNode,
} from "@/lib/funnel-node";

type FunnelCustomNodeProps = NodeProps<FunnelRenderNode>;

export default function FunnelCustomNode({ id, data, selected }: FunnelCustomNodeProps) {
	const categoryColor = NODE_CATEGORY_COLORS[data.category];

	return (
		<div
			className="relative min-w-55 rounded-lg border bg-background px-4 py-3 shadow-sm"
			style={{ borderColor: categoryColor }}
		>
			<Handle
				type="target"
				position={Position.Top}
				className="h-3! w-3!"
				style={{ backgroundColor: categoryColor }}
			/>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						type="button"
						variant="outline"
						size="icon"
						className="nodrag nopan absolute right-2 top-2 h-7 w-7"
						onClick={(event) => event.stopPropagation()}
					>
						<MoreHorizontal className="h-4 w-4" />
						<span className="sr-only">Ações do node</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="nodrag nopan w-36">
					<DropdownMenuItem onSelect={() => data.onEditNode(id)}>
						Editar
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => data.onDeleteRequest(id)}>
						Excluir
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<div className="space-y-2">
				<div className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
					style={{ backgroundColor: categoryColor }}
				>
					{data.category}
				</div>
				<div className="text-sm font-semibold text-foreground">{data.title}</div>
				<div className="text-xs text-foreground/70">
					{data.description || "Sem descrição"}
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
				className="h-3! w-3!"
				style={{ backgroundColor: categoryColor }}
			/>

			{selected ? (
				<div
					className="pointer-events-none absolute inset-0 rounded-lg border-2"
					style={{ borderColor: categoryColor }}
				/>
			) : null}
		</div>
	);
}
