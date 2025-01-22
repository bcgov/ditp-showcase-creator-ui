import { CredentialsScreen } from "../credentials/CredentialsScreen";
import { ShowcaseJSON } from "../../types";

export const CredentialPage = ({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
}: {
  showcaseJSON: ShowcaseJSON;
  setShowcaseJSON: (updater: (draft: ShowcaseJSON) => void) => void;
  selectedCharacter: number;
}) => {
  return (
    <div>
      <CredentialsScreen
        showcaseJSON={showcaseJSON}
        setShowcaseJSON={setShowcaseJSON}
        selectedCharacter={selectedCharacter}
      />
    </div>
  );
};
