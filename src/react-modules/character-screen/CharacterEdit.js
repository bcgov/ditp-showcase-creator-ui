import { TextInput, TextAreaInput } from "./../TextInput";
import { FileUploadFull, FileUploadBar } from "./../FileUpload";

function CharacterEdit({selectedCharacter, handleJSONUpdate, showcaseJSON}){
    return(

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