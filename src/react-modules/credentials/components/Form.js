import React from "react";
import { TextInput } from "../../TextInput";
import { LocalTextInput } from "../../LocalTextInput";
import { FormHeader } from "./FormHeader";
import { NewCredentialButton } from "../NewCredentialButton";
import { AttributesList } from "../AttributesList";

function Form({
  selectedIndex,
  showcaseJSON,
  handleJSONUpdate,
  setShowcaseJSON,
  localJSON,
  handleLocalUpdate,
  saveJSON,
  setSelectedIndex,
}) {
  console.log(localJSON);
  return (
    <>
      <FormHeader
        formTitle={"Create your Credential"}
        formCategory={"Credential"}
        setShowcaseJSON={setShowcaseJSON}
        showcaseJSON={showcaseJSON}
        setSelectedIndex={setSelectedIndex}
        selectedIndex={selectedIndex}
      ></FormHeader>
      <LocalTextInput
        label="Credential Name"
        personaIndex={selectedIndex}
        element={["onboarding", 4, "credentials", 0, "name"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />
      <NewCredentialButton
        setShowcaseJSON={setShowcaseJSON}
      ></NewCredentialButton>
    </>
  );
}

export { Form };
