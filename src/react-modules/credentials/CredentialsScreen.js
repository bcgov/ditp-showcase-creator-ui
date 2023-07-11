import React, { useState, useEffect } from "react";
import "./styles/credentials.css";
import { CredentialsForm } from "./CredentialsForm";
import { CredentialsEdit } from "./CredentialsEdit";
import { CredentialsList } from "./components/CredentialsList";
import { NoSelection } from "../credentials/NoSelection";


/// current working one !!!

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

  useEffect(() => {
    setTempData([]);
  }, []);

  const showMeMyJSON = () => {
    console.log("Your current formData JSON is: ", formData);
    setShowJSON(!showJSON);
  };

  const clearJSON = () => {
    setFormData([]);
    setTempData([]);
  };

  const handleChange = (index) => (e) => {
    console.log("UR TEMP DATA: ", tempData);
    const { name, value, id } = e.target;
    // const newData = [...tempData];
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1));
    const attributeName = name.slice(0, name.lastIndexOf("-"));

    if (componentToMount === "edit") {
      if (name === "cred_name" || name === "issuer_name") {
        const newData = [...tempData];
        const test = index.toString().split("_")[2];
        console.log(test);
        newData[index][name] = value;
        setTempData(newData);
      }
    } else if (componentToMount === "create") {
      if (name === "cred_name" || name === "issuer_name") {
        const newData = [...tempData];
        newData[index][name] = value;
        setTempData(newData);
      }
    }

    // if (name === "cred_name" || name === "issuer_name") {
    //   newData[index][name] = value;
    // } else {
    //   newData[index].attributes[attributeIndex][attributeName] = value;
    // }
    // setTempData(newData);
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

  // Remove the credential if cancel button is clicked
  const handleCancel = () => {
    console.log("selectedCredential before cancel : ", selectedCredential);

    if (componentToMount === "create") {
      console.log("in create");
      setTempData((prevData) => prevData.slice(0, -1));
    } else if (componentToMount === "edit") {
      console.log(
        testJSON.character[0].credentials[`cred_id_${selectedCredential}`]
      );
      const editedCredential = {
        ...testJSON.character[0].credentials[`cred_id_${selectedCredential}`],
      };
      setTempData([editedCredential]);
      // Alternatively, you can use other cloning methods like JSON.parse(JSON.stringify()) to create a deep copy:
      // const editedCredential = JSON.parse(JSON.stringify(testJSON.character[0].credentials[`cred_id_${selectedCredential}`]));
      // setTempData([editedCredential]);
    }

    console.log("selectedCredential after cancel : ", selectedCredential);
    setSelectedCredential((prevVal) => (prevVal - 1 === 0 ? prevVal - 1 : 0));
    setComponentToMount(null);
  };

  // Create a credential with an empty object.
  const handleCreateButtonClick = (e) => {
    setSelectedCredential(tempData.length);
    setTempData((prevData) => {
      const newData = [
        ...prevData,
        { cred_name: "", issuer_name: "", icon: "", attributes: [] },
      ];
      return newData;
    });
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  const renderComponent = (component) => {
    switch (component) {
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
      case "edit":
        return (
          <CredentialsEdit
            handleChange={handleChange(selectedCredential)}
            formData={formData}
            tempData={tempData}
            setTempData={setTempData}
            addAttribute={addAttribute}
            selectedCredential={selectedCredential}
            testJSON={testJSON}
            setTestJSON={setTestJSON}
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
