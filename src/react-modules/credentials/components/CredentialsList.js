import React from "react";
import { useState } from "react";
import { Credential } from "./Credential";

function CredentialsList({
  setCredentialSelected,
  setComponentToMount,
  setSelectedCredential,
  formData,
}) {
  function handleClick(e) {
    const data = e.currentTarget.getAttribute("data-cred-id");
    // setCredentialSelected(true);
    setComponentToMount("credential");
    setSelectedCredential(parseInt(data));
  }

  return (
    <>
      <div className="text-slate-100 w-full mt-4 flex flex-wrap gap-5">
        {formData.map((credential, index) => {
          // Check if all values in the object are ""
          // const allValuesEmpty = Object.values(credential)
          //   .flat()
          //   .every((value) => value === "");

          // // Skip rendering if all values are ""
          // if (allValuesEmpty) {
          //   return null;
          // }

          return (
            <Credential
              key={index}
              index={index}
              handleClick={handleClick}
              issuerName={credential.issuer_name}
              credentialName={credential.cred_name}
              attributeCount={credential.attributes.length}
            />
          );
        })}
      </div>
    </>
  );
}

export { CredentialsList };
