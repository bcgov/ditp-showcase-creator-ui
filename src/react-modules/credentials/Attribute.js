import React from "react";
import { LocalTextInput } from "../LocalTextInput";
function Attribute({ handleChange, attributeName, attributeValue }) {
  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-2 overflow-hidden ">
        <div className="credentials-form-attribute-text">
          <label htmlFor="">Attribute name</label>
          <input
            type="text"
            className="p-1"
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={attributeName}
          />
        </div>
      </div>
      <div className="col-span-2 overflow-hidden">
        <div className="credentials-form-attribute-text">
          <label htmlFor="">Attribute value</label>
          <input
            type="text"
            className="p-1"
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={attributeValue}
          />
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center h-full">
        <button className="border text-slate-50 text-xs ">Edit</button>
      </div>
      <div className="col-span-1 flex items-center justify-center h-full">
        <button className="border text-slate-50 text-xs">Remove</button>
      </div>
    </div>
  );
}

export { Attribute };
