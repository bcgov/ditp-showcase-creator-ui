import React from "react";
import { LocalTextInput } from "../../LocalTextInput";
import { Attribute } from "./Attribute";
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
    console.log(e.target.parentNode.parentNode.parentNode.id);
  };

  return (
    <div className="credentials-form-attributes-container credentials-form-attributes-container text-gray-500  mt-4 rounded p-4">
      <div>
        {Array.from({ length: attributeCount }, (_, index) => (
          <Attribute
            key={index}
            index={index}
            getAttributeID={getAttributeID}
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
