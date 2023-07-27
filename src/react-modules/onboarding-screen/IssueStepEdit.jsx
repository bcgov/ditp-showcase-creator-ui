import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NoSelection } from ".././credentials/NoSelection";
import { FileUploadFull } from "./../FileUpload";
import { LocalFileUpload } from "./LocalFileUpload";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { DisplayAddedCredentials } from "./DisplayAddedCredentials";

function IssueStepEdit({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
  handleJSONUpdate,
  setStepState,
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

  const [searchResults, setSearchResults] = useState([]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  // Functionality for removing a credential from an issue step
  function removeCredential(e, credential) {
    e.preventDefault();
    console.log(credential);
    setLocalJSON((json) => {
      const index = json.credentials.indexOf(credential);
      if (index !== -1) {
        json.credentials.splice(index, 1);
      }
    });
    console.log(localJSON);
  }

  function cancelSubmit(e) {
    e.preventDefault();
    setStepState("no-selection");
    setSelectedStep(null);
  }

  // Add a new credential to the selected step
  function addCredential(event, credential) {
    setSearchResults([]);
    setLocalJSON((json) => {
      json.credentials.push(credential);
    });
    console.log(localJSON);
  }

  // Find credential in the search box, by either name or issuer
  function searchCredential(e) {
    setSearchResults([]);

    if (!e.target.value) return;

    let credentials = showcaseJSON.personas[selectedCharacter].credentials;
    let search = e.target.value.toUpperCase();

    for (const credential in credentials) {
      if (
        credentials[credential].issuer_name.toUpperCase().includes(search) ||
        credentials[credential].name.toUpperCase().includes(search)
      ) {
        setSearchResults((results) => [...results, credential]);
      }
    }
  }

  // Function to handle saving/form submission
  function handleSubmit(e) {
    e.preventDefault();
    setStepState("no-selection");
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
    });
    setSelectedStep(null);
  }

  return (
    <div className="flex flex-col">
      <p>Onboarding</p>
      <h3 className="text-4xl font-bold">Edit an Issue a Credential Step</h3>
      <hr className=""></hr>

      <form onSubmit={(e) => handleSubmit(e)}>
        {/* TITLE */}
        <div className="my-6">
          <label className="text-lg bold" htmlFor={`${selectedStep}_title`}>
            {"Page Title"}
          </label>
          <br />
          <input
            className="field-background mt-2"
            id={`${selectedStep}_title`}
            type="text"
            value={localJSON.title}
            onChange={(e) => handleLocalUpdate("title", e.target.value)}
          />
        </div>

        {/* TEXT */}
        <div className="my-6">
          <label className="text-lg bold" htmlFor={`${selectedStep}_text`}>
            {"Page Description"}
          </label>
          <textarea
            className="field-background p-2 w-full rounded resize-none mt-3"
            rows="8"
            id={`${selectedStep}_text`}
            placeholder="Page Description"
            type="text"
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

        <p className="text-2xl pt-4 font-bold">Add your Credential</p>
        <hr />

        {/* SEARCHING FOR A CREDENTIAL*/}
        <p className="pt-4 text-lg">Search for a Credential:</p>
        <div className="flex flex-row justify-center items-center my-4">
          <div className="relative w-full">
            <input
              className="field-background rounded pl-2 pr-10 mb-2 w-full"
              placeholder="ex. Student Card"
              type="text"
              onChange={(e) => searchCredential(e)}
            />
            <span className="absolute right-4 top-1/4">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
        {/* RESULTS */}
        <div className="">
          <DisplaySearchResults
            selectedCharacter={selectedCharacter}
            showcaseJSON={showcaseJSON}
            localJSON={localJSON}
            searchResults={searchResults}
            addCredential={addCredential}
          />
        </div>
        <DisplayAddedCredentials
          selectedCharacter={selectedCharacter}
          showcaseJSON={showcaseJSON}
          localJSON={localJSON}
          selectedStep={selectedStep}
          removeCredential={removeCredential}
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

export { IssueStepEdit };
