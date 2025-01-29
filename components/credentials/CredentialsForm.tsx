import { CredentialAttributesList } from "./components/CredentialAttributesList";
import { CredentialElement, Credentials } from "@/types";
import { useTranslation } from "react-i18next";

export const CredentialsForm = ({
  handleChange,
  tempData,
  selectedCredential,
  addAttribute,
  removeAttribute,
}: {
  handleChange: (element: CredentialElement, index: number | string, newValue: string) => void;
  tempData: Credentials;
  selectedCredential: keyof Credentials | null;
  addAttribute: (selectedCredential: keyof Credentials) => void;
  removeAttribute: (selectedCredential: keyof Credentials, index: number) => void;
}) => {
  const { t } = useTranslation()

  return (
    <>
      {/* Title and Header */}
      <div className="flex justify-between mt-3">
        <div>
          <p className="text-slate-100 text-sm">{t('credentials_add_header_subtitle')}</p>
          <h3 className="text-4xl font-bold text-slate-50">
              {t('credentials_add_header_title')}
          </h3>
        </div>
      </div>
      <hr className="mb-6"></hr>

      {/* Credential Name Input */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="cred_name">
            {t('credentials_add_credential_name_label')}
        </label>
        <br />
        <input
          type="text"
          id="cred_name"
          name="cred_name"
          placeholder={t('credentials_add_credential_name_placeholder')}
          value={
            selectedCredential !== null &&
            tempData[selectedCredential]
              ? tempData[selectedCredential].name
              : ""
          }
          onChange={(e) => selectedCredential !== null && handleChange(["name"], selectedCredential, e.target.value)}
          className="dark:bg-dark-input mt-3 border dark:border-dark-border"
        />
      </div>

      {/* Issuer Name Input */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="issuer_name">
            {t('credentials_add_issuer_name_label')}
        </label>
        <br />
        <input
          type="text"
          id="issuer_name"
          name="issuer_name"
          placeholder={t('credentials_add_issuer_name_placeholder')}
          value={
            selectedCredential !== null &&
            tempData[selectedCredential]
              ? tempData[selectedCredential].issuer_name
              : ""
          }
          onChange={(e) => selectedCredential !== null && handleChange(["issuer_name"], selectedCredential, e.target.value)}
          className="dark:bg-dark-input mt-3 border dark:border-dark-border"
        />
      </div>

      {/* Add Attributes Section */}
      <div className="my-3">
        <label className="font-bold text-md">{t('credentials_add_add_attributes_label')}</label>
        <CredentialAttributesList
          tempData={tempData}
          selectedCredential={selectedCredential}
          handleChange={handleChange}
          addAttribute={addAttribute}
          removeAttribute={removeAttribute}
        />
      </div>
    </>
  );
}
