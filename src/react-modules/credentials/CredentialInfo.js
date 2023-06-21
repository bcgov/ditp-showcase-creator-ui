import React from "react";
import { FormHeader } from "./components/index.js";

function SelectionOverview({
  setEditButtonClicked,
  setComponentToMount,
  credentialSelected,
  showcaseJSON,
  selectedIndex,
  selectedCharacter,
  setShowcaseJSON,
  setSelectedIndex,
}) {
  const handleEditButtonClick = () => {
    // setEditButtonClicked((prevEditButtonSelected) => !prevEditButtonSelected);
    setComponentToMount("edit");
  };

  const handleCredentialRemoval = (i) => {
    if (showcaseJSON.personas[0].onboarding[4].credentials.length === 1) return;
    if (selectedIndex != 0) setSelectedIndex(selectedIndex - 1);

    setShowcaseJSON((json) => {
      json.personas[0].onboarding[4].credentials.splice(selectedIndex, 1);
    });
  };

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
                  onClick={() => handleCredentialRemoval(selectedIndex)}
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
              {
                showcaseJSON["personas"][selectedCharacter].onboarding[4]
                  .credentials[selectedIndex].name
              }
            </div>
            <div className="selection-overview-issuer-name">
              <h3 className="text-lg font-bold mt-5">Issuer Name</h3>
            </div>
            <div className="selection-overview-attributes">
              <h3 className="text-lg font-bold mt-5">Attributes</h3>
              {/* {credentialAttributes.map((attr) => (
                <div className="mt-2 text-sm">
                  <span className="font-bold">{`${attr.name}: `}</span>
                  <span>{attr.value}</span>
                </div>
              ))} */}
              {showcaseJSON["personas"][
                selectedCharacter
              ].onboarding[4].credentials[selectedIndex].attributes.map(
                (attr) => (
                  <p>{attr.name}</p>
                )
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export { SelectionOverview };
