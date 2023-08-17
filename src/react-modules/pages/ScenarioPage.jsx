import { useState, useEffect } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlus,
  faTrash,
  faDisplay,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ScenarioStep } from "../scenario-screen/ScenarioStep";
import { BasicStepEdit } from "../scenario-screen/BasicStepEdit";
import { ProofStepEdit } from "../scenario-screen/ProofStepEdit";
import { ChooseStepType } from "../scenario-screen/ChooseStepType";
import { IssueStepEdit } from "../onboarding-screen/IssueStepEdit";
import { ScenarioEdit } from "../scenario-screen/ScenarioEdit";
import { NoSelection } from ".././credentials/NoSelection";

export const ScenarioPage = ({
  showcaseJSON,
  selectedCharacter,
  setShowcaseJSON,
  handleJSONUpdate,
}) => {
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState(
    showcaseJSON.personas[selectedCharacter].scenarios
  );

  // Handling state; what screen is shown, if not editing
  const [state, setState] = useState("no-selection");

  // Add new step
  const addNewStep = (e, type, scenarioIndex) => {
    e.preventDefault();

    if (type === "basic") {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].scenarios[selectedScenario].steps.push(
          {
            type: "BASIC",
            title: "",
            text: "",
          }
        );
      });

      setState("basic-step-edit");
    } else if (type === "proof") {
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].scenarios[selectedScenario].steps.push(
          {
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
  }, [showcaseJSON.personas[selectedCharacter].scenarios]);

  // Handles a step being removed.
  const handleRemoveStep = (e, i) => {
    if (selectedStep == i) setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding.splice(i, 1);
    });
  };

  // Handles how draggable componants are re-arranged
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === over.id
      );
      setSelectedStep(newIndex);

      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding = arrayMove(
          myScreens,
          oldIndex,
          newIndex
        );
      });

      return arrayMove(myScreens, oldIndex, newIndex);
    });
  };

  const handleDragStart = (event) => {
    const index = myScreens.findIndex(
      (myScreen) => myScreen.screenId === event.active.id
    );
    setSelectedStep(index);
  };

  //.
  const [selectedScenario, setSelectedScenario] = useState(null);

  //. Handling step state; what step is editable
  const [selectedStep, setSelectedStep] = useState(null);

  //.
  const deleteScenario = (e, i) => {
    e.preventDefault();
    setSelectedStep("no-selection");

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios.splice(i, 1);
    });
  };

  //.
  const addScenario = (e) => {
    e.preventDefault();
    let id = Date.now();
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios.push({
        id: `${Date.now()}`,
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

  //.
  const saveScenario = (e, newScenario) => {
    e.preventDefault();
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[selectedScenario] =
        newScenario;
    });
    setState("none-selected");
  };

  //.
  const deleteStep = (e, scenarioIndex, stepIndex) => {
    e.preventDefault();
    setSelectedStep("no-selection");

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].scenarios[scenarioIndex].steps.splice(
        stepIndex,
        1
      );
    });
  };

  //.
  const saveStep = (e, newStep) => {
    e.preventDefault();
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
                Create Scenarios
              </h2>
              <p className="w-full mt-3">
                Add pages below to create your scenarios screens and connecting
                steps.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-4">
              <p className=" text-xl font-bold">
                Scenarios Added: ({myScreens.length})
              </p>
              <div className="text-right">
                <button
                  className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={(e) => {
                    addScenario(e);
                  }}
                >
                  <span>ADD SCENARIO </span>
                  <div className="text-md ml-2">
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </div>
                </button>
              </div>
            </div>
            {myScreens.map((myScreen, scenarioIndex) => (
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
                  <p className="font-bold text-lg ml-5 mb-3">Overview</p>
                  <div className="mx-5 border dark:border-dark-border rounded">
                    <div className=" rounded p-3   flex flex-row">
                      <div className="highlight-text rounded p-1 mr-3">
                        {myScreen.overview.image ? (
                          <img width="100px" src={myScreen.overview.image} />
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
                    items={myScreen.steps}
                    strategy={verticalListSortingStrategy}
                  >
                    {myScreen.steps.map((step, index) => (
                      <ScenarioStep
                        key={index + "_" + Date.now()}
                        selectedCharacter={selectedCharacter}
                        step={step}
                        setSelectedStep={setSelectedStep}
                        setSelectedScenario={setSelectedScenario}
                        scenarioIndex={scenarioIndex}
                        setState={setState}
                        stepIndex={index}
                        scenarioIndex={scenarioIndex}
                        totalSteps={myScreen.steps.length}
                        showcaseJSON={showcaseJSON}
                        deleteStep={deleteStep}
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
                          <img width="100px" src={myScreen.summary.image} />
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
                  onClick={(e, index) => deleteScenario(e, index + 1)}
                >
                  DELETE SCENARIO
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
          {state == "no-selection" || state == null ? (
            <NoSelection Text={"Nothing Selected"} />
          ) : null}

          {state == "editing-scenario" ? (
            <ScenarioEdit
              selectedScenario={selectedScenario}
              saveScenario={saveScenario}
              showcaseJSON={showcaseJSON}
              selectedCharacter={selectedCharacter}
              setState={setState}
            />
          ) : null}

          {state == "basic-step-edit" &&
          showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
            .steps[selectedStep].type === "BASIC" ? (
            <BasicStepEdit
              selectedScenario={selectedScenario}
              selectedStep={selectedStep}
              saveStep={saveStep}
              showcaseJSON={showcaseJSON}
              selectedCharacter={selectedCharacter}
              setState={setState}
            />
          ) : null}

          {state == "basic-step-edit" &&
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
          {state == "editing-issue" ? (
            <IssueStepEdit
              selectedCharacter={selectedCharacter}
              handleJSONUpdate={handleJSONUpdate}
              setSelectedStep={setSelectedStep}
              selectedStep={selectedStep}
              showcaseJSON={showcaseJSON}
              setShowcaseJSON={setShowcaseJSON}
              setState={setState}
            />
          ) : null}
          {state == "adding-step" ? (
            <ChooseStepType addNewStep={addNewStep} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
