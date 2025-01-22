import { useState } from "react";
import { ShowcaseJSON } from "../types";
import "./../TextInput.css";
import { getNestedValue } from "../lib/json-helper";

export const LocalTextInput = ({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  placeholder,
}: {
  label: string;
  personaIndex: number;
  element: string[];
  handleJSONUpdate: (element: string[], newValue: string) => void;
  showcaseJSON: ShowcaseJSON;
  placeholder: string;
}) => {

 const initialValue = (() => {
    try {
      const persona = showcaseJSON.personas[personaIndex];
      if (!persona) return "";
      const val = getNestedValue(persona, element);
      return typeof val === 'string' ? val : val?.toString() || "";
    } catch {
      return "";
    }
  })();

  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleJSONUpdate(element, newValue);
  };

  return (
    <div className="">
      <label
        className="text-md font-bold"
        htmlFor={`${personaIndex}_${element.join("_")}`}
      >
        {label}
      </label>
      <input
        className="mt-3 dark:text-dark-text dark:bg-dark-input bg-light-bg border dark:border-dark-border"
        id={`${personaIndex}_${element.join("_")}`}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export const LocalTextAreaInput = ({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  placeholder,
}: {
  label: string;
  personaIndex: number;
  element: string[];
  handleJSONUpdate: (element: string[], newValue: string) => void;
  showcaseJSON: ShowcaseJSON;
  placeholder: string;
}) => {
  const initialValue = (() => {
    try {
      const persona = showcaseJSON.personas[personaIndex];
      if (!persona) return "";
      const val = getNestedValue(persona, element);
      return typeof val === 'string' ? val : val?.toString() || "";
    } catch {
      return "";
    }
  })();

  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleJSONUpdate(element, newValue);
  };
  return (
    <div className="">
      <label
        className="text-md font-bold"
        htmlFor={`${personaIndex}_${element}`}
      >
        {label}{" "}
      </label>
      <textarea
        className="rounded w-full dark:text-dark-text dark:bg-dark-input bg-light-bg resize-none mt-3 p-2 border dark:border-dark-border"
        rows={8}
        id={`${personaIndex}_${element}`}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
