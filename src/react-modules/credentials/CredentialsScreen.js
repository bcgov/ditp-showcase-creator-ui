import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "../credentials/NoSelection";
import { useImmer } from "use-immer";
import "./styles/credentials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

/// current working one !!!

function CredentialsScreen({
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
  tempData,
  setTempData,
  formData,
  setFormData
}) {
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [tempData, setTempData] = useImmer(
    showcaseJSON.personas[selectedCharacter].credentials
  );

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

    if (name === "cred_name" || name === "issuer_name") {
      newData[index][name] = value;
    } else {
      newData[index].attributes[attributeIndex][attributeName] = value;
    }
    setTempData(newData);
  };

  // Add an attribute
  const addAttribute = () => {
    setTempData((prevData) => {
      const newData = [...prevData];
      const selectedCred = { ...newData[selectedCredential] }; // Create a copy of the selected credential
      selectedCred.attributes = [
        ...selectedCred.attributes,
        { cred_type: "", name: "", value: "" },
      ];
      newData[selectedCredential] = selectedCred; // Update the selected credential in the new data array
      return newData;
    });
  };

  // Add a credential
  const handleCredentialUpdate = () => {
    setCreateButtonClicked(false);
    setFormData(JSON.parse(JSON.stringify(tempData)));
    setComponentToMount("credential");
  };

  // Remove the credential if cancel button is clicked
  const handleCancel = () => {
    if (componentToMount === "create") {
      setCreateButtonClicked(false);
      setTempData((prevData) => {
        const newData = prevData.filter(
          (_, index) => index !== selectedCredential
        );
        return newData;
      });
      setSelectedCredential((prevVal) => (prevVal === 0 ? 0 : prevVal - 1));
      setComponentToMount("credential");
    } else if (componentToMount === "edit") {
      setTempData(JSON.parse(JSON.stringify(formData)));
      setComponentToMount("credential");
    }
  };

  // Create a credential with an empty object.
  const handleCreateButtonClick = (e) => {
    setSelectedCredential(formData.length);
    setTempData([
      ...tempData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [],
      },
    ]);
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
    setCreateButtonClicked(true);
  };

  const handleImportButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const renderComponent = (component) => {
    switch (component) {
      // case "credential":
      //   return (
      //     <SelectionOverview
      //       setComponentToMount={setComponentToMount}
      //       credentialSelected={selectedIndex}
      //       selectedCharacter={selectedCharacter}
      //       formData={formData}
      //       setFormData={setFormData}
      //       selectedCredential={selectedCredential}
      //       tempData={tempData}
      //       setTempData={setTempData}
      //       setSelectedCredential={setSelectedCredential}
      //     />
      //   );
      case "create":
        return (
          <CredentialsForm
            handleChange={handleChange(selectedCredential)}
            tempData={tempData}
            setTempData={setTempData}
            formData={formData}
            setFormData={setFormData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
          />
        );
      case "edit":
        return (
          <CredentialsEdit
            handleChange={handleChange(selectedCredential)}
            formData={formData}
            tempData={tempData}
            setTempData={setTempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
          />
        );
      case "import":
        return "";
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
      <div className="flex gap-12 container mx-auto px-4 py-8">
        <div className="w-1/2 rounded left-col">
          <div className="flex justify-between">
            <div>
              <h3 className="text-4xl font-bold text-slate-50">
                Add your Credentials
              </h3>
              <p className="text-slate-100 mt-3">
                Fill in the details on the right to create a credential for this
                showcase.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Credentials Added:</h3>
              <div className="">
                {!createButtonClicked ? (
                  <button
                    data-button-id="create-button-credentials"
                    onClick={(e) => handleCreateButtonClick(e)}
                    className="p-2 mx-1 rounded button-light hover:bg-neutral-600 text-slate-100"
                  >
                    Add Credential <FontAwesomeIcon icon={faCirclePlus} />
                  </button>
                ) : null}
              </div>
            </div>

            <CredentialsList
              setSelectedIndex={setSelectedIndex}
              setComponentToMount={setComponentToMount}
              formData={formData}
              setFormData={setFormData}
              selectedCredential={selectedCredential}
              tempData={tempData}
              setTempData={setTempData}
              setSelectedCredential={setSelectedCredential}
            />
          </div>
        </div>
        {/* End of col 1  */}
        <div className="w-1/2 two-column-col bg-gray-300 p-6 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>

        {/* End of col 2  */}
      </div>
      <div className="flex container mx-auto px-4 w-full justify-end ">
        {componentToMount === "edit" || componentToMount === "create" ? (
          <>
            <button className="p-2 mr-4 rounded" onClick={handleCancel}>
              CANCEL
            </button>

            <button
              className="p-1 w-20 button-dark rounded hover:bg-neutral-600"
              onClick={handleCredentialUpdate}
            >
              SAVE
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}

export { CredentialsScreen };
