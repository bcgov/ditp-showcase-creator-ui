import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CredentialFormData } from "@/schemas/credential";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormTextInput } from "@/components/text-input";
import { Attribute } from "@/types";
import { useTranslations } from 'next-intl';

const ATTRIBUTE_TYPES = [
  { value: "string", label: "String" },
  { value: "int", label: "Integer" },
  { value: "float", label: "Float" },
  { value: "bool", label: "Boolean" },
  { value: "date", label: "Date" },
] as const;

interface CredentialAttributesProps {
  mode: 'create' | 'edit' | 'view';
  form: UseFormReturn<CredentialFormData>;
  attributes?: Attribute[];
}

export const CredentialAttributes = ({
  mode,
  form,
  attributes
}: CredentialAttributesProps) => {
  const t = useTranslations()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  if (mode === 'view' && attributes) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            {t('credentials.attributes_label')}
          </h4>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('credentials.attribute_name_label')}</TableHead>
              <TableHead>{t('credentials.attribute_value_label')}</TableHead>
              <TableHead>{t('credentials.attribute_type_label')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attributes.map((attr, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{attr.name}</TableCell>
                <TableCell>{attr.value}</TableCell>
                <TableCell>{attr.type || "string"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="text-md font-bold">{t('credentials.attributes_label')}</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: "", value: "", type: "string" })}
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('credentials.attributes_add_attribute_label')}
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-2 items-start"
          >
            <div className="col-span-4">
              <FormTextInput
                name={`attributes.${index}.name`}
                label={t('credentials.attribute_name_label')}
                register={form.register}
                error={form.formState.errors.attributes?.[index]?.name?.message}
                placeholder={t('credentials.attribute_name_placeholder')}
              />
            </div>
            <div className="col-span-4">
              <FormTextInput
                name={`attributes.${index}.value`}
                register={form.register}
                error={form.formState.errors.attributes?.[index]?.value?.message}
                label={t('credentials.attribute_value_label')}
                placeholder={t('credentials.attribute_value_placeholder')}
              />
            </div>
            <div className="col-span-3">
              <label className="text-sm font-medium mb-2 block">{t('credentials.attribute_type_label')}</label>
              <Select
                onValueChange={(value) => {
                  form.setValue(`attributes.${index}.type`, value as any);
                }}
                defaultValue={field.type || "string"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ATTRIBUTE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 pt-6">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
