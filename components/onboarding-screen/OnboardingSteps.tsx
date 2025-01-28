"use client";

import { useState, useEffect } from "react";
import { BasicStepEdit } from "./BasicStepEdit";
import { IssueStepEdit } from "./IssueStepEdit";
import { CreateNewStep } from "./CreateNewStep";
import { NoSelection } from "../credentials/no-selection";
import { useShowcase } from "@/hooks/use-showcase";

export type OnboardingStepState =
  | "editing-basic"
  | "editing-issue"
  | "no-selection"
  | "creating-new";

export const OnboardingSteps = () => {
  const { showcaseJSON, selectedCharacter, setShowcaseJSON } = useShowcase();
  // Handling state; what step is editable
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Handling state; what screen is shown, if not editing
  const [stepState, setStepState] =
    useState<OnboardingStepState>("no-selection");

  // Add new step
  const addNewStep = (isIssue: boolean) => {
    if (isIssue) {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding.push({
          screenId: `${Date.now()}`,
          title: "",
          text: "",
          image: "",
          credentials: [],
        });
      });
    } else {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding.push({
          screenId: `${Date.now()}`,
          title: "",
          text: "",
          image: "",
        });
      });
    }
    setSelectedStep(showcaseJSON.personas[selectedCharacter].onboarding.length);
  };

  useEffect(() => {
    if (selectedStep == null) {
      setStepState("no-selection");
    } else if (
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
        .credentials
    ) {
      setStepState("editing-issue");
    } else {
      setStepState("editing-basic");
    }
  }, [selectedStep, showcaseJSON.personas, selectedCharacter]);

  const handleStepState = (state: OnboardingStepState) => {
    setStepState(state);
  };

  return (
    <div
      id="editStep"
      // className="w-1/2 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col "
      className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col "
    >
      {stepState === "no-selection" ? (
        <div className="">
          <NoSelection text={"No Step Selected"} />
        </div>
      ) : null}
      {stepState === "creating-new" ? (
        <CreateNewStep addNewStep={addNewStep} />
      ) : null}
      {stepState === "editing-basic" && selectedStep !== null ? (
        <div className="">
          <BasicStepEdit
            selectedCharacter={selectedCharacter}
            setSelectedStep={setSelectedStep}
            selectedStep={selectedStep}
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
          />
        </div>
      ) : null}
      {stepState === "editing-issue" && selectedStep !== null ? (
        <IssueStepEdit<OnboardingStepState>
          selectedCharacter={selectedCharacter}
          setSelectedStep={setSelectedStep}
          selectedStep={selectedStep}
          showcaseJSON={showcaseJSON}
          setShowcaseJSON={setShowcaseJSON}
          setStepState={handleStepState}
        />
      ) : null}
    </div>
  );
};
