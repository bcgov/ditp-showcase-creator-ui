import React from "react";
import { CredentialAttributesList } from "./components/CredentialAttributesList";

function CredentialsForm({
  handleChange,
  tempData,
  selectedCredential,
  addAttribute,
  removeAttribute,
  showcaseJSON,
  selectedCharacter,
}) {
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">
            Add a new Credential
          </h3>
        </div>
      </div>
      <hr className="mb-6"></hr>

      <div className="my-6">
        <label className="text-md font-bold" htmlFor="cred_name">
          Credential Name
        </label>
        <br />
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
        <label className=" text-md font-bold" htmlFor="issuer_name">
          Issuer Name
        </label>
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
          onChange={(e) => handleChange(e, ["issuer_name"])}
          className="field-background mt-3"
        />
      </div>

      <div className="my-3">
        <label className="font-bold text-md"> Add Attributes</label>
        <CredentialAttributesList
          tempData={tempData}
          selectedCredential={selectedCredential}
          handleChange={handleChange}
          addAttribute={addAttribute}
          removeAttribute={removeAttribute}
          showcaseJSON={showcaseJSON}
          selectedCharacter={selectedCharacter}
        />
      </div>
    </>
  );
}

export { CredentialsForm };
