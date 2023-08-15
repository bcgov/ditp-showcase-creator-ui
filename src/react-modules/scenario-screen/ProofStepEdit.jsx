import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { DisplayStepCredentials } from "./DisplayStepCredentials"
import { DisplaySearchResults } from "./../onboarding-screen/DisplaySearchResults";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

function ProofStepEdit({
  selectedScenario,
  selectedStep,
  saveStep,
  showcaseJSON,
  selectedCharacter,
  setState,
  setShowcaseJSON
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
  }

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
    if(localData.requestOptions.proofRequest && !localData.requestOptions.proofRequest.attributes[credential]){
      setLocalData(json =>{
        json.requestOptions.proofRequest.attributes[credential] = [showcaseJSON.personas[selectedCharacter].credentials[credential].attributes[0].name]
      })
    }else{
      console.log(localData.requestOptions)
    }
    
  }

  // Functionality for removing a credential from a proof step
  function removeCredential(e, credential) {
    e.preventDefault();

    setLocalData(json =>{
      delete json.requestOptions.proofRequest.attributes[credential]
    })


    for(const property in localData.requestOptions.proofRequest.predicates){
      if(localData.requestOptions.proofRequest.predicates[property].restrictions[0] === credential){
        setLocalData(json =>{
          delete json.requestOptions.proofRequest.predicates[property]
        })
      }
    }
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

        <div className="">
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

        {/* REQUEST TYPE OPTION */}

        {/* <label className="text-neutral-500 dark:text-neutral-200">
            <span className="">Type</span>
          </label>
          <input
            className="p-1 w-full field-background"
            type="text"
            value={localData.requestOptions.type}
            onChange={(e) => changeRequestOption(e.target.value, "type")}
          /> */}


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

            {/* SEARCHING FOR A CREDENTIAL*/}
        <p className="pt-10">Search for a credential:</p>
        <div className="flex flex-row justify-center items-center mt-3">
          <input
            className="w-full p-1 field-background rounded"
            placeholder="ex. Student Card"
            type="text"
            onChange={(e) => searchCredential(e)}
          />
          <span className="pb-4 px-2 text-xl">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {/* RESULTS */}
        <DisplaySearchResults
          selectedCharacter={selectedCharacter}
          showcaseJSON={showcaseJSON}
          localJSON={localData}
          searchResults={searchResults}
          addCredential={addCredential}
        />
        <DisplayStepCredentials
          selectedCharacter={selectedCharacter}
          showcaseJSON={showcaseJSON}
          localData={localData}
          selectedStep={selectedStep}
          removeCredential={removeCredential}
          selectedScenario={selectedScenario}
          setShowcaseJSON={setShowcaseJSON}
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
