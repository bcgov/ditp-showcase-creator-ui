import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  selectedCharacter,
  setComponentToMount,
  setSelectedCredential,
  formData,
  tempData,
  showcaseJSON,
  setShowcaseJSON,
  setTempData,
  setFormData,
  selectedCredential,
  testJSON,
  setTestJSON,
  handleCredentialRemoval,
  setCreateButtonClicked
}) {


  function handleClick(credential) {
    setCreateButtonClicked(false);
    setComponentToMount("edit");
    setSelectedCredential(credential);
  }

  // console.log(tempData);

  return (
    <>
      <div className="">
        {Object.entries(showcaseJSON.personas[selectedCharacter].credentials).map(
          (credential, index) => {
            return(
              <Credential
              key={index}
              index={credential[0]}
              handleClick={handleClick}
              issuerName={credential[1].issuer_name}
              credentialName={credential[1].name}
              attributeCount={credential[1].attributes.length}
              formData={formData}
              setTempData={setTempData}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
              testJSON={testJSON}
              setTestJSON={setTestJSON}
              setComponentToMount={setComponentToMount}
              handleCredentialRemoval={handleCredentialRemoval}
            />
            )
            
          }
        )}
      </div>
      {/* <div className="">
        {formData.length > 0 ? (
          formData.map((credential, index) => (
            <Credential
              key={index}
              index={index}
              handleClick={handleClick}
              issuerName={credential.issuer_name}
              credentialName={credential.cred_name}
              attributeCount={credential.attributes.length}
              formData={formData}
              setTempData={setTempData}
              setFormData={setFormData}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
            />
          ))
        ) : (
          <p>No credentials available.</p>
        )}
      </div> */}
    </>
  );
}

export { CredentialsList };
