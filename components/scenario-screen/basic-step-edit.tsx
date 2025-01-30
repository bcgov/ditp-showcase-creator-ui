"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextInput, FormTextArea } from "@/components/text-input";
import { basicStepSchema, BasicStepFormData } from "@/schemas/scenario";
import { useScenarios } from "@/hooks/use-scenarios";
import { ScenarioStep } from "@/types";


export const BasicStepEdit = () => {
  const {
    scenarios,
    selectedScenario,
    selectedStep,
    setStepState,
    updateStep,
  } = useScenarios();

  const currentScenario = selectedScenario !== null ? scenarios[selectedScenario] : null;
  const currentStep = currentScenario && selectedStep !== null 
    ? currentScenario.steps[selectedStep] 
    : null;

  const form = useForm<BasicStepFormData>({
    resolver: zodResolver(basicStepSchema),
    mode: "all",
  });

  useEffect(() => {
    if (currentStep) {
      form.reset(currentStep as ScenarioStep);
    }
  }, [currentStep, form.reset]);

  const onSubmit = (data: BasicStepFormData) => {
    if (selectedScenario === null || selectedStep === null) return;

    updateStep(selectedScenario, selectedStep, data);
    setStepState("none-selected");
  };

  if (!currentStep) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="text-muted-foreground">Scenario</p>
          <h3 className="text-2xl font-bold">Edit Basic Step</h3>
        </div>
        <hr className="border-border" />

        <div className="space-y-6">
          <FormTextInput
            label="Title"
            name="title"
            register={form.register}
            error={form.formState.errors.title?.message}
            placeholder="Enter step title"
          />

          <FormTextArea
            label="Page Description"
            name="text"
            register={form.register}
            error={form.formState.errors.text?.message}
            placeholder="Enter step description"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStepState("none-selected")}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};