import { Credentials, ShowcaseJSON } from "../../../types";
import { Credential } from "./Credential";

export const CredentialsList = ({
  selectedCharacter,
  setComponentToMount,
  setSelectedCredential,
  showcaseJSON,
  setTempData,
  setCreateButtonClicked,
  selectedCredential,
  handleCredentialRemoval,
  createButtonClicked,
}: {
  showcaseJSON: ShowcaseJSON;
  selectedCharacter: number;
  setComponentToMount: (component: string) => void;
  setSelectedCredential: (credential: keyof Credentials) => void;
  setTempData: (tempData: Credentials) => void;
  setCreateButtonClicked: (createButtonClicked: boolean) => void;
  selectedCredential: keyof Credentials | null;
  handleCredentialRemoval: (selectedCredential: keyof Credentials) => void;
  createButtonClicked: boolean;
}) => {
  // This function handles the selection of a credential
  function handleClick(credential: keyof Credentials) {
    // If the create button is clicked, reset back to the previous data.
    if (createButtonClicked) {
      setTempData(showcaseJSON.personas[selectedCharacter].credentials);
    }

    // Reset create button state.
    setCreateButtonClicked(false);

    // Set componentToMount to edit.
    setComponentToMount("edit");

    // Set the credential that was clicked.
    setSelectedCredential(credential);
  }

  return (
    <>
      <div>
        {/* Map through credentials and render Credential components */}
        {Object.entries(
          showcaseJSON.personas[selectedCharacter].credentials
        ).map((credential, index) => {
          return (
            <Credential
              // key={index}
              // index={credential}
              // handleClick={handleClick}
              // issuerName={credential[index].issuer_name}
              // credentialName={credential[index].name}
              // attributeCount={credential[index].attributes.length}
              // selectedCredential={selectedCredential}
              // handleCredentialRemoval={() =>
              //   handleCredentialRemoval(credential[index])
              // }
              // showcaseJSON={showcaseJSON}
              key={index}
              index={credential[0]}
              handleClick={handleClick}
              issuerName={credential[1].issuer_name}
              credentialName={credential[1].name}
              attributeCount={credential[1].attributes.length}
              selectedCredential={selectedCredential}
              handleCredentialRemoval={() =>
                handleCredentialRemoval(credential[0])
              }
              showcaseJSON={showcaseJSON}
            />
          );
        })}
      </div>
    </>
  );
}
