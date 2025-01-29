import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Credentials, ShowcaseJSON } from "@/types";
import { useTranslation } from "react-i18next";

export const Credential = ({
  issuerName,
  credentialName,
  attributeCount,
  index,
  handleClick,
  selectedCredential,
  handleCredentialRemoval,
  showcaseJSON,
}: {
  issuerName: string;
  credentialName: string;
  attributeCount: number;
  index: keyof Credentials;
  handleClick: (index: keyof Credentials) => void;
  selectedCredential: keyof Credentials | null;
  handleCredentialRemoval: () => void;
  showcaseJSON: ShowcaseJSON;
}) => {
  const { t } = useTranslation()
  // Check if there's only one credential
  const isSingleCredential =
    Object.keys(showcaseJSON.personas[0].credentials).length === 1;

  return (
    <>
      <div className="flex flex-row">
        {/* Div that holds the main credential information */}
        <div
          className="w-full"
          data-cred-id={index}
          onClick={(e) => handleClick(index)}
        >
          {/* Container for the credential entry */}
          <div
            className={`credential  dark:hover:bg-dark-input hover:bg-light-btn-hover hover:cursor-pointer rounded p-3 mt-3 ${
              selectedCredential === index
                ? "selected-item"
                : "credential-border"
            }`}
          >
            {/* Grid for the credential details */}
            <div className="grid grid-cols-3">
              {/* Left column with issuer name and credential name */}
              <div className="col-span-2">
                <div className="credential-issuer-name">
                  <p>{issuerName}</p>
                </div>
                <div className="credential-credential-name">
                  <p>{credentialName}</p>
                </div>
              </div>
              {/* Right column with attribute count */}
              <div className="flex justify-center items-center align-center">
                <p className="border border-black border-solid rounded-lg text-xs py-1 px-2 flex justify-center items-center dark:border-white">
                  {t('credentials.item_attribute_count_label', { attributeCount })}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Div for the remove button */}
        <div
          className={`remove text-xl flex items-center justify-center w-1/5 ${
            isSingleCredential ? "hidden" : "trash-button"
          }`}
          onClick={() =>
            selectedCredential !== null && handleCredentialRemoval()
          }
        >
          <FontAwesomeIcon icon={faTrash} /> {/* Display trash icon */}
        </div>
      </div>
    </>
  );
}
