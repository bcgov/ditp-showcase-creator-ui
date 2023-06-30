import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { JSONUploadButton } from "../JSONUpload";
import { NoSelection, Form, SelectionOverview } from "./components/index.js";
import { CredentialsList, Edit } from "./index.js";
import { useImmer } from "use-immer";
import { LocalTextInput } from "../LocalTextInput";
import { Credential2 } from "./components/Credential2";

function Credentials({ selectedCharacter, setSelectedIndex, selectedIndex }) {
  const [componentToMount, setComponentToMount] = useState("no selection");
  const [selectedCredential, setSelectedCredential] = useState(0);

  const [formData, setFormData] = useState([]);
  const [tempData, setTempData] = useState([]);

  const [showForm, setShowForm] = useState(false);

  // Check if the create button has been clicked to ensure that you cant spam the button.
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  useEffect(() => {
    console.log("Your tempData array is: ", tempData);
    console.log("Your formData array is: ", formData);
  }, [tempData, formData]);

  useEffect(() => {
    console.log(`your index is currently ${selectedCredential}`);
  });

  // Handle all input
  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...tempData];
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1));
    const attributeName = name.slice(0, name.lastIndexOf("-"));

    if (name === "cred_name" || name === "issuer_name") {
      newData[index][name] = value;
    } else if (attributeName === "cred_type") {
      // Update the condition to check the attributeName
      newData[index].attributes[attributeIndex][attributeName] = value;
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
    if (!createButtonClicked) {
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
      setComponentToMount(
        e.target.getAttribute("data-button-id").split("-")[0]
      );
    }
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
          <Form
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
          <Edit
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
        return <NoSelection Text={"You have no credential selected."} />;
    }
  };

  return (
    <>
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
            setComponentToMount={setComponentToMount}
            formData={formData}
            setFormData={setFormData}
            selectedCredential={selectedCredential}
            tempData={tempData}
            setTempData={setTempData}
            setSelectedCredential={setSelectedCredential}
          />
          {/* <Credential2 /> */}
        </div>
        <div className="two-column-col md:w-2/5 bg-gray-300 p-4 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>
        <div className="flex mt-5 w-full justify-end ">
          {(componentToMount === "edit" || componentToMount === "create") && (
            <button className="border p-2 mr-4 rounded" onClick={handleCancel}>
              CANCEL
            </button>
          )}
          <button
            className="border p-2 rounded"
            onClick={handleCredentialUpdate}
          >
            {componentToMount === "edit" ? "DONE" : "ADD"}
          </button>
        </div>
      </div>
    </>
  );
}

export { Credentials };
