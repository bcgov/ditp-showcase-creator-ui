import React from "react";
import { useState, useEffect } from "react";
import { Attribute } from "./Attribute";
import { LocalTextInput } from "../../LocalTextInput";

function AttributesList({
  showcaseJSON,
  selectedIndex,
  selectedCharacter,
  handleJSONUpdate,
  handleLocalUpdate,
  setLocalJSON,
  localJSON,
}) {
  const [credentialAttributes, setCredentialAttributes] = useState([]);

  const addAttribute = () => {
    console.log("attr added");
    // localJSON.attributes.push({ name: "", value: "" });
    // console.log(localJSON);
    // localJSON.attributes.push({ name: "", value: "" });
    // handleLocalUpdate(["attributes",], {
    //   name: "",
    //   value: "",
    // });

    console.log(localJSON.attributes.length);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const parsedCredentials =
    showcaseJSON.personas[0].onboarding[4].credentials[selectedIndex]
      .attributes;

  return (
    <div className="credentials-form-attributes-container credentials-form-attributes-container text-gray-500  mt-4 rounded p-4">
      <button onClick={() => addAttribute()} type="button" className="border">
        Add
      </button>
      <p className="  font-bold text-slate-50">Current Attributes</p>

      <div className="">
        {parsedCredentials.map((attr) => (
          <Attribute
            handleChange={handleChange}
            attributeName={attr.name}
            attributeValue={attr.value}
          />
        ))}
      </div>
    </div>
  );
}

export { AttributesList };
