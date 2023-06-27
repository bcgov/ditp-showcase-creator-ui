import React from "react";
import { TextInput } from "../TextInput";
import { LocalTextInput } from "../LocalTextInput";
import { AttributesList } from "./components/AttributesList";
import { FileUploadFull } from "../FileUpload";

function Form({ data, handleChange, addCredential }) {
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Credentials</p>
          <h3 className="text-4xl font-bold text-slate-50">Title Here</h3>
        </div>
      </div>
      <hr></hr>
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
      <button onClick={addCredential}>ADD CREDENTIAL ( + )</button>
    </>
  );
}

export { Form };
