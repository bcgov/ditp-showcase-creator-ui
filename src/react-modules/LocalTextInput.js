import { useState, useEffect } from "react";


function LocalTextInput({
  label,
  personaIndex,
  element,
  handleJSONUpdate,
  showcaseJSON,
  localJSON
}) {
  
  const [value, setValue] = useState("");

  useEffect(() => {

    switch(element.length){
      case 5:
          setValue(showcaseJSON.personas[personaIndex][element[0]] [element[1]] [element[2]] [element[3]] [element[4]]);
        break;
      case 4:
          setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]][element[2]][element[3]]);
        break;
      case 3:
          setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]][element[2]]);
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
    <div className="p-1">
      <label
        className="text-neutral-500 dark:text-neutral-200"
        htmlFor={`${personaIndex}_${element}`}
      >
        {label}{" "}
      </label>
      <br />
      <input
        className="p-1 w-full text-black"
        id={`${personaIndex}_${element}`}
        type="text"
        value={value}
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
  localJSON
}) {
  const [value, setValue] = useState("");

  useEffect(() => {

    switch(element.length){
      case 5:
          setValue(showcaseJSON.personas[personaIndex][element[0]] [element[1]] [element[2]] [element[3]] [element[4]]);
        break;
      case 4:
          setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]][element[2]][element[3]]);
        break;
      case 3:
          setValue(showcaseJSON.personas[personaIndex][element[0]][element[1]][element[2]]);
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
    <label className="text-neutral-500 dark:text-neutral-200" htmlFor={`${personaIndex}_${element}`}>{label}: </label>
      <textarea className="p-1 w-full resize-none text-black" id={`${personaIndex}_${element}`} type="text" 
      value={value}
      onChange={(e) => handleChange(e.target.value)} />

    </div>
  );
}

export { LocalTextInput, LocalTextAreaInput };
