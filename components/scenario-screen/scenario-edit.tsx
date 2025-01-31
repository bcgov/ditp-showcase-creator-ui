"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextInput, FormTextArea } from "@/components/text-input";
import { LocalFileUpload } from "./local-file-upload";
import { useScenarios } from "@/hooks/use-scenarios";
import { scenarioSchema } from "@/schemas/scenario";
import { ScenarioFormData } from "@/schemas/scenario";
import { Scenario } from "@/types";
import { scenarioToFormData } from "@/lib/scenario-transformers";
import { useTranslation } from "react-i18next";

export const ScenarioEdit = () => {
  const { t } = useTranslation()
  const {
    scenarios,
    selectedScenario,
    updateScenario,
    setStepState,
  } = useScenarios();

  const currentScenario = selectedScenario !== null ? scenarios[selectedScenario] : null;

  const form = useForm<ScenarioFormData>({
    resolver: zodResolver(scenarioSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (currentScenario) {
      const formData = scenarioToFormData(currentScenario);
      form.reset(formData);
    }
  }, [currentScenario, form.reset]);
  const onSubmit = (data: ScenarioFormData) => {
    if (selectedScenario === null) return;

    const updatedScenario: Scenario = {
      ...data,
      overview: {
        ...data.overview,
        image: data.overview.image || '',
      },
      summary: {
        ...data.summary,
        image: data.summary.image || '',
      },
      steps: currentScenario?.steps || [],
    };

    updateScenario(selectedScenario, updatedScenario);
    setStepState("none-selected");
  };  

  if (!currentScenario) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="text-foreground text-sm">{t('scenario.edit_header_title')}</p>
          <h3 className="text-2xl font-bold text-foreground">{t('scenario.edit_header_title')}</h3>
        </div>
        <hr />

        <div className="space-y-6">
          <h4 className="text-xl font-bold">{t('scenario.edit_overview_label')}</h4>

          <FormTextInput
            label={t('scenario.edit_name_label')}
            name="name"
            register={form.register}
            error={form.formState.errors.name?.message}
            placeholder={t('scenario.edit_name_placeholder')}
          />

          <FormTextInput
            label={t('scenario.edit_page_title_label')}
            name="overview.title"
            register={form.register}
            error={form.formState.errors.overview?.title?.message}
            placeholder={t('scenario.edit_page_title_placeholder')}
          />

          <FormTextArea
            label={t('scenario.edit_page_description_label')}
            name="overview.text"
            register={form.register}
            error={form.formState.errors.overview?.text?.message}
            placeholder={t('scenario.edit_page_description_placeholder')}
          />

          <div className="space-y-2">
          <LocalFileUpload
              text={t('scenario.edit_image_label')}
              element={["overview", "image"] as [string, string]}
              handleLocalUpdate={(path, value) => 
                form.setValue(
                  `${path[0]}.${path[1]}` as "overview.image" | "summary.image", 
                  value, 
                  {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  }
                )
              }
              localJSON={{ 
                overview: { image: form.watch("overview.image") },
                summary: { image: form.watch("summary.image") }
              }}
            />
            {form.formState.errors.overview?.image && (
              <p className="text-sm text-destructive">
                {form.formState.errors.overview.image.message}
              </p>
            )}
          </div>
        </div>

        <hr />

        {/* Summary Section */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold">{t('scenario.edit_summary_label')}</h4>

          <FormTextInput
            label={t('scenario.edit_page_title_label')}
            name="summary.title"
            register={form.register}
            error={form.formState.errors.summary?.title?.message}
            placeholder={t('scenario.edit_page_title_placeholder')}
          />

          <FormTextArea
            label={t('scenario.edit_page_description_label')}
            name="summary.text"
            register={form.register}
            error={form.formState.errors.summary?.text?.message}
            placeholder={t('scenario.edit_page_description_placeholder')}
          />

          <div className="space-y-2">
          <LocalFileUpload
              text={t('scenario.edit_image_label')}
              element={["summary", "image"] as [string, string]}
              handleLocalUpdate={(path, value) => 
                form.setValue(
                  `${path[0]}.${path[1]}` as "overview.image" | "summary.image", 
                  value, 
                  {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  }
                )
              }
              localJSON={{ 
                overview: { image: form.watch("overview.image") },
                summary: { image: form.watch("summary.image") }
              }}
            />
            {form.formState.errors.summary?.image && (
              <p className="text-sm text-destructive">
                {form.formState.errors.summary.image.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStepState("none-selected")}
          >
            {t('action.cancel_label')}
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            {t('action.save_label')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
