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
  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-full"
          data-cred-id={index}
          onClick={(e) => handleClick(index)}
        >
          <div
            className={`credential  dark:hover:bg-dark-input hover:bg-light-btn-hover hover:cursor-pointer rounded p-3 mt-3 ${
              selectedCredential === index
                ? "selected-item"
                : "credential-border"
            }`}
          >
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div className="credential-issuer-name">
                  <p>{issuerName}</p>
                </div>
                <div className="credential-credential-name">
                  <p>{credentialName}</p>
                </div>
              </div>
              <div className="flex justify-center items-center align-center">
                <p className="border border-black border-solid rounded-lg text-xs py-1 px-2 flex justify-center items-center dark:border-white">
                  {" "}
                  Attributes: {attributeCount}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="remove text-xl flex items-center justify-center w-1/5 trash-button"
          onClick={(e) => {
            handleCredentialRemoval(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </>
  );
}

export { Credential };
