import { NoSelection } from "../credentials/no-selection";
import { Trash2 } from "lucide-react";
import { ShowcaseJSON } from "@/types";
import { useTranslations } from 'next-intl';

interface DisplayAddedCredentialsProps {
  selectedCharacter: number;
  showcaseJSON: ShowcaseJSON;
  localJSON: {
    credentials?: string[];
  };
  removeCredential: (credential: string) => void;
}

export const DisplayAddedCredentials = ({
  selectedCharacter,
  showcaseJSON,
  localJSON,
  removeCredential,
}: DisplayAddedCredentialsProps) => {
  const t = useTranslations()
  const credentials = localJSON.credentials || [];
  const hasCredentials = credentials.length > 0;

  if (!hasCredentials) {
    return (
      <div className="m-5 p-5 w-full h-60">
        <NoSelection text={t('onboarding.no_credentials_added_message')} />
      </div>
    );
  }

  return (
    <div className="">
      <p className="text-md font-bold mt-2">Credential Added:</p>

      {credentials.map((credential: string, index: number) => {
        const credentialData = showcaseJSON.personas[selectedCharacter].credentials[credential];

        if (!credentialData) return null;

        return (
          <div key={`${credential}-${index}`} className="flex flex-row">
            <div className="w-full border rounded my-3 bg-light-bg hover:bg-light-btn-hover dark:border-dark-border dark:bg-dark-bg dark:hover:bg-dark-input text-light-text dark:text-dark-text">
              <div className="credential rounded px-1 py-2">
                <div className="grid grid-cols-3 p-2">
                  <div className="col-span-2">
                    <div className="text-xs">
                      <p>{credentialData.issuer_name}</p>
                    </div>
                    <div className="text-lg font-bold">
                      <p>{credentialData.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center align-center">
                    <p className="border border-black border-solid rounded-lg text-xs py-1 px-2 flex justify-center items-center dark:border-white">
                      Attributes: {credentialData.attributes.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="remove flex items-center text-xl justify-center w-1/5 trash-button"
              onClick={(e) => {
                e.preventDefault();
                removeCredential(credential);
              }}
            >
              <Trash2 className="cursor-pointer" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
