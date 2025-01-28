import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { LocalFileUpload } from "./LocalFileUpload";
import { DisplaySearchResults } from "./DisplaySearchResults";
import { DisplayAddedCredentials } from "./DisplayAddedCredentials";
import { Credential, OnboardingStep, ShowcaseJSON } from "../../types";
import {
  addOnboardingStepCredential,
  isArrayProperty,
  removeOnboardingStepCredential,
  updateOnboardingStepCredentials,
  updateOnboardingStepSingleValue,
} from "../../lib/json-helper";

function IssueStepEdit<T>({
  selectedCharacter,
  setSelectedStep,
  selectedStep,
  showcaseJSON,
  setShowcaseJSON,
  setStepState,
}: {
  selectedCharacter: number;
  setSelectedStep: (step: number | null) => void;
  selectedStep: number;
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
  setStepState: (state: T) => void;
}) {
  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useImmer<OnboardingStep>(
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  );

  useEffect(() => {
    setLocalJSON(
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
    );
  }, [selectedStep, showcaseJSON.personas, selectedCharacter, setLocalJSON]);

  const [searchResults, setSearchResults] = useState<string[]>([]);

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

  // Functionality for removing a credential from an issue step
  function removeCredential(credential: string) {
    setLocalJSON(draft => {
      removeOnboardingStepCredential(draft, credential);
    });
  }

  function cancelSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setStepState("no-selection" as T);
    setSelectedStep(null);
  }

  // Add a new credential to the selected step
  function addCredential(credential: keyof Credential) {
    setSearchResults([]);
    setLocalJSON(draft => {
      addOnboardingStepCredential(draft, credential);
    });
  }

  // Find credential in the search box, by either name or issuer
  function searchCredential(e: React.ChangeEvent<HTMLInputElement>) {
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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStepState("no-selection" as T);
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

      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        {/* TITLE */}
        <div className="my-6">
          <label
            className="text-md font-bold"
            htmlFor={`${selectedStep}_title`}
          >
            {"Page Title"}
          </label>
          <br />
          <input
            className="dark:text-dark-text dark:bg-dark-input mt-2"
            id={`${selectedStep}_title`}
            type="text"
            value={localJSON.title}
            placeholder="Page Title"
            onChange={(e) => handleLocalUpdate("title", e.target.value)}
          />
        </div>

        {/* TEXT */}
        <div className="my-6">
          <label className="text-md font-bold" htmlFor={`${selectedStep}_text`}>
            {"Page Description"}
          </label>
          <textarea
            className="dark:text-dark-text dark:bg-dark-input p-2 w-full rounded resize-none mt-3"
            rows={8}
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

        <p className="text-2xl pt-4 font-bold">Add your Credential</p>
        <hr />

        {/* SEARCHING FOR A CREDENTIAL*/}
        <div className="">
          <div className="mt-6">
            <p className="text-md font-bold">Search for a Credential:</p>
            <div className="flex flex-row justify-center items-center my-4">
              <div className="relative w-full">
                <input
                  className="dark:text-dark-text dark:bg-dark-input rounded pl-2 pr-10 mb-2 w-full"
                  placeholder="ex. Student Card"
                  type="text"
                  onChange={(e) => searchCredential(e)}
                />
                <span className="absolute right-4 top-1/4">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
          </div>
          {/* RESULTS */}
          <DisplaySearchResults
            selectedCharacter={selectedCharacter}
            showcaseJSON={showcaseJSON}
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
