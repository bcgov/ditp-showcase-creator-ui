import { useEffect } from "react";
import {useImmer} from 'use-immer';
import { CredentialAttributesList } from "./components/AttributesList";

function CredentialsEdit({
  selectedCredential,
  tempData,
  addAttribute,
  setTempData,
  selectedCharacter,
  showcaseJSON,
  handleChange
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
      <label htmlFor="name">Credential Name</label>
      <br />
      <input
        type="text"
        id="name"
        name="name"
        value={
          tempData[selectedCredential].name
        }
        onChange={(e) => handleChange(e, "name")}
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
        }
        onChange={(e) => handleChange(e, "issuer_name")}
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
