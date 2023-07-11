import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  setComponentToMount,
  setSelectedCredential,
  formData,
  setTempData,
  setFormData,
  selectedCredential,
  testJSON,
  setTestJSON,
}) {
  function handleClick(e) {
    const data = e.currentTarget.getAttribute("data-cred-id");
    setComponentToMount("edit");
    setSelectedCredential(parseInt(data));
  }

  return (
    <>
      <div className="">
        {Object.entries(testJSON.character[0].credentials).map(
          (credential, index) => (
            <Credential
              key={index}
              index={index}
              handleClick={handleClick}
              issuerName={credential[1].issuer_name}
              credentialName={credential[1].cred_name}
              // attributeCount={credential[1].attributes.length}
              formData={formData}
              setTempData={setTempData}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
              testJSON={testJSON}
              setTestJSON={setTestJSON}
            />
          )
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
