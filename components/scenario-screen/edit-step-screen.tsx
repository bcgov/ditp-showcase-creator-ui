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
import { StepType } from "@/types";
import { useTranslations } from 'next-intl';

export const EditStepScreen = () => {
  const t = useTranslations()
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const {
    scenarios,
    selectedScenario,
    selectedStep,
    stepState,
    setScenarios,
    addStep,
  } = useScenarios();

  useEffect(() => {
    setScenarios(showcaseJSON.personas[selectedCharacter].scenarios);
  }, [selectedCharacter, showcaseJSON.personas]);

  const currentScenario = selectedScenario !== null ? scenarios[selectedScenario] : null;
  const currentStep = currentScenario && selectedStep !== null 
    ? currentScenario.steps[selectedStep] 
    : null;

  const handleAddStep = (type: StepType) => {
    if (selectedScenario === null) return;
    const newStep = createEmptyStep(type);
    addStep(selectedScenario, newStep);
  };

  return (
    <div className="w-3/5 two-column-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col">
      {stepState === "adding-step" && (
        <ChooseStepType addNewStep={handleAddStep} />
      )}

      {stepState === "editing-scenario" && <ScenarioEdit />}

      {stepState === "basic-step-edit" && currentStep?.type === "BASIC" && (
        <BasicStepEdit />
      )}

      {stepState === "proof-step-edit" &&
        currentStep?.type === "CONNET_AND_VERIFY" && <ProofStepEdit />}

      {(stepState === "none-selected" || stepState === null) && (
        <NoSelection text={t('scenario.no_scenario_selected_message')} />
      )}
    </div>
  );
};
