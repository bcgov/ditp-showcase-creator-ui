import React from "react";
import { TextInput } from "../../TextInput";
import { LocalTextInput } from "../../LocalTextInput";
import { FormHeader } from "./FormHeader";
import { NewCredentialButton } from "../NewCredentialButton";
import { AttributesList } from "../AttributesList";

function Form({
  selectedIndex,
  credentialName,
  issuerName,
  showcaseJSON,
  handleJSONUpdate,
  setShowcaseJSON,
  localJSON,
  handleLocalUpdate,
  saveJSON,
}) {
  return (
    <>
      <FormHeader
        formTitle={"Create your Credential"}
        formCategory={"Credential"}
        setShowcaseJSON={setShowcaseJSON}
      ></FormHeader>
      <LocalTextInput
        label="Credential Name"
        personaIndex={selectedIndex}
        element={["onboarding", 4, "credentials"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      <button onClick={saveJSON}>save</button>
      <NewCredentialButton
        setShowcaseJSON={setShowcaseJSON}
      ></NewCredentialButton>
    </>
  );
}

export { Form };
