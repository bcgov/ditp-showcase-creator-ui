import React from "react";
import { FormHeader } from "./components/index.js";

function SelectionOverview({
  setComponentToMount,
  selectedCredential,
  setSelectedCredential,
  formData,
  setFormData,
  setTempData,
}) {
  const handleEditButtonClick = () => {
    setComponentToMount("edit");
  };
  const handleCredentialRemoval = (index) => {
    if (formData.length === 1) return;

    setTempData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setFormData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });

    setSelectedCredential((prevVal) => (prevVal - 1 === 0 ? prevVal - 1 : 0));
  };

  if (formData.length === 0) {
    return null;
  }

  return (
    <>
      {
        <div className="text-neutral-100">
          <div className="flex justify-between mt-3">
            <div>
              <p className="text-slate-100 text-sm">Credentials</p>
              <h3 className="text-4xl font-bold text-slate-50">Title Here</h3>
            </div>
            {
              <div>
                <button
                  onClick={() => handleEditButtonClick()}
                  className=" py-1 px-3 text-sm rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleCredentialRemoval(selectedCredential)}
                  className=" text-sm py-1 px-3 mx-1 rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
                >
                  Delete
                </button>
              </div>
            }
          </div>
          <hr></hr>
          <div className="selection-overview-container w-full h-full mt-7 relative">
            <div className="selection-overview-credential-name">
              <h3 className="text-lg font-bold">Credential Name</h3>
              {formData[selectedCredential].cred_name}
            </div>
            <div className="selection-overview-issuer-name">
              <h3 className="text-lg font-bold mt-5">Issuer Name</h3>
              {formData[selectedCredential].issuer_name}
            </div>
            <div className="selection-overview-attributes">
              <h3 className="text-lg font-bold mt-5">Attributes</h3>
              {formData[selectedCredential].attributes.map((attr) => (
                <div>
                  <span className="font-bold">{attr.name}: </span>
                  <span>{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export { CredentialsInfo };
