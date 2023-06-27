import React from "react";

const CredentialComponent = ({ credentialName, issuerName, attributes }) => {
  return (
    <>
      <div className="border" style={{ width: "204px" }}>
        <p>Credential Name: {credentialName}</p>
        <p>Issuer Name: {issuerName}</p>
        <p>Attributes: {attributes}</p>
      </div>
    </>
  );
};

export { CredentialComponent };
