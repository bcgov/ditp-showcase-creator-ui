import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Credentials, CredentialElement } from "@/types";
import { useTranslation } from "react-i18next";

export const CredentialAttribute = ({
  index,
  attributeName,
  attributeValue,
  credType,
  handleChange,
  selectedCredential,
  removeAttribute,
}: {
  index: number;
  attributeName: string;
  attributeValue: string;
  credType: string;
  handleChange: (element: CredentialElement, index: number | string, newValue: string) => void;
  selectedCredential: keyof Credentials | null;
  removeAttribute: (selectedCredential: keyof Credentials, index: number) => void;
}) => {
  const { t } = useTranslation()
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State variable used to determine if the input is a dateint.

  return (
    <div className="grid grid-cols-9 gap-2 mb-2" id={index.toString()}>
      {/* Dropdown to select attribute type */}
      <select
        name={`type`}
        id={`type`}
        className="col-span-2 truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
        value={credType || ""}
        onChange={(e) => {
          // Call the handleChange function and update local state
          handleChange(["attributes", "type"], index, e.target.value);
          setSelectedOption(e.target.value);
        }}
      >
        <option value="none">select</option>
        <option value="int">int</option>
        <option value="dateint">dateint</option>
        <option value="string">string</option>
      </select>

      {/* Input field for attribute name */}
      <input
        type="text"
        name={`name`}
        placeholder={t('credentials_attribute_name_placeholder')}
        value={attributeName || ""}
        onChange={(e) => handleChange(["attributes", "name"], index, e.target.value)}
        className="col-span-3 text-sm truncate dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
      />

      {/* Input field for attribute value */}
      <input
        type="text"
        name={`value`}
        placeholder={
          selectedOption === "dateint" ? "YYYY-MM-DD" : t('credentials_attribute_value_placeholder')
        }
        value={attributeValue || ""}
        onChange={(e) => handleChange(["attributes", "value"], index, e.target.value)}
        className="col-span-3 text-sm dark:text-dark-text dark:bg-dark-input border dark:border-dark-border"
      />

      {/* Trash button to remove the attribute */}
      <div
        className=" flex items-center text-lg trash-button justify-center"
        onClick={() => selectedCredential !== null && removeAttribute(selectedCredential, index)}
      >
        <FontAwesomeIcon icon={faTrash} /> {/* Display trash icon */}
      </div>
    </div>
  );
};
