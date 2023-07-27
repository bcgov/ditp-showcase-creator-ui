import { TextInput, TextAreaInput } from "./../TextInput";
import { LocalTextInput, LocalTextAreaInput } from "./../LocalTextInput";
import { FileUploadFull, FileUploadBar } from "./../FileUpload";

function CharacterEdit({
  selectedCharacter,
  handleJSONUpdate,
  handleLocalUpdate,
  showcaseJSON,
  localJSON,
}) {
  return (
    <div className="m-3">
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">Character</p>
          <h3 className="text-4xl font-bold text-slate-50">Your Character</h3>
        </div>
      </div>
      <hr className="mb-6"></hr>
      <div className="grid grid-cols-2 gap-2 my-6">
        <LocalTextInput
          label={"Name"}
          personaIndex={selectedCharacter}
          element={["name"]}
          handleJSONUpdate={handleLocalUpdate}
          showcaseJSON={showcaseJSON}
          localJSON={localJSON}
          placeholder={"Character Name"}
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
      <div className="my-6">
        <LocalTextAreaInput
          label={"Page Description"}
          personaIndex={selectedCharacter}
          element={["description"]}
          handleJSONUpdate={handleLocalUpdate}
          localJSON={localJSON}
          showcaseJSON={showcaseJSON}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
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
  );
}

export { CharacterEdit };
