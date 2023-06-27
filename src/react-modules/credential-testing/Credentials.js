import React, { useState, useEffect } from "react";
import { Credential } from "./Credential";
import { add } from "@dnd-kit/utilities";

const Credentials = () => {
  const [data, setData] = useState([
    {
      cred_name: "",
      issuer_name: "",
      icon: "",
      attributes: [], // Provide a default empty array
    },
  ]);

  const [selectedCredential, setSelectedCredential] = useState(0);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...data]; // Create a copy of the data array
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1)); // Get the attribute index
    const attributeName = name.slice(0, name.lastIndexOf("-")); // Get the attribute name ("name" or "value")
    if (name === "cred_name" || name === "issuer_name") {
      newData[index][name] = value; // Update cred_name or issuer_name
    } else {
      newData[index].attributes[attributeIndex][attributeName] = value; // Update attribute name or value
    }

    setData(newData); // Update the state with the modified data
  };

  const addAttribute = () => {
    setData((prevData) => {
      const newData = [...prevData];
      const selectedCred = { ...newData[selectedCredential] }; // Create a copy of the selected credential
      selectedCred.attributes = [
        ...selectedCred.attributes,
        { name: "", value: "" },
      ];
      newData[selectedCredential] = selectedCred; // Update the selected credential in the new data array
      return newData;
    });
  };

  const addCredential = () => {
    setData((prevData) => [
      ...prevData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [],
      },
    ]);
    setSelectedCredential((prevVal) => prevVal + 1);
  };

  return (
    <>
      <div className="text-slate-500">
        {data.length > 0 &&
          data.map((credential, index) => (
            <Credential
              key={index}
              handleChange={handleChange(index)}
              data={credential}
              addAttribute={addAttribute}
            />
          ))}
        <button onClick={addCredential}>Add Credential</button>
      </div>
    </>
  );
};

export { Credentials };
