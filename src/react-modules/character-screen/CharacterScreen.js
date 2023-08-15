import { NewCharacterButton } from "./NewCharacterButton";
import "./character-styles/character-screen.css";
import { useState, useEffect } from "react";
import { CharacterInfo } from "./CharacterInfo";
import { CharacterEdit } from "./CharacterEdit";
import { CharacterList } from "./CharacterList";
import { useImmer } from "use-immer";

function CharacterScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedCharacter,
  handleJSONUpdate,
}) {
  const [editMode, setEditMode] = useState(false);

  // To-do: Set the character images, so they can be previewed... ideally this would be the auto-gen URLs for them
  const [characterImages, setCharacterImages] = useState([]);

  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useImmer();

  // Change this mini version of the json, when the character changes
  useEffect(() => {
    setLocalJSON({
      name: showcaseJSON.personas[selectedCharacter].name,
      type: showcaseJSON.personas[selectedCharacter].type,
      description: showcaseJSON.personas[selectedCharacter].description,
    });
  }, [selectedCharacter]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue) {
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  // Save handler. When clicking save, send the mini JSON to the real, full JSON file
  function saveJSON() {
    handleJSONUpdate(selectedCharacter, ["name"], localJSON.name);
    handleJSONUpdate(selectedCharacter, ["type"], localJSON.type);
    handleJSONUpdate(selectedCharacter, ["description"], localJSON.description);

    setEditMode(false);
  }

  return (
    <>
      <div className="flex flex-col min-h-screen mt-20 text-light-text bg-light-bg dark:bg-dark-bg dark:text-dark-text">
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex gap-12 h-full">
            {/* <div className="w-1/2 rounded left-col"> */}
            <div className="w-2/5 rounded left-col">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-4xl font-bold text-black dark:text-gray-800">
                    Create your Character
                  </h3>
                  <p className="text-slate-100 mt-3">
                    Fill in the details on the right to create your character
                    for this showcase.
                  </p>
                </div>
              </div>

              {/* <div className="mt-8">
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">Your Character:</h3>
                </div>

                <CharacterList
                  setEditMode={setEditMode}
                  showcaseJSON={showcaseJSON}
                  localJSON={localJSON}
                  selectedCharacter={selectedCharacter}
                  setSelectedCharacter={setSelectedCharacter}
                />
              </div> */}
            </div>
            {/* end of column 1  */}

            {/* <div className="w-1/2 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary  p-3 rounded-md right-col "> */}
            <div className="w-3/5 two-column-col  bg-light-bg-secondary dark:bg-dark-bg-secondary  p-3 rounded-md right-col ">
              {editMode ? (
                // Toggling edit mode
                <CharacterEdit
                  selectedCharacter={selectedCharacter}
                  handleLocalUpdate={handleLocalUpdate}
                  handleJSONUpdate={handleJSONUpdate} // Updated this line
                  showcaseJSON={showcaseJSON} // Updated this line
                  localJSON={localJSON} // Added this line
                  setCharacterImages={setCharacterImages}
                />
              ) : (
                <CharacterInfo
                  setShowcaseJSON={setShowcaseJSON}
                  showcaseJSON={showcaseJSON}
                  setSelectedCharacter={setSelectedCharacter}
                  selectedCharacter={selectedCharacter}
                  setEditMode={setEditMode}
                  characterImages={characterImages}
                />
              )}
            </div>
          </div>
          {
            /* Save or cancel button */
            editMode ? (
              <div className="flex container mx-auto w-full my-8 justify-end dark:text-dark-text">
                <button
                  className="p-2 mr-4 rounded hover:underline"
                  onClick={() => setEditMode(false)}
                >
                  CANCEL
                </button>

                <button
                  className="p-1 w-20 bg-light-bg-secondary hover:bg-light-btn-hover dark:bg-dark-bg-secondary dark:hover:bg-dark-btn-hover rounded "
                  onClick={saveJSON}
                >
                  SAVE
                </button>
              </div>
            ) : null
          }
        </div>
      </div>
    </>
  );
}

export { CharacterScreen };
