import {useState, useEffect} from 'react';

function TextInput({ label, personaIndex, element, handleJSONUpdate, showcaseJSON, selectedCharacter}) {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(showcaseJSON.personas[personaIndex].element)
  }, [selectedCharacter]);


    const handleChange = (event) => {
        setValue(event.target.value) 
        handleJSONUpdate(personaIndex, element, event.target.value);
        console.log(showcaseJSON.personas[personaIndex][element])
      };


  return (
    <div className="p-2">
    <label className="text-neutral-500 dark:text-neutral-200" for={`${personaIndex}_${element}`}>{label} </label>
    <input className="p-1" id={`${personaIndex}_${element}`} type="text" 
    value={showcaseJSON.personas[personaIndex].element}
    defaultValue={showcaseJSON.personas[personaIndex].element}
    onChange={handleChange} />
    </div>
    
  );
}

export { TextInput };
