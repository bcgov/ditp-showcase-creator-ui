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
import { Persona, ShowcaseJSON } from "./types";

export function updateJSONWithImmer(
  setShowcaseJSON: (fn: (draft: ShowcaseJSON) => void) => void,
  index: number,
  path: (keyof Persona)[],
  newValue: string | null
): void {
  setShowcaseJSON((draft) => {
    let current: any = draft.personas[index];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = newValue;
  });
}

function App() {
  const [showcaseJSON, setShowcaseJSON] = useImmer<ShowcaseJSON>({
    personas: [
      DEFAULT_JSON],
  });

  const [darkMode, setDarkMode] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [currentPage, setCurrentPage] = useState("character");

  const changePage = (page: string) => {
    setCurrentPage(page);
  };

  function handleJSONUpdate(index: number, element: (keyof Persona)[], newValue: string | null) {
    updateJSONWithImmer(setShowcaseJSON, index, element, newValue);
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
            setShowcaseJSON={setShowcaseJSON}
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
