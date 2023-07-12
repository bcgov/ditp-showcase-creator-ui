import { useState, useEffect } from "react";
import "./styles/credentials.css";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "../credentials/NoSelection";
import { useImmer } from "use-immer";

/// current working one !!!

function CredentialsScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
  formData,
  setFormData,
  testJSON,
  setTestJSON,
  componentToMount,
  setComponentToMount,
}) {

  const [selectedCredential, setSelectedCredential] = useState(null);
  const [tempData, setTempData] = useImmer(
    showcaseJSON.personas[selectedCharacter].credentials
  );

  const [showJSON, setShowJSON] = useState(false);

  const handleCredentialUpdate = () => {
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);
    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].credentials = tempData
    });
  };

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

  function handleCredentialRemoval(credential) {
    setComponentToMount(null);
    setCreateButtonClicked(false);
    setSelectedCredential(null);
    setShowcaseJSON(json => {
      delete json.personas[selectedCharacter].credentials[credential]
    });
    setTempData(json => {
      delete json[credential]
    });
    console.log(tempData);
};

  
  function handleChange(e, element) {
    setTempData((json) => {
      json[selectedCredential][element] = e.target.value
  });
  }

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
    setTempData(temp => {temp[credential_id] = {
      "issuer_name": "",
      "name": "",
      "version": "1.0",
      "icon": "",
      "attributes": []
    }});
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
            setTempData={setTempData}
            formData={formData}
            setFormData={setFormData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            testJSON={testJSON}
            setTestJSON={setTestJSON}
          />
        );
      case "edit":
        return (
          <CredentialsEdit
            handleChange={handleChange}
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
              {
                !createButtonClicked ?
              <button
              data-button-id="create-button-credentials"
              onClick={(e) => handleCreateButtonClick(e)}
              className="px-3 py-1 mx-1 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
            >
              Create
            </button> : null
              }
              
            </div>
          </div>
          <div className="mt-8">
            <CredentialsList
              setSelectedIndex={setSelectedIndex}
              selectedCharacter={selectedCharacter}
              showcaseJSON={showcaseJSON}
              setComponentToMount={setComponentToMount}
              formData={formData}
              setFormData={setFormData}
              tempData={tempData}
              setTempData={setTempData}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
              testJSON={testJSON}
              setTestJSON={setTestJSON}
              setShowcaseJSON={setShowcaseJSON}
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
          {(componentToMount === "edit" || componentToMount === "create") ? (
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
          ):null}
        </div>
      </div>
    </>
  );
}

export { CredentialsScreen };
