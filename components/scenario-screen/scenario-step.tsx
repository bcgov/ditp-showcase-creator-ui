import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ScenarioStep as ScenarioStepType } from "@/types";
import { useScenarios } from "@/hooks/use-scenarios";
import { GripVertical, Monitor, Trash2 } from "lucide-react";

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
      className="p-4 flex flex-row justify-items-center items-center w-full border rounded-lg mb-4 hover:bg-accent/10 cursor-pointer"
      onClick={handleSelect}
    >
      <span 
        className="text-2xl cursor-grab p-2"
        {...attributes}
        {...listeners}
      >
        <GripVertical />
      </span>

      <div className="flex-1 px-3">
        <p className={cn(
          "text-sm",
          step.type === "CONNET_AND_VERIFY" && "text-amber-500 font-bold"
        )}>
          {step.type === "CONNET_AND_VERIFY" ? "Proof Step" : "Basic Step"}
        </p>

        <p className="font-bold">
          {step.title} - ({stepIndex + 1} / {totalSteps})
        </p>

        <div className={cn(
          "w-full flex text-sm flex-col rounded",
          selectedStep === stepIndex 
            ? "border-2 border-foreground" 
            : "border border-light-bg-secondary"
        )}>
          <div className="w-full flex flex-row items-center p-3">
            <div className="text-2xl p-2 mx-2 rounded highlight-text">
              <Monitor />
            </div>

            <p>
              {step.text.length > MAX_CHARS ? (
                <>
                  {step.text.slice(0, MAX_CHARS)}...{" "}
                  <span className="font-bold">see more</span>
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
                  Requested Credentials:
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
      </div>

      <button
        onClick={handleDelete}
        className="p-2 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};