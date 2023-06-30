import React, { useState } from "react";
import { TextInput } from "../TextInput";
import { Form } from "./Form";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";

function Edit({
  selectedCredential,
  formData,
  handleChange,
  addAttribute,
  tempData,
}) {
  console.log("In edit, your selected credential is : ", selectedCredential);
  console.log("In edit, your formData is : ", formData);
  console.log("In edit, your tempData is : ", tempData);
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">Title Here</h3>
        </div>
      </div>
      <hr></hr>
      <label htmlFor="cred_name">Credential Name</label>
      <br />
      <input
        type="text"
        id="cred_name"
        name="cred_name"
        value={tempData[selectedCredential].cred_name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="issuer_name">Issuer Name</label>
      <br />
      <input
        type="text"
        id="issuer_name"
        name="issuer_name"
        value={tempData[selectedCredential].issuer_name}
        onChange={handleChange}
      />
      {tempData[selectedCredential].attributes.map((attr, index) => (
        <div key={index} className=" grid grid-cols-2">
          <div>
            <label htmlFor={`name-${index}`}>Attribute Name</label>
            <input
              type="text"
              id={`name-${index}`}
              name={`name-${index}`}
              // placeholder="Attribute Name"
              value={attr.name || ""}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
          <div>
            <label htmlFor={`value-${index}`}>Attribute Value</label>
            <input
              type="text"
              name={`value-${index}`}
              id={`value-${index}`}
              // placeholder="Attribute Value"
              value={attr.value || ""}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        </div>
      ))}
      <button onClick={addAttribute}>ADD ATTRIBUTE (+)</button>
      {/* <button onClick={handleSaveClick}>SAVE ( + )</button> */}
    </>
  );
}

export { Edit };
