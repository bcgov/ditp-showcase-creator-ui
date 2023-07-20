import { useEffect } from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./../onboarding-screen/LocalFileUpload";

function ProofStepEdit({
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

  const changeRequestOption = (newValue, element) => {
    setLocalData((json) => {
        json.requestOptions[element] = newValue;
      });
  }

  return (
    <div className="flex flex-col p-5">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Proof Step</p>
      <hr />

      <form onSubmit={null}>
        {/* TITLE */}
        <div className="p-1 mt-5">
          <label className="text-neutral-500 dark:text-neutral-200">
            <span className=" text-xl font-bold">Title</span>
          </label>
          <br />
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.title}
            onChange={(e) => changeStep(e.target.value, "title")}
          />
        </div>

        <div className="flex flex-row">
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



        <p className="text-2xl mt-5 font-bold">Request Options</p>
        <hr className="my-3"/>
        <label className="text-neutral-500 dark:text-neutral-200">
            <span className="">Type</span>
          </label>
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.requestOptions.type}
            onChange={(e) => changeRequestOption(e.target.value, "type")}
          />


<label className="text-neutral-500 dark:text-neutral-200">
            <span className="">Title</span>
          </label>
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.requestOptions.title}
            onChange={(e) => changeRequestOption(e.target.value, "title")}
          />

<label className="text-neutral-500 dark:text-neutral-200">
              {"Text"}
            </label>
            <textarea
              className="p-1 w-full resize-none field-background"
              rows="4"
              type="text"
              value={localData.requestOptions.text}
              onChange={(e) => changeRequestOption(e.target.value, "text")}
            />

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

export { ProofStepEdit };
