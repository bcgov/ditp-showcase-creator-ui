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
      <div className="flex gap-5 container mx-auto px-4 py-8">
        <div className="w-1/2 rounded left-column">
          <div className="flex justify-between">
            <div>
              <h3 className="text-4xl font-bold text-slate-50">
                Create your Character
              </h3>
              <p className="text-slate-100 mt-3">
                Fill in the details on the right to create your character for
                this showcase.
              </p>
            </div>
          </div>
          <div className="mt-8">
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
          </div>
        </div>
        {/* end of column 1  */}

        <div className="w-1/2 two-column-col  bg-gray-300 p-3 rounded-md right-col ">
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
          {
            /* Save or cancel button */
            editMode ? (
              <div className="flex flex-cols mx-5 my-3 justify-end space-x-4">
                <button
                  className="p-1 w-20 hover:underline uppercase"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>

                <button
                  className="p-1 w-20 button-dark rounded hover:bg-neutral-600"
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
