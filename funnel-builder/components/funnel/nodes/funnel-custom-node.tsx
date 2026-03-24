"use client";

import { MoreHorizontal, MousePointerClick, Pencil, Percent, Trash2, Users } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
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
			className="relative min-w-55 rounded-xl border bg-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
						variant="ghost"
						size="icon"
						className="nodrag nopan absolute right-2 top-2 h-7 w-7 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
						onClick={(event) => event.stopPropagation()}
					>
						<MoreHorizontal className="h-4 w-4" />
						<span className="sr-only">Ações da etapa</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" portalled={false} className="nodrag nopan w-44">
					<DropdownMenuItem onSelect={() => data.onEditNode(id)} className="gap-2 font-medium">
						<Pencil className="h-4 w-4" />
						Editar etapa
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => data.onDeleteRequest(id)}
						className="gap-2 font-medium text-red-600 focus:bg-red-50 focus:text-red-700"
					>
						<Trash2 className="h-4 w-4" />
						Excluir etapa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<div className="space-y-3">
				<div className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
					style={{ backgroundColor: categoryColor }}
				>
					{data.category}
				</div>
				<div className="pr-8 text-sm font-semibold leading-tight text-foreground">{data.title}</div>
				<div className="text-xs leading-relaxed text-muted-foreground">
					{data.description || "Sem descrição"}
				</div>

				<div
					className="rounded-xl border p-2.5"
					style={{
						borderColor: `color-mix(in oklab, ${categoryColor} 38%, var(--border))`,
						background: `linear-gradient(180deg, color-mix(in oklab, ${categoryColor} 14%, var(--muted)) 0%, color-mix(in oklab, ${categoryColor} 4%, var(--background)) 100%)`,
						boxShadow: `0 10px 20px -16px color-mix(in oklab, ${categoryColor} 90%, transparent)`,
					}}
				>
					<div className="mb-2 flex items-center justify-between px-0.5">
						<span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
							Performance
						</span>
						<span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
					</div>

					<div className="grid grid-cols-3 gap-2">
						<div className="rounded-md border border-border/70 bg-background/95 px-2 py-2 shadow-sm">
							<div className="mb-1 flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
								<Users className="h-3 w-3" />
								Acessos
							</div>
							<div className="text-center text-sm font-semibold tabular-nums text-foreground">{formattedAccesses}</div>
						</div>
						<div className="rounded-md border border-border/70 bg-background/95 px-2 py-2 shadow-sm">
							<div className="mb-1 flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
								<MousePointerClick className="h-3 w-3" />
								Conversões
							</div>
							<div className="text-center text-sm font-semibold tabular-nums text-foreground">{formattedConversions}</div>
						</div>
						<div className="rounded-md border border-border/70 bg-background/95 px-2 py-2 shadow-sm">
							<div className="mb-1 flex items-center justify-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
								<Percent className="h-3 w-3" />
								Taxa
							</div>
							<div className="text-center text-sm font-semibold tabular-nums text-foreground">{formattedRate}</div>
						</div>
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
					className="pointer-events-none absolute inset-0 rounded-xl border-2 shadow-[0_0_0_2px_color-mix(in_oklab,var(--background)_75%,transparent)]"
					style={{ borderColor: categoryColor }}
				/>
			) : null}
		</div>
	);
}
