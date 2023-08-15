import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  formData,
  selectedCharacter,
  setComponentToMount,
  setSelectedCredential,
  showcaseJSON,
  setTempData,
  setCreateButtonClicked,
  selectedCredential,
  handleCredentialRemoval,
  createButtonClicked,
}) {
  function handleClick(credential) {
    if (createButtonClicked) {
      setTempData(showcaseJSON.personas[selectedCharacter].credentials);
      console.log("asdfadfafda");
    }
    setCreateButtonClicked(false);
    setComponentToMount("edit");
    setSelectedCredential(credential);
  }

  return (
    <>
      <div className="">
        {Object.entries(
          showcaseJSON.personas[selectedCharacter].credentials
        ).map((credential, index) => {
          return (
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
              handleCredentialRemoval={handleCredentialRemoval}
            />
          );
        })}
      </div>
    </>
  );
}

export { CredentialsList };
