import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { OnboardingStep } from "@/types";
import Image from "next/image";
import { GripVertical, Monitor } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/hooks/use-onboarding";

const MAX_CHARS = 110;

export const SortableStep = ({
  selectedStep,
  myScreen,
  stepIndex,
  totalSteps,
}: {
  selectedStep: number | null;
  myScreen: OnboardingStep;
  stepIndex: number;
  totalSteps: number;
}) => {
  const { setSelectedStep, setStepState } = useOnboarding();
  
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: myScreen.screenId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStepClick = () => {
    setSelectedStep(stepIndex - 1);
    setStepState(myScreen.credentials ? "editing-issue" : "editing-basic");
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 flex flex-row justify-items-center items-center w-full"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <span className="text-2xl mt-10">
          <GripVertical />
        </span>
      </div>
      
      <div 
        className="px-3 flex-flex-col w-full justify-items-center cursor-pointer"
        onClick={handleStepClick}
      >
        <p className={cn(
          "text-sm",
          myScreen.credentials && "text-amber-500 font-bold"
        )}>
          {myScreen.credentials ? "Issue Step" : "Basic Step"}
        </p>
        
        <p className="font-bold">
          {myScreen.title} - ({stepIndex} / {totalSteps})
        </p>

        <div
          className={cn(
            "bg-light-bg dark:bg-dark-bg w-full hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover flex flex-row justify-items-center items-center rounded p-3",
            "border-2",
            selectedStep === stepIndex - 1 
              ? "border-foreground" 
              : "border-light-bg-secondary"
          )}
        >
          <div className="text-2xl p-2 mx-2 rounded highlight-text">
            {myScreen.image ? (
              <Image
                width={100}
                height={100}
                src={myScreen.image}
                alt={myScreen.title}
                className="object-cover"
              />
            ) : (
              <Monitor />
            )}
          </div>

          <p>
            {myScreen.text.length > MAX_CHARS ? (
              <>
                {myScreen.text.slice(0, MAX_CHARS)}...{" "}
                <span className="font-bold">see more</span>
              </>
            ) : (
              myScreen.text
            )}
          </p>
        </div>
      </div>
    </div>
  );
};