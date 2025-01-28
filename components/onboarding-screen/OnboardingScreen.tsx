"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableStep } from "./SortableStep";
import { OnboardingStep } from "@/types";
import { useShowcase } from "@/hooks/use-showcase";

export type OnboardingStepState =
  | "editing-basic"
  | "editing-issue"
  | "no-selection"
  | "creating-new";

export const OnboardingScreen = () => {
  const { showcaseJSON, selectedCharacter, setShowcaseJSON } = useShowcase();
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState<OnboardingStep[]>(
    showcaseJSON.personas[selectedCharacter].onboarding
  );

  // Handling state; what step is editable
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  // Handling state; what screen is shown, if not editing
  const [stepState, setStepState] =
    useState<OnboardingStepState>("no-selection");


  // When the JSON changes, re-collect the onboarding data.
  // This is primarily used for when a step is deleted.
  useEffect(() => {
    setMyScreens(showcaseJSON.personas[selectedCharacter].onboarding);
  }, [showcaseJSON.personas, selectedCharacter]);

  // Handles a step being removed.
  const handleRemoveStep = (i: number) => {
    if (selectedStep === i) setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding.splice(i, 1);
    });
  };

  // Handles how draggable componants are re-arranged
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === over?.id
      );
      setSelectedStep(newIndex);

      // Cannot update a component (`App`) while rendering a different component (`OnboardingPage`). To locate the bad setState() call inside `OnboardingPage`, follow the stack trace as described in https://react.dev/link/setstate-in-render
      setShowcaseJSON((draft) => {
        draft.personas[selectedCharacter].onboarding = arrayMove(
          myScreens,
          oldIndex,
          newIndex
        );
      });

      return arrayMove(myScreens, oldIndex, newIndex);
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const index = myScreens.findIndex(
      (myScreen) => myScreen.screenId === event.active.id
    );
    setSelectedStep(index);
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-xl">Steps Added: ({myScreens.length})</p>
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
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={myScreens.map((screen) => screen.screenId)}
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
                      handleRemoveStep(index);
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
        </DndContext>
      </div>
      <div className="w-full pt-5 flex flex-col justify-center items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setStepState("creating-new");
            window.scrollTo({ top: 200, behavior: "smooth" });
          }}
          className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>ADD STEP</span>
          <div className="text-md ml-2">
            <FontAwesomeIcon icon={faCirclePlus} />
          </div>
        </button>
      </div>
    </>
  );
};
