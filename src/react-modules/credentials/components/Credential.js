import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Credential({
  issuerName,
  credentialName,
  attributeCount,
  index,
  handleClick,
  formData,
  setFormData,
  setTempData,
  selectedCredential,
  setSelectedCredential,
}) {
  const handleCredentialRemoval = (index) => {
    if (formData.length === 1) return;

    setTempData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setFormData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setSelectedCredential((prevVal) => (prevVal - 1 === 0 ? prevVal - 1 : 0));
  };
  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-full"
          data-cred-id={index}
          onClick={(e) => handleClick(index)}
        >
          <div
            className={`credential rounded p-3 mt-3 ${
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
                <p className="credential-attributes">
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
