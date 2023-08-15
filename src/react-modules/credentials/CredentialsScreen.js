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
  const [selectedCredential, setSelectedCredential] = useState(null); // State variable to keep track of the current credential selected.
  const [tempData, setTempData] = useImmer(
    showcaseJSON.personas[selectedCharacter].credentials
  ); // State variable that uses useImmer to easily update the Showcase JSON.
  const [componentToMount, setComponentToMount] = useState("no selection"); // State variable to determine what needs to be rendered in the right column.
  const [createButtonClicked, setCreateButtonClicked] = useState(false); // State variable to determine if the create button has been clicked. This is to ensure it can't be spammed.

  // This function handles the removal of a credential
  function handleCredentialRemoval(credential) {
    // If there's only one credential for this showcase, exit.
    if (
      Object.keys(showcaseJSON.personas[selectedCharacter].credentials)
        .length === 1
    ) {
      return;
    }

    // Clear the active component, reset "Create" button status, and deselect the credential
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);

    // Remove the selected credential from the Showcase JSON
    setShowcaseJSON((json) => {
      delete json.personas[selectedCharacter].credentials[credential];
    });

    // Remove the credential from the tempData array
    setTempData((json) => {
      delete json[credential];
    });
  } // End of handleCredentialRemoval()

  // This function handles all input boxes and updates both the tempData and the Showcase JSON accordingly.
  function handleChange(e, element, index) {
    // If the data coming in is only one level deep in the JSON, set the tempData to the value
    if (element.length === 1) {
      setTempData((json) => {
        json[selectedCredential][element[0]] = e.target.value;
      });
    }
    // Else if the data coming is two levels deep in the JSON, set the tempData to the value (this is used to correctly insert values into the "attributes" array)
    else if (element.length === 2) {
      setTempData((json) => {
        json[selectedCredential][element[0]][index][element[1]] =
          e.target.value;
      });
    }
  } // End of handleChange()

  // This function handles the transfer of data from the tempData to the Showcase JSON.
  // This is where the save and cancel functionality is also done.
  // The initial values are saved into "tempData" until the "add" button is clicked.
  const handleCredentialUpdate = () => {
    // Reset the following state variables
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);

    // Set the credentials object in the ShowcaseJSON to whats in tempData
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].credentials = tempData;
    });
  }; // end of handleCredentialUpdate()

  // This function handles adding an attribute.
  const addAttribute = (credential) => {
    // Push an empty object containing the following values into the attributes array inside of tempData.
    setTempData((prevData) => {
      prevData[credential].attributes.push({
        name: "",
        value: "",
        type: "",
      });
    });
  }; // End of addAttribute()

  // This function handles removing an attribute
  const removeAttribute = (credential, index) => {
    // Splice the attribute at the current index.
    setTempData((prevData) => {
      prevData[credential].attributes.splice(index, 1);
    });
  }; // End of removeAttribute()

  // This function handles the cancel button
  const handleCancel = () => {
    // Reset the following state variables
    setSelectedCredential(null);
    setComponentToMount(null);
    setCreateButtonClicked(false);

    // Reset tempData to the original Showcase JSON (no changes made)
    setTempData(showcaseJSON.personas[selectedCharacter].credentials);
  }; // End of handleCancel()

  // This function handles the creation of a new credential.
  const handleCreateButtonClick = (e) => {
    // If there's a credential selected, call handleCancel() to prevent overwriting of data.
    if (selectedCredential !== null) {
      handleCancel();
    }

    // Used to give each credential a unique ID.
    let credential_id = Date.now();

    // Push a new object into tempData, the key is credential_id and the value is the object below.
    setTempData((temp) => {
      temp[credential_id] = {
        issuer_name: "",
        name: "",
        version: "1.0",
        icon: "",
        attributes: [],
      };
    });

    // Handle state updates.
    setCreateButtonClicked(true);
    setSelectedCredential(credential_id);
    setComponentToMount("create");
  }; // End of handleCreateButtonClick()

  // This function handles which component should be rendered in the right column.
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
                        className="text-sm add-attr-btn border bg-light-bg dark:bg-dark-bg hover:bg-light-btn-hover dark:hover:bg-dark-input font-bold py-2 px-4 rounded inline-flex items-center"
                      >
                        <span>ADD CREDENTIAL</span>
                        <div className="text-md ml-2">
                          <FontAwesomeIcon icon={faCirclePlus} />
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* List of credentials  */}
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

          {/* Cancel and Save  */}
          {componentToMount === "edit" || componentToMount === "create" ? (
            <div className="flex container mx-auto w-full my-8 justify-end dark:text-dark-text">
              <button
                className="p-2 mr-4 rounded hover:underline"
                onClick={handleCancel}
              >
                CANCEL
              </button>
              <button
                className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover dark:hover:bg-dark-input border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
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
