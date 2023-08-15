import { useState, useEffect } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableStep } from "../onboarding-screen/SortableStep";
import { BasicStepEdit } from "../onboarding-screen/BasicStepEdit";
import { IssueStepEdit } from "../onboarding-screen/IssueStepEdit";
import { CreateNewStep } from "../onboarding-screen/CreateNewStep";
import { NoSelection } from ".././credentials/NoSelection";

export const OnboardingPage = ({
  showcaseJSON,
  selectedCharacter,
  setShowcaseJSON,
  handleJSONUpdate,
}) => {
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState(
    showcaseJSON.personas[selectedCharacter].onboarding
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
    setMyScreens(showcaseJSON.personas[selectedCharacter].onboarding);
  }, [showcaseJSON.personas[selectedCharacter].onboarding]);

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
    // <div className="flex flex-col min-h-screen">
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col min-h-screen">
        <div className="flex gap-12 container mx-auto px-4 py-8 mt-20">
          <div className="w-2/5 rounded left-col text-light-text dark:text-dark-text">
            <div className="flex w-full">
              <div>
                <h2 className="text-4xl font-bold text-slate-50">
                  Add your Steps
                </h2>
                <p className="w-full mt-3">
                  Add pages below to create the onboarding steps.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-4">
                <p className="font-bold text-xl">
                  Steps Added: ({myScreens.length})
                </p>
                <div className="">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setStepState("creating-new");
                    }}
                    className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    <span>ADD STEP</span>
                    <div className="text-md ml-2">
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </div>
                  </button>
                </div>
              </div>
              <SortableContext
                items={myScreens}
                strategy={verticalListSortingStrategy}
              >
                {myScreens.map((myScreen, index) => (
                  <div key={myScreen.screenId} className="flex flex-row">
                    <SortableStep
                      selectedStep={selectedStep}
                      setSelectedStep={setSelectedStep}
                      myScreen={myScreen}
                      key={myScreen.screenId}
                      stepIndex={index + 1}
                      totalSteps={myScreens.length}
                      showcaseJSON={showcaseJSON}
                      selectedCharacter={selectedCharacter}
                    />

                    <div className="flex text-xl mt-10">
                      <button
                        className="px-3 hover-red"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveStep(e, index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}

                <DragOverlay>
                  <div className="top-1">
                    <p>
                      {selectedStep &&
                      showcaseJSON.personas[selectedCharacter].onboarding[
                        selectedStep
                      ]
                        ? showcaseJSON.personas[selectedCharacter].onboarding[
                            selectedStep
                          ].title
                        : null}{" "}
                    </p>
                    <div className="highlight-container w-full flex flex-row justify-items-center items-center rounded p-3 unselected-item backdrop-blur">
                      <p className="text-sm">
                        {selectedStep &&
                        showcaseJSON.personas[selectedCharacter].onboarding[
                          selectedStep
                        ]
                          ? showcaseJSON.personas[selectedCharacter].onboarding[
                              selectedStep
                            ].text
                          : null}
                      </p>
                    </div>
                  </div>
                </DragOverlay>
              </SortableContext>
            </div>
            <div className="w-full pt-5 flex flex-col justify-center items-center">
              <button
                className="button-light p-2 hover:bg-neutral-600"
                onClick={(e) => {
                  e.preventDefault();
                  setStepState("creating-new");
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
              >
                Add Step <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            </div>
          </div>
          {/* End of column 1 */}

          <div
            id="editStep"
            // className="w-1/2 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col "
            className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text p-6 rounded-md right-col "
          >
            {stepState == "no-selection" ? (
              <div className="">
                <NoSelection Text={"No Step Selected"} />
              </div>
            ) : null}
            {stepState == "creating-new" ? (
              <CreateNewStep addNewStep={addNewStep} />
            ) : null}
            {stepState == "editing-basic" ? (
              <div className="">
                <BasicStepEdit
                  selectedCharacter={selectedCharacter}
                  handleJSONUpdate={handleJSONUpdate}
                  setSelectedStep={setSelectedStep}
                  selectedStep={selectedStep}
                  showcaseJSON={showcaseJSON}
                  setShowcaseJSON={setShowcaseJSON}
                />
              </div>
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
          {/* End of column 2  */}
        </div>
      </div>
    </DndContext>
  );
};
