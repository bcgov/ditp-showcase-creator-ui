import { useState, useEffect } from "react";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "./NoSelection";
import { useImmer } from "use-immer";
import "./styles/credentials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

/// current working one !!!

function CredentialsScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
}) {
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [tempData, setTempData] = useImmer(
    showcaseJSON.personas[selectedCharacter].credentials
  );
  const [componentToMount, setComponentToMount] = useState("no selection");

  // Check if the create button has been clicked to ensure that you cant spam the button.
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  // Remove a credential
  function handleCredentialRemoval(credential) {
    if (
      Object.keys(showcaseJSON.personas[selectedCharacter].credentials)
        .length === 1
    ) {
      return;
    }
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
    if (selectedCredential !== null) {
      handleCancel();
    }
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
        return (
          // <Overview showcaseJSON={showcaseJSON}></Overview>
          <div className="">
            <NoSelection Text={"You have no credential selected."} />
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen mt-20 ">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex gap-12 h-full">
            {/* <div className="w-1/2 rounded left-col text-light-text dark:text-dark-text"> */}
            <div className="w-2/5 rounded left-col text-light-text dark:text-dark-text">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-4xl font-bold text-slate-50">
                    Add your Credentials
                  </h3>
                  <p className="text-slate-100 mt-3">
                    Fill in the details on the right to create a credential for
                    this showcase.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Credentials Added:</h3>
                  <div>
                    {!createButtonClicked && (
                      <button
                        data-button-id="create-button-credentials"
                        onClick={handleCreateButtonClick}
                        className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-bg-secondary dark:hover:bg-dark-btn-hover font-bold py-2 px-4 rounded inline-flex items-center"
                      >
                        <span>ADD CREDENTIAL</span>
                        <div className="text-md ml-2">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
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
                  createButtonClicked={createButtonClicked}
                />
              </div>
            </div>
            {/* End of col 1 */}
            {/* <div className="w-1/2  p-6 rounded-md right-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text "> */}
            <div className="w-3/5  p-6 rounded-md right-col bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text ">
              {renderComponent(componentToMount)}
            </div>
            {/* End of col 2 */}
          </div>
          {componentToMount === "edit" || componentToMount === "create" ? (
            <div className="flex container mx-auto w-full my-8 justify-end dark:text-dark-text">
              <button
                className="p-2 mr-4 rounded hover:underline"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                className="p-1 w-20 bg-light-bg-secondary  hover:bg-light-btn-hover dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
                onClick={handleCredentialUpdate}
              >
                SAVE
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export { CredentialsScreen };
