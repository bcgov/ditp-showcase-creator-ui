import React from "react";
import { TextInput } from "../TextInput";
import { Form } from "./components/Form";
import { FormHeader } from "./components/index.js";

function Edit({
  credentialName,
  issuerName,
  credentialAttributes,
  selectedIndex,
  handleJSONUpdate,
  showcaseJSON,
}) {
  return (
    <>
      <FormHeader
        formTitle={"Edit your Credential"}
        formCategory={"Credential"}
      ></FormHeader>
      <div className="mt-4">
        <TextInput
          label={"Credential Name"}
          personaIndex={selectedIndex}
          // element={"for"}
          value={credentialName}
          handleJSONUpdate={handleJSONUpdate}
          showcaseJSON={showcaseJSON}
        />
      </div>
      <TextInput
        label={"Issuer Name"}
        personaIndex={selectedIndex}
        // element={"for"}
        value={issuerName}
        handleJSONUpdate={handleJSONUpdate}
        showcaseJSON={showcaseJSON}
      />
      <div className="grid grid-cols-5 items-center content-center">
        <div className="col-span-2">
          <TextInput
            label={"Attribute Name"}
            personaIndex={selectedIndex}
            // element={"for"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
        </div>
        <div className="col-span-2">
          <TextInput
            label={"Attribute Value"}
            personaIndex={selectedIndex}
            // element={"for"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
        </div>
        <div>
          <button className=" credential-add-attr-btn mt-6 ml-2 justify-self-end bg-blue-500 hover:bg-blue-700 text-white font-bold px-7 py-1 rounded">
            Add
          </button>
        </div>
      </div>
      <div className="credentials-form-attributes-container credentials-form-attributes-container  mt-4 rounded p-4">
        <p className="  font-bold text-slate-50">Current Attributes</p>
        <div className="grid grid-cols-6">
          <div className="col-span-2">
            <div className="credentials-form-attribute-text">
              <TextInput
                label={"Attribute Name"}
                personaIndex={selectedIndex}
                // element={"for"}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="credentials-form-attribute-text">
              <TextInput
                label={"Attribute Value"}
                personaIndex={selectedIndex}
                // element={"for"}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center h-full">
            <button className="border px-1 mt-4 text-slate-50 ">Edit</button>
          </div>
          <div className="col-span-1 flex items-center justify-center h-full">
            <button className="border px-1 mt-4 text-slate-50">Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Edit };
