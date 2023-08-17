import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NoSelection } from ".././credentials/NoSelection";
import { EditProofRequest } from "./EditProofRequest";
function DisplayStepCredentials({
  selectedCharacter,
  showcaseJSON,
  localData,
  selectedStep,
  selectedScenario,
  removeCredential,
  setShowcaseJSON,
}) {
  const [editingCredentials, setEditingCredentials] = useState([]);

  const getAllCredentials = (attributes, predicates) => {
    let totalProofs = 0;
    let credentials = [];

    for (const [key, value] of Object.entries(attributes)) {
      if (!credentials.includes(key)) credentials.push(key);
    }

    for (const [key, value] of Object.entries(predicates)) {
      if (!credentials.includes(value.restrictions[0]))
        credentials.push(value.restrictions[0]);
    }

    return credentials;
  };

  return (
    <>
      {showcaseJSON.personas[selectedCharacter].onboarding[selectedStep] &&
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
        .credentials &&
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
        .credentials.length > 10 ? (
        <div className="m-5 p-5 w-full h-60">
          <NoSelection key={"unique_key"} Text={"No Credentials Added"} />
        </div>
      ) : (
        <div className="">
          <p className="text-md font-bold mt-2">Credential(s) Added:</p>

          {localData.requestOptions.proofRequest &&
          localData.requestOptions.proofRequest.attributes
            ? getAllCredentials(
                localData.requestOptions.proofRequest.attributes,
                localData.requestOptions.proofRequest.predicates
              ).map((credential, index) =>
                // This line prevents the showcase from crashing, in the event the credential was deleted earlier.
                // Note that this should be handled anyway. On deleting a credential, if that credential was used, the proofRequest is reset to blank/empty.
                showcaseJSON.personas[selectedCharacter].credentials[
                  credential
                ] ? (
                  <div key={index + "_" + Date.now()} className="flex flex-row">
                    <div className="w-full">
                      <div className=" bg-light-bg px-2 py-4 dark:bg-dark-input dark:text-dark-text p-2 mt-5 rounded-t-lg flex flex-row justify-between">
                        <div className="ml-2">
                          <div>
                            <p>
                              {
                                showcaseJSON.personas[selectedCharacter]
                                  .credentials[credential].issuer_name
                              }
                            </p>
                            <p className="font-bold">
                              {
                                showcaseJSON.personas[selectedCharacter]
                                  .credentials[credential].name
                              }
                            </p>
                          </div>
                        </div>
                        <button
                          className=" text-xl hover-red mr-4"
                          onClick={(e) => removeCredential(e, credential)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <div className="bg-light-input p-2 dark:bg-dark-bg dark:text-dark-text mb-5 rounded-b-lg">
                        <div>
                          <span className="">
                            {editingCredentials.includes(index) ? (
                              <EditProofRequest
                                showcaseJSON={showcaseJSON}
                                proofRequest={
                                  localData.requestOptions.proofRequest
                                }
                                credentialName={credential}
                                selectedCharacter={selectedCharacter}
                                selectedScenario={selectedScenario}
                                selectedStep={selectedStep}
                                setShowcaseJSON={setShowcaseJSON}
                                setEditingCredentials={setEditingCredentials}
                                editingIndex={index}
                              />
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditingCredentials([
                                    ...editingCredentials,
                                    index,
                                  ]);
                                }}
                                className="text-sm font-bold p-1 hover:underline"
                              >
                                EDIT PROOF REQUEST
                              </button>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            : null}
        </div>
      )}
    </>
  );
}

export { DisplayStepCredentials };
