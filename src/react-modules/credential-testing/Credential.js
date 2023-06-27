import React from "react";

const Credential = ({ handleChange, data, addAttribute }) => {
  return (
    <>
      <label htmlFor="cred_type">Credential Type</label>
      <br></br>
      <select name={`cred_type`} id={`cred_type`}>
        <option value="none" selected="selected">
          select
        </option>
        <option value="int">int</option>
        <option value="dateint">dateint</option>
        <option value="string">string</option>
      </select>
      <br></br>
      <label htmlFor="cred_name">Credential Name</label>
      <br />
      <input
        type="text"
        id="cred_name"
        name="cred_name"
        value={data.cred_name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="issuer_name">Issuer Name</label>
      <br />
      <input
        type="text"
        id="issuer_name"
        name="issuer_name"
        value={data.issuer_name}
        onChange={handleChange}
      />
      <br />
      <label>Attributes</label>
      <br />
      {/* {data.attributes.map((attribute, index) => (
        <div key={index}>
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
      ))} */}
      <button onClick={addAttribute}>Add Attribute</button>
    </>
  );
};

export { Credential };
