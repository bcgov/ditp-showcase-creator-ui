"use client";

import { useEffect } from "react";
import { BasicStepEdit } from "@/components/scenario-screen/basic-step-edit";
import { ProofStepEdit } from "@/components/scenario-screen/proof-step-edit";
import { ChooseStepType } from "@/components/scenario-screen/choose-step-type";
import { ScenarioEdit } from "@/components/scenario-screen/scenario-edit";
import { NoSelection } from "@/components/credentials/no-selection";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useScenarios } from "@/hooks/use-scenarios";
import { createEmptyStep } from "@/hooks/use-scenarios";

export const EditStepScreen = () => {
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const { 
    scenarios,
    selectedScenario,
    selectedStep,
    stepState,
    setScenarios,
    setStepState,
    addStep,
  } = useScenarios();

  useEffect(() => {
    setScenarios(showcaseJSON.personas[selectedCharacter].scenarios);
  }, [showcaseJSON.personas, selectedCharacter, setScenarios]);

  const handleAddStep = (type: string) => {
    if (selectedScenario === null) return;

    const newStep = createEmptyStep(type === 'proof');

    if (type === "proof") {
      newStep.type = "CONNET_AND_VERIFY";
      newStep.title = "Confirm the information to send";
      newStep.requestOptions = {
        type: "OOB",
        title: "",
        text: "",
        proofRequest: {
          attributes: {},
          predicates: {},
        },
      };
    } else {
      newStep.type = "BASIC";
      newStep.requestOptions = {
        type: "BASIC",
        title: "",
        text: "",
        proofRequest: {
          attributes: {},
          predicates: {},
        },
      };
    }

    addStep(selectedScenario, newStep);
    setStepState(type === "proof" ? "proof-step-edit" : "basic-step-edit");
  };

  const currentScenario = selectedScenario !== null ? scenarios[selectedScenario] : null;
  const currentStep = selectedStep !== null && currentScenario 
    ? currentScenario.steps[selectedStep] 
    : null;

  return (
    <div className="w-3/5 two-column-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col">
      {stepState === "none-selected" || stepState == null ? (
        <NoSelection text={"Nothing Selected"} />
      ) : null}

      {stepState === "editing-scenario" && currentScenario ? (
        <ScenarioEdit />
      ) : null}

      {stepState === "basic-step-edit" && currentStep?.type === "BASIC" ? (
        <BasicStepEdit />
      ) : null}

      {stepState === "proof-step-edit" && currentStep?.type === "CONNET_AND_VERIFY" ? (
        <ProofStepEdit />
      ) : null}

      {stepState === "adding-step" && (
        <ChooseStepType addNewStep={handleAddStep} />
      )}
    </div>
  );
};