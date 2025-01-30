"use client";

import { useEffect, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";
import { SortableStep } from "@/components/onboarding-screen/sortable-step";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Plus, Trash2 } from "lucide-react";

export const OnboardingScreen = () => {
  const { t } = useTranslation()
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const {
    screens,
    selectedStep,
    initializeScreens,
    setSelectedStep,
    moveStep,
    removeStep,
    setStepState,
  } = useOnboarding();

  const initialScreens = useMemo(() => {
    return JSON.parse(JSON.stringify(showcaseJSON.personas[selectedCharacter].onboarding));
  }, [showcaseJSON.personas, selectedCharacter]);

  useEffect(() => {
    initializeScreens(initialScreens);
  }, [initialScreens, initializeScreens]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = screens.findIndex((screen) => screen.screenId === active.id);
    const newIndex = screens.findIndex((screen) => screen.screenId === over.id);

    if (oldIndex !== newIndex) {
      moveStep(oldIndex, newIndex);
      setSelectedStep(newIndex);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const index = screens.findIndex(
      (screen) => screen.screenId === event.active.id
    );
    setSelectedStep(index);
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-xl">{t('onboarding.steps_added_label', { stepCount: screens.length })}</p>
          <div className="">
            <button
              onClick={() => setStepState("creating-new")}
              className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <span>{t('onboarding.add_step_label')}</span>
              <div className="text-md ml-2">
                <Plus />
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
            items={screens.map((screen) => screen.screenId)}
            strategy={verticalListSortingStrategy}
          >
            {screens.map((screen, index) => (
              <div key={screen.screenId} className="flex flex-row">
                <SortableStep
                  selectedStep={selectedStep}
                  myScreen={screen}
                  stepIndex={index + 1}
                  totalSteps={screens.length}
                />

                <div className="flex text-xl mt-10">
                  <button
                    className="px-3 hover-red"
                    onClick={() => removeStep(index)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}

            <DragOverlay>
              {selectedStep !== null && screens[selectedStep] && (
                <div className="top-1">
                  <p>{screens[selectedStep].title}</p>
                  <div className="highlight-container w-full flex flex-row justify-items-center items-center rounded p-3 unselected-item backdrop-blur">
                    <p className="text-sm">{screens[selectedStep].text}</p>
                  </div>
                </div>
              )}
            </DragOverlay>
          </SortableContext>
        </DndContext>
      </div>

      <div className="w-full pt-5 flex flex-col justify-center items-center">
        <button
          onClick={() => {
            setStepState("creating-new");
            window.scrollTo({ top: 200, behavior: "smooth" });
          }}
          className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{t('onboarding.add_step_label')}</span>
          <div className="text-md ml-2">
            <Plus />
          </div>
        </button>
      </div>
    </>
  );
};
