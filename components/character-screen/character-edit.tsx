import { FileUploadFull } from "../file-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { FormTextInput, FormTextArea } from "../text-input";
import { characterSchema } from "@/schemas/character";
import { useTranslation } from "react-i18next"

type CharacterFormData = z.infer<typeof characterSchema>;

export const CharacterEdit = () => {
  const { updateCharacterImage, showcaseJSON, selectedCharacter, setEditMode, updateCharacterDetails } = useShowcaseStore();
  const { t } = useTranslation()

  const form = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: showcaseJSON.personas[selectedCharacter].name,
      type: showcaseJSON.personas[selectedCharacter].type,
      description: showcaseJSON.personas[selectedCharacter].description,
    },
    mode: "onChange",
    shouldFocusError: true,
  });

  const handleFormSubmit = (data: CharacterFormData) => {
    updateCharacterDetails(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    form.reset({
      name: showcaseJSON.personas[selectedCharacter].name,
      type: showcaseJSON.personas[selectedCharacter].type,
      description: showcaseJSON.personas[selectedCharacter].description,
    });
    setEditMode(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="m-3 text-foreground bg-light-bg-secondary dark:bg-dark-bg-secondary dark:text-dark-text"
      >
        <div className="flex justify-between mt-3">
          <div>
            <p className="text-foreground text-sm">{t('character.section_title')}</p>
            <h3 className="text-2xl font-bold text-foreground">
              {t('character.info_header_title')}
            </h3>
          </div>
        </div>
        <hr className="mb-6" />

        <div className="grid grid-cols-2 gap-2 my-6">
          <FormTextInput
            label={t('character.edit_name_label')}
            name="name"
            register={form.register}
            error={form.formState.errors.name?.message}
            placeholder={t('character.edit_name_placeholder')}
          />

          <FormTextInput
            label={t('character.edit_role_label')}
            name="type"
            register={form.register}
            error={form.formState.errors.type?.message}
            placeholder={t('character.edit_role_placeholder')}
          />
        </div>

        <div className="my-6">
          <FormTextArea
            label={t('character.edit_description_label')}
            name="description"
            register={form.register}
            error={form.formState.errors.description?.message}
            placeholder={t('character.edit_description_placeholder')}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 my-6">
          <FileUploadFull
            text={t('character.headshot_image_label')}
            element={"headshot_image"}
            handleJSONUpdate={updateCharacterImage}
          />

          <FileUploadFull
            text={t('character.full_body_image_label')}
            element={"body_image"}
            handleJSONUpdate={updateCharacterImage}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
          >
            {t('action.cancel_label')}
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid || !form.formState.isDirty}
          >
            {t('action.save_label')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
