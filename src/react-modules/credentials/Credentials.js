import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { JSONUploadButton } from "../JSONUpload";
import { NoSelection, Form, SelectionOverview } from "./components/index.js";
import { CredentialsList, Edit } from "./index.js";
import { useImmer } from "use-immer";
import { LocalTextInput } from "../LocalTextInput";

function Credentials({ selectedCharacter, setSelectedIndex, selectedIndex }) {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [credentialSelected, setCredentialSelected] = useState(false);
  const [componentToMount, setComponentToMount] = useState("no selection");
  const [selectedCredential, setSelectedCredential] = useState(0);

  const [createButtonClicked, setCreateButtonClicked] = useState(false);
  const [addCredentialClicked, setAddCredentialClicked] = useState(false);

  const [formData, setFormData] = useState([]);
  const [tempData, setTempData] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [saveEditClicked, setSaveEditClicked] = useState(false);

  useEffect(() => {
    console.log(tempData);
    console.log(formData);
  }, [tempData, formData]);

  useEffect(() => {
    console.log(`your index is currently ${selectedCredential}`);
  });

  useEffect(() => {
    setTempData([
      ...tempData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [], // Provide a default empty array
      },
    ]);
    setFormData([
      ...tempData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [], // Provide a default empty array
      },
    ]);
  }, []);

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...tempData]; // Create a copy of the data array
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1)); // Get the attribute index
    const attributeName = name.slice(0, name.lastIndexOf("-")); // Get the attribute name ("name" or "value")
    if (name === "cred_name" || name === "issuer_name") {
      newData[index][name] = value; // Update cred_name or issuer_name
    } else {
      newData[index].attributes[attributeIndex][attributeName] = value; // Update attribute name or value
    }

    setTempData(newData); // Update the state with the modified data
  };

  const addAttribute = () => {
    setTempData((prevData) => {
      const newData = [...prevData];
      const selectedCred = { ...newData[selectedCredential] }; // Create a copy of the selected credential
      selectedCred.attributes = [
        ...selectedCred.attributes,
        { name: "", value: "" },
      ];
      newData[selectedCredential] = selectedCred; // Update the selected credential in the new data array
      return newData;
    });
  };
  const addCredential = () => {
    setFormData(tempData);
    setAddCredentialClicked(false);
    setCreateButtonClicked(false);
    setComponentToMount("credential");
  };

  const handleCancel = () => {
    setTempData((prevData) => {
      const newData = [...prevData];
      newData[selectedCredential] = formData[selectedCredential];
      return newData;
    });
    setSelectedCredential((prevVal) => prevVal - 1);
    setCreateButtonClicked(false);
    setComponentToMount("credential");
  };

  const handleCreateButtonClick = (e) => {
    // if (!createButtonClicked) {
    setCreateButtonClicked(true);
    setSelectedCredential(formData.length);
    setTempData((prevData) => [
      ...prevData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [],
      },
    ]);
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
    // }
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
            credentialSelected={selectedIndex}
            selectedCharacter={selectedCharacter}
            formData={formData}
            setFormData={setFormData}
            selectedCredential={selectedCredential}
            tempData={tempData}
            setTempData={setTempData}
            setSelectedCredential={setSelectedCredential}
          />
        );
      case "create":
        return (
          <Form
            addCredential={addCredential}
            setComponentToMount={setComponentToMount}
            handleChange={handleChange(selectedCredential)}
            formData={formData}
            tempData={tempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            handleCancel={handleCancel}
          />
        );
      case "edit":
        return (
          <Edit
            addCredential={addCredential}
            setComponentToMount={setComponentToMount}
            handleChange={handleChange(selectedCredential)}
            formData={formData}
            tempData={tempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            handleCancel={handleCancel}
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
            setCredentialSelected={setCredentialSelected}
            setComponentToMount={setComponentToMount}
            formData={formData}
            selectedCredential={selectedCredential}
            tempData={tempData}
            setSelectedCredential={setSelectedCredential}
          />
          <p className="text-slate-50">{componentToMount}</p>
        </div>

        <div className="two-column-col md:w-2/5 bg-gray-300 p-4 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>
        <div className="flex mt-5 w-full justify-end ">
          <button className="border p-2 mr-4 rounded" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="border p-2 rounded" onClick={addCredential}>
            {componentToMount === "edit" ? "DONE" : "ADD"}
          </button>
        </div>
      </div>
    </>
  );
}

export { Credentials };
