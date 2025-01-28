"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlus,
  faTrash,
  faDisplay,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ScenarioStep } from "./ScenarioStep";
import { Scenario, ScenarioStep as ScenarioStepType } from "../../types";
import { useShowcase } from "@/hooks/use-showcase";
import Image from "next/image";

type ScenarioStepState =
  | "none-selected"
  | "adding-step"
  | "basic-step-edit"
  | "proof-step-edit"
  | "editing-scenario"
  | "editing-issue"
  | null;

export const ScenarioScreen = () => {
  const { showcaseJSON, setShowcaseJSON, selectedCharacter } = useShowcase();
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState<Scenario[]>(
    showcaseJSON.personas[selectedCharacter].scenarios
  );

  // Handling state; what screen is shown, if not editing
  const [state, setState] = useState<ScenarioStepState>(null);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  useEffect(() => {
    setMyScreens(showcaseJSON.personas[selectedCharacter].scenarios);
  }, [showcaseJSON.personas, setMyScreens, selectedCharacter]);

  const deleteScenario = (i: number) => {
    setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios.splice(i, 1);
    });
  };

  const addScenario = () => {
    const id = Date.now().toString();
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios.push({
        id: id,
        name: "",
        overview: {
          title: "",
          text: "",
          image: "",
        },
        summary: {
          title: "",
          text: "",
          image: "",
        },
        steps: [],
      });
    });

    setSelectedScenario(
      showcaseJSON.personas[selectedCharacter].scenarios.length
    );
    setState("editing-scenario");
  };

  const deleteStep = (scenarioIndex: number, stepIndex: number) => {
    setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[scenarioIndex].steps.splice(
        stepIndex,
        1
      );
    });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between mb-4">
        <p className=" text-xl font-bold">
          Scenarios Added: ({myScreens.length})
        </p>
        <div className="text-right">
          <button
            className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              addScenario();
            }}
          >
            <span>ADD SCENARIO </span>
            <div className="text-md ml-2">
              <FontAwesomeIcon icon={faCirclePlus} />
            </div>
          </button>
        </div>
      </div>
      {myScreens.map((myScreen: Scenario, scenarioIndex: number) => (
        <div
          key={scenarioIndex + "_" + Date.now()}
          className=" button-dark rounded my-5 border dark:border-dark-border "
        >
          <div className="flex flex-row">
            <p className="text-xl font-bold p-5 w-full">{myScreen.name}</p>
            <p className="text-xl font-bold p-5">
              <button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedScenario(scenarioIndex);
                  setState("editing-scenario");
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </p>
          </div>

          {/* Scenario Overview */}
          <div className="">
            <p className="font-bold text-lg ml-5 mb-3">Overview</p>
            <div className="mx-5 border dark:border-dark-border rounded">
              <div className=" rounded p-3   flex flex-row">
                <div className="highlight-text rounded p-1 mr-3">
                  {myScreen.overview.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={myScreen.overview.image}
                      alt="scenario-overview-image"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faDisplay} />
                  )}
                </div>
                <div>
                  <p className="font-bold mb-2">{myScreen.overview.title}</p>
                  <p className="text-sm">{myScreen.overview.text}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Steps */}
          <DndContext
            collisionDetection={closestCenter}
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={myScreen.steps.map((step) => step.screenId)}
              strategy={verticalListSortingStrategy}
            >
              {myScreen.steps.map((step, index) => (
                <ScenarioStep
                  key={index + "_" + Date.now()}
                  step={step}
                  setSelectedStep={setSelectedStep}
                  setSelectedScenario={setSelectedScenario}
                  scenarioIndex={scenarioIndex}
                  setState={setState}
                  stepIndex={index}
                  totalSteps={myScreen.steps.length}
                  deleteStep={deleteStep}
                  selectedStep={selectedStep}
                />
              ))}
            </SortableContext>
          </DndContext>
          {/* <DragOverlay>
                <p>TEST DRAG OVERLAY</p>
              </DragOverlay> */}

          {/* Add Step Button */}
          <div className="text-center my-4">
            <button
              className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={(e) => {
                e.preventDefault();
                setState("adding-step");
                setSelectedScenario(scenarioIndex);
              }}
            >
              <span>ADD STEP </span>
              <div className="text-md ml-2">
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
            </button>
          </div>

          {/* Scenario Summary */}
          <div className="">
            <p className="font-bold text-lg ml-5 mb-3">Summary</p>
            <div className="mx-5 border dark:border-dark-border rounded">
              <div className="rounded p-3  flex flex-row">
                <div className="highlight-text rounded p-1 mr-3">
                  {myScreen.overview.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={myScreen.summary.image}
                      alt="scenario-summary-image"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faDisplay} />
                  )}
                </div>
                <div>
                  <p className="font-bold mb-2">{myScreen.summary.title}</p>
                  <p className="text-sm">{myScreen.summary.text}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            // className="mt-10 button-red font-bold rounded p-1 pl-3 m-2"
            className="text-sm add-attr-btn button-red  text-dark-text m-4 hover:bg-light-btn-hover  font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              deleteScenario(scenarioIndex);
            }}
          >
            DELETE SCENARIO
            <span className="px-2">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};
