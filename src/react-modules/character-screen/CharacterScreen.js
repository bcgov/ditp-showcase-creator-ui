import { NewCharacterButton } from "./NewCharacterButton";
import "./character-styles/character-screen.css";
import { useState, useEffect } from "react";
import { CharacterInfo } from "./CharacterInfo";
import { CharacterEdit } from "./CharacterEdit";
import { CharacterList } from "./CharacterList";

function CharacterScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedCharacter,
  handleJSONUpdate,
}) {

  const [editMode, setEditMode] = useState(false);

  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useState(); 

  // Change this mini version of the json, when the character changes
  useEffect(() => {
    setLocalJSON({
        "name":showcaseJSON.personas[selectedCharacter].name,
        "type":showcaseJSON.personas[selectedCharacter].type,
        "description":showcaseJSON.personas[selectedCharacter].description,
      })
  }, [selectedCharacter]);

  // To-do: Create a function similar to handleJSONUpdate in App.js
  // Then, instead of passing the actual JSON to the text fields in <CharacterEdit>, pass the mini json and the mini handler

  // To-do: Impliment a save handler. When clicking save, send the mini JSON to the real, full JSON file

  return (
    <>
      <div className="justify-center items-center flex content-center">
        <div className="flex p-3 w-2/5 justify-center items-center flex-col">
          <div className="flex w-full">
            <div>
              <h2 className="text-2xl text-white text-start w-full font-bold">
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
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        </div>

        <div className="highlight-container w-2/5 rounded p-3">
          {editMode ? (
            // Toggling edit mode
            <CharacterEdit
              selectedCharacter={selectedCharacter}
              handleJSONUpdate={handleJSONUpdate}
              showcaseJSON={showcaseJSON}
            />
          ) : (
            <CharacterInfo
              setShowcaseJSON={setShowcaseJSON}
              showcaseJSON={showcaseJSON}
              setSelectedCharacter={setSelectedCharacter}
              selectedCharacter={selectedCharacter}
              setEditMode={setEditMode}
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
              onClick={() => setEditMode(false)}
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
