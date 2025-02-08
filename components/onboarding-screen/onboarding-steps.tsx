"use client";

import { useEffect } from "react";
import { BasicStepEdit } from "./basic-step-edit";
import { IssueStepEdit } from "./issue-step-edit";
import { CreateNewStep } from "./create-step";
import { NoSelection } from "../credentials/no-selection";
import { useOnboarding } from "@/hooks/use-onboarding";
import { useTranslations } from 'next-intl';

export const OnboardingSteps = () => {
  const t = useTranslations()
  const {
    selectedStep,
    stepState,
    screens,
    setStepState,
  } = useOnboarding();

  useEffect(() => {
    if (selectedStep === null) {
      setStepState("no-selection");
    } else {
      const currentStep = screens[selectedStep];
      setStepState(currentStep?.credentials ? "editing-issue" : "editing-basic");
    }
  }, [selectedStep, screens, setStepState]);

  return (
    <div
      id="editStep"
      className="w-3/5 two-column-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col"
    >
      {stepState === "no-selection" && (
        <div className="">
          <NoSelection text={t('onboarding.no_step_selected_message')} />
        </div>
      )}

      {stepState === "creating-new" && (
        <CreateNewStep />
      )}

      {stepState === "editing-basic" && selectedStep !== null && (
        <div className="">
          <BasicStepEdit />
        </div>
      )}

      {stepState === "editing-issue" && selectedStep !== null && (
        <IssueStepEdit />
      )}
    </div>
  );
};
