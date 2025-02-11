"use client";

import { useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { ScenarioStep } from "./scenario-step";
import { useShowcaseStore } from "@/hooks/use-showcase-store";
import { useScenarios } from "@/hooks/use-scenarios";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export const ScenarioScreen = () => {
  const t = useTranslations()
  const { showcaseJSON, selectedCharacter } = useShowcaseStore();
  const {
    scenarios,
    setScenarios,
    editScenario,
    removeScenario,
    setStepState,
  } = useScenarios();

  useEffect(() => {
    const initialScenarios = JSON.parse(
      JSON.stringify(showcaseJSON.personas[selectedCharacter].scenarios)
    );
    setScenarios(initialScenarios);
  }, [selectedCharacter, setScenarios]);

  const handleAddScenario = () => {
    const newScenario = {
      id: Date.now().toString(),
      name: "",
      status: "draft" as const,
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
    };
    editScenario(scenarios.length);
    setScenarios([...scenarios, newScenario]);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {t('scenario.scenarios_added_label', { scenarioCount: scenarios.length })}
        </h2>
        <Button onClick={handleAddScenario} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('scenario.add_scenario_label')}
        </Button>
      </div>

      <div className="space-y-5">
        {scenarios.map((scenario, index) => (
          <div
            key={scenario.id}
            className="border rounded-lg dark:border-dark-border overflow-hidden"
          >
            {/* Scenario Header */}
            <div className="flex justify-between items-center p-5 bg-light-bg dark:bg-dark-bg">
              <h3 className="text-xl font-bold">{scenario.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editScenario(index)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                {t('action.edit_label')}
              </Button>
            </div>

            {/* Overview Section */}
            <div className="p-5">
              <h4 className="font-bold text-lg mb-3">{t('scenario.overview_label')}</h4>
              <div className="border dark:border-dark-border rounded p-3">
                <div className="flex gap-4">
                  {scenario.overview.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={scenario.overview.image}
                      alt="Overview"
                      className="rounded"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-muted rounded flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <h5 className="font-bold mb-2">
                      {scenario.overview.title}
                    </h5>
                    <p className="text-sm">{scenario.overview.text}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps Section */}
            <div className="p-5">
              <DndContext collisionDetection={closestCenter}>
                <SortableContext
                  items={scenario.steps.map((step) => step.screenId)}
                  strategy={verticalListSortingStrategy}
                >
                  {scenario.steps.map((step, stepIndex) => (
                    <ScenarioStep
                      key={step.screenId}
                      step={step}
                      stepIndex={stepIndex}
                      scenarioIndex={index}
                      totalSteps={scenario.steps.length}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              <Button
                variant="outline"
                onClick={() => {
                  setStepState("adding-step");
                }}
                className="mt-4 gap-2"
              >
                <Plus className="h-4 w-4" />
                {t('scenario.add_step_label')}
              </Button>
            </div>

            {/* Summary Section */}
            <div className="p-5">
              <h4 className="font-bold text-lg mb-3">{t('scenario.summary_label')}</h4>
              <div className="border dark:border-dark-border rounded p-3">
                <div className="flex gap-4">
                  {scenario.summary.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={scenario.summary.image}
                      alt="Summary"
                      className="rounded"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-muted rounded flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <h5 className="font-bold mb-2">{scenario.summary.title}</h5>
                    <p className="text-sm">{scenario.summary.text}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-light-bg dark:bg-dark-bg">
              <Button
                variant="destructive"
                onClick={() => removeScenario(index)}
              >
                {t('scenario.delete_scenario_label')}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
