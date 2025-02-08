import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepType } from "@/types";

interface StepTypeOption {
  type: StepType.BASIC | StepType.CONNECT_AND_VERIFY;
  title: string;
  subtitle: string;
  features: string[];
}

const STEP_TYPES: StepTypeOption[] = [
  {
    type: StepType.BASIC,
    title: "Basic",
    subtitle: "A simple step with title and description",
    features: ["Title", "Description"],
  },
  {
    type: StepType.CONNECT_AND_VERIFY,
    title: "Connect & Verify",
    subtitle: "A step that includes verification",
    features: ["Title", "Description", "Proof Request", "Credentials"],
  },
];

export const ChooseStepType = ({
  addNewStep,
}: {
  addNewStep: (type: StepType) => void;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-muted-foreground">Scenario</p>
        <h2 className="text-3xl font-bold">Add a New Step</h2>
      </div>
      <hr className="border-border" />

      <div className="grid gap-4">
        {STEP_TYPES.map((option) => (
          <Card
            key={option.type}
            className={cn(
              "border-2 border-transparent",
              "hover:border-primary hover:bg-accent/50",
              "transition-colors cursor-pointer"
            )}
            onClick={() => addNewStep(option.type)}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{option.title}</h3>
                <p className="text-muted-foreground">{option.subtitle}</p>
                <ul className="mt-2 space-y-1">
                  {option.features.map((feature) => (
                    <li key={feature} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-2xl font-bold flex items-center gap-2 text-primary">
                Add Step
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};