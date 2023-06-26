import React from "react";
import "./styles/credentials.css";
import { useState, useRef, useEffect } from "react";
import { JSONUploadButton } from "../JSONUpload";
import { NoSelection } from "./components/index.js";
import { CredentialsForm } from "./index.js";
import { CredentialsList, CredentialsEdit, CredentialsInfo } from "./index.js";
import { useImmer } from "use-immer";
import { LocalTextInput } from "../LocalTextInput";

// To Do:
// - When typing in values for inputs, if you change pages, the localJSON doesn't clear.
// - No form handling.
// - Attributes adding,removing,deleting not done.

function CredentialsScreen({
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

  const [attributeCount, setAttributeCount] = useState(0);

  // localJSON will hold the current values in showcaseJSON (top-level)
  // This has to be set every time you choose a new credential (selectedIndex)
  // This will set a credential object with blank values to the localJSON.
  useEffect(() => {
    setLocalJSON({
      cred_name: "",
      issuer_name: "",
      attributes: [
        { name: "first_name", value: "ryan" },
        { name: "PPID", value: "1234" },
      ],
    });
  }, []);

  // ** For debugging **
  // Log the values in the localJSON everytime it gets changed.
  useEffect(() => {
    console.log(localJSON);
  }, [localJSON]);

  // Set the values from input boxes to the localJSON object.
  function handleLocalUpdate(element, newValue) {
    console.log(element[0], element[1], element[2], element[3]);

    switch (element.length) {
      case 1:
        setLocalJSON((json) => {
          json[element[0]] = newValue;
        });
        break;
      case 2:
        setLocalJSON((json) => {
          json[element[0]][element[1]] = newValue;
        });
        break;
      case 3:
        setLocalJSON((json) => {
          json[element[0]][element[1]][element[2]] = newValue;
        });
        break;
      default:
        return;
    }
  }

  // Save the localJSON into the showcaseJSON (global).
  // To do: Error handling
  function saveJSON() {
    setShowcaseJSON((json) => {
      json.personas[0].onboarding[4].credentials.push({
        name: localJSON.cred_name,
        issuer_name: localJSON.issuer_name,
        version: "",
        icon: "",
        attributes: localJSON.attributes,
      });
    });
  }

  // Update the showcaseJSON values when the save button is clicked on the edit component.
  // To do: Error handling
  function saveEditedJSON() {
    handleJSONUpdate(
      selectedCharacter,
      ["onboarding", 4, "credentials", selectedIndex, "name"],
      localJSON.cred_name
    );
    handleJSONUpdate(
      selectedCharacter,
      ["onboarding", 4, "credentials", selectedIndex, "issuer_name"],
      localJSON.issuer_name
    );
    handleJSONUpdate(
      selectedCharacter,
      ["onboarding", 4, "credentials", selectedIndex, "attributes"],
      localJSON.attributes
    );

    setSelectedIndex(selectedIndex + 1);
  }

  // Handle page state by setting the componentToMount state variable to the buttons id (create)
  const handleCreateButtonClick = (e) => {
    console.log(localJSON.attributes[0]);
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  // Handle page state by setting the componentToMount state variable to the buttons id (import)
  const handleImportButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  // Render component based on componentToMount state variable.
  const renderComponent = (component) => {
    switch (component) {
      case "credential":
        return (
          <CredentialsInfo
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
          <CredentialsEdit
            attributeCount={attributeCount}
            setAttributeCount={setAttributeCount}
            handleLocalUpdate={handleLocalUpdate}
            handleJSONUpdate={handleJSONUpdate}
            localJSON={localJSON}
            setLocalJSON={setLocalJSON}
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            selectedIndex={selectedIndex}
            selectedCharacter={selectedCharacter}
            saveJSON={saveJSON}
            saveEditedJSON={saveEditedJSON}
          />
        );
      case "create":
        return (
          <CredentialsForm
            attributeCount={attributeCount}
            setAttributeCount={setAttributeCount}
            localJSON={localJSON}
            setLocalJSON={setLocalJSON}
            showcaseJSON={showcaseJSON}
            handleLocalUpdate={handleLocalUpdate}
            selectedCharacter={selectedCharacter}
            saveJSON={saveJSON}
            handleJSONUpdate={handleJSONUpdate}
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

export { CredentialsScreen };
