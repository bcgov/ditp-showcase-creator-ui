"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextInput, FormTextArea } from "@/components/text-input";
import { basicStepSchema, BasicStepFormData } from "@/schemas/scenario";
import { useScenarios } from "@/hooks/use-scenarios";
import { RequestType, StepType } from "@/types";

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
      defaultValues: {
        type: StepType.BASIC,
        title: "",
        text: "",
        requestOptions: {
          type: RequestType.BASIC,
          title: "",
          text: "",
          proofRequest: {
            attributes: {},
            predicates: {},
          },
        },
      },
    });

    useEffect(() => {
      if (currentStep) {
        const formData = {
          screenId: currentStep.screenId,
          type: StepType.BASIC,
          title: currentStep.title,
          text: currentStep.text,
          requestOptions: {
            type: RequestType.BASIC,
            title: currentStep.requestOptions?.title || "",
            text: currentStep.requestOptions?.text || "",
            proofRequest: {
              attributes: currentStep.requestOptions?.proofRequest?.attributes || {},
              predicates: currentStep.requestOptions?.proofRequest?.predicates || {},
            },
          },
        };
        form.reset(formData as BasicStepFormData);
      }
    }, [currentStep, form.reset]);

    const onSubmit = (data: BasicStepFormData) => {
      if (selectedScenario === null || selectedStep === null) return;
  
      // Transform the form data back to the expected format
      const stepData = {
        ...data,
        type: data.type.toUpperCase() as StepType,
        requestOptions: {
          ...data.requestOptions,
          type: data.requestOptions.type.toUpperCase() as RequestType,
        },
      };
  
      updateStep(selectedScenario, selectedStep, stepData);
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