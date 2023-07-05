import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NoSelection } from ".././credentials/NoSelection";
function DisplayAddedCredentials({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  selectedStep,
  removeCredential
}) {

    
    
  return (
    <>
      {
    showcaseJSON.personas[selectedCharacter].onboarding[selectedStep]
    && showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials  
    && showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials.length > 10 ?  (
        <div className="m-5 p-5 w-full h-60">
          <NoSelection key={"blahblahblah"} Text={"No Credentials Added"} />
        </div>
      ) : (
        <div className="m-5">
          <p className="text-lg font-bold">Credential(s) Added:</p>

          {localJSON.credentials.map((credential, index) => (
            <>
            <div className="flex flex-row">
                <div className="w-full">
              <div className="added-credential-main p-2 mt-5 rounded-t-lg">
                <p>
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[
                      credential
                    ].issuer_name
                  }
                </p>
                <p className="font-bold">
                  {
                    showcaseJSON.personas[selectedCharacter].credentials[
                      credential
                    ].name
                  }
                </p>
              </div>
              <div className="added-credential-attributes p-2 mb-5 rounded-b-lg">
                <p>
                  Attributes:{" "}
                  <span className="font-bold">
                    {
                      showcaseJSON.personas[selectedCharacter].credentials[
                        credential
                      ].attributes.length
                    }
                  </span>
                </p>
              </div>
              </div>
              <button className="text-2xl pl-3 hover-red" onClick={(e) => removeCredential(e, credential)}>
                <FontAwesomeIcon icon={faTrash} /><
                    /button>
              </div>
              
            </>
                ))}
        </div>
                )}
    </>
  );
}

export { DisplayAddedCredentials };
