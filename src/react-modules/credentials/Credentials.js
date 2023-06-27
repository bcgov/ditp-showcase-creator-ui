import React from "react";
import "./styles/credentials.css";
import { useState, useRef, useEffect } from "react";
import { JSONUploadButton } from "../JSONUpload";
import { NoSelection, Form, SelectionOverview } from "./components/index.js";
import { CredentialsList, Edit } from "./index.js";
import { useImmer } from "use-immer";
import { LocalTextInput } from "../LocalTextInput";

// To Do:
// - When typing in values for inputs, if you change pages, the localJSON doesn't clear.
// - No form handling.
// - Attributes adding,removing,deleting not done.

function Credentials({
  showcaseJSON,
  handleJSONUpdate,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedIndex,
  selectedIndex,
}) {
  const [editButtonClicked, setEditButtonClicked] = useState(false);
  const [credentialSelected, setCredentialSelected] = useState(false);
  const [componentToMount, setComponentToMount] = useState("no selection");

  const [attributeCount, setAttributeCount] = useState(0);

  const [data, setData] = useState([
    {
      cred_name: "",
      issuer_name: "",
      icon: "",
      attributes: [], // Provide a default empty array
    },
  ]);

  const [selectedCredential, setSelectedCredential] = useState(0);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const newData = [...data]; // Create a copy of the data array
    const attributeIndex = parseInt(name.slice(name.lastIndexOf("-") + 1)); // Get the attribute index
    const attributeName = name.slice(0, name.lastIndexOf("-")); // Get the attribute name ("name" or "value")
    if (name === "cred_name" || name === "issuer_name") {
      newData[index][name] = value; // Update cred_name or issuer_name
    } else {
      newData[index].attributes[attributeIndex][attributeName] = value; // Update attribute name or value
    }

    setData(newData); // Update the state with the modified data
  };

  const addAttribute = () => {
    setData((prevData) => {
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
    // setShowForm(!showForm);
    // setData((prevData) => [
    //   ...prevData,
    //   {
    //     cred_name: "",
    //     issuer_name: "",
    //     icon: "",
    //     attributes: [],
    //   },
    // ]);
    // setSelectedCredential((prevVal) => prevVal + 1);
  };

  // Handle page state by setting the componentToMount state variable to the buttons id (create)
  const handleCreateButtonClick = (e) => {
    setData((prevData) => [
      ...prevData,
      {
        cred_name: "",
        issuer_name: "",
        icon: "",
        attributes: [],
      },
    ]);
    setSelectedCredential((prevVal) => prevVal + 1);
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  // Handle page state by setting the componentToMount state variable to the buttons id (import)
  const handleImportButtonClick = (e) => {
    setComponentToMount(e.target.getAttribute("data-button-id").split("-")[0]);
  };

  // Render component based on componentToMount state variable.
  const renderComponent = (component) => {
    switch (component) {
      // case "credential":
      //   return (
      //     <SelectionOverview
      //       setEditButtonClicked={setEditButtonClicked}
      //       setComponentToMount={setComponentToMount}
      //       handleJSONUpdate={handleJSONUpdate}
      //       credentialSelected={selectedIndex}
      //       showcaseJSON={showcaseJSON}
      //       selectedIndex={selectedIndex}
      //       selectedCharacter={selectedCharacter}
      //       setShowcaseJSON={setShowcaseJSON}
      //       setSelectedIndex={setSelectedIndex}
      //     />
      //   );
      // case "edit":
      //   return (
      //     <Edit
      //       selectedIndex={selectedIndex}
      //       handleJSONUpdate={handleJSONUpdate}
      //       setShowcaseJSON={setShowcaseJSON}
      //       showcaseJSON={showcaseJSON}
      //       selectedCharacter={selectedCharacter}
      //     />
      //   );
      case "create":
        return (
          <Form
            addCredential={addCredential}
            handleChange={handleChange(selectedCredential)}
            data={data}
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
        <div className="two-column-col md:w-3/5 pr-4 ">
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
            data={data}
            selectedCredential={selectedCredential}
            setSelectedCredential={setSelectedCredential}
          />
          <p className="text-slate-50">{componentToMount}</p>
        </div>
        {/* end of column 1 */}

        <div className="two-column-col md:w-2/5 bg-gray-300 p-4 rounded-md right-col">
          {renderComponent(componentToMount)}
        </div>
        {/* end of column 2 */}
      </div>
    </>
  );
}

export { Credentials };
