import { useState } from "react";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "./NoSelection";
import { useImmer } from "use-immer";
import "./styles/credentials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  Attribute,
  CredentialElement,
  Credentials,
  ShowcaseJSON,
} from "../../types";
import {
  addCredentialAttribute,
  createNewCredential,
  removeCredentialAndReferences,
  removeCredentialAttribute,
  updateCredentialAttribute,
  updateCredentialProperty,
} from "../../lib/json-helper";

export const CredentialsScreen = ({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
}: {
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
  selectedCharacter: number;
}) => {
  const [selectedCredential, setSelectedCredential] = useState<
    keyof Credentials | null
  >(null); // State variable to keep track of the current credential selected.
  const [tempData, setTempData] = useImmer<Credentials>(
    showcaseJSON.personas[selectedCharacter].credentials
  ); // State variable that uses useImmer to easily update the Showcase JSON.
  const [componentToMount, setComponentToMount] = useState<string | null>(null); // State variable to determine what needs to be rendered in the right column.
  const [createButtonClicked, setCreateButtonClicked] =
    useState<boolean>(false); // State variable to determine if the create button has been clicked. This is to ensure it can't be spammed.

  function handleCredentialRemoval(credential: keyof Credentials) {
    setShowcaseJSON((json) => {
      if (removeCredentialAndReferences(json, selectedCharacter, credential)) {
        setComponentToMount(null);
        setCreateButtonClicked(false);
        setSelectedCredential(null);
      }
    });
  }

  // This function handles all input boxes and updates both the tempData and the Showcase JSON accordingly.
  function isAttributeUpdate(
    element: CredentialElement
  ): element is ["attributes", keyof Attribute] {
    return element[0] === "attributes";
  }

  function handleChange(
    element: CredentialElement,
    index: number | string,
    value: string
  ) {
    setTempData((draft) => {
      if (selectedCredential === null) return;

      if (isAttributeUpdate(element)) {
        if (typeof index === "number") {
          updateCredentialAttribute(
            draft,
            selectedCredential,
            index,
            element[1],
            value
          );
        }
      } else {
        updateCredentialProperty(draft, selectedCredential, element[0], value);
      }
    });
  }

  // This function handles the transfer of data from the tempData to the Showcase JSON.
  // This is where the save and cancel functionality is also done.
  // The initial values are saved into "tempData" until the "add" button is clicked.
  const handleCredentialUpdate = () => {
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].credentials = tempData;
    });

    // Reset state
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);
  };

  // This function handles adding an attribute.
  const addAttribute = (credential: keyof Credentials) => {
    setTempData((draft) => {
      addCredentialAttribute(draft, credential);
    });
  };

  const removeAttribute = (credential: keyof Credentials, index: number) => {
    setTempData((draft) => {
      removeCredentialAttribute(draft, credential, index);
    });
  };

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
  const handleCreateButtonClick = () => {
    if (selectedCredential !== null) {
      handleCancel();
    }

    const credential_id = Date.now().toString();

    // Use createNewCredential helper
    setTempData((draft) => {
      createNewCredential(draft, credential_id);
    });

    setCreateButtonClicked(true);
    setSelectedCredential(credential_id);
    setComponentToMount("create");
  };

  // This function handles which component should be rendered in the right column.
  const renderComponent = (component: string | null) => {
    switch (component) {
      case "create":
        return (
          <CredentialsForm
            handleChange={handleChange}
            tempData={tempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            removeAttribute={removeAttribute}
          />
        );
      case "edit":
        return (
          <CredentialsEdit
            selectedCredential={selectedCredential}
            tempData={tempData}
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
                className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover border dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
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
};
