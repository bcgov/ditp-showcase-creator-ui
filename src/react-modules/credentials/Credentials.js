import React from "react";
import "./styles/credentials.css";
import { useState, useRef, useEffect } from "react";
import { JSONUploadButton } from "../JSONUpload";
import { NoSelection, Form, SelectionOverview } from "./components/index.js";
import { CredentialsList, Edit } from "./index.js";
import { useImmer } from "use-immer";

function Credentials({
  showcaseJSON,
  handleJSONUpdate,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
}) {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [credentialSelected, setCredentialSelected] = useState(false);

  const [componentToMount, setComponentToMount] = useState("no selection");

  const [localJSON, setLocalJSON] = useImmer();

  const parsedCredentials = showcaseJSON.personas[0].onboarding[4].credentials;

  // useEffect(() => {
  //   setLocalJSON({
  //     name: showcaseJSON.personas[selectedCharacter].onboarding[4].credentials[
  //       selectedIndex
  //     ].name,
  //   });
  // }, [selectedCharacter]);

  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  function saveJSON() {
    console.log("saved");
    // handleJSONUpdate(selectedCharacter, ["name"], localJSON.name);
    // handleJSONUpdate(selectedCharacter, ["type"], localJSON.type);
    // handleJSONUpdate(selectedCharacter, ["description"], localJSON.description);
  }

  const renderComponent = (component) => {
    switch (component) {
      case "credential":
        return (
          <SelectionOverview
            credentialName={parsedCredentials[selectedIndex].name}
            issuerName={parsedCredentials[selectedIndex].issuer_name}
            credentialAttributes={parsedCredentials[selectedIndex].attributes}
            setEditButtonClicked={setEditButtonClicked}
            setComponentToMount={setComponentToMount}
            credentialSelected={selectedIndex}
            setShowcaseJSON={setShowcaseJSON}
            setSelectedIndex={setSelectedIndex}
          />
        );
      case "edit":
        return (
          <Edit
            selectedIndex={selectedIndex}
            handleJSONUpdate={handleJSONUpdate}
            setShowcaseJSON={setShowcaseJSON}
            showcaseJSON={showcaseJSON}
            localJSON={localJSON}
            handleLocalUpdate={handleLocalUpdate}
            selectedCharacter={selectedCharacter}
          />
        );
      case "create":
        return (
          <Form
            selectedIndex={selectedIndex}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            localJSON={localJSON}
            handleLocalUpdate={handleLocalUpdate}
            saveJSON={saveJSON}
          />
        );
      case "import":
        return "";
      default:
        return <NoSelection Text={"You have no credential selected."} />;
    }
  };

  const handleCreateButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const handleImportButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
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
            setCredentialSelected={setCredentialSelected}
            parsedCredentials={parsedCredentials}
            setComponentToMount={setComponentToMount}
          />
          <p className="text-slate-50">{componentToMount}</p>
        </div>
        {/* end of column 1 */}
        <div className="two-column-col md:w-2/5 bg-gray-300 p-4 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>

        {/* end of column 2 */}
      </div>
    </>
  );
}

export { Credentials };
