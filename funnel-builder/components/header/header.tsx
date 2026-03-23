"use client";

import { useState } from "react";
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
			<header className="shrink-0 border-b border-black/10 bg-background/95 backdrop-blur dark:border-white/10">
				<div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
					<h1 className="text-base font-semibold text-foreground sm:text-lg">
						Funil de Vendas
					</h1>

					<div className="flex items-center gap-2">
						<Button
							type="button"
							onClick={handleOpenCreateNodeDialog}
							className="px-5 font-semibold"
						>
							Novo node
						</Button>
					</div>
				</div>
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
