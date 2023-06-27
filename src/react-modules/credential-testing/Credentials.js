import React, { useState, useEffect } from "react";

const Credentials = () => {
  const [data, setData] = useState([
    {
      cred_name: "",
      issuer_name: "",
      icon: "",
      attributes: [], // Provide a default empty array
    },
  ]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...data]; // Create a copy of the data array

    if (name === "cred_name" || name === "issuer_name") {
      newData[0][name] = value; // Update cred_name or issuer_name
    } else {
      const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1)); // Get the attribute index
      const attributeName = name.slice(0, name.lastIndexOf("-")); // Get the attribute name ("name" or "value")

      newData[0].attributes[attributeIndex][attributeName] = value; // Update attribute name or value
    }

    setData(newData); // Update the state with the modified data
  };

  const addAttribute = () => {
    setData((prevData) => [
      {
        ...prevData[0],
        attributes: [...prevData[0].attributes, { name: "", value: "" }],
      },
    ]);
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
  };

  return (
    <>
      <label htmlFor="cred_name">Credential Name</label>
      <br />
      <input
        type="text"
        id="cred_name"
        name="cred_name"
        value={data[0].cred_name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="issuer_name">Issuer Name</label>
      <br />
      <input
        type="text"
        id="issuer_name"
        name="issuer_name"
        value={data[0].issuer_name}
        onChange={handleChange}
      />
      <br />
      <label>Attributes</label>
      <br />
      {data[0].attributes.map((attribute, index) => (
        <div key={index}>
          <select name="type" id={`credential-type-${index}`}></select>
          <input
            type="text"
            name={`name-${index}`}
            placeholder="Attribute Name"
            value={attribute.name || ""}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name={`value-${index}`}
            placeholder="Attribute Value"
            value={attribute.value || ""}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
      <button onClick={addAttribute}>Add Attribute</button>
      <button onClick={addCredential}>Add Credential</button>
    </>
  );
};

export { Credentials };
