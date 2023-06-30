import React from "react";
import { CredentialAttribute } from "./CredentialAttribute";

function CredentialAttributesList({
  tempData,
  selectedCredential,
  handleChange,
  handleAttributeRemoval,
  addAttribute,
}) {
  return (
    <>
      <div className="rounded p-5 bg-neutral-900 mt-3">
        <div className="grid grid-cols-2 mb-3">
          <p className="text-sm ">
            Attributes Added:{" "}
            <span className="font-bold">
              {tempData[selectedCredential].attributes.length}
            </span>
          </p>
          <button className="border rounded text-sm" onClick={addAttribute}>
            ADD ATTRIBUTE (+)
          </button>
        </div>
        <hr className="mb-3" />
        {tempData[selectedCredential] &&
          tempData[selectedCredential].attributes.map((attr, index) => (
            <CredentialAttribute
              key={index}
              index={index}
              attributeName={attr.name}
              attributeValue={attr.value}
              credType={attr.cred_type}
              handleChange={handleChange}
              handleAttributeRemoval={handleAttributeRemoval}
            />
          ))}
      </div>
    </>
  );
}

export { CredentialAttributesList };
