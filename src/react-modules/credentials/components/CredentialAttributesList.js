import React from "react";
import { CredentialAttribute } from "./CredentialAttribute";

function CredentialAttributesList({
  tempData,
  selectedCredential,
  handleChange,
  addAttribute,
  removeAttribute,
}) {
  return (
    <>
      <div className="rounded p-5 bg-neutral-900 mt-3">
        <div className="flex justify-between mb-3">
          <p className="text-md ">
            Attributes Added:{" "}
            <span className="font-bold">
              {selectedCredential &&
              tempData[selectedCredential].attributes &&
              tempData[selectedCredential].attributes.length !== 0
                ? tempData[selectedCredential].attributes.length
                : "0"}
            </span>
          </p>
          <button
            className=" font-bold rounded text-sm w-50 align-end justify-end add-attr-btn"
            onClick={() => addAttribute(selectedCredential)}
          >
            ADD ATTRIBUTE (+)
          </button>
        </div>
        <hr className="mb-3" />
        {tempData[selectedCredential] &&
          tempData[selectedCredential].attributes.length !== 0 &&
          tempData[selectedCredential].attributes.map((attr, index) => (
            <CredentialAttribute
              key={index}
              index={index}
              attributeName={attr.name}
              attributeValue={attr.value}
              credType={attr.type}
              handleChange={handleChange}
              tempData={tempData}
              selectedCredential={selectedCredential}
              removeAttribute={removeAttribute}
            />
          ))}
      </div>
    </>
  );
}

export { CredentialAttributesList };
