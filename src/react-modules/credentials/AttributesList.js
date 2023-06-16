import React from "react";
import { useState, useEffect } from "react";
import { Attribute } from "./Attribute";
import { LocalTextInput } from "../LocalTextInput";

function AttributesList({ showcaseJSON, selectedIndex, selectedCharacter }) {
  const [credentialAttributes, setCredentialAttributes] = useState([]);

  const addAttribute = () => {
    console.log("attr added");
    setCredentialAttributes([
      ...credentialAttributes,
      {
        name: "asfda",
        value: "asfdafas",
      },
    ]);
  };
  useEffect(() => {
    console.log(credentialAttributes.length);
    credentialAttributes.map((attr) => console.log(attr));
  }, [credentialAttributes]);

  const removeAttribute = () => {
    console.log("attr removed");
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
          // <p>{attr.name}</p>
          <Attribute
            handleChange={handleChange}
            attributeName={attr.name}
            attributeValue={attr.value}
          />
        ))}
        {/* <div className="grid grid-cols-6 gap-5">
          <div className="col-span-2 overflow-hidden ">
            <div className="credentials-form-attribute-text">
              <label htmlFor="">Attribute name</label>
              <input
                type="text"
                className=""
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2 overflow-hidden">
            <div className="credentials-form-attribute-text">
              <label htmlFor="">Attribute value</label>
              <input
                type="text"
                className=""
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center h-full">
            <button className="border text-slate-50 text-xs ">Edit</button>
          </div>
          <div className="col-span-1 flex items-center justify-center h-full">
            <button className="border text-slate-50 text-xs">Remove</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export { AttributesList };
