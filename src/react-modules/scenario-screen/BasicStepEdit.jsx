import { useEffect } from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./../onboarding-screen/LocalFileUpload";

function BasicStepEdit({
  selectedScenario,
  selectedStep,
  saveStep,
  showcaseJSON,
  selectedCharacter,
  setState,
}) {
  const [localData, setLocalData] = useImmer(
    showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario].steps[
      selectedStep
    ]
  );

  useEffect(() => {
    setLocalData(
      showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario]
        .steps[selectedStep]
    );
  }, [selectedStep, selectedScenario]);

  const changeStep = (newValue, element) => {
    setLocalData((json) => {
      json[element] = newValue;
    });
  };

  return (
    <div className="flex flex-col p-5">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Basic Step</p>
      <hr />

      <form onSubmit={null}>
        {/* TITLE */}
        <div className="p-1 mt-5">
          <label className="text-neutral-500 dark:text-neutral-200">
            <span className="p-1 text-xl font-bold">Title</span>
          </label>
          <br />
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.title}
            onChange={(e) => changeStep(e.target.value, "title")}
          />
        </div>

        <div className=" w-full">
          <div className="p-1">
            <label className="text-neutral-500 dark:text-neutral-200">
              {"Page Description"}
            </label>
            <textarea
              className="p-1 w-full resize-none field-background"
              rows="8"
              type="text"
              value={localData.text}
              onChange={(e) => changeStep(e.target.value, "text")}
            />
          </div>
        </div>

        <div className="flex flex-cols mx-5 my-3 justify-end space-x-4 items-baseline">
          <button
            onClick={(e) => {
              e.preventDefault();
              setState("none-selected");
            }}
            className="p-1 w-20 hover:underline uppercase"
          >
            Cancel
          </button>

          <input
            type="submit"
            value="Save"
            onClick={(e) => saveStep(e, localData)}
            className="p-1 w-20 button-dark hover:bg-neutral-600"
          />
        </div>
      </form>
    </div>
  );
}

export { BasicStepEdit };
