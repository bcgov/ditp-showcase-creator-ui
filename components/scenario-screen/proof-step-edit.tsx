"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextInput, FormTextArea } from "@/components/text-input";
import { DisplaySearchResults } from "../onboarding-screen/display-search-results";
import { DisplayStepCredentials } from "./display-step-credentials";
import { useScenarios } from "@/hooks/use-scenarios";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { proofStepSchema, ProofStepFormData } from "@/schemas/scenario";
import { RequestType, ScenarioStep, StepType } from "@/types";
import { Search } from "lucide-react";

export const ProofStepEdit = () => {
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const { 
    scenarios,
    selectedScenario,
    selectedStep,
    setStepState,
    updateStep,
  } = useScenarios();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const currentScenario = selectedScenario !== null ? scenarios[selectedScenario] : null;
  const currentStep = currentScenario && selectedStep !== null 
    ? currentScenario.steps[selectedStep] 
    : null;

  const form = useForm<ProofStepFormData>({
    resolver: zodResolver(proofStepSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (currentStep && currentStep.type === StepType.CONNECT_AND_VERIFY) {
      const proofStep = {
        ...currentStep,
        requestOptions: {
          ...currentStep.requestOptions,
          proofRequest: {
            attributes: currentStep.requestOptions.proofRequest.attributes || {},
            predicates: currentStep.requestOptions.proofRequest.predicates || {},
          },
        },
      } as ProofStepFormData;
      
      form.reset(proofStep);
    }
  }, [currentStep, form.reset]);

  const searchCredential = (value: string) => {
    setSearchResults([]);
    if (!value) return;

    const credentials = showcaseJSON.personas[selectedCharacter].credentials;
    const search = value.toUpperCase();

    const results = Object.keys(credentials).filter(credentialId => 
      credentials[credentialId].issuer_name.toUpperCase().includes(search) ||
      credentials[credentialId].name.toUpperCase().includes(search)
    );

    setSearchResults(results);
  };

  const addCredential = (credentialId: string) => {
    setSearchResults([]);
    const currentAttributes = form.getValues("requestOptions.proofRequest.attributes");
    
    if (!currentAttributes[credentialId]) {
      const credential = showcaseJSON.personas[selectedCharacter].credentials[credentialId];
      form.setValue(`requestOptions.proofRequest.attributes.${credentialId}`, {
        attributes: [credential.attributes[0].name],
      }, { 
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const removeCredential = (credentialId: string) => {
    const formValues = form.getValues();
    const newAttributes = { ...formValues.requestOptions.proofRequest.attributes };
    delete newAttributes[credentialId];

    form.setValue("requestOptions.proofRequest.attributes", newAttributes, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    // Remove any predicates that reference this credential
    if (formValues.requestOptions.proofRequest.predicates) {
      const newPredicates = { ...formValues.requestOptions.proofRequest.predicates };
      Object.entries(newPredicates).forEach(([key, predicate]) => {
        if (predicate.restrictions[0] === credentialId) {
          delete newPredicates[key];
        }
      });

      form.setValue("requestOptions.proofRequest.predicates", newPredicates, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: ProofStepFormData) => {
    if (selectedScenario === null || selectedStep === null) return;

    const updatedStep: ScenarioStep = {
      ...data,
      type: StepType.CONNECT_AND_VERIFY,
      requestOptions: {
        ...data.requestOptions,
        type: RequestType.OOB,
        proofRequest: {
          attributes: data.requestOptions.proofRequest.attributes,
          predicates: data.requestOptions.proofRequest.predicates || {},
        },
      },
    };

    updateStep(selectedScenario, selectedStep, updatedStep);
    setStepState("none-selected");
  };

  if (!currentStep) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="text-foreground text-sm">Scenario</p>
          <h3 className="text-2xl font-bold text-foreground">
            Edit Proof Step
          </h3>
        </div>
        <hr />

        <div className="space-y-6">
          <FormTextInput
            label="Title"
            name="title"
            register={form.register}
            error={form.formState.errors.title?.message}
            placeholder="Enter title"
          />

          <FormTextArea
            label="Page Description"
            name="text"
            register={form.register}
            error={form.formState.errors.text?.message}
            placeholder="Enter description"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-bold">Request Options</h4>
          <hr />

          <FormTextInput
            label="Title"
            name="requestOptions.title"
            register={form.register}
            error={form.formState.errors.requestOptions?.title?.message}
            placeholder="Enter request title"
          />

          <FormTextArea
            label="Text"
            name="requestOptions.text"
            register={form.register}
            error={form.formState.errors.requestOptions?.text?.message}
            placeholder="Enter request text"
          />

          <div className="space-y-4">
            <div>
              <p className="text-md font-bold">Search for a Credential:</p>
              <div className="flex flex-row justify-center items-center my-4">
                <div className="relative w-full">
                  <input
                    className="dark:text-dark-text dark:bg-dark-input border dark:border-dark-border rounded pl-2 pr-10 mb-2 w-full bg-light-bg"
                    placeholder="ex. Student Card"
                    type="text"
                    onChange={(e) => searchCredential(e.target.value)}
                  />
                  <span className="absolute right-4 top-1/4">
                    <Search />
                  </span>
                </div>
              </div>
            </div>

            <DisplaySearchResults
              selectedCharacter={selectedCharacter}
              showcaseJSON={showcaseJSON}
              searchResults={searchResults}
              addCredential={addCredential}
            />

            {currentScenario && (
              <DisplayStepCredentials
                selectedCharacter={selectedCharacter}
                showcaseJSON={showcaseJSON}
                localData={form.watch()}
                selectedStep={selectedStep}
                selectedScenario={selectedScenario}
                removeCredential={removeCredential}
              />
            )}
          </div>
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