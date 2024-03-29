import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { DisplayStepCredentials } from "./DisplayStepCredentials";
import { DisplaySearchResults } from "./../onboarding-screen/DisplaySearchResults";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

function ProofStepEdit({
  selectedScenario,
  selectedStep,
  saveStep,
  showcaseJSON,
  selectedCharacter,
  setState,
  setShowcaseJSON,
}) {
  const [localData, setLocalData] = useImmer(
    showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario].steps[
      selectedStep
    ]
  );

  const [searchResults, setSearchResults] = useState([]);

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
  };

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

  // Add a new credential to the selected step
  function addCredential(event, credential) {
    event.preventDefault();
    setSearchResults([]);
    if (
      localData.requestOptions.proofRequest &&
      !localData.requestOptions.proofRequest.attributes[credential]
    ) {
      setLocalData((json) => {
        json.requestOptions.proofRequest.attributes[credential] = [
          showcaseJSON.personas[selectedCharacter].credentials[credential]
            .attributes[0].name,
        ];
      });
    } else {
      console.log(localData.requestOptions);
    }
  }

  // Functionality for removing a credential from a proof step
  function removeCredential(e, credential) {
    e.preventDefault();

    setLocalData((json) => {
      delete json.requestOptions.proofRequest.attributes[credential];
    });

    for (const property in localData.requestOptions.proofRequest.predicates) {
      if (
        localData.requestOptions.proofRequest.predicates[property]
          .restrictions[0] === credential
      ) {
        setLocalData((json) => {
          delete json.requestOptions.proofRequest.predicates[property];
        });
      }
    }
  }

  return (
    <div className="flex flex-col">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Proof Step</p>
      <hr />

      <form onSubmit={null}>
        {/* TITLE */}
        <div className="my-6">
          <label className="text-md font-bold">Title</label>
          <br />
          <input
            className="dark:text-dark-text dark:bg-dark-input bg-light-bg mt-3 border dark:border-dark-border"
            type="text"
            placeholder="Title"
            value={localData.title}
            onChange={(e) => changeStep(e.target.value, "title")}
          />
        </div>

        <div className="my-6">
          <div className="p-1">
            <label className="text-md font-bold">{"Page Description"}</label>
            <textarea
              className="dark:text-dark-text dark:bg-dark-input bg-light-bg p-2 w-full rounded resize-none mt-3 border dark:border-dark-border"
              rows="8"
              placeholder="Page Description"
              type="text"
              value={localData.text}
              onChange={(e) => changeStep(e.target.value, "text")}
            />
          </div>
        </div>

        <p className="text-2xl mt-5 font-bold">Request Options</p>
        <hr className="my-3" />

        {/* REQUEST TYPE OPTION */}

        {/* <label className="text-md font-bold">
            <span className="">Type</span>
          </label>
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.requestOptions.type}
            onChange={(e) => changeRequestOption(e.target.value, "type")}
          /> */}

        <div className="my-6">
          <label className="text-md font-bold">
            <span className="">Title</span>
          </label>
          <input
            className="dark:text-dark-text dark:bg-dark-input bg-light-bg mt-3 border dark:border-dark-border"
            type="text"
            placeholder="Title"
            value={localData.requestOptions.title}
            onChange={(e) => changeRequestOption(e.target.value, "title")}
          />
        </div>

        <div className="my-6">
          <label className="text-md font-bold">{"Text"}</label>
          <textarea
            className="dark:text-dark-text dark:bg-dark-input bg-light-bg p-2 w-full rounded resize-none mt-3 border dark:border-dark-border "
            rows="4"
            placeholder="Text"
            type="text"
            value={localData.requestOptions.text}
            onChange={(e) => changeRequestOption(e.target.value, "text")}
          />
        </div>

        {/* SEARCHING FOR A CREDENTIAL*/}

        <div>
          <div className="mt-6">
            <p className="text-md font-bold">Search for a Credential:</p>
            <div className="flex flex-row justify-center items-center my-4">
              <div className="relative w-full">
                <input
                  className="dark:text-dark-text dark:bg-dark-input border dark:border-dark-border  rounded pl-2 pr-10 mb-2 w-full bg-light-bg"
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
            localJSON={localData}
            searchResults={searchResults}
            addCredential={addCredential}
          />
        </div>

        <DisplayStepCredentials
          selectedCharacter={selectedCharacter}
          showcaseJSON={showcaseJSON}
          localData={localData}
          selectedStep={selectedStep}
          removeCredential={removeCredential}
          selectedScenario={selectedScenario}
          setShowcaseJSON={setShowcaseJSON}
        />

        <div className="flex flex-cols my-3 justify-end space-x-4 items-baseline">
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
            value="SAVE"
            onClick={(e) => saveStep(e, localData)}
            className="p-1  w-20 bg-light-bg-secondary hover:bg-light-btn-hover dark:hover:bg-dark-input border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
          />
        </div>
      </form>
    </div>
  );
}

export { ProofStepEdit };
