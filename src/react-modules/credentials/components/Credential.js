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
  testJSON,
  setTestJSON,
}) {
  const handleCredentialRemoval = (index) => {
    if (Object.keys(testJSON.character[0].credentials).length === 1) return;

    setTempData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setTestJSON((prevData) => {
      delete prevData.character[0].credentials[`cred_id_${index}`];
      setSelectedCredential((prevVal) => (prevVal - 1 === 0 ? prevVal - 1 : 0));
    });

    // setSelectedCredential((prevVal) => (prevVal - 1 === 0 ? prevVal - 1 : 0));
  };
  return (
    <>
      <div>
        <div
          className="credential-container grid grid-cols-7 "
          data-cred-id={index}
          onClick={handleClick}
        >
          <div className="credential rounded col-span-6 grid grid-cols-4">
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
          <div className="cred-actions">
            <p onClick={() => handleCredentialRemoval(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { Credential };
