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

  // ** Run this EVERYTIME selectedIndex changes ***
  // localJSON will hold the current values in showcaseJSON (top-level)
  // This has to be set every time you choose a new credential (selectedIndex)
  // Identify your key and values by parsing through the showcaseJSON with your selectedIndex.

  useEffect(() => {
    setLocalJSON({
      cred_name: "",
      // cred_name:
      //   showcaseJSON.personas[selectedCharacter].onboarding[4].credentials[
      //     selectedIndex
      //   ].name,
    });
  }, []);

  useEffect(() => {
    console.log(localJSON);
  }, [localJSON]);

  // Set the values from input boxes to the localJSON object.
  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  // Save the localJSON into the showcaseJSON (global).
  function saveJSON() {
    // if (localJSON.cred_name === "") return;
    setShowcaseJSON((json) => {
      json.personas[0].onboarding[4].credentials.push({
        name: "",
        version: "",
        icon: "",
        attributes: [],
      });
    });

    handleJSONUpdate(
      selectedCharacter,
      ["onboarding", 4, "credentials", selectedIndex + 1, "name"],
      localJSON.cred_name
    );

    setSelectedIndex(selectedIndex + 1);
  }

  const handleCreateButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const handleImportButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const renderComponent = (component) => {
    switch (component) {
      case "credential":
        return (
          <SelectionOverview
            setEditButtonClicked={setEditButtonClicked}
            setComponentToMount={setComponentToMount}
            handleJSONUpdate={handleJSONUpdate}
            credentialSelected={selectedIndex}
            showcaseJSON={showcaseJSON}
            selectedIndex={selectedIndex}
            selectedCharacter={selectedCharacter}
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
            selectedCharacter={selectedCharacter}
            handleLocalUpdate={handleLocalUpdate}
          />
        );
      case "create":
        return (
          <Form
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            localJSON={localJSON}
            setLocalJSON={setLocalJSON}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            credentialSelected={credentialSelected}
            handleLocalUpdate={handleLocalUpdate}
            selectedCharacter={selectedCharacter}
            saveJSON={saveJSON}
            handleJSONUpdate={handleLocalUpdate}
            setEditButtonClicked={setEditButtonClicked}
            setComponentToMount={setComponentToMount}
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
