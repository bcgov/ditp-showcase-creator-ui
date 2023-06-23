import React from "react";
import { TextInput } from "../TextInput";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";
import { FileUploadFull } from "../FileUpload";

function Form({
  selectedIndex,
  showcaseJSON,
  handleJSONUpdate,
  localJSON,
  handleLocalUpdate,
  saveJSON,
  selectedCharacter,
  attributeCount,
  setAttributeCount,
  setLocalJSON,
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
      <FileUploadFull
        text={"Icon"}
        personaIndex={selectedCharacter}
        element={["icon"]}
        handleJSONUpdate={handleJSONUpdate}
        showcaseJSON={showcaseJSON}
      />
      <AttributesList
        showcaseJSON={showcaseJSON}
        selectedIndex={selectedIndex}
        localJSON={localJSON}
        attributeCount={attributeCount}
        handleJSONUpdate={handleJSONUpdate}
        selectedCharacter={selectedCharacter}
        handleLocalUpdate={handleLocalUpdate}
        setAttributeCount={setAttributeCount}
        setLocalJSON={setLocalJSON}
      />
      <button onClick={saveJSON}>SAVE ( + )</button>
      {/* <button onClick={saveJSON}>ADD ATTRIBUTE ( + )</button> */}
    </>
  );
}

export { Form };
