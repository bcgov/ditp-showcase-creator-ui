import { CredentialElement, Credentials } from "@/types";
import { CredentialAttributesList } from "./components/CredentialAttributesList";
import { useTranslation } from "react-i18next";

export const CredentialsEdit = ({
  selectedCredential,
  tempData,
  addAttribute,
  handleChange,
  removeAttribute,
}: {
  selectedCredential: keyof Credentials | null;
  tempData: Credentials;
  addAttribute: (selectedCredential: keyof Credentials) => void;
  handleChange: (element: CredentialElement, index: number | string, newValue: string) => void;
  removeAttribute: (selectedCredential: keyof Credentials, index: number) => void;
}) => {
  const { t } = useTranslation()

  return (
    <>
      {/* Header section */}
      <div className="flex justify-between">
        <div>
          <p className="text-slate-100 text-sm">{t('credentials_edit_header_subtitle')}</p>
          <h3 className="text-4xl font-bold text-slate-50">
            {t('credentials_edit_header_title')}
          </h3>
        </div>
      </div>
      <hr className="mb-6"></hr>

      {/* Credential Name input field */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="name">
          {t('credentials_edit_credential_name_label')}
        </label>
        <input
          type="text"
          id="cred_name"
          name="cred_name"
          placeholder={t('credentials_edit_credential_name_placeholder')}
          value={
            selectedCredential !== null && tempData[selectedCredential]
              ? tempData[selectedCredential].name
              : ""
          }
          onChange={(e) =>
            selectedCredential !== null &&
            handleChange(["name"], selectedCredential, e.target.value)
          }
          className="mt-3 dark:bg-dark-input  border dark:border-dark-border"
        />
      </div>

      {/* Issuer Name input field */}
      <div className="my-6">
        <label className="text-md font-bold" htmlFor="issuer_name">
          {t('credentials_edit_issuer_name_label')}
        </label>
        <input
          type="text"
          id="issuer_name"
          name="issuer_name"
          placeholder={t('credentials_edit_issuer_name_placeholder')}
          value={
            selectedCredential !== null && tempData[selectedCredential]
              ? tempData[selectedCredential].issuer_name
              : ""
          }
          onChange={(e) =>
            selectedCredential !== null &&
            handleChange(["issuer_name"], selectedCredential, e.target.value)
          }
          className="mt-3 dark:bg-dark-input  border dark:border-dark-border"
        />
      </div>

      {/* Section to add attributes using CredentialAttributesList */}
      <div className="my-6">
        <label className="text-md font-bold">{t('credentials_edit_add_attributes_label')}</label>
        {/* Use CredentialAttributesList component to manage attributes */}
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
