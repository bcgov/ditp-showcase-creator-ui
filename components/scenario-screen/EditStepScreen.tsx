"use client";

import { useState } from "react";

import BasicStepEdit from "@/components/scenario-screen/BasicStepEdit";
import { ProofStepEdit } from "@/components/scenario-screen/ProofStepEdit";
import { ChooseStepType } from "@/components/scenario-screen/ChooseStepType";
import { IssueStepEdit } from "@/components/onboarding-screen/IssueStepEdit";
import { ScenarioEdit } from "@/components/scenario-screen/ScenarioEdit";
import { NoSelection } from "@/components/credentials/no-selection";
import { Scenario, ScenarioStep as ScenarioStepType } from "../../types";
import { useShowcase } from "@/hooks/use-showcase";

type ScenarioStepState =
  | "none-selected"
  | "adding-step"
  | "basic-step-edit"
  | "proof-step-edit"
  | "editing-scenario"
  | "editing-issue"
  | null;

export const EditStepScreen = () => {
  const { showcaseJSON, setShowcaseJSON, selectedCharacter } = useShowcase();
  // Handling state; what screen is shown, if not editing
  const [state, setState] = useState<ScenarioStepState>(null);
  const [selectedScenario, ] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Add new step
  const addNewStep = (type: string) => {
    if (selectedScenario === null) return;
    if (type === "basic") {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].scenarios[selectedScenario].steps.push(
          {
            screenId: Date.now().toString(),
            type: "BASIC",
            title: "",
            text: "",
            requestOptions: {
              type: "BASIC",
              title: "",
              text: "",
              proofRequest: {
                attributes: {},
                predicates: {},
              },
            },
          }
        );
      });

      setState("basic-step-edit");
    } else if (type === "proof") {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].scenarios[selectedScenario].steps.push(
          {
            screenId: Date.now().toString(),
            type: "CONNET_AND_VERIFY",
            title: "Confirm the information to send",
            text: "",
            requestOptions: {
              type: "OOB",
              title: "",
              text: "",
              proofRequest: {
                attributes: {},
                predicates: {},
              },
            },
          }
        );
      });
      setState("proof-step-edit");
    }
    setSelectedStep(
      showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario].steps
        .length
    );
  };

  const setStepState = (state: ScenarioStepState) => {
    setState(state);
  };

  const saveScenario = (newScenario: Scenario) => {
    if (selectedScenario === null) return;
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[selectedScenario] =
        newScenario;
    });
    setState("none-selected");
  };

  const saveStep = (newStep: ScenarioStepType) => {
    if (selectedScenario === null || selectedStep === null) return;
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[selectedScenario].steps[
        selectedStep
      ] = newStep;
    });
    setState("none-selected");
  };

  return (
    <div
      id="editStep"
      className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col"
    >
      {state === "none-selected" || state == null ? (
        <NoSelection text={"Nothing Selected"} />
      ) : null}

      {state === "editing-scenario" && selectedScenario !== null ? (
        <ScenarioEdit
          selectedScenario={selectedScenario}
          saveScenario={saveScenario}
          showcaseJSON={showcaseJSON}
          selectedCharacter={selectedCharacter}
          setState={setState}
        />
      ) : null}

      {state === "basic-step-edit" &&
      selectedStep !== null &&
      selectedScenario !== null &&
      showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
        .steps[selectedStep].type === "BASIC" ? (
        <BasicStepEdit<ScenarioStepState>
          selectedScenario={selectedScenario}
          selectedStep={selectedStep}
          saveStep={saveStep}
          showcaseJSON={showcaseJSON}
          selectedCharacter={selectedCharacter}
          setState={setState}
        />
      ) : null}

      {state === "proof-step-edit" &&
      selectedStep !== null &&
      selectedScenario !== null &&
      showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
        .steps[selectedStep].type === "CONNET_AND_VERIFY" ? (
        <ProofStepEdit
          selectedScenario={selectedScenario}
          selectedStep={selectedStep}
          saveStep={saveStep}
          showcaseJSON={showcaseJSON}
          selectedCharacter={selectedCharacter}
          setState={setState}
          setShowcaseJSON={setShowcaseJSON}
        />
      ) : null}
      {state === "editing-issue" && selectedStep !== null ? (
        <IssueStepEdit<ScenarioStepState>
          selectedCharacter={selectedCharacter}
          setSelectedStep={setSelectedStep}
          selectedStep={selectedStep}
          showcaseJSON={showcaseJSON}
          setShowcaseJSON={setShowcaseJSON}
          setStepState={setStepState}
        />
      ) : null}
      {state === "adding-step" ? (
        <ChooseStepType addNewStep={addNewStep} />
      ) : null}
    </div>
  );
};
