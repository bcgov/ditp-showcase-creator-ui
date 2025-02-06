import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useShowcaseStore } from '@/hooks/use-showcase-store';
import { useOnboarding } from '@/hooks/use-onboarding';
import { IssueStepFormData, issueStepSchema } from '@/schemas/onboarding';

export const useIssueStep = () => {
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const { selectedStep, screens, updateStep, setSelectedStep, setStepState } = useOnboarding();
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const currentStep = selectedStep !== null ? screens[selectedStep] : null;

  const defaultValues = currentStep
    ? {
        title: currentStep.title,
        text: currentStep.text,
        image: currentStep.image || "",
        credentials: currentStep.credentials || [],
      }
    : {
        title: "",
        text: "",
        image: "",
        credentials: [],
      };

  const form = useForm<IssueStepFormData>({
    resolver: zodResolver(issueStepSchema),
    defaultValues,
    mode: 'onChange',
  });

  const searchCredential = (searchText: string) => {
    setSearchResults([]);
    if (!searchText) return;

    const credentials = showcaseJSON.personas[selectedCharacter].credentials;
    const searchUpper = searchText.toUpperCase();

    const results = Object.keys(credentials).filter((credentialId) => 
      credentials[credentialId].issuer_name.toUpperCase().includes(searchUpper) ||
      credentials[credentialId].name.toUpperCase().includes(searchUpper)
    );

    setSearchResults(results);
  };

  const addCredential = (credentialId: string) => {
    const currentCredentials = form.getValues("credentials") || [];
    if (!currentCredentials.includes(credentialId)) {
      form.setValue("credentials", [...currentCredentials, credentialId], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    setSearchResults([]);
  };

  const removeCredential = (credentialId: string) => {
    const currentCredentials = form.getValues("credentials") || [];
    form.setValue(
      "credentials",
      currentCredentials.filter(id => id !== credentialId),
      { shouldDirty: true, shouldValidate: true }
    );
  };

  const onSubmit = (data: IssueStepFormData) => {
    if (selectedStep === null) return;

    const updatedStep = {
      ...screens[selectedStep],
      ...data,
    };

    updateStep(selectedStep, updatedStep);
    setStepState('no-selection');
    setSelectedStep(null);
  };

  const handleCancel = () => {
    form.reset();
    setStepState('no-selection');
    setSelectedStep(null);
  };

  return {
    form,
    searchResults,
    searchCredential,
    addCredential,
    removeCredential,
    onSubmit,
    handleCancel,
    currentStep,
    selectedStep,
  };
};