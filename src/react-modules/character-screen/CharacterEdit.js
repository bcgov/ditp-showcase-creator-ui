import { TextInput, TextAreaInput } from "./../TextInput";
import { LocalTextInput, LocalTextAreaInput } from "./../LocalTextInput";
import { FileUploadFull, FileUploadBar } from "./../FileUpload";

function CharacterEdit({selectedCharacter, handleJSONUpdate, handleLocalUpdate, showcaseJSON, localJSON}){
    return(

        <div className="m-3">
            <div>
            <p>Character</p>
            <p className="text-2xl font-bold">Your Selected Character</p>
          </div>
            <div className="grid grid-cols-2 w-full">
              <LocalTextInput
                label={"Name"}
                personaIndex={selectedCharacter}
                element={["name"]}
                handleJSONUpdate={handleLocalUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
              <LocalTextInput
                label={"Role"}
                personaIndex={selectedCharacter}
                element={["type"]}
                handleJSONUpdate={handleLocalUpdate}
                showcaseJSON={showcaseJSON}
                localJSON={localJSON}
              />
            </div>
            <LocalTextAreaInput
              label={"Page Description"}
              personaIndex={selectedCharacter}
              element={["description"]}
              handleJSONUpdate={handleLocalUpdate}
              localJSON={localJSON}
              showcaseJSON={showcaseJSON}
            />
            <div className="grid grid-cols-2 w-full">
              <FileUploadFull
                text={"Headshot Image"}
                personaIndex={selectedCharacter}
                element={["headshot_image"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />

              <FileUploadFull
                text={"Full-Body Image"}
                personaIndex={selectedCharacter}
                element={["body_image"]}
                handleJSONUpdate={handleJSONUpdate}
                showcaseJSON={showcaseJSON}
              />
          
            </div>
          </div>
    )
}

export {CharacterEdit};