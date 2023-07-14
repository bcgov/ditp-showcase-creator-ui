import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CredentialAttribute({
  index,
  attributeName,
  attributeValue,
  credType,
  handleChange,
  selectedCredential,
  tempData,
  removeAttribute,
}) {
  return (
    <div className="grid grid-cols-9 gap-2" id={index}>
      <select
        name={`type`}
        id={`type`}
        className="col-span-2 truncate"
        value={credType || ""}
        onChange={(e) => handleChange(e, ["attributes", "type"], index)}
      >
        <option value="none">select</option>
        <option value="int">int</option>
        <option value="dateint">dateint</option>
        <option value="string">string</option>
      </select>

      <input
        type="text"
        name={`name`}
        placeholder="Attribute Name"
        value={attributeName || ""}
        onChange={(e) => handleChange(e, ["attributes", "name"], index)}
        className="col-span-3"
      />

      <input
        type="text"
        name={`value`}
        placeholder="Attribute Value"
        value={attributeValue || ""}
        onChange={(e) => handleChange(e, ["attributes", "value"], index)}
        className="col-span-3"
      />

      <div
        className=" flex items-center text-xl mb-5 justify-center"
        onClick={() => removeAttribute(selectedCredential, index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export { CredentialAttribute };
