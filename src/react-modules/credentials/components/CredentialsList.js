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

  // This function handles the selection of a credential
  function handleClick(credential) {

    // If the create button is clicked, reset back to the previous data.
    if (createButtonClicked) {
      setTempData(showcaseJSON.personas[selectedCharacter].credentials);
    }

    // Reset create button state.
    setCreateButtonClicked(false);

    // Set componentToMount to edit.
    setComponentToMount("edit");

    // Set the credential that was clicked.
    setSelectedCredential(credential);

  }

  return (
    <>
      <div>
        {/* Map through credentials and render Credential components */}
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
