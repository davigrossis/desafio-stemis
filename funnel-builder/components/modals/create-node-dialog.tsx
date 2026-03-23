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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	NODE_CATEGORIES,
	type CreateNodePayload,
	type NodeCategory,
} from "@/lib/funnel-node";

type CreateNodeDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (payload: CreateNodePayload) => void;
	mode?: "create" | "edit";
	initialValues?: CreateNodePayload;
};

export default function CreateNodeDialog({
	isOpen,
	onClose,
	onSubmit,
	mode = "create",
	initialValues,
}: CreateNodeDialogProps) {
	const [activeTab, setActiveTab] = useState<"title" | "description">("title");
	const [category, setCategory] = useState<NodeCategory>(
		initialValues?.category ?? NODE_CATEGORIES[0],
	);
	const [nodeTitle, setNodeTitle] = useState(initialValues?.title ?? "");
	const [nodeDescription, setNodeDescription] = useState(initialValues?.description ?? "");

	function handleCreateNode() {
		onSubmit({
			category,
			title: nodeTitle,
			description: nodeDescription,
		});
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
					<DialogTitle>
						{mode === "edit" ? "Editar node" : "Criar novo node"}
					</DialogTitle>
					<DialogDescription>
						{mode === "edit"
							? "Atualize categoria, título e descrição do node selecionado."
							: "Escolha a categoria e preencha título e descrição do node."}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="node-category">Categoria</Label>
						<Select
							value={category}
							onValueChange={(value) => setCategory(value as NodeCategory)}
						>
							<SelectTrigger id="node-category">
								<SelectValue placeholder="Selecione uma categoria" />
							</SelectTrigger>
							<SelectContent>
								{NODE_CATEGORIES.map((currentCategory) => (
									<SelectItem key={currentCategory} value={currentCategory}>
										{currentCategory}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<div className="space-y-2">
							<Label>Conteúdo do node</Label>
							<div className="grid grid-cols-2 gap-2 rounded-md border border-black/15 p-1 dark:border-white/15">
								<Button
									type="button"
									variant={activeTab === "title" ? "default" : "outline"}
									size="sm"
									onClick={() => setActiveTab("title")}
								>
									Título
								</Button>
								<Button
									type="button"
									variant={activeTab === "description" ? "default" : "outline"}
									size="sm"
									onClick={() => setActiveTab("description")}
								>
									Descrição
								</Button>
							</div>

							{activeTab === "title" ? (
								<div className="space-y-2">
									<Label htmlFor="node-title">Título do node</Label>
									<Input
										id="node-title"
										name="nodeTitle"
										placeholder="Ex.: Campanha Inicial"
										value={nodeTitle}
										onChange={(event) => setNodeTitle(event.target.value)}
									/>
								</div>
							) : (
								<div className="space-y-2">
									<Label htmlFor="node-description">Descrição</Label>
									<Input
										id="node-description"
										name="nodeDescription"
										placeholder="Ex.: Primeira etapa do funil"
										value={nodeDescription}
										onChange={(event) => setNodeDescription(event.target.value)}
									/>
								</div>
							)}
						</div>
					</div>
				</div>

				<DialogFooter className="mt-2 gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="button" onClick={handleCreateNode}>
						{mode === "edit" ? "Salvar" : "Criar node"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}