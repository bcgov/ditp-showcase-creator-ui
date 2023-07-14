import { useState, useEffect } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlus,
  faTrash,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { OnboardingStep } from "../scenario-screen/OnboardingStep";
import { BasicStepEdit } from "../onboarding-screen/BasicStepEdit";
import { IssueStepEdit } from "../onboarding-screen/IssueStepEdit";
import { CreateNewStep } from "../onboarding-screen/CreateNewStep";
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

  // Handling state; what step is editable
  const [selectedStep, setSelectedStep] = useState(null);

  // Handling state; what screen is shown, if not editing
  const [stepState, setStepState] = useState("no-selection");

  // Add new step
  const addNewStep = (isIssue) => {
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
  }, [selectedStep]);

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

  return (
    
      <div className="two-column-container mx-20 my-16">
        <div className="two-column-col md:w-3/5 pr-4">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-slate-50">
                Create Scenarios
              </h2>
              <p className="w-full">
                Add pages below to create your scenarios screens and connecting
                steps.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-bold">Scenarios Added: ({myScreens.length})</p>
            <div className="text-right">
              <button
                className="button-light w-1/5 p-2 hover:bg-neutral-600"
                onClick={(e) => {
                  e.preventDefault();
                  setStepState("creating-new");
                }}
              >
                Add a scenario <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            </div>
              {myScreens.map((myScreen, index) => (
                <div
                  key={myScreen.screenId}
                  className=" button-dark rounded my-5"
                >
                  <p className="text-xl font-bold p-5">{myScreen.name}</p>

                  {/* Scenario Overview */}
                  <div className="m-5">
                    <p className="font-bold m-1">Overview</p>
                    <div className="highlight-container rounded p-3 flex flex-row">
                      <div className="highlight-text rounded p-1 mr-3">
                        {myScreen.overview.image ? (
                          <img width="100px" src={myScreen.overview.image} />
                        ) : (
                          <FontAwesomeIcon icon={faDisplay} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{myScreen.overview.title}</p>
                        <p>{myScreen.overview.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* Scenario Steps */}
                  <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
                    items={myScreen.steps}
                    strategy={verticalListSortingStrategy}
                  >
                  {myScreen.steps.map((step,index)=>(
                    
                    <OnboardingStep 
                    selectedCharacter={selectedCharacter}
                    step={step}
                    stepIndex={index}
                    totalSteps={myScreen.steps.length}
                    showcaseJSON={showcaseJSON}/>
                  ))}
                  </SortableContext>
                  </DndContext>
                  <DragOverlay>
                <p>TEST DRAG OVERLAY</p>
              </DragOverlay>

                  {/* Add Step Button */}
                  <div className="text-center">
                    <button
                      className="button-light p-2 hover:bg-neutral-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepState("creating-new");
                      }}
                    >
                      Add Step <FontAwesomeIcon icon={faCirclePlus} />
                    </button>
                  </div>

                  {/* Scenario Summary */}
                  <div className="m-5">
                    <p className="font-bold m-1">Summary</p>
                    <div className="highlight-container rounded p-3 flex flex-row">
                      <div className="highlight-text rounded p-1 mr-3">
                        {myScreen.overview.image ? (
                          <img width="100px" src={myScreen.summary.image} />
                        ) : (
                          <FontAwesomeIcon icon={faDisplay} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{myScreen.summary.title}</p>
                        <p>{myScreen.summary.text}</p>
                      </div>
                    </div>
                  </div>

                  <button className="mt-10 button-red font-bold rounded p-1 pl-3 m-2">
                    DELETE SCENARIO
                    <span className="px-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </button>
                </div>
              ))}

              
            
          </div>
        </div>

        <div id="editStep" className="highlight-container w-2/5 rounded p-3">
          {stepState == "no-selection" ? (
            <NoSelection Text={"Nothing Selected"} />
          ) : null}
          {stepState == "creating-new" ? (
            <CreateNewStep addNewStep={addNewStep} />
          ) : null}
          {stepState == "editing-basic" ? (
            <BasicStepEdit
              selectedCharacter={selectedCharacter}
              handleJSONUpdate={handleJSONUpdate}
              setSelectedStep={setSelectedStep}
              selectedStep={selectedStep}
              showcaseJSON={showcaseJSON}
              setShowcaseJSON={setShowcaseJSON}
            />
          ) : null}
          {stepState == "editing-issue" ? (
            <IssueStepEdit
              selectedCharacter={selectedCharacter}
              handleJSONUpdate={handleJSONUpdate}
              setSelectedStep={setSelectedStep}
              selectedStep={selectedStep}
              showcaseJSON={showcaseJSON}
              setShowcaseJSON={setShowcaseJSON}
              setStepState={setStepState}
            />
          ) : null}
        </div>
      </div>
    
  );
};
