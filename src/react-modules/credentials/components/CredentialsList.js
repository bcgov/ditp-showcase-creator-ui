import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";
import { Credential2 } from "./Credential2";

function CredentialsList({
  setComponentToMount,
  setSelectedCredential,
  formData,
  setTempData,
  setFormData,
  selectedCredential,
}) {
  function handleClick(e) {
    const data = e.currentTarget.getAttribute("data-cred-id");
    console.log(data);
    setComponentToMount("edit");
    setSelectedCredential(parseInt(data));
  }

  return (
    <>
      <div className="">
        {formData.length > 0 ? (
          formData.map((credential, index) => (
            // <Credential
            //   key={index}
            //   index={index}
            //   handleClick={handleClick}
            //   issuerName={credential.issuer_name}
            //   credentialName={credential.cred_name}
            //   attributeCount={credential.attributes.length}
            // />
            <Credential2
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
      </div>
    </>
  );
}

export { CredentialsList };
