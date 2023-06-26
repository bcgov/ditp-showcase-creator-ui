import React from "react";
import { LocalTextInput } from "../../LocalTextInput";
import { Attribute } from "./Attribute";
function AttributesList({
  showcaseJSON,
  selectedIndex,
  localJSON,
  attributeCount,
  setAttributeCount,
  handleJSONUpdate,
  selectedCharacter,
  handleLocalUpdate,
  setLocalJSON,
}) {
  const addAttribute = () => {
    setLocalJSON((prevLocalJSON) => ({
      ...prevLocalJSON,
      attributes: [...prevLocalJSON.attributes, { name: "", value: "" }],
    }));
    setAttributeCount(attributeCount + 1);
  };

  const removeAttribute = (i) => {
    setLocalJSON((prevLocalJSON) => ({
      ...prevLocalJSON,
      attributes: prevLocalJSON.attributes.filter((_, index) => index !== i),
    }));
    setAttributeCount(attributeCount - 1);
  };

  const getAttributeID = (e) => {
    console.log(e.currentTarget.id);
  };

  return (
    <div className="credentials-form-attributes-container credentials-form-attributes-container text-gray-500  mt-4 rounded p-4">
      <div>
        {Array.from({ length: attributeCount }, (_, index) => (
          <Attribute
            key={index}
            index={index}
            getAttributeID={getAttributeID}
            handleJSONUpdate={handleJSONUpdate}
            handleLocalUpdate={handleLocalUpdate}
            showcaseJSON={showcaseJSON}
            localJSON={localJSON}
            selectedCharacter={selectedCharacter}
            removeAttribute={removeAttribute}
          />
        ))}
        <button onClick={addAttribute}>ADD ATTRIBUTE ( + )</button>
      </div>
    </div>
  );
}

export { AttributesList };
