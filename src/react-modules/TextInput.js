import { useState, useEffect } from "react";

function TextInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  // value,
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
      default:
        return;
    }
  }, [personaIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
    handleJSONUpdate(personaIndex, element, newValue);
  };

  return (
    <div className="p-1">
      <label className="" htmlFor={`${personaIndex}_${element}`}>
        {label}{" "}
      </label>
      <br />
      <input
        className="p-1 w-full bg-light-bg"
        id={`${personaIndex}_${element}`}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

function TextAreaInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
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
      default:
        return;
    }
  }, [personaIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
    handleJSONUpdate(personaIndex, element, newValue);
  };

  return (
    <div className="">
      <label className="" htmlFor={`${personaIndex}_${element}`}>
        {label}:{" "}
      </label>
      <textarea
        className="p-1 w-full resize-none"
        id={`${personaIndex}_${element}`}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export { TextInput, TextAreaInput };
