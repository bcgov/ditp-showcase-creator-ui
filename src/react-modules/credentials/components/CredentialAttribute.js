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
  handleAttributeRemoval,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="grid grid-cols-9 gap-2 mb-2" id={index}>
      <select
        name={`cred_type-${index}`}
        id={`cred_type-${index}`}
        className="col-span-2 truncate"
        value={credType || ""}
        onChange={(e) => {
          handleChange(e, ["attributes", "type"], index);
          setSelectedOption(e.target.value);
        }}
      >
        <option value="none">select</option>
        <option value="int">int</option>
        <option value="dateint">dateint</option>
        <option value="string">string</option>
      </select>

      <input
        type="text"
        name={`name-${index}`}
        placeholder="Attribute Name"
        value={attributeName || ""}
        onChange={(e) => handleChange(e, ["attributes", "name"], index)}
        className="col-span-3 text-sm truncate"
      />

      <input
        type="text"
        name={`value`}
        placeholder={
          selectedOption === "dateint" ? "YYYY-MM-DD" : "Attribute Value"
        }
        value={attributeValue || ""}
        onChange={(e) => handleChange(e, ["attributes", "value"], index)}
        className="col-span-3 text-sm"
      />

      <div
        className=" flex items-center text-lg trash-button justify-center"
        onClick={() => removeAttribute(selectedCredential, index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export { CredentialAttribute };
