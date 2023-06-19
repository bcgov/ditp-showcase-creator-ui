import "./App.css";
import { useState, useEffect } from "react";
import { useImmer } from "use-immer"; // useImmer is an alternative to useState; it is useful for dealing with nested JSON
import { FileUploadFull, FileUploadBar } from "./react-modules/FileUpload";
import { TextInput } from "./react-modules/TextInput";
import { NavBar } from "./react-modules/NavBar";
import { CharacterPage } from "./react-modules/pages/CharacterPage";
import { CredentialPage } from "./react-modules/pages/CredentialPage";
import { SetupPage } from "./react-modules/pages/SetupPage";
import { ScenarioPage } from "./react-modules/pages/ScenarioPage";
import { CharacterScreen } from "./react-modules/character-screen/CharacterScreen";
import { DEFAULT_JSON } from "./DEFAULT_JSON";

import { Credentials } from "./react-modules/credentials/Credentials";

function App() {
  const [showcaseJSON, setShowcaseJSON] = useImmer({
    personas: [DEFAULT_JSON],
  });

  const [darkMode, setDarkMode] = useState(true);

  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [currentPage, setCurrentPage] = useState("character");
  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log(selectedIndex);
    console.log(showcaseJSON);
  }, [selectedIndex, showcaseJSON]);

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
      <div className={`dark:bg-gray-500 bg-white ${!darkMode ? "dark" : ""}`}>
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
          <Credentials
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            selectedCharacter={selectedCharacter}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        {currentPage === "setup" && <SetupPage />}
        {currentPage === "scenario" && <ScenarioPage />}

        {/* <div className="container mx-auto bg-neutral-200 dark:bg-zinc-500 rounded-xl shadow-xl border p-8 m-10 mt-5">
          <p className="text-3xl text-neutral-700 dark:text-white font-bold mb-5">
            Welcome!
          </p>
          <p className="text-neutral-500 dark:text-neutral-200 text-lg">
            React and Tailwind CSS in action
          </p>
        </div> */}

        <p className="p-10 m-5 border rounded dark:text-neutral-200">
          {JSON.stringify(showcaseJSON, null, "\t")}
        </p>
      </div>
    </>
  );
}
export default App;
