import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  setCredentialSelected,
  parsedCredentials,
  setSelectedIndex,
  setComponentToMount,
}) {
  function handleClick(e) {
    const data = e.currentTarget.getAttribute("data-cred-id");
    setSelectedIndex(data);
    setCredentialSelected(true);
    setComponentToMount("credential");
  }

  return (
    <>
      <div className="text-slate-100 w-full mt-4 flex flex-row gap-5">
        {parsedCredentials.map((credential, index) => (
          <Credential
            key={index}
            index={index}
            handleClick={handleClick}
            issuerName={credential.issuer_name}
            credentialName={credential.name}
            attributeCount={credential.attributes.length}
          />
        ))}
      </div>
    </>
  );
}

export { CredentialsList };
