import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CredentialAttribute({
  index,
  attributeName,
  attributeValue,
  credType,
  handleChange,
  handleAttributeRemoval,
}) {
  return (
    <div className="grid grid-cols-9 gap-2">
      <select
        name={`cred_type-${index}`}
        id={`cred_type-${index}`}
        className="col-span-2 truncate"
        value={credType}
        onChange={(e) => handleChange(e, index)}
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
        onChange={(e) => handleChange(e, index)}
        className="col-span-3"
      />

      <input
        type="text"
        name={`value-${index}`}
        placeholder="Attribute Value"
        value={attributeValue || ""}
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
  );
}

export { CredentialAttribute };
