import { useEffect } from "react";
import { useImmer } from "use-immer";
import { ScenarioStep, ShowcaseJSON } from "../../types";

function BasicStepEdit<T>({
  selectedScenario,
  selectedStep,
  saveStep,
  showcaseJSON,
  selectedCharacter,
  setState,
}: {
  selectedScenario: number;
  selectedStep: number;
  saveStep: (newStep: ScenarioStep) => void;
  showcaseJSON: ShowcaseJSON;
  selectedCharacter: number;
  setState: (state: T) => void;
}) {
  const [localData, setLocalData] = useImmer<ScenarioStep>(
    showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario].steps[
      selectedStep
    ]
  );

  useEffect(() => {
    setLocalData(
      showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
        .steps[selectedStep]
    );
  }, [selectedStep, selectedScenario, selectedCharacter, showcaseJSON, setLocalData]);

  const changeStep = (newValue: string, element: keyof Omit<ScenarioStep, 'requestOptions'>) => {
    setLocalData((draft) => {
      draft[element] = newValue;
    });
  };

  return (
    <div className="flex flex-col">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Basic Step</p>
      <hr />

      <form>
        {/* TITLE */}
        <div className="my-6">
          <label className="text-md font-bold">Title</label>
          <br />
          <input
            className="dark:bg-dark-input mt-3 border dark:border-dark-border"
            placeholder="Title"
            type="text"
            value={localData.title}
            onChange={(e) => changeStep(e.target.value, "title")}
          />
        </div>

        <div className=" w-full">
          <div className="p-1">
            <label className="text-md font-bold">{"Page Description"}</label>
            <textarea
              className="dark:text-dark-text dark:bg-dark-input bg-light-bg p-2 w-full rounded resize-none mt-3 border dark:border-dark-border"
              placeholder="Page Description"
              rows={8}
              value={localData.text}
              onChange={(e) => changeStep(e.target.value, "text")}
            />
          </div>
        </div>

        <div className="flex flex-cols  my-3 justify-end space-x-4 items-baseline">
          <button
            onClick={(e) => {
              e.preventDefault();
              setState("none-selected" as T);
            }}
            className="p-1 w-20 hover:underline uppercase"
          >
            Cancel
          </button>

          <input
            type="submit"
            value="SAVE"
            onClick={(e) => {
              e.preventDefault();
              saveStep(localData);
            }}
            className="p-1  w-20 bg-light-bg-secondary hover:bg-light-btn-hover border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded"
          />
        </div>
      </form>
    </div>
  );
}

export default BasicStepEdit;