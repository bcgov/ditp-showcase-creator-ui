'use client';

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

import { ScenarioStep } from "../scenario-screen/ScenarioStep";
import BasicStepEdit from "../scenario-screen/BasicStepEdit";
import { ProofStepEdit } from "../scenario-screen/ProofStepEdit";
import { ChooseStepType } from "../scenario-screen/ChooseStepType";
import { IssueStepEdit } from "../onboarding-screen/IssueStepEdit";
import { ScenarioEdit } from "../scenario-screen/ScenarioEdit";
import { NoSelection } from ".././credentials/NoSelection";
import { Scenario, ScenarioStep as ScenarioStepType } from "../../types";
import { useShowcase } from "@/hooks/use-showcase";
import Image from "next/image";
import { useTranslation } from "react-i18next";

type ScenarioStepState = "none-selected" | "adding-step" | "basic-step-edit" | "proof-step-edit" | "editing-scenario" | "editing-issue" | null;

export const ScenarioPage = () => {
  const { t } = useTranslation()
  const { showcaseJSON, setShowcaseJSON, selectedCharacter } = useShowcase();
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState<Scenario[]>(
    showcaseJSON.personas[selectedCharacter].scenarios
  );

  // Handling state; what screen is shown, if not editing
  const [state, setState] = useState<ScenarioStepState>(null);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
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

  // example useEffect, perhaps not relevent here
  // useEffect(() => {
  //   if (selectedStep == null) {
  //     setState("no-selection");
  //   } else if (
  //     showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  //       .credentials
  //   ) {
  //     setState("editing-issue");
  //   } else {
  //     setState("editing-basic");
  //   }
  // }, [selectedStep]);

  // When the JSON changes, re-collect the onboarding data.
  // This is primarily used for when a step is deleted.
  useEffect(() => {
    setMyScreens(showcaseJSON.personas[selectedCharacter].scenarios);
  }, [showcaseJSON.personas, setMyScreens, selectedCharacter]);

  // Handles a step being removed.
  // const handleRemoveStep = (e, i) => {
  //   if (selectedStep == i) setSelectedStep(null);

  //   setShowcaseJSON((json) => {
  //     json.personas[selectedCharacter].onboarding.splice(i, 1);
  //   });
  // };

  // Handles how draggable componants are re-arranged
  // const handleDragEnd = (event) => {
  //   const { active, over } = event;

  //   setMyScreens((myScreens) => {
  //     const oldIndex = myScreens.findIndex(
  //       (myScreen) => myScreen.screenId === active.id
  //     );
  //     const newIndex = myScreens.findIndex(
  //       (myScreen) => myScreen.screenId === over.id
  //     );
  //     setSelectedStep(newIndex);

  //     setShowcaseJSON((json) => {
  //       json.personas[selectedCharacter].onboarding = arrayMove(
  //         myScreens,
  //         oldIndex,
  //         newIndex
  //       );
  //     });

  //     return arrayMove(myScreens, oldIndex, newIndex);
  //   });
  // };

  // const handleDragStart = (event) => {
  //   const index = myScreens.findIndex(
  //     (myScreen) => myScreen.screenId === event.active.id
  //   );
  //   setSelectedStep(index);
  // };

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

  const deleteStep = (scenarioIndex: number, stepIndex: number) => {
    setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[scenarioIndex].steps.splice(
        stepIndex,
        1
      );
    });
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
    <div className="flex flex-col min-h-screen">
      <div className="flex gap-12 container mx-auto px-4 py-8 mt-20">
        <div className="w-2/5 rounded left-col text-light-text dark:text-dark-text">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-slate-50">
                {t('scenario.header_title')}
              </h2>
              <p className="w-full mt-3">
                {t('scenario.header_subtitle')}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-4">
              <p className=" text-xl font-bold">
                {t('scenario.scenarios_added_label', { scenarioCount: myScreens.length })}
              </p>
              <div className="text-right">
                <button
                  className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    addScenario();
                  }}
                >
                  <span>{t('scenario.add_scenario_label')}</span>
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
                  <p className="text-xl font-bold p-5 w-full">
                    {myScreen.name}
                  </p>
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
                  <p className="font-bold text-lg ml-5 mb-3">{t('scenario.overview_label')}</p>
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
                        <p className="font-bold mb-2">
                          {myScreen.overview.title}
                        </p>
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
                    <span>{t('scenario.add_step_label')}</span>
                    <div className="text-md ml-2">
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                  </button>
                </div>

                {/* Scenario Summary */}
                <div className="">
                  <p className="font-bold text-lg ml-5 mb-3">{t('scenario.summary_label')}</p>
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
                        <p className="font-bold mb-2">
                          {myScreen.summary.title}
                        </p>
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
                  {t('scenario.delete_scenario_label')}
                  <span className="px-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          id="editStep"
          className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col"
        >
          {state === "none-selected" || state == null ? (
            <NoSelection Text={t('scenario.no_scenario_selected_message')} />
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
          {state ===  "editing-issue" && selectedStep !== null ? (
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
      </div>
    </div>
  );
};
