import { TextInput, TextAreaInput } from "./../TextInput";
import { LocalTextInput, LocalTextAreaInput } from "./../LocalTextInput";
import { FileUploadFull, FileUploadBar } from "./../FileUpload";

function CharacterEdit({selectedCharacter, handleJSONUpdate, showcaseJSON, localJSON}){
    return(

        <>
            <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
              EDIT CHARACTER
            </h2>
            <div className="grid grid-cols-2 w-full">
              <LocalTextInput
                label={"Name:"}
                personaIndex={selectedCharacter}
                element={["name"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
              <LocalTextInput
                label={"Role:"}
                personaIndex={selectedCharacter}
                element={["type"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
            </div>
            <LocalTextAreaInput
              label={"Page Description:"}
              personaIndex={selectedCharacter}
              element={["description"]}
              handleJSONUpdate={handleJSONUpdate}
              localJSON={localJSON}
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
              
              <FileUploadFull
                text={"Celebration Image"}
                personaIndex={selectedCharacter}
                element={["revocationInfo", 0]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
            </div>
          </>
    )
}

export {CharacterEdit};