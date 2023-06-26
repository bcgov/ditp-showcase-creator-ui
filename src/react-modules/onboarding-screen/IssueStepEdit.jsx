import { useEffect } from "react";
import { useImmer } from "use-immer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { FileUploadFull } from "./../FileUpload";
function IssueStepEdit({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
  saveJSON,
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

  // Function to handle saving/form submission
  function handleSubmit(e) {
    e.preventDefault();
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
    });
    setSelectedStep(null);
  }

  return (
    <div className="flex flex-col p-5">
      <p>Onboarding</p>
      <p className="text-4xl font-bold">Edit an Issue Credential Step</p>
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
          handle
          JSONUpdate={handleJSONUpdate}
        />

        <p className="text-2xl pt-10 font-bold">Add your Credential</p>
        <hr />

        <p className="pt-10">Search for a credential:</p>
        <div className="flex flex-row justify-center items-center mt-3">
          <input
            className="w-full p-1 field-background rounded"
            placeholder="ex. Student Card"
            type="text"
          />
          <span className="p-3 text-xl">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        <div className="flex flex-cols mx-5 my-3 justify-end space-x-4">
          <button
            className="p-1 w-20 hover:underline uppercase"
            onClick={() => setSelectedStep(null)}
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

export { IssueStepEdit };
