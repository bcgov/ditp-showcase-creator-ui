import { useEffect } from "react";
import { useImmer } from "use-immer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NoSelection } from ".././credentials/NoSelection";
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

const MAX_SEARCH_CREDENTIALS = 8;

  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useImmer(
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  );

  const [searchResults, setSearchResults] = useImmer([]);

  // When selecting a different step, set the local json to match the showcase json
  // useEffect(() => {
  //   setLocalJSON(
  //     showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
  //   );
  // }, [selectedStep]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }
  
  // Add a new credential to the selected step
  function addCredential(event, credential) {
    setSearchResults([]);
    // console.log(credential)
    setLocalJSON(
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials.push(credential)
    );
    console.log(localJSON)
  }

  // Find credential in the search box, by either name or issuer
  function searchCredential(e) {
    setSearchResults([]);

    if(!e.target.value) return;

    let credentials = showcaseJSON.personas[selectedCharacter].credentials;
    let search = e.target.value.toUpperCase();

    for (const credential in credentials) {
      if (
        credentials[credential].issuer_name.toUpperCase().includes(search) ||
        credentials[credential].name.toUpperCase().includes(search)
      ) {
        setSearchResults((results) => {
          results.push(credential);
        });
      }
    }
  }

  // Function to handle saving/form submission
  function handleSubmit(e) {
    e.preventDefault();
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
    });
    setSelectedStep([]);
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

        {/* SEARCHING FOR A CREDENTIAL*/}
        <p className="pt-10">Search for a credential:</p>
        <div className="flex flex-row justify-center items-center mt-3">
          <input
            className="w-full p-1 field-background rounded"
            placeholder="ex. Student Card"
            type="text"
            onChange={(e) => searchCredential(e)}
          />
          <span className="px-3 text-xl">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        {/* RESULTS */}
        <div>
          {
          searchResults.map((result, index) => (
            // If there are more than MAX_SEARCH_CREDENTIALS credentials showing, force the user to search.
            index < MAX_SEARCH_CREDENTIALS ? (
              <button key={index} className="basic-step dropdown-border w-5/6 flex flex-row items-center justify-around text-center"
              onClick={(e) => addCredential(e, result)}>

                
          <div className="w-1/2" key={index}>
          <p key={index} className="">{showcaseJSON.personas[selectedCharacter].credentials[result].issuer_name}</p>
            <p key={index} className="font-bold">{showcaseJSON.personas[selectedCharacter].credentials[result].name}</p>
            
          </div>
          <div className="w-1/2" key={index}>
            <p key={index}>Atributes: {showcaseJSON.personas[selectedCharacter].credentials[result].attributes.length}</p>
          </div>
          
         </button>
         
            ) : (null)
          ))
        }
        </div>

        
          {showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials.length == 0 ?

          <div className="m-5 p-5 w-full h-60"><NoSelection Text={"No Credentials Added"}/></div> :

          <div className="m-5">
            <p className="text-lg font-bold">Credential(s) Added:</p>
          {showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials.map(
            (credential, index) => (
              <>
                <div className="added-credential-main p-2 rounded-t-lg">
                  <p>{credential.issuer_name}</p>
                  <p className="font-bold">{credential.name}</p>
                </div>
                <div className="added-credential-attributes p-2 rounded-b-lg">
                  <p>Attributes: <span className="font-bold">{showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials.length}</span></p>
                </div>
                </>

            )
          )}
          </div>
          
          
}
        

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
