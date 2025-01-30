import { Attribute } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PREDICATE_OPTIONS } from "@/schemas/scenario";

interface ProofAttributeProps {
  index: number;
  attribute: string;
  availableAttributes: Attribute[];
  currentValue: string;
  onAttributeChange: (index: number, value: string) => void;
  onConditionTypeChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export const ProofAttribute = ({
  index,
  attribute,
  availableAttributes,
  currentValue,
  onAttributeChange,
  onConditionTypeChange,
  onRemove,
}: ProofAttributeProps) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-end">
      <div className="space-y-2">
        <label className="text-sm font-medium">Attribute</label>
        <Select
          value={attribute}
          onValueChange={(value) => onAttributeChange(index, value)}
        >
          {availableAttributes.map((attr) => (
            <Select.Option key={attr.name} value={attr.name}>
              {attr.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Attribute Value</label>
        <Input
          value={currentValue}
          disabled
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Condition</label>
        <Select
          value="none"
          onValueChange={(value) => onConditionTypeChange(index, value)}
        >
          {PREDICATE_OPTIONS.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Condition Value</label>
        <Input disabled />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
        className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};