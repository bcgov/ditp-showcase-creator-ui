import React from "react";
import { CredentialAttribute } from "./CredentialAttribute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

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
          <p className="text-sm font-bold">
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
            className="  text-xs add-attr-btn  text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => addAttribute(selectedCredential)}
          >
            <span>ADD ATTRIBUTE </span>
            <span className="text-md ml-2">
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
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
