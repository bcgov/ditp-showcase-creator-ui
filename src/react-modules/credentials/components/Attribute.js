import React from "react";
import { LocalTextInput } from "../../LocalTextInput";

function Attribute({
  index,
  getAttributeID,
  handleLocalUpdate,
  showcaseJSON,
  localJSON,
  selectedCharacter,
  removeAttribute,
}) {
  return (
    <div
      className="grid grid-cols-3"
      id={`credential-attribute-${index}`}
      onClick={getAttributeID}
    >
      <div>
        <LocalTextInput
          key={index}
          label={"Attribute Name"}
          personaIndex={selectedCharacter}
          element={["attributes"]}
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
          element={["attributes"]}
          handleJSONUpdate={handleLocalUpdate}
          showcaseJSON={showcaseJSON}
          localJSON={localJSON}
        />
      </div>
      <div>
        <button id={index} onClick={() => removeAttribute(index)}>
          REMOVE
        </button>
      </div>
    </div>
  );
}

export { Attribute };
