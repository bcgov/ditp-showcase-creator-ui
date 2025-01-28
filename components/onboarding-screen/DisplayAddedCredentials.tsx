import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NoSelection } from "../credentials/NoSelection";
import { OnboardingStep, ShowcaseJSON } from "../../types";

export const DisplayAddedCredentials = ({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  selectedStep,
  removeCredential,
}: {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  localJSON: OnboardingStep;
  selectedStep: number;
  removeCredential: (credential: string) => void;
}) => {
  return (
    <>
      {localJSON.credentials && localJSON.credentials.length > 10 ? (
        <div className="m-5 p-5 w-full h-60">
          <NoSelection key={"blahblahblah"} Text={"No Credentials Added"} />
        </div>
      ) : (
        <div className="">
          <p className="text-md font-bold mt-2">Credential Added:</p>

          {localJSON.credentials?.map((credential: string, index: number) => (
            <div key={index} className="flex flex-row">
              <div className="w-full border rounded my-3 bg-light-bg hover:bg-light-btn-hover dark:border-dark-border dark:bg-dark-bg dark:hover:bg-dark-input text-light-text dark:text-dark-text">
                <div className={`credential rounded px-1 py-2`}>
                  <div className="grid grid-cols-3 p-2">
                    <div className="col-span-2">
                      <div className="text-xs">
                        <p>
                          {
                            showcaseJSON.personas[selectedCharacter]
                              .credentials[credential].issuer_name
                          }
                        </p>
                      </div>
                      <div className="text-lg font-bold">
                        <p>
                          {
                            showcaseJSON.personas[selectedCharacter]
                              .credentials[credential].name
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center align-center">
                      <p className="border border-black border-solid rounded-lg text-xs py-1 px-2 flex justify-center items-center dark:border-white">
                        {" "}
                        Attributes:{" "}
                        {
                          showcaseJSON.personas[selectedCharacter].credentials[
                            credential
                          ].attributes.length
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="remove flex items-center text-xl justify-center w-1/5 trash-button"
                onClick={(e) => {
                  e.preventDefault();
                  removeCredential(credential);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
