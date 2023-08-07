import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import { NoSelection } from ".././credentials/NoSelection";
import {EditProofRequest} from "./EditProofRequest"
function DisplayStepCredentials({
  selectedCharacter,
  showcaseJSON,
  localData,
  selectedStep,
  selectedScenario,
  removeCredential,
  setShowcaseJSON
}) {

  const [editingCredentials, setEditingCredentials] = useState([]);

  const getAllCredentials = (attributes, predicates) => {

    let totalProofs = 0;
    let credentials = [];

    for (const [key, value] of Object.entries(attributes)) {
      if(!credentials.includes(key)) credentials.push(key);
    };

    for (const [key, value] of Object.entries(predicates)) {
      if(!credentials.includes(value.restrictions[0])) credentials.push(value.restrictions[0]);
    };



    return credentials
  }

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


            {
              localData.requestOptions.proofRequest && localData.requestOptions.proofRequest.attributes ?
              getAllCredentials(localData.requestOptions.proofRequest.attributes, localData.requestOptions.proofRequest.predicates).map(
                (credential, index) => (
                
                


                
            <div key={index + "_"+ Date.now()} className="flex flex-row ">
                <div className="w-full">
              <div className="added-credential-main p-2 mt-5 rounded-t-lg flex flex-row justify-between">
                <div>
                <p>
                  {
                    
                    
                    
                    showcaseJSON.personas[selectedCharacter].credentials[
                      credential
                    ]
                    .issuer_name
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
                <button className="text-2xl pl-3 hover-red" onClick={(e) => removeCredential(e, credential)}>
                <FontAwesomeIcon icon={faTrash} /></button>
              </div>
              <div className="added-credential-attributes p-2 mb-5 rounded-b-lg">
                <div>
                  <span className="font-bold">
                    {

                     editingCredentials.includes(index) ? 

                     <EditProofRequest 
                     showcaseJSON={showcaseJSON}
                     proofRequest={localData.requestOptions.proofRequest}
                     credentialName={credential}
                     selectedCharacter={selectedCharacter}
                     selectedScenario={selectedScenario}
                     selectedStep={selectedStep}
                     setShowcaseJSON={setShowcaseJSON}
                     setEditingCredentials={setEditingCredentials}
                     editingIndex={index}
                     /> :



                     <button onClick={e => {
                      e.preventDefault()
                      setEditingCredentials([...editingCredentials, index])
                     }} 
                      className="button-light p-1">EDIT PROOF REQUEST</button>
                    }
                  </span>
                </div>
              </div>
              </div>
              
              </div>
              
           
                
                )) : null
            
            
          }

        </div>
                )}
    </>
  );
}

export { DisplayStepCredentials };
