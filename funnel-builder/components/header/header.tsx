"use client";

import { useState } from "react";
import { Plus, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNodeDialog from "@/components/modals/create-node-dialog";
import { type CreateNodePayload } from "@/lib/funnel-node";

type HeaderProps = {
	onCreateNode: (payload: CreateNodePayload) => void;
};

export default function Header({ onCreateNode }: HeaderProps) {
	const [isCreateNodeDialogOpen, setIsCreateNodeDialogOpen] = useState(false);
	const [dialogVersion, setDialogVersion] = useState(0);

	function handleOpenCreateNodeDialog() {
		setDialogVersion((current) => current + 1);
		setIsCreateNodeDialogOpen(true);
	}

	function handleCloseCreateNodeDialog() {
		setIsCreateNodeDialogOpen(false);
	}

	return (
		<>
			<header className="relative shrink-0 border-b border-border/70 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
				<div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
					<div className="flex items-center gap-3">
						<div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
							<Workflow className="h-4 w-4" />
						</div>

						<div className="min-w-0">
							<h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
								Funil de Vendas
							</h1>
							<p className="text-xs text-muted-foreground sm:text-sm">
								Organize e conecte as etapas da jornada.
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button
							type="button"
							onClick={handleOpenCreateNodeDialog}
							className="h-9 px-4 font-semibold"
						>
							<Plus className="h-4 w-4" />
							Nova etapa
						</Button>
					</div>
				</div>

				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
					style={{
						background:
							"linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--foreground) 22%, var(--border)) 18%, color-mix(in oklab, var(--foreground) 22%, var(--border)) 82%, transparent 100%)",
					}}
				/>
			</header>

			<CreateNodeDialog
				key={dialogVersion}
				isOpen={isCreateNodeDialogOpen}
				onClose={handleCloseCreateNodeDialog}
				onSubmit={onCreateNode}
			/>
		</>
	);
}
