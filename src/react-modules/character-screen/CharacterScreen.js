import { NewCharacterButton } from "./NewCharacterButton";
import { TextInput, TextAreaInput } from "./../TextInput";
import { FileUploadFull } from "./../FileUpload";

function CharacterScreen({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
  setSelectedCharacter,
  handleJSONUpdate,
}) {
  const handleClick = (e) => {
    setSelectedCharacter(e.target.value);
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

  return (
    <div className="border grid grid-cols-2">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
          Select Your Character
        </h2>
        <p>Select a character below or create a new one.</p>

        <div className="grid grid-cols-3">
          {showcaseJSON.personas.map((person, index) => (
            <div
              key={index}
              className={`border p-1 m-3 flex justify-center items-center flex-col ${
                selectedCharacter == index ? "bg-white" : ""
              }`}
            >
              {/* REMOVE BUTTON */}
              <div className="ml-auto">
                {
                  // Conditionally render the remove button. There must always be one character.
                  showcaseJSON.personas.length > 1 ? (
                    <button
                      className="border p-1 bg-red-400 rounded"
                      onClick={(event) => handleRemove(event, index)}
                    >
                      [x]
                    </button>
                  ) : null
                }
              </div>

              <div className="p-2">
                <p className="text-center">{person.name}</p>
              </div>

              {/* SELECT BUTTON */}
              <button
                className="bg-white border rounded p-1 m-3"
                value={index}
                onClick={handleClick}
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {/* ADD BUTTON */}
        <div className="ml-auto">
          <NewCharacterButton
            showcaseJSON={showcaseJSON}
            setShowcaseJSON={setShowcaseJSON}
            setSelectedCharacter={setSelectedCharacter}
          />
        </div>
      </div>

      <div className="p-3 flex justify-center items-center flex-col">
        <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
          EDIT CHARACTER
        </h2>
        <div className="grid grid-cols-2 w-full">
          <TextInput
            label={"Name:"}
            personaIndex={selectedCharacter}
            element={"name"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
          <TextInput
            label={"Role:"}
            personaIndex={selectedCharacter}
            element={"type"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
        </div>
        <TextAreaInput
          label={"Page Description:"}
          personaIndex={selectedCharacter}
          element={"description"}
          handleJSONUpdate={handleJSONUpdate}
          showcaseJSON={showcaseJSON}
        />
        <div className="grid grid-cols-3 w-full">

          <FileUploadFull 
            text={"Body Image"} 
            personaIndex={selectedCharacter}
            element={'image'}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
          
          <FileUploadFull 
            text={"Avatar Image"} 
            personaIndex={selectedCharacter}
            element={'onboarding'}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />
{/* 
          <FileUploadFull text={"Avatar Image"} />
          <FileUploadFull text={"Celebration Image"} /> */}


        </div>
      </div>
    </div>
  );
}

export { CharacterScreen };
