import "./App.css";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer"; // useImmer is an alternative to useState; it is useful for dealing with nested JSON
import { NavBar } from "./react-modules/NavBar";
import { CharacterPage } from "./react-modules/pages/CharacterPage";
import { OnboardingPage } from "./react-modules/pages/OnboardingPage";
import { ScenarioPage } from "./react-modules/pages/ScenarioPage";
import { DEFAULT_JSON } from "./DEFAULT_JSON";

// import { Credentials } from "./react-modules/credentials/Credentials";

import { CredentialsScreen } from "./react-modules/credentials/CredentialsScreen";

function App() {
  const [showcaseJSON, setShowcaseJSON] = useImmer({
    personas: [DEFAULT_JSON],
  });

  const [darkMode, setDarkMode] = useState(true);

  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState("character");
  const [componentToMount, setComponentToMount] = useState("no selection");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const [formData, setFormData] = useState([]);
  const [tempData, setTempData] = useState([]);

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
          currentPage={currentPage}
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
            setComponentToMount={setComponentToMount}
            componentToMount={componentToMount}
          />
        )}
        {currentPage === "setup" && (
          <OnboardingPage
            showcaseJSON={showcaseJSON}
            selectedCharacter={selectedCharacter}
            setShowcaseJSON={setShowcaseJSON}
            handleJSONUpdate={handleJSONUpdate}
          />
        )}
        {currentPage === "scenario" && (
          <ScenarioPage
            showcaseJSON={showcaseJSON}
            selectedCharacter={selectedCharacter}
            setShowcaseJSON={setShowcaseJSON}
            handleJSONUpdate={handleJSONUpdate}
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
