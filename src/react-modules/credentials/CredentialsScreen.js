import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "../credentials/NoSelection";

function CredentialsScreen({
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
  tempData,
  setTempData,
  formData,
  setFormData,
  selectedCredential,
  setSelectedCredential,
  testJSON,
  setTestJSON,
  handleCredentialUpdate,
  componentToMount,
  setComponentToMount,
}) {
  // const [selectedCredential, setSelectedCredential] = useState(0);

  const [showJSON, setShowJSON] = useState(false);

  // Check if the create button has been clicked to ensure that you cant spam the button.
  const [createButtonClicked, setCreateButtonClicked] = useState(false);

  const showMeMyJSON = () => {
    console.log("Your current formData JSON is: ", formData);
    setShowJSON(!showJSON);
  };

  const clearJSON = () => {
    setFormData([]);
    setTempData([]);
  };

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...tempData];
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1));
    const attributeName = name.slice(0, name.lastIndexOf("-"));

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
        { type: "", name: "", value: "" },
      ];
      newData[selectedCredential] = selectedCred; // Update the selected credential in the new data array
      return newData;
    });
  };

  // Add a credential
  // const handleCredentialUpdate = () => {
  //   setFormData(JSON.parse(JSON.stringify(tempData)));
  //   setComponentToMount("credential");
  // };

  // Remove the credential if cancel button is clicked
  const handleCancel = () => {
    if (componentToMount === "create") {
      setTempData((prevData) => prevData.slice(0, -1));
      setSelectedCredential(null);
    } else if (componentToMount === "edit") {
      setTempData(JSON.parse(JSON.stringify(formData)));
    }
    setComponentToMount("credential");
  };

  // Create a credential with an empty object.
  const handleCreateButtonClick = (e) => {
    setSelectedCredential(tempData.length);
    // setTempData(...tempData, {
    // cred_name: "",
    // issuer_name: "",
    // icon: "",
    // attributes: [],
    // });
    setTempData((prevData) => {
      const newData = [
        ...prevData,
        { cred_name: "", issuer_name: "", icon: "", attributes: [] },
      ];
      return newData;
    });
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
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
            testJSON={testJSON}
            setTestJSON={setTestJSON}
          />
        );
      // case "edit":
      //   return (
      //     <CredentialsEdit
      //       handleChange={handleChange(selectedCredential)}
      //       formData={formData}
      //       tempData={tempData}
      //       setTempData={setTempData}
      //       addAttribute={addAttribute}
      //       selectedCredential={selectedCredential}
      //     />
      //   );
      case "import":
        return "";
      default:
        return <NoSelection Text={"You have no credential selected."} />;
    }
  };

  return (
    <>
      {showJSON && (
        <pre className="p-10 m-5 border text-xs rounded dark:text-neutral-200 whitespace-pre-wrap break-words">
          {JSON.stringify(testJSON, null, 2)}
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
              <button
                data-button-id="import-button-credentials"
                onClick={(e) => handleImportButtonClick(e)}
                className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
              >
                Import
              </button>
              <button
                data-button-id="create-button-credentials"
                // disabled={createButtonClicked}
                disabled={componentToMount === "create"}
                onClick={(e) => handleCreateButtonClick(e)}
                className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
              >
                Create
              </button>
            </div>
          </div>
          <div className="mt-8">
            <CredentialsList
              setSelectedIndex={setSelectedIndex}
              setComponentToMount={setComponentToMount}
              formData={formData}
              setFormData={setFormData}
              selectedCredential={selectedCredential}
              tempData={tempData}
              setTempData={setTempData}
              setSelectedCredential={setSelectedCredential}
              testJSON={testJSON}
              setTestJSON={setTestJSON}
            />
          </div>
          {/* <Credential2 /> */}
        </div>

        <div className="two-column-col md:w-2/5 bg-gray-300 p-6 rounded-md right-col">
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

export { CredentialsScreen };
