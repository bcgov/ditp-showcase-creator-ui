import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextInput } from "../text-input";
import { Edit } from "lucide-react";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useCredentials } from "@/hooks/use-credentials";
import { CredentialFormData, credentialSchema } from "@/schemas/credential";
import { CredentialAttributes } from "./components/credential-attribute";

export const CredentialsForm = () => {
  const {
    showcaseJSON,
    selectedCharacter,
    updateCredential,
    createCredential,
  } = useShowcaseStore();
  const { mode, selectedCredential, cancel, startEditing } = useCredentials();
  
  const existingCredential = selectedCredential
    ? showcaseJSON.personas[selectedCharacter].credentials[selectedCredential]
    : null;

  const defaultValues = existingCredential
    ? {
        name: existingCredential.name,
        issuer_name: existingCredential.issuer_name,
        version: existingCredential.version,
        icon: existingCredential.icon,
        attributes: existingCredential.attributes.map((attr) => ({
          ...attr,
          type: (attr.type as "string" | "float" | "date" | "int" | "bool") || "string",
        })),
      }
    : {
        name: "",
        issuer_name: "",
        version: "",
        icon: "",
        attributes: [],
      };

  const form = useForm<CredentialFormData>({
    resolver: zodResolver(credentialSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (existingCredential && mode === 'edit') {
      form.reset({
        name: existingCredential.name,
        issuer_name: existingCredential.issuer_name,
        version: existingCredential.version,
        icon: existingCredential.icon,
        attributes: existingCredential.attributes.map((attr) => ({
          ...attr,
          type: (attr.type as "string" | "float" | "date" | "int" | "bool") || "string",
        })),
      });
    } else if (mode === 'create') {
      form.reset(defaultValues);
    }
  }, [selectedCredential, existingCredential, form, mode]);

  const onSubmit = (data: CredentialFormData) => {
    if (mode === "create" && selectedCredential) {
      createCredential(selectedCredential, data);
    } else if (mode === "edit" && selectedCredential) {
      updateCredential(selectedCredential, data);
    }
    cancel();
  };

  const handleCancel = () => {
    form.reset();
    cancel();
  };

  if (mode === "view" && existingCredential) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <div>
            <p className="text-foreground text-sm">Credentials</p>
            <h3 className="text-2xl font-bold text-foreground">
              Credential Details
            </h3>
          </div>
          <Button
            variant="outline"
            onClick={() => selectedCredential && startEditing(selectedCredential)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
        <hr />

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Credential Name
              </h4>
              <p className="text-lg">{existingCredential.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Issuer
              </h4>
              <p className="text-lg">{existingCredential.issuer_name}</p>
            </div>
          </div>

          <CredentialAttributes
            mode="view"
            form={form}
            attributes={existingCredential.attributes}
          />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between mt-3">
          <div>
            <p className="text-foreground text-sm">Credentials</p>
            <h3 className="text-2xl font-bold text-foreground">
              {mode === "create" ? "Add a new Credential" : "Edit Credential"}
            </h3>
          </div>
        </div>
        <hr />

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormTextInput
              label="Credential Name"
              name="name"
              register={form.register}
              error={form.formState.errors.name?.message}
              placeholder="Enter credential name"
            />

            <FormTextInput
              label="Issuer Name"
              name="issuer_name"
              register={form.register}
              error={form.formState.errors.issuer_name?.message}
              placeholder="Enter issuer name"
            />
          </div>

          <CredentialAttributes
            mode={mode as 'create' | 'edit' | 'view'}
            form={form}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={mode === 'edit' ? !form.formState.isValid : !form.formState.isDirty || !form.formState.isValid}
            >
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};