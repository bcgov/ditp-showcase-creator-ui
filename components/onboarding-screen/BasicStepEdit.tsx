import React from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./LocalFileUpload";
import { OnboardingStep, ShowcaseJSON } from "@/types";
import { isArrayProperty, updateOnboardingStepCredentials, updateOnboardingStepSingleValue } from "@/lib/json-helper";

export const BasicStepEdit = ({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
}: {
  selectedCharacter: number;
  setSelectedStep: (step: number | null) => void;
  selectedStep: number;
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
}) => {
  const [localJSON, setLocalJSON] = useImmer<OnboardingStep>(
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  );

  React.useEffect(() => {
    setLocalJSON(
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
    );
  }, [selectedStep, showcaseJSON.personas, selectedCharacter, setLocalJSON]);

  function handleLocalUpdate(key: keyof OnboardingStep, value: string) {
    setLocalJSON((draft) => {
      if (isArrayProperty(key)) {
        if (key === "credentials") {
          updateOnboardingStepCredentials(draft, [
            ...(draft.credentials || []),
            value,
          ]);
        }
      } else {
        updateOnboardingStepSingleValue(
          draft,
          key as keyof Omit<OnboardingStep, "credentials">,
          value
        );
      }
    });
  }

  function cancelSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSelectedStep(null);
  }

  function handleSubmit() {
    try {
      setShowcaseJSON((draft) => {
        if (selectedStep !== null) {
          draft.personas[selectedCharacter].onboarding[selectedStep] =
            localJSON;
        }
      });
      setSelectedStep(null);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col">
      <p>Onboarding</p>
      <h3 className="text-4xl font-bold">Edit a Basic Step</h3>
      <hr className=""></hr>

      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <div className="my-6">
          <label
            className="text-md font-bold"
            htmlFor={`${selectedStep}_title`}
          >
            {"Page Title"}
          </label>
          <br />
          <input
            className="dark:text-dark-text dark:bg-dark-input bg-light-bg mt-3 border dark:border-dark-border "
            id={`${selectedStep}_title`}
            type="text"
            placeholder="Page Title"
            value={localJSON.title}
            onChange={(e) => handleLocalUpdate("title", e.target.value)}
          />
        </div>

        <div className="my-6">
          <label
            className="text-md mt-3 font-bold"
            htmlFor={`${selectedStep}_text`}
          >
            {"Page Description"}
          </label>
          <textarea
            className="dark:text-dark-text dark:bg-dark-input bg-light-bg p-2 w-full rounded resize-none mt-3 border dark:border-dark-border "
            rows={8}
            id={`${selectedStep}_text`}
            placeholder="Page Description"
            value={localJSON.text}
            onChange={(e) => handleLocalUpdate("text", e.target.value)}
          />
        </div>

        <div className="my-6 ">
          <LocalFileUpload
            text={"Icon"}
            element={"image"}
            handleLocalUpdate={handleLocalUpdate}
            localJSON={localJSON}
          />
        </div>
        <div className="flex flex-cols mx-5 my-3 justify-end space-x-4">
          <button
            className="p-1 w-20 hover:underline uppercase"
            onClick={(e) => cancelSubmit(e)}
          >
            Cancel
          </button>

          <input
            type="submit"
            value="SAVE"
            className="p-1 w-20 hover:bg-light-btn-hover border dark:hover:bg-dark-btn-hover hover:cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
