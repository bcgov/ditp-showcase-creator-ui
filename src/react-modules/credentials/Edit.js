import React from "react";
import { TextInput } from "../TextInput";
import { Form } from "./Form";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";

function Edit({
  selectedIndex,
  handleJSONUpdate,
  showcaseJSON,
  localJSON,
  handleLocalUpdate,
  selectedCharacter,
  setShowcaseJSON,
  saveJSON,
  saveEditedJSON,
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
      <div className="grid grid-cols-2"></div>
      <AttributesList
        handleJSONUpdate={handleJSONUpdate}
        handleLocalUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        selectedCharacter={selectedCharacter}
        selectedIndex={selectedIndex}
        setLocalJSON={setLocalJSON}
        localJSON={localJSON}
      />
      <button onClick={saveEditedJSON}>SAVE ( + )</button>
    </>
  );
}

export { Edit };
