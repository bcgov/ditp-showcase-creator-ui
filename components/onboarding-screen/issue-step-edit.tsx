"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormTextArea, FormTextInput } from "@/components/text-input";
import { LocalFileUpload } from "@/components/onboarding-screen/local-file-upload";
import { DisplaySearchResults } from "./display-search-results";
import { DisplayAddedCredentials } from "./display-added-credentials";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useOnboarding } from "@/hooks/use-onboarding";
import { IssueStepFormData, issueStepSchema } from "@/schemas/onboarding";
import { Search } from "lucide-react";

export function IssueStepEdit() {
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const { selectedStep, screens, updateStep, setSelectedStep, setStepState } =
    useOnboarding();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const currentStep = selectedStep !== null ? screens[selectedStep] : null;

  const form = useForm<IssueStepFormData>({
    resolver: zodResolver(issueStepSchema),
    mode: "all",
  });

  useEffect(() => {
    if (currentStep) {
      form.reset({
        title: currentStep.title,
        text: currentStep.text,
        image: currentStep.image || "",
        credentials: currentStep.credentials || [],
      });
    }
  }, [currentStep, form.reset]);

  const searchCredential = (searchText: string) => {
    setSearchResults([]);
    if (!searchText) return;

    const credentials = showcaseJSON.personas[selectedCharacter].credentials;
    const searchUpper = searchText.toUpperCase();

    const results = Object.keys(credentials).filter(
      (credentialId) =>
        credentials[credentialId].issuer_name
          .toUpperCase()
          .includes(searchUpper) ||
        credentials[credentialId].name.toUpperCase().includes(searchUpper)
    );

    setSearchResults(results);
  };

  const addCredential = (credentialId: string) => {
    const currentCredentials = form.getValues("credentials") || [];
    if (!currentCredentials.includes(credentialId)) {
      form.setValue("credentials", [...currentCredentials, credentialId], {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
    setSearchResults([]);
  };

  const removeCredential = (credentialId: string) => {
    const currentCredentials = form.getValues("credentials") || [];
    form.setValue(
      "credentials",
      currentCredentials.filter((id) => id !== credentialId),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      }
    );
  };

  const onSubmit = (data: IssueStepFormData) => {
    if (selectedStep === null) return;

    const updatedStep = {
      ...screens[selectedStep],
      ...data,
      screenId: screens[selectedStep].screenId,
    };

    updateStep(selectedStep, updatedStep);
    setStepState("no-selection");
    setSelectedStep(null);
  };

  const handleCancel = () => {
    form.reset();
    setStepState("no-selection");
    setSelectedStep(null);
  };

  if (selectedStep === null) {
    return null;
  }

  const localJSON = {
    image: form.watch("image"),
    credentials: form.watch("credentials"),
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <p className="text-foreground text-sm">Onboarding</p>
          <h3 className="text-2xl font-bold text-foreground">
            Edit an Issue a Credential Step
          </h3>
        </div>
        <hr />

        <div className="space-y-6">
          <FormTextInput
            label="Page Title"
            name="title"
            register={form.register}
            error={form.formState.errors.title?.message}
            placeholder="Enter page title"
          />

          <div className="space-y-2">
            <FormTextArea
              label="Page Description"
              name="text"
              register={form.register}
              error={form.formState.errors.text?.message}
              placeholder="Enter page description"
            />
          </div>

          <div className="space-y-2">
            <LocalFileUpload
              text="Icon"
              element="image"
              handleLocalUpdate={(_, value) => form.setValue("image", value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })}
              localJSON={localJSON}
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">Add your Credential</p>
              <hr />
            </div>

            <div className="mt-6">
              <p className="text-md font-bold">Search for a Credential:</p>
              <div className="flex flex-row justify-center items-center my-4">
                <div className="relative w-full">
                  <input
                    className="dark:text-dark-text dark:bg-dark-input rounded pl-2 pr-10 mb-2 w-full border"
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

            <DisplayAddedCredentials
              selectedCharacter={selectedCharacter}
              showcaseJSON={showcaseJSON}
              localJSON={localJSON}
              removeCredential={removeCredential}
            />

            {form.formState.errors.credentials && (
              <p className="text-sm text-destructive">
                {form.formState.errors.credentials.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!form.formState.isDirty}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}