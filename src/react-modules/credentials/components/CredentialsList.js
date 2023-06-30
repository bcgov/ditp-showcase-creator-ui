import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  setCredentialSelected,
  setComponentToMount,
  setSelectedCredential,
  formData,
  tempData,
}) {
  function handleClick(e) {
    const data = e.currentTarget.getAttribute("data-cred-id");
    setComponentToMount("credential");
    setSelectedCredential(parseInt(data));
  }

  return (
    <>
      <div className="text-slate-100 w-full mt-4 flex flex-wrap gap-5">
        {formData.length > 0 ? (
          formData.map((credential, index) => (
            <Credential
              key={index}
              index={index}
              handleClick={handleClick}
              issuerName={credential.issuer_name}
              credentialName={credential.cred_name}
              attributeCount={credential.attributes.length}
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
