import "./App.css";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer"; // useImmer is an alternative to useState; it is useful for dealing with nested JSON
import { FileUploadFull, FileUploadBar } from "./react-modules/FileUpload";
import { TextInput } from "./react-modules/TextInput";
import { NavBar } from "./react-modules/NavBar";
import { CharacterPage } from "./react-modules/pages/CharacterPage";
// import { CredentialPage } from "./react-modules/pages/CredentialPage";
import { SetupPage } from "./react-modules/pages/SetupPage";
// import { ScenarioPage } from "./react-modules/pages/ScenarioPage";
import { ScenarioPage2 } from "./react-modules/pages/ScenarioPage2";
import { CharacterScreen } from "./react-modules/character-screen/CharacterScreen";
import { DEFAULT_JSON } from "./DEFAULT_JSON";

// import { Credentials } from "./react-modules/credentials/Credentials";

import { CredentialsScreen } from "./react-modules/credentials/CredentialsScreen";

function App() {
  const [showcaseJSON, setShowcaseJSON] = useImmer({
    personas: [DEFAULT_JSON],
  });

  const [darkMode, setDarkMode] = useState(true);

  const [selectedCharacter, setSelectedCharacter] = useState(0);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCredential, setSelectedCredential] = useState(0);

  const [currentPage, setCurrentPage] = useState("character");
  const changePage = (page) => {
    setCurrentPage(page);
  };

  // const [formData, setFormData] = useState([
  //   {
  //     cred_name: "Developer Card",
  //     issuer_name: "Apple",
  //     icon: "",
  //     attributes: [
  //       {
  //         cred_type: "string",
  //         name: "first_name",
  //         value: "Ryan",
  //       },
  //       {
  //         cred_type: "int",
  //         name: "PPID",
  //         value: "001234",
  //       },
  //       {
  //         cred_type: "dateint",
  //         name: "date_of_birth",
  //         value: "07/05/1998",
  //       },
  //     ],
  //   },
  // ]);

  const [tempData, setTempData] = useState([]);
  const [formData, setFormData] = useState([]);

  function handleJSONUpdate(index, element, newValue) {
    switch (element.length) {
      case 6:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]][element[1]][element[2]][
            element[3]
          ][element[4]][element[5]] = newValue;
        });
        break;
      case 5:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]][element[1]][element[2]][
            element[3]
          ][element[4]] = newValue;
        });
        break;
      case 4:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]][element[1]][element[2]][
            element[3]
          ] = newValue;
        });
        break;
      case 3:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]][element[1]][element[2]] =
            newValue;
        });
        break;
      case 2:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]][element[1]] = newValue;
        });
        break;
      case 1:
        setShowcaseJSON((json) => {
          json["personas"][index][element[0]] = newValue;
        });
        break;
      default:
        return;
    }
  }

  return (
    <>
      <div className={`dark:bg-gray-500 bg-white ${darkMode ? "dark" : ""}`}>
        <NavBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showcaseJSON={showcaseJSON}
          changePage={changePage}
        />
        {currentPage === "character" && (
          <CharacterPage
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            handleJSONUpdate={handleJSONUpdate}
          />
        )}
        {currentPage === "credential" && (
          <CredentialsScreen
            tempData={tempData}
            setTempData={setTempData}
            formData={formData}
            setFormData={setFormData}
            // setSelectedIndex={setSelectedIndex}
            selectedCredential={selectedCredential}
            setSelectedCredential={setSelectedCredential}
          />
        )}
        {currentPage === "setup" && <SetupPage />}
        {currentPage === "scenario" && (
          <ScenarioPage2
            tempData={tempData}
            setTempData={setTempData}
            formData={formData}
            setFormData={setFormData}
            selectedCredential={selectedCredential}
            setSelectedCredential={setSelectedCredential}
          />
        )}

        <pre className="p-10 m-5 border text-xs rounded dark:text-neutral-200 whitespace-pre-wrap break-words">
          {JSON.stringify(showcaseJSON, null, 2)}
        </pre>
      </div>
    </>
  );
}
export default App;
