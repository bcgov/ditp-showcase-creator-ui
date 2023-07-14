import { useState, useEffect } from "react";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "../credentials/NoSelection";
import { useImmer } from "use-immer";
import "./styles/credentials.css";

/// current working one !!!

function CredentialsScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  componentToMount,
  setComponentToMount,
}) {
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [tempData, setTempData] = useImmer(
    showcaseJSON.personas[selectedCharacter].credentials
  );

  const [showJSON, setShowJSON] = useState(false);

  // Check if the create button has been clicked to ensure that you cant spam the button.
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  // ** for debugging **
  const showMeMyJSON = () => {
    setShowJSON(!showJSON);
  };

  // ** for debugging **
  const clearJSON = () => {
    showcaseJSON([]);
    setTempData([]);
  };

  // Remove a credential
  function handleCredentialRemoval(credential) {
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);
    setShowcaseJSON((json) => {
      delete json.personas[selectedCharacter].credentials[credential];
    });
    setTempData((json) => {
      delete json[credential];
    });
  }

  // Handle all inputs
  function handleChange(e, element, index) {
    if (element.length === 1) {
      setTempData((json) => {
        json[selectedCredential][element[0]] = e.target.value;
      });
    } else if (element.length === 2) {
      setTempData((json) => {
        json[selectedCredential][element[0]][index][element[1]] =
          e.target.value;
      });
    }
  }

  // Set the real JSON
  const handleCredentialUpdate = () => {
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].credentials = tempData;
    });
  };

  // Add an attribute
  const addAttribute = (credential) => {
    setTempData((prevData) => {
      prevData[credential].attributes.push({
        name: "",
        value: "",
        type: "",
      });
    });
  };

  // Remove an attribute
  const removeAttribute = (credential, index) => {
    setTempData((prevData) => {
      prevData[credential].attributes.splice(index, 1);
    });
  };

  // Remove the credential if cancel button is clicked
  const handleCancel = () => {
    setSelectedCredential(null);
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setTempData(showcaseJSON.personas[selectedCharacter].credentials);
  };

  // Create a credential with an empty object.
  const handleCreateButtonClick = (e) => {
    let credential_id = Date.now();
    setTempData((temp) => {
      temp[credential_id] = {
        issuer_name: "",
        name: "",
        version: "1.0",
        icon: "",
        attributes: [],
      };
    });
    setCreateButtonClicked(true);
    setSelectedCredential(credential_id);
    setComponentToMount("create");
  };

  const renderComponent = (component) => {
    switch (component) {
      case "create":
        return (
          <CredentialsForm
            handleChange={handleChange}
            tempData={tempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            removeAttribute={removeAttribute}
            showcaseJSON={showcaseJSON}
            selectedCharacter={selectedCharacter}
          />
        );
      case "edit":
        return (
          <CredentialsEdit
            selectedCredential={selectedCredential}
            tempData={tempData}
            setTempData={setTempData}
            addAttribute={addAttribute}
            handleChange={handleChange}
            removeAttribute={removeAttribute}
          />
        );
      default:
        return <NoSelection Text={"You have no credential selected."} />;
    }
  };

  return (
    <>
      {showJSON && (
        <pre className="p-10 m-5 border text-xs rounded dark:text-neutral-200 whitespace-pre-wrap break-words">
          {JSON.stringify(showcaseJSON, null, 2)}
        </pre>
      )}
      <button className="border p-2 rounded" onClick={showMeMyJSON}>
        SHOW ME MY JSON!!!!
      </button>
      <button className="border p-2 rounded" onClick={clearJSON}>
        CLEAR JSON
      </button>
      <div className=" two-column-container mx-20 my-16">
        <div className="two-column-col md:w-3/5 pr-4">
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
              {!createButtonClicked ? (
                <button
                  data-button-id="create-button-credentials"
                  onClick={(e) => handleCreateButtonClick(e)}
                  className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
                >
                  Create
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-8">
            <CredentialsList
              selectedCharacter={selectedCharacter}
              showcaseJSON={showcaseJSON}
              setComponentToMount={setComponentToMount}
              tempData={tempData}
              setTempData={setTempData}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
              handleCredentialRemoval={handleCredentialRemoval}
              setCreateButtonClicked={setCreateButtonClicked}
            />
          </div>
          {/* <Credential2 /> */}
        </div>

        <div className="two-column-col md:w-2/5 bg-gray-300 p-6 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>

        <div className="flex mt-5 w-full justify-end ">
          {componentToMount === "edit" || componentToMount === "create" ? (
            <>
              <button
                className="border p-2 mr-4 rounded"
                onClick={handleCancel}
              >
                CANCEL
              </button>

              <button
                className="border p-2 rounded"
                onClick={handleCredentialUpdate}
              >
                {componentToMount === "edit" ? "DONE" : "ADD"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { CredentialsScreen };
