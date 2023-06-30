import React from "react";
import { TextInput } from "../TextInput";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";
import { FileUploadFull } from "../FileUpload";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Form({
  handleChange,
  tempData,
  addAttribute,
  selectedCredential,
  setComponentToMount,
  setTempData,
}) {
  // setComponentToMount("create");

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
      {tempData[selectedCredential] &&
        tempData[selectedCredential].attributes.map((attr, index) => (
          <div key={index} className="grid grid-cols-9 gap-2">
            <select
              name={`cred_type-${index}`} // Include the index in the name attribute
              id={`cred_type-${index}`}
              className="col-span-2 truncate"
              value={attr.cred_type || "none"}
              onChange={(e) => handleChange(e, index)} // Pass the index directly to the handleChange function
            >
              <option value="none" selected="selected">
                select
              </option>
              <option value="int">int</option>
              <option value="dateint">dateint</option>
              <option value="string">string</option>
            </select>

            <input
              type="text"
              name={`name-${index}`}
              placeholder="Attribute Name"
              value={attr.name || ""}
              onChange={(e) => handleChange(e, index)}
              className="col-span-3"
            />

            <input
              type="text"
              name={`value-${index}`}
              placeholder="Attribute Value"
              value={attr.value || ""}
              onChange={(e) => handleChange(e, index)}
              className="col-span-3"
            />

            <div
              className="col-span-1 p-2"
              onClick={() => handleAttributeRemoval(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        ))}
      <button onClick={addAttribute}>ADD ATTRIBUTE (+)</button>
    </>
  );
}

export { Form };
