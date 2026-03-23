"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	NODE_CATEGORIES,
	type CreateNodePayload,
	type NodeCategory,
} from "@/lib/funnel-node";

type CreateNodeDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (payload: CreateNodePayload) => void;
};

export default function CreateNodeDialog({
	isOpen,
	onClose,
	onSubmit,
}: CreateNodeDialogProps) {
	const [category, setCategory] = useState<NodeCategory>(NODE_CATEGORIES[0]);
	const [nodeName, setNodeName] = useState("");

	function handleCreateNode() {
		onSubmit({ category, name: nodeName });
		onClose();
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar novo node</DialogTitle>
					<DialogDescription>
						Escolha a categoria e defina um nome para o node.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="node-category">Categoria</Label>
						<select
							id="node-category"
							className="h-9 w-full rounded-md border border-black/15 bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30 dark:border-white/15 dark:focus-visible:ring-white/30"
							value={category}
							onChange={(event) => setCategory(event.target.value as NodeCategory)}
						>
							{NODE_CATEGORIES.map((currentCategory) => (
								<option key={currentCategory} value={currentCategory}>
									{currentCategory}
								</option>
							))}
						</select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="node-name">Nome do node</Label>
						<Input
							id="node-name"
							name="nodeName"
							placeholder="Ex.: Captura Principal"
							value={nodeName}
							onChange={(event) => setNodeName(event.target.value)}
						/>
					</div>
				</div>

				<DialogFooter className="mt-2 gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="button" onClick={handleCreateNode}>
						Criar node
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}