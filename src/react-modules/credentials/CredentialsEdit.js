import React from "react";
import { CredentialAttributesList } from "./components/AttributesList";

function CredentialsEdit({
  selectedCredential,
  tempData,
  handleChange,
  addAttribute,
  setTempData,
  testJSON,
  setTestJSON,
}) {
  const handleAttributeRemoval = (attributeIndex) => {
    setTempData((prevData) => {
      console.log(attributeIndex);
      const newData = [...prevData];
      newData[selectedCredential].attributes.splice(attributeIndex, 1);
      return newData;
    });
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
        value={
          tempData[selectedCredential].cred_name
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
        value={
          tempData[selectedCredential].issuer_name
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

export { CredentialsEdit };
