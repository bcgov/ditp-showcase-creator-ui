import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ScenarioStep as ScenarioStepType } from "@/types";
import { useScenarios } from "@/hooks/use-scenarios";
import { GripVertical, Monitor, Trash2 } from "lucide-react";
import { useTranslations } from 'next-intl';

const MAX_CHARS = 110;

export const ScenarioStep = ({
  step,
  stepIndex,
  scenarioIndex,
  totalSteps,
}: {
  step: ScenarioStepType;
  stepIndex: number;
  scenarioIndex: number;
  totalSteps: number;
}) => {
  const t = useTranslations()
  const {
    selectedStep,
    setSelectedStep,
    setSelectedScenario,
    setStepState,
    removeStep
  } = useScenarios();

  const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: step.screenId,
      });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = () => {
    setSelectedStep(stepIndex);
    setSelectedScenario(scenarioIndex);
    setStepState(step.type === "CONNET_AND_VERIFY" ? "proof-step-edit" : "basic-step-edit");
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeStep(scenarioIndex, stepIndex);
  };

  return (
      <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="p-4 flex flex-row justify-items-center items-center w-full"
      >
      <span className="text-2xl mt-10 cursor-grab">
        <GripVertical />
      </span>

        <div
            onClick={handleSelect}
            className="w-full cursor-pointer"
        >
          <div className="px-3 flex flex-col w-full">
            <p className={cn(
                "text-sm",
                step.requestOptions && "text-amber-500 font-bold"
            )}>
              {step.requestOptions ? t('scenario.step_proof_step_label') : t('scenario.step_basic_step_label')}
            </p>

            <p className="font-bold">
              {step.title} - ({stepIndex + 1} / {totalSteps})
            </p>

            <div className={cn(
                "w-full flex text-sm flex-col rounded hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover",
                selectedStep === stepIndex
                    ? "border-2 border-foreground"
                    : "border-2 border-light-bg-secondary"
            )}>
              <div className="w-full flex flex-row justify-items-center items-center rounded p-3">
                <div className="text-2xl p-2 mx-2 rounded highlight-text">
                  <Monitor />
                </div>

                <p>
                  {step.text.length > MAX_CHARS ? (
                      <>
                        {step.text.slice(0, MAX_CHARS)}...{" "}
                        <span className="font-bold">{t('action.see_more_label')}</span>
                      </>
                  ) : (
                      step.text
                  )}
                </p>
              </div>

              {step.requestOptions?.proofRequest?.attributes && (
                  <>
                    <hr />
                    <div className="w-full py-2">
                      <p className="text-sm m-1 mt-2 font-bold">
                        {t('scenario.requested_credentials_label')}
                      </p>
                      <div className="flex items-center justify-center flex-wrap gap-2 p-2">
                        {Object.keys(step.requestOptions.proofRequest.attributes).map((key) => (
                            <div
                                key={key}
                                className="border dark:border-dark-border rounded p-2"
                            >
                              {key}
                            </div>
                        ))}
                      </div>
                    </div>
                  </>
              )}
            </div>
          </div>

          {step.requestOptions?.proofRequest?.attributes && (
            <>
              <hr />
              <div className="w-full py-2">
                <p className="text-sm m-1 mt-2 font-bold">
                  {t('scenario.requested_credentials_label')}
                </p>
                <div className="flex flex-wrap gap-2 p-2">
                  {Object.keys(step.requestOptions.proofRequest.attributes).map((key) => (
                    <div
                      key={key}
                      className="border dark:border-dark-border rounded p-2"
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
            onClick={handleDelete}
            className="px-3 hover:text-red-500"
        >
          <Trash2 />
        </button>
      </div>
  );
};
