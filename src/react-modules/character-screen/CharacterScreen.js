import { NewCharacterButton } from "./NewCharacterButton";
import { TextInput, TextAreaInput } from "./../TextInput";
import { FileUploadFull, FileUploadBar } from "./../FileUpload";
import "./character-styles/character-screen.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {CharacterInfo} from "./CharacterInfo"

function CharacterScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedCharacter,
  handleJSONUpdate,
}) {


  const handleClick = (e) => {
    setSelectedCharacter(e.currentTarget.value);
  };

  const handleRemove = (e, i) => {
    if (showcaseJSON.personas.length == 1) return;

    // Prevent out of bounds selected character
    if (
      (selectedCharacter == i ||
        showcaseJSON.personas.length - 1 == selectedCharacter) &&
      selectedCharacter != 0
    ) {
      setSelectedCharacter(selectedCharacter - 1);
    }

    setShowcaseJSON((json) => {
      json["personas"].splice(i, 1);
    });
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="justify-center items-center flex content-center">
      <div className="flex p-3 w-2/5 justify-center items-center flex-col">
        <div className="flex w-full">
          <div>
          <h2 className="text-2xl text-white text-start w-full font-bold">
            Select Your Character
          </h2>
          <p className="w-full">Select a character below or create a new one.</p>
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

        <div className="grid grid-cols-3">
          {showcaseJSON.personas.map((person, index) => (
            <button value={index} key={index} onClick={handleClick}>
              <div>
                <div
              
                  
                  className={`character-circle flex items-center justify-center p-3 m-3  ${
                    selectedCharacter == index ? "selected-item" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="p-2">
                  <p className="text-center">{person.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="highlight-container w-2/5 rounded p-3">
        {editMode ? (
          // Toggling edit mode
          <>
            <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
              EDIT CHARACTER
            </h2>
            <div className="grid grid-cols-2 w-full">
              <TextInput
                label={"Name:"}
                personaIndex={selectedCharacter}
                element={["name"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
              <TextInput
                label={"Role:"}
                personaIndex={selectedCharacter}
                element={["type"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
            </div>
            <TextAreaInput
              label={"Page Description:"}
              personaIndex={selectedCharacter}
              element={["description"]}
              handleJSONUpdate={handleJSONUpdate}
              showcaseJSON={showcaseJSON}
            />
            <div className="grid grid-cols-3 w-full">
              <FileUploadFull
                text={"Body Image"}
                personaIndex={selectedCharacter}
                element={["image"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />

              <FileUploadFull
                text={"Avatar Image"}
                personaIndex={selectedCharacter}
                element={["revocationInfo", 0]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
            </div>
          </>
        ) : (
          <CharacterInfo showcaseJSON={showcaseJSON} selectedCharacter={selectedCharacter} handleRemove={handleRemove} setEditMode={setEditMode}/>
        )
        }
      </div>
    </div>
  );
}

export { CharacterScreen };
