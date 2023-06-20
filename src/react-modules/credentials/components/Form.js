import React from "react";
import { TextInput } from "../../TextInput";
import { LocalTextInput } from "../../LocalTextInput";
import { FormHeader } from "./FormHeader";
import { NewCredentialButton } from "../NewCredentialButton";
import { AttributesList } from "../AttributesList";
import { FileUploadFull } from "../../FileUpload";

function Form({
  selectedIndex,
  showcaseJSON,
  handleJSONUpdate,
  // setShowcaseJSON,
  localJSON,
  handleLocalUpdate,
  saveJSON,
  selectedCharacter,
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
        personaIndex={selectedIndex}
        element={["cred_name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      {/* <LocalTextInput
        label={"Issuer Name"}
        personaIndex={selectedIndex}
        element={["issuer_name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      /> */}
      <FileUploadFull
        text={"Icon"}
        personaIndex={selectedCharacter}
        element={["icon"]}
        handleJSONUpdate={handleJSONUpdate}
        showcaseJSON={showcaseJSON}
      />
      <button onClick={saveJSON}>SAVE ( + )</button>
      {/* <NewCredentialButton
        setShowcaseJSON={setShowcaseJSON}
      ></NewCredentialButton> */}
    </>
  );
}

export { Form };
