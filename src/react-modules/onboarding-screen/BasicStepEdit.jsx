import { useEffect } from "react";
import { useImmer } from "use-immer";

import { FileUploadFull } from "./../FileUpload";
function BasicStepEdit({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
  handleJSONUpdate,
}) {
  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useImmer(
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  );

  useEffect(() => {
    setLocalJSON(
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
    );
  }, [selectedStep]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  function cancelSubmit(e){
    e.preventDefault();
    setSelectedStep(null);
    
  }

  // Function to handle saving/form submission
  function handleSubmit(e) {
    try{
      e.preventDefault();
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
      });
      setSelectedStep(null);
    }catch(e){
      console.log(e);
    }
    
  }

  return (
    <div className="flex flex-col p-5">
      <p>Onboarding</p>
      <p className="text-4xl font-bold">Edit a Basic Step</p>
      <hr />

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* TITLE */}
        <div className="p-1">
          <label
            className="text-neutral-500 dark:text-neutral-200"
            htmlFor={`${selectedStep}_title`}
          >
            {"Page Title"}
          </label>
          <br />
          <input
            className="p-1 w-full field-background"
            id={`${selectedStep}_title`}
            type="text"
            value={localJSON.title}
            onChange={(e) => handleLocalUpdate("title", e.target.value)}
          />
        </div>

        {/* TEXT */}
        <div className="p-1">
          <label
            className="text-neutral-500 dark:text-neutral-200"
            htmlFor={`${selectedStep}_text`}
          >
            {"Page Description"}
          </label>
          <textarea
            className="p-1 w-full h-full resize-none field-background"
            rows="8"
            id={`${selectedStep}_text`}
            type="text"
            value={localJSON.text}
            onChange={(e) => handleLocalUpdate("text", e.target.value)}
          />
        </div>

        <FileUploadFull
          text={"Icon"}
          personaIndex={selectedCharacter}
          element={["onboarding", selectedStep, "image"]}
          handleJSONUpdate={handleJSONUpdate}
        />

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
