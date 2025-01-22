import { LocalTextInput, LocalTextAreaInput } from "../LocalTextInput";
import { FileUploadFull } from "../FileUpload";
import { ShowcaseJSON } from "../../types";

export const CharacterEdit = ({
  selectedCharacter,
  handleJSONUpdate,
  handleLocalUpdate,
  showcaseJSON,
}: {
  selectedCharacter: number;
  handleJSONUpdate: ( 
    personaIndex: number,
    element: string[],
    value: string | null
  ) => void;
  handleLocalUpdate: (element: string[], newValue: string) => void;
  showcaseJSON: ShowcaseJSON;
  localJSON: {
    name: string;
    type: string;
    description: string;
  };
}) => {
  return (
    <div className="m-3 text-light-text bg-light-bg-secondary dark:bg-dark-bg-secondary dark:text-dark-text">
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
          placeholder={"Character Name"}
        />
        <LocalTextInput
          label={"Role"}
          personaIndex={selectedCharacter}
          element={["type"]}
          handleJSONUpdate={handleLocalUpdate}
          showcaseJSON={showcaseJSON}
          placeholder={"Character Role"}
        />
      </div>
      <div className="my-6">
        <LocalTextAreaInput
          label={"Page Description"}
          personaIndex={selectedCharacter}
          element={["description"]}
          handleJSONUpdate={handleLocalUpdate}
          showcaseJSON={showcaseJSON}
          placeholder={"Page Description"}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        <FileUploadFull
          text={"Headshot Image"}
          personaIndex={selectedCharacter}
          element={["headshot_image"]}
          handleJSONUpdate={handleJSONUpdate}
        />

        <FileUploadFull
          text={"Full-Body Image"}
          personaIndex={selectedCharacter}
          element={["body_image"]}
          handleJSONUpdate={handleJSONUpdate}
        />
      </div>
    </div>
  );
}