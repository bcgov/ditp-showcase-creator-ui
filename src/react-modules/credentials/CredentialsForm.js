import React from "react";
import { CredentialAttributesList } from "./components/AttributesList";
// import { FileUploadFull } from "../FileUpload";

function CredentialsForm({
  handleChange,
  tempData,
  addAttribute,
  selectedCredential,
  setTempData,
  testJSON,
  setTestJSON,
}) {
  const handleAttributeRemoval = (attributeIndex) => {
    console.log("attr index: ", attributeIndex);
  };

  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">Title Here</h3>
        </div>
      </div>
      <hr className="mb-6"></hr>
      <label htmlFor="cred_name">Credential Name</label>
      <br />
      <input
        type="text"
        id="cred_name"
        name="cred_name"
        placeholder="Credential Name"
        value={
          tempData[selectedCredential]
            ? tempData[selectedCredential].cred_name
            : ""
        }
        onChange={handleChange}
      />
      <br />
      <label htmlFor="issuer_name">Issuer Name</label>
      <br />
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
        onChange={handleChange}
      />
      <br />
      <label> Add Attributes</label>
      <br />
      {/* <CredentialAttributesList
        tempData={tempData}
        selectedCredential={selectedCredential}
        handleChange={handleChange}
        handleAttributeRemoval={handleAttributeRemoval}
        addAttribute={addAttribute}
      /> */}
    </>
  );
}

export { CredentialsForm };
