import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function CredentialAttribute({
  index,
  attributeName,
  attributeValue,
  credType,
  handleChange,
  selectedCredential,
  removeAttribute,
}) {
  const [selectedOption, setSelectedOption] = useState(null); // State variable used to determine if the input is a dateint.

  return (
    <div className="grid grid-cols-9 gap-2 mb-2" id={index}>
      {/* Dropdown to select attribute type */}
      <select
        name={`type`}
        id={`type`}
        className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
        value={credType || ""}
        onChange={(e) => {
          // Call the handleChange function and update local state
          handleChange(e, ["attributes", "type"], index);
          setSelectedOption(e.target.value);
        }}
      >
        <option value="none">select</option>
        <option value="int">int</option>
        <option value="dateint">dateint</option>
        <option value="string">string</option>
      </select>

      {/* Input field for attribute name */}
      <input
        type="text"
        name={`name`}
        placeholder="Attribute Name"
        value={attributeName || ""}
        onChange={(e) => handleChange(e, ["attributes", "name"], index)}
        className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
      />

      {/* Input field for attribute value */}
      <input
        type="text"
        name={`value`}
        placeholder={
          selectedOption === "dateint" ? "YYYY-MM-DD" : "Attribute Value"
        }
        value={attributeValue || ""}
        onChange={(e) => handleChange(e, ["attributes", "value"], index)}
        className="col-span-3 text-sm dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
      />

      {/* Trash button to remove the attribute */}
      <div
        className=" flex items-center text-lg trash-button justify-center"
        onClick={() => removeAttribute(selectedCredential, index)}
      >
        <FontAwesomeIcon icon={faTrash} /> {/* Display trash icon */}
      </div>
    </div>
  );
}

export { CredentialAttribute };
