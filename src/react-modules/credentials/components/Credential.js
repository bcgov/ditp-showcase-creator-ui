import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Credential({
  issuerName,
  credentialName,
  attributeCount,
  index,
  handleClick,
  selectedCredential,
  handleCredentialRemoval,
}) {
  const isSelected = selectedCredential === index;
  return (
    <>
      <div className="credential-container flex flex-row">
        <div
          className="w-full"
          data-cred-id={index}
          onClick={(e) => handleClick(index)}
        >
          <div
            className={`credential rounded col-span-6 grid grid-cols-4 ${
              selectedCredential === index ? "selected-cred" : ""
            }`}
          >
            <div className="cred-image"></div>
            <div className="cred-info col-span-2">
              <p className="cred-issuer-name">{issuerName}</p>
              <p className="cred-credential-name">{credentialName}</p>
            </div>
            <div className=" cred-attributes">
              <p className="">Attributes: {attributeCount}</p>
            </div>
          </div>
          {/* end of one credential  */}
        </div>
        <div className="cred-actions px-5">
          <p onClick={(e) => handleCredentialRemoval(selectedCredential)}>
            <FontAwesomeIcon icon={faTrash} />
          </p>
        </div>
      </div>
    </>
  );
}

export { Credential };
