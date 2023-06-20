import React from "react";
import { TextInput } from "../TextInput";
import { Form } from "./components/Form";
import { FormHeader } from "./components/FormHeader";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./AttributesList";

function Edit({
  selectedIndex,
  handleJSONUpdate,
  showcaseJSON,
  localJSON,
  handleLocalUpdate,
  selectedCharacter,
  setShowcaseJSON,
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
        label="Credential Name"
        personaIndex={selectedCharacter}
        element={["onboarding", 4, "credentials", selectedIndex, "name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      <div className="grid grid-cols-2"></div>
      <AttributesList
        showcaseJSON={showcaseJSON}
        selectedCharacter={selectedCharacter}
        selectedIndex={selectedIndex}
      />
    </>
  );
}

export { Edit };
