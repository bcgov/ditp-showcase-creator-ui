import React from "react";
import { useState } from "react";
import { Attribute } from "./Attribute";

function AttributesList() {
  const [credentialAttributes, setCredentialAttributes] = useState({});

  return (
    <div className="credentials-form-attributes-container credentials-form-attributes-container text-gray-500  mt-4 rounded p-4">
      <p className="  font-bold text-slate-50">Current Attributes</p>
      <Attribute />
    </div>
  );
}

export { AttributesList };
