"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type DeleteNodeDialogProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	nodeTitle?: string;
};

export default function DeleteNodeDialog({
	isOpen,
	onClose,
	onConfirm,
	nodeTitle,
}: DeleteNodeDialogProps) {
	function handleOpenChange(open: boolean) {
		if (!open) {
			onClose();
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir etapa</DialogTitle>
					<DialogDescription>
						{nodeTitle
							? `Tem certeza que deseja excluir \"${nodeTitle}\"? Essa ação remove também as conexões da etapa.`
							: "Tem certeza que deseja excluir esta etapa? Essa ação remove também as conexões da etapa."}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-2 gap-2">
					<Button type="button" variant="outline" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="button" variant="destructive" onClick={onConfirm}>
						Excluir
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
