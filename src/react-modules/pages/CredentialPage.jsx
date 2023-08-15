import { CredentialsScreen } from "../credentials/CredentialsScreen";
export const CredentialPage = ({
  showcaseJSON,
  setShowcaseJSON,
  selectedCharacter,
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
