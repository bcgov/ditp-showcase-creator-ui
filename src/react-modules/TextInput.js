import { useState, useEffect } from "react";

function TextInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
}) {
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   setValue(showcaseJSON.personas[personaIndex][element]);
  // }, [personaIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
    handleJSONUpdate(personaIndex, element, newValue);
  };

  return (
    <div className="p-1">
      <label
        className="text-neutral-500 dark:text-neutral-200"
        for={`${personaIndex}_${element}`}
      >
        {label}{" "}
      </label>
      <br />
      <input
        className="p-1 w-full"
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
    setValue(showcaseJSON.personas[personaIndex][element]);
  }, [personaIndex]);

  const handleChange = (newValue) => {
    setValue(newValue);
    handleJSONUpdate(personaIndex, element, newValue);
  };

  return (
    <div className="p-1 w-full">
      <label
        className="text-neutral-500 dark:text-neutral-200"
        for={`${personaIndex}_${element}`}
      >
        {label}{" "}
      </label>
      <br />
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
