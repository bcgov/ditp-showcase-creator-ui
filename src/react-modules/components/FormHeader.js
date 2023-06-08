import React from "react";

function FormHeader({
  setEditButtonClicked,
  formTitle,
  formCategory,
  setComponentToMount,
  credentialSelected,
}) {
  const handleClick = () => {
    setEditButtonClicked((prevEditButtonSelected) => !prevEditButtonSelected);
    setComponentToMount("edit");
  };
  return (
    <>
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">{formCategory}</p>
          <h3 className="text-4xl font-bold text-slate-50">{formTitle}</h3>
        </div>
        {credentialSelected && (
          <div>
            <button
              onClick={() => handleClick()}
              className=" py-1 px-3 text-sm rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
            >
              Edit
            </button>
            <button className=" text-sm py-1 px-3 mx-1 rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100">
              Delete
            </button>
          </div>
        )}
      </div>
      <hr></hr>
    </>
  );
}

export { FormHeader };
