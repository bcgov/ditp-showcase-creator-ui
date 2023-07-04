import { NoSelection } from ".././credentials/NoSelection";
function DisplayAddedCredentials({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  selectedStep,
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
            </>
                ))}
        </div>
                )}
    </>
  );
}

export { DisplayAddedCredentials };
