import React from "react";
import { useState, useEffect } from "react";
import { Attribute } from "./Attribute";
import { LocalTextInput } from "../../LocalTextInput";

function AttributesList({
  showcaseJSON,
  selectedIndex,
  selectedCharacter,
  handleJSONUpdate,
  handleLocalUpdate,
  setLocalJSON,
  localJSON,
  attributeCount,
  setAttributeCount,
}) {
  const addAttribute = () => {
    console.log(localJSON.attributes[0]);
    // setLocalJSON((prevLocalJSON) => ({
    //   ...prevLocalJSON,
    //   attributes: [...prevLocalJSON.attributes, { name: "", value: "" }],
    // }));
    // setAttributeCount(attributeCount + 1);
  };
  return (
    <div className="credentials-form-attributes-container credentials-form-attributes-container text-gray-500  mt-4 rounded p-4">
      <div>
        {Array.from({ length: attributeCount }, (_, index) => (
          <div className="grid grid-cols-2">
            <div>
              <LocalTextInput
                key={index}
                label={"Attribute Name"}
                personaIndex={selectedCharacter}
                // element={["attributes", attributeCount - 1, "name", 0]}
                element={["attributes", 0]}
                handleJSONUpdate={handleLocalUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
            </div>
            <div>
              <LocalTextInput
                key={index}
                label={"Attribute Value"}
                personaIndex={selectedCharacter}
                // element={["attributes", attributeCount - 1, "value", 0]}setAttributeCount(attributeCount + 1);
                element={["attributes"]}
                handleJSONUpdate={handleLocalUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
            </div>
          </div>
        ))}
        <button onClick={() => addAttribute()}>ADD ATTRIBUTE ( + )</button>
      </div>
    </div>
  );
}

export { AttributesList };
