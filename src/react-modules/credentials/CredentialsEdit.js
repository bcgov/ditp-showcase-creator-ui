import React from "react";
import { CredentialAttributesList } from "./components/AttributesList";

function CredentialsEdit({
  selectedCredential,
  tempData,
  handleChange,
  addAttribute,
  setTempData,
}) {
  const handleAttributeRemoval = (attributeIndex) => {
    setTempData((prevData) => {
      const newData = [...prevData];
      const selectedCred = { ...newData[selectedCredential] }; // Create a copy of the selected credential
      selectedCred.attributes = selectedCred.attributes.filter(
        (_, index) => index !== attributeIndex
      );
      newData[selectedCredential] = selectedCred; // Update the selected credential in the new data array
      return newData;
    });
  };

  if (tempData.length === 0) return;

  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">
            Edit a Credential
          </h3>
        </div>
      </div>
      <hr className="mb-6"></hr>

      <div className="my-6">
        <label className="text-lg" htmlFor="name">
          Credential Name
        </label>
        <input
          type="text"
          id="cred_name"
          name="cred_name"
          placeholder="Credential Name"
          value={
            tempData[selectedCredential]
              ? tempData[selectedCredential].name
              : ""
          }
          onChange={(e) => handleChange(e, ["name"])}
          className="field-background mt-3"
        />
      </div>

      <div className="my-6">
        <label className="text-lg" htmlFor="issuer_name">
          Issuer Name
        </label>
        <input
          type="text"
          id="issuer_name"
          name="issuer_name"
          placeholder="Issuer Name"
          value={
            tempData[selectedCredential]
              ? tempData[selectedCredential].issuer_name
              : ""
          }
          onChange={(e) => handleChange(e, ["issuer_name"])}
          className="field-background mt-3"
        />
      </div>

      <div className="my-6">
        <label className="text-lg"> Add Attributes</label>
        <CredentialAttributesList
          tempData={tempData}
          selectedCredential={selectedCredential}
          handleChange={handleChange}
          addAttribute={addAttribute}
          removeAttribute={removeAttribute}
        />
      </div>
    </>
  );
}

export { CredentialsEdit };
