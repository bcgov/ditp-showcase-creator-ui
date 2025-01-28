import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NoSelection } from "../credentials/no-selection";
import { EditProofRequest } from "./EditProofRequest";
import { ProofRequestAttributes, ProofRequestPredicates, ScenarioStep, ShowcaseJSON } from "../../types";

export const DisplayStepCredentials = ({
  selectedCharacter,
  showcaseJSON,
  localData,
  selectedStep,
  selectedScenario,
  removeCredential,
  setShowcaseJSON,
}: {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  localData: ScenarioStep;
  selectedStep: number;
  selectedScenario: number;
  removeCredential: (credential: string) => void;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
}) => {
  const [editingCredentials, setEditingCredentials] = useState<number[]>([]);

  const getAllCredentials = (
    attributes: { [key: string]: ProofRequestAttributes },
    predicates: { [key: string]: ProofRequestPredicates }
  ) => {
    const credentials: string[] = [];

    Object.values(attributes).forEach(value => {
      if (value.restrictions?.[0] && !credentials.includes(value.restrictions[0])) {
        credentials.push(value.restrictions[0]);
      }
    });

    Object.values(predicates).forEach(value => {
      if (value.restrictions[0] && !credentials.includes(value.restrictions[0])) {
        credentials.push(value.restrictions[0]);
      }
    });

    return credentials;
  };

  const onboardingStep = showcaseJSON.personas[selectedCharacter].onboarding[selectedStep];
  const hasCredentials = onboardingStep?.credentials?.length ?? 0 > 10;

  return (
    <>
      {hasCredentials ? (
        <div className="m-5 p-5 w-full h-60">
          <NoSelection text="No Credentials Added" />
        </div>
      ) : (
        <div className="">
          <p className="text-md font-bold mt-2">Credential(s) Added:</p>

          {localData.requestOptions?.proofRequest && 
            getAllCredentials(
              localData.requestOptions.proofRequest.attributes || {},
              localData.requestOptions.proofRequest.predicates || {}
            ).map((credential, index) => {
              const credentialData = showcaseJSON.personas[selectedCharacter].credentials[credential];
              if (!credentialData) return null;

              return (
                <div key={`${index}_${Date.now()}`} className="flex flex-row">
                  <div className="w-full">
                    <div className="bg-light-input px-2 py-4 dark:bg-dark-input dark:text-dark-text p-2 mt-5 rounded-t-lg flex flex-row justify-between">
                      <div className="ml-2">
                        <div>
                          <p>{credentialData.issuer_name}</p>
                          <p className="font-bold">{credentialData.name}</p>
                        </div>
                      </div>
                      <button
                        className="text-xl hover-red mr-4"
                        onClick={(e) => {
                          e.preventDefault();
                          removeCredential(credential);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    <div className="bg-light-bg p-2 dark:bg-dark-bg dark:text-dark-text mb-5 rounded-b-lg">
                      <div>
                        <span>
                          {localData.requestOptions?.proofRequest && editingCredentials.includes(index) ? (
                            <EditProofRequest
                              showcaseJSON={showcaseJSON}
                              proofRequest={localData.requestOptions.proofRequest}
                              credentialName={credential}
                              selectedCharacter={selectedCharacter}
                              selectedScenario={selectedScenario}
                              selectedStep={selectedStep}
                              setShowcaseJSON={setShowcaseJSON}
                              setEditingCredentials={setEditingCredentials}
                              editingCredentials={editingCredentials}
                              editingIndex={index}
                            />
                          ) : (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setEditingCredentials([...editingCredentials, index]);
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
              );
            })}
        </div>
      )}
    </>
  );
};