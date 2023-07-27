import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NoSelection } from ".././credentials/NoSelection";
function DisplayAddedCredentials({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  selectedStep,
  removeCredential,
}) {
  return (
    <>
      {showcaseJSON.personas[selectedCharacter].onboarding[selectedStep] &&
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
        .credentials &&
      showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
        .credentials.length > 10 ? (
        <div className="m-5 p-5 w-full h-60">
          <NoSelection key={"blahblahblah"} Text={"No Credentials Added"} />
        </div>
      ) : (
        <div className="">
          <p className="text-lg font-bold mt-2">Credential Added:</p>

          {localJSON.credentials.map((credential, index) => (
            <>
              <div className="flex flex-row">
                <div className="w-full">
                  <div className={`credential rounded p-3 mt-3`}>
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <div className="credential-issuer-name">
                          <p>
                            {
                              showcaseJSON.personas[selectedCharacter]
                                .credentials[credential].issuer_name
                            }
                          </p>
                        </div>
                        <div className="credential-credential-name">
                          <p>
                            {
                              showcaseJSON.personas[selectedCharacter]
                                .credentials[credential].name
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center align-center">
                        <p className="credential-attributes">
                          {" "}
                          Attributes:{" "}
                          {
                            showcaseJSON.personas[selectedCharacter]
                              .credentials[credential].attributes.length
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="remove flex items-center justify-center w-1/5 trash-button"
                  onClick={(e) => removeCredential(e, credential)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export { DisplayAddedCredentials };
