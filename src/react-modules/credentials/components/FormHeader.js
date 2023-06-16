import React from "react";
import { useImmer } from "use-immer";

function FormHeader({
  setEditButtonClicked,
  formTitle,
  formCategory,
  setComponentToMount,
  credentialSelected,
  setShowcaseJSON,
  selectedIndex,
  setSelectedIndex,
  showcaseJSON,
}) {
  const handleClick = () => {
    setEditButtonClicked((prevEditButtonSelected) => !prevEditButtonSelected);
    setComponentToMount("edit");
  };

  const handleCredentialRemoval = (i) => {
    // if (showcaseJSON.personas.length == 1) return;
    // // Prevent out of bounds selected character
    // if (
    //   (selectedIndex == i ||
    //     showcaseJSON.personas[0].onboarding[4].credentials - 1 ==
    //       selectedIndex) &&
    //   selectedIndex != 0
    // ) {
    //   setSelectedIndex(selectedIndex - 1);
    // }

    setShowcaseJSON((json) => {
      json.personas[0].onboarding[4].credentials.splice(i, 1);
    });
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
            <button
              onClick={(event) => handleCredentialRemoval(event, selectedIndex)}
              className=" text-sm py-1 px-3 mx-1 rounded bg-neutral-700 hover:bg-neutral-600 text-slate-100"
            >
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
