import React from "react";
import { TextInput } from "../TextInput";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";

function CredentialsEdit({
  attributeCount,
  setAttributeCount,
  handleLocalUpdate,
  handleJSONUpdate,
  localJSON,
  setLocalJSON,
  showcaseJSON,
  setShowcaseJSON,
  selectedIndex,
  selectedCharacter,
  saveJSON,
  saveEditedJSON,
}) {
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">Title Here</h3>
        </div>
      </div>
      <hr></hr>
      <LocalTextInput
        label={"Credential Name"}
        personaIndex={selectedCharacter}
        element={["cred_name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      <LocalTextInput
        label={"Issuer Name"}
        personaIndex={selectedCharacter}
        element={["issuer_name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      <div className="grid grid-cols-2"></div>
      <AttributesList
        showcaseJSON={showcaseJSON}
        selectedIndex={selectedIndex}
        localJSON={localJSON}
        attributeCount={attributeCount}
        setAttributeCount={setAttributeCount}
        handleJSONUpdate={handleJSONUpdate}
        selectedCharacter={selectedCharacter}
        handleLocalUpdate={handleLocalUpdate}
        setLocalJSON={setLocalJSON}
      />
      <button onClick={saveEditedJSON}>SAVE ( + )</button>
    </>
  );
}

export { CredentialsEdit };
