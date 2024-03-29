import { useState, useEffect } from "react";
import "./../TextInput.css";

function LocalTextInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  localJSON,
  placeholder,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    switch (element.length) {
      case 7:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]][element[4]][element[5]][element[6]]
        );
        break;
      case 6:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]][element[4]][element[5]]
        );
        break;
      case 5:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]][element[4]]
        );
        break;
      case 4:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]]
        );
        break;
      case 3:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ]
        );
        break;
      case 2:
        setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]]);
        break;
      case 1:
        setValue(showcaseJSON.personas[personaIndex][element[0]]);
        break;
    }
  }, [personaIndex]);

  const handleChange = (newValue, id) => {
    setValue(newValue);
    handleJSONUpdate(element, newValue);
  };

  return (
    <div className="">
      <label
        className="text-md font-bold"
        htmlFor={`${personaIndex}_${element}`}
      >
        {label}
      </label>
      <input
        className=" mt-3 dark:text-dark-text dark:bg-dark-input bg-light-bg border dark:border-dark-border"
        id={`${personaIndex}_${element}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

function LocalTextAreaInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  localJSON,
  placeholder,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    switch (element.length) {
      case 5:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]][element[4]]
        );
        break;
      case 4:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ][element[3]]
        );
        break;
      case 3:
        setValue(
          showcaseJSON.personas[personaIndex][element[0]][element[1]][
            element[2]
          ]
        );
        break;
      case 2:
        setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]]);
        break;
      case 1:
        setValue(showcaseJSON.personas[personaIndex][element[0]]);
        break;
    }
  }, [personaIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
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
        rows="8"
        id={`${personaIndex}_${element}`}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export { LocalTextInput, LocalTextAreaInput };
