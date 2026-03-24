"use client";

import { useState } from "react";
import NodeFormFields from "@/components/modals/node-form-fields";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
						{mode === "edit" ? "Editar etapa" : "Criar nova etapa"}
					</DialogTitle>
					<DialogDescription>
						{mode === "edit"
							? "Atualize categoria, título e descrição da etapa selecionada."
							: "Escolha a categoria e preencha título e descrição da etapa."}
					</DialogDescription>
				</DialogHeader>

				<NodeFormFields
					category={category}
					onCategoryChange={setCategory}
					activeTab={activeTab}
					onActiveTabChange={setActiveTab}
					nodeTitle={nodeTitle}
					onNodeTitleChange={setNodeTitle}
					nodeDescription={nodeDescription}
					onNodeDescriptionChange={setNodeDescription}
				/>

				<DialogFooter className="mt-2 gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="button" onClick={handleCreateNode}>
						{mode === "edit" ? "Salvar" : "Criar etapa"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}