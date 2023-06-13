import React from "react";
import "./styles/credentials.css";
import { useState, useRef, useEffect } from "react";
import { JSONUploadButton } from "../JSONUpload";
import { TextInput } from "../TextInput";

import { NoSelection, Form, SelectionOverview } from "../components/index.js";
import { CredentialsList, Edit } from "./index.js";

function Credentials({ showcaseJSON, handleJSONUpdate, setShowcaseJSON }) {
  const [credentialSelected, setCredentialSelected] = useState(false);
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [componentToMount, setComponentToMount] = useState("no selection");

  const createButtonClicked = useRef(false);
  const importButtonClicked = useRef(false);

  // const onboarding = showcaseJSON.personas[0].onboarding.find(
  //   (cred) => cred.credentials
  // );

  // const parsedCredentials = onboarding ? onboarding.credentials : [];

  const parsedCredentials = showcaseJSON.onboarding[3].credentials;
  console.log(parsedCredentials);

  // Functions

  const handleCreateButtonClick = (e) => {
    createButtonClicked.current = true;
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const handleImportButtonClick = (e) => {
    importButtonClicked.current = true;
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const renderComponent = (component) => {
    switch (component) {
      case "credential":
        return (
          <SelectionOverview
            // index={selectedIndex}
            // parsedCredentials={parsedCredentials}
            credentialName={parsedCredentials[selectedIndex].name}
            issuerName={parsedCredentials[selectedIndex].issuer_name}
            credentialAttributes={parsedCredentials[selectedIndex].attributes}
            setEditButtonClicked={setEditButtonClicked}
            setComponentToMount={setComponentToMount}
            credentialSelected={credentialSelected}
          />
        );
      case "edit":
        return (
          <Edit
            credentialName={parsedCredentials[selectedIndex].name}
            issuerName={parsedCredentials[selectedIndex].issuer_name}
            credentialAttributes={parsedCredentials[selectedIndex].attributes}
            selectedIndex={selectedIndex}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
        );
      case "create":
        return (
          <Form
            selectedIndex={selectedIndex}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
          />
        );
      case "import":
        return "";
      default:
        return <NoSelection Text={"You have no credential selected."} />;
    }
  };

  return (
    <>
      <div className=" two-column-container mx-20 my-16">
        <div className="two-column-col md:w-3/5 pr-4 ">
          <div className="flex justify-between">
            <div>
              <h3 className="text-4xl font-bold text-slate-50">
                Select your Credential
              </h3>
              <p className="text-slate-100">
                Select a character below or create a new one.
              </p>
            </div>
            <div>
              <button
                data-button-id="import-button-credentials"
                onClick={(e) => handleImportButtonClick(e)}
                className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
              >
                Import
              </button>
              <button
                data-button-id="create-button-credentials"
                onClick={(e) => handleCreateButtonClick(e)}
                className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
              >
                Create
              </button>
            </div>
          </div>
          <CredentialsList
            setSelectedIndex={setSelectedIndex}
            setSelected={setSelectedIndex}
            setCredentialSelected={setCredentialSelected}
            parsedCredentials={parsedCredentials}
            setComponentToMount={setComponentToMount}
          />
          <p className="text-slate-50">{componentToMount}</p>
        </div>
        {/* end of column 1 */}
        <div className="two-column-col md:w-2/5 bg-gray-300 p-4 rounded-md right-col">
          {renderComponent(componentToMount)}
          {/* <NoSelection /> */}
        </div>

        {/* end of column 2 */}
      </div>
    </>
  );
}

export { Credentials };
