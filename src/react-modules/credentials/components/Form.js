import React from "react";
import { TextInput } from "../../TextInput";
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
}) {
  return (
    <>
      <FormHeader
        formTitle={"Create your Credential"}
        formCategory={"Credential"}
      ></FormHeader>
      <div className="mt-4">
        <TextInput
          label={"Credential Name"}
          personaIndex={selectedIndex}
          element={"for"}
          value={credentialName}
          showcaseJSON={showcaseJSON}
          handleJSONUpdate={handleJSONUpdate}
        />
      </div>
      <TextInput
        label={"Issuer Name"}
        personaIndex={selectedIndex}
        element={"for"}
        value={issuerName}
        showcaseJSON={showcaseJSON}
        handleJSONUpdate={handleJSONUpdate}
      />
      <div className="grid grid-cols-5 items-center content-center">
        <div className="col-span-2">
          <TextInput
            label="Attribute Name"
            personaIndex={selectedIndex}
            element={"for"}
            showcaseJSON={showcaseJSON}
            handleJSONUpdate={handleJSONUpdate}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label="Attribute Value"
            personaIndex={selectedIndex}
            element={"for"}
            showcaseJSON={showcaseJSON}
            handleJSONUpdate={handleJSONUpdate}
          />
        </div>
        <div>
          <button className=" credential-add-attr-btn mt-6 ml-2 justify-self-end bg-blue-500 hover:bg-blue-700 text-white font-bold px-7 py-1 rounded">
            Add
          </button>
        </div>
      </div>
      <AttributesList />
      <NewCredentialButton setShowcaseJSON={setShowcaseJSON} />
    </>
  );
}

export { Form };
// import React from "react";
// import { TextInput } from "../../TextInput";
// import { LocalTextInput } from "../../LocalTextInput";
// import { FormHeader } from "./FormHeader";
// import { NewCredentialButton } from "../NewCredentialButton";
// import { AttributesList } from "../AttributesList";

// function Form({
//   selectedIndex,
//   credentialName,
//   issuerName,
//   showcaseJSON,
//   handleJSONUpdate,
//   setShowcaseJSON,
//   localJSON,
//   handleLocalUpdate,
//   saveJSON,
// }) {
//   return (
//     <>
//       <FormHeader
//         formTitle={"Create your Credential"}
//         formCategory={"Credential"}
//         setShowcaseJSON={setShowcaseJSON}
//       ></FormHeader>
//       <LocalTextInput
//         label="Credential Name"
//         personaIndex={selectedIndex}
//         element={["onboarding", 4, "credentials"]}
//         handleJSONUpdate={handleLocalUpdate}
//         showcaseJSON={showcaseJSON}
//         localJSON={localJSON}
//       />
//       <button onClick={saveJSON}>save</button>
//       <NewCredentialButton
//         setShowcaseJSON={setShowcaseJSON}
//       ></NewCredentialButton>
//     </>
//   );
// }

// export { Form };
