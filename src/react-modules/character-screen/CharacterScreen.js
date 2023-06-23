import { NewCharacterButton } from "./NewCharacterButton";
import "./character-styles/character-screen.css";
import { useState, useEffect } from "react";
import { CharacterInfo } from "./CharacterInfo";
import { CharacterEdit } from "./CharacterEdit";
import { CharacterList } from "./CharacterList";
import { useImmer } from 'use-immer';

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
        "name":showcaseJSON.personas[selectedCharacter].name,
        "type":showcaseJSON.personas[selectedCharacter].type,
        "description":showcaseJSON.personas[selectedCharacter].description,
      })
  }, [selectedCharacter]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue){
    setLocalJSON((json) => {
      json[element] = newValue;
    });
  }

  // Save handler. When clicking save, send the mini JSON to the real, full JSON file
  function saveJSON(){
    handleJSONUpdate(selectedCharacter, ["name"], localJSON.name)
    handleJSONUpdate(selectedCharacter, ["type"], localJSON.type)
    handleJSONUpdate(selectedCharacter, ["description"], localJSON.description)

    setEditMode(false);
  }
  
  return (
    <>
      <div className="two-column-container mx-20 my-16">
        <div className="two-column-col md:w-3/5 pr-4">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-slate-50 text-start w-full">
                Select Your Character
              </h2>
              <p className="w-full">
                Select a character below or create a new one.
              </p>
            </div>
            {/* ADD BUTTON */}
            <div className="ml-auto m-5">
              <NewCharacterButton
                showcaseJSON={showcaseJSON}
                setShowcaseJSON={setShowcaseJSON}
                setSelectedCharacter={setSelectedCharacter}
              />
            </div>
          </div>

          <CharacterList
            setEditMode={setEditMode}
            showcaseJSON={showcaseJSON}
            localJSON={localJSON}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        </div>

        <div className="highlight-container w-2/5 rounded p-3">
          {editMode ? (
            // Toggling edit mode
            <CharacterEdit
              selectedCharacter={selectedCharacter}
              handleLocalUpdate={handleLocalUpdate}
              handleJSONUpdate={handleJSONUpdate}  // Updated this line
              showcaseJSON={showcaseJSON}           // Updated this line
              localJSON={localJSON}                 // Added this line
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
          {/* Save or cancel button */
          editMode ? (
          <div className="flex flex-cols mx-5 my-3 justify-end space-x-4">
            <button
              className="p-1 w-20 hover:underline uppercase"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>

            <button
              className="p-1 w-20 button-dark hover:bg-neutral-600"
              onClick={saveJSON}
            >
              SAVE
            </button>
          </div>) : null
          }
        </div>
      </div>
    </>
  );
}

export { CharacterScreen };
