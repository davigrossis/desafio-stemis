import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NODE_CATEGORIES, type NodeCategory } from "@/lib/funnel-node";

type NodeFormFieldsProps = {
  category: NodeCategory;
  onCategoryChange: (value: NodeCategory) => void;
  activeTab: "title" | "description";
  onActiveTabChange: (value: "title" | "description") => void;
  nodeTitle: string;
  onNodeTitleChange: (value: string) => void;
  nodeDescription: string;
  onNodeDescriptionChange: (value: string) => void;
};

export default function NodeFormFields({
  category,
  onCategoryChange,
  activeTab,
  onActiveTabChange,
  nodeTitle,
  onNodeTitleChange,
  nodeDescription,
  onNodeDescriptionChange,
}: NodeFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="node-category">Categoria</Label>
        <Select value={category} onValueChange={(value) => onCategoryChange(value as NodeCategory)}>
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
          <Label>Conteúdo da etapa</Label>
          <div className="grid grid-cols-2 gap-2 rounded-md border border-black/15 p-1 dark:border-white/15">
            <Button
              type="button"
              variant={activeTab === "title" ? "default" : "outline"}
              size="sm"
              onClick={() => onActiveTabChange("title")}
            >
              Título
            </Button>
            <Button
              type="button"
              variant={activeTab === "description" ? "default" : "outline"}
              size="sm"
              onClick={() => onActiveTabChange("description")}
            >
              Descrição
            </Button>
          </div>

          {activeTab === "title" ? (
            <div className="space-y-2">
              <Label htmlFor="node-title">Título da etapa</Label>
              <Input
                id="node-title"
                name="nodeTitle"
                placeholder="Ex.: Campanha Inicial"
                value={nodeTitle}
                onChange={(event) => onNodeTitleChange(event.target.value)}
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
                onChange={(event) => onNodeDescriptionChange(event.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
