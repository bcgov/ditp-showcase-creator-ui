import React from "react";
import { FormHeader } from "./index.js";

function SelectionOverview({
  setEditButtonClicked,
  setComponentToMount,
  credentialSelected,
  showcaseJSON,
  selectedIndex,
  selectedCharacter,
  setShowcaseJSON,
}) {
  return (
    <>
      {
        <div className="text-neutral-100">
          <FormHeader
            formTitle={"Selected credential"}
            formCategory={"Credential"}
            setEditButtonClicked={setEditButtonClicked}
            setShowcaseJSON={setShowcaseJSON}
            setComponentToMount={setComponentToMount}
            credentialSelected={credentialSelected}
          />
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
            </div>
          </div>
        </div>
      }
    </>
  );
}

export { SelectionOverview };
