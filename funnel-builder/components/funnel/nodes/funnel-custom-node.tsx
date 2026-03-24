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
	const formattedAccesses = new Intl.NumberFormat("pt-BR").format(data.metrics.accesses);
	const formattedConversions = new Intl.NumberFormat("pt-BR").format(data.metrics.conversions);
	const formattedRate = `${data.metrics.rate.toFixed(1)}%`;

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
						<span className="sr-only">Ações da etapa</span>
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

				<div className="grid grid-cols-3 gap-1 rounded-md border border-black/10 bg-muted/35 p-2 text-center dark:border-white/10">
					<div>
						<div className="text-[10px] uppercase tracking-wide text-foreground/60">Acessos</div>
						<div className="text-xs font-semibold text-foreground">{formattedAccesses}</div>
					</div>
					<div>
						<div className="text-[10px] uppercase tracking-wide text-foreground/60">Conversões</div>
						<div className="text-xs font-semibold text-foreground">{formattedConversions}</div>
					</div>
					<div>
						<div className="text-[10px] uppercase tracking-wide text-foreground/60">Taxa</div>
						<div className="text-xs font-semibold text-foreground">{formattedRate}</div>
					</div>
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
