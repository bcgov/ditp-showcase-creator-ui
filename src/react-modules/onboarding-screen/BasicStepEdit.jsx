import React from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./LocalFileUpload";

function BasicStepEdit({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
  handleJSONUpdate,
}) {
  const [localJSON, setLocalJSON] = useImmer(
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  );

  React.useEffect(() => {
    setLocalJSON(
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
    );
  }, [selectedStep]);

  function handleLocalUpdate(element, newValue) {
    setLocalJSON((draft) => {
      draft[element] = newValue;
    });
  }

  function cancelSubmit(e) {
    e.preventDefault();
    setSelectedStep(null);
  }

  function handleSubmit(e) {
    try {
      e.preventDefault();
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
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

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="my-6">
          <label className="text-lg bold" htmlFor={`${selectedStep}_title`}>
            {"Page Title"}
          </label>
          <br />
          <input
            className="field-background mt-3"
            id={`${selectedStep}_title`}
            type="text"
            placeholder="Page Title"
            value={localJSON.title}
            onChange={(e) => handleLocalUpdate("title", e.target.value)}
          />
        </div>

        <div className="my-6">
          <label className="text-lg mt-3" htmlFor={`${selectedStep}_text`}>
            {"Page Description"}
          </label>
          <textarea
            className="field-background p-2 w-full rounded resize-none mt-3"
            rows="8"
            id={`${selectedStep}_text`}
            placeholder="Page Description"
            value={localJSON.text}
            onChange={(e) => handleLocalUpdate("text", e.target.value)}
          />
        </div>

        <div className="my-6">
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
            value="Save"
            className="p-1 w-20 button-dark hover:bg-neutral-600"
          />
        </div>
      </form>
    </div>
  );
}

export { BasicStepEdit };
