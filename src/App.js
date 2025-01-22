import "./App.css";
import { useState } from "react";
import { useImmer } from "use-immer"; // useImmer is an alternative to useState; it is useful for dealing with nested JSON
import { NavBar } from "./react-modules/NavBar";
import { CharacterPage } from "./react-modules/pages/CharacterPage";
import { CredentialPage } from "./react-modules/pages/CredentialPage";
import { OnboardingPage } from "./react-modules/pages/OnboardingPage";
import { ScenarioPage } from "./react-modules/pages/ScenarioPage";
import { DEFAULT_JSON } from "./DEFAULT_JSON";
import { JSONPreview } from "./react-modules/JSONPreview";
import { Footer } from "./react-modules/Footer";

function App() {
  const [showcaseJSON, setShowcaseJSON] = useImmer({
    personas: [DEFAULT_JSON],
  });

  const [darkMode, setDarkMode] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [currentPage, setCurrentPage] = useState("character");

  const changePage = (page) => {
    setCurrentPage(page);
  };

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
      <div className={`${darkMode ? "dark" : ""}`}>
        <div
          className={`min-h-screen bg-light-bg dark:bg-dark-bg text-light-text ${
            darkMode ? "dark" : ""
          }`}
        >
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
            <CredentialPage
              showcaseJSON={showcaseJSON}
              setShowcaseJSON={setShowcaseJSON}
              selectedCharacter={selectedCharacter}
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
          {process.env.NODE_ENV === "development" && (
            <JSONPreview showcaseJSON={showcaseJSON} />
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}
export default App;
