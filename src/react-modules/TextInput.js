import {useState} from 'react';

function TextInput({ label, personaIndex, element, handleJSONUpdate}) {

    const handleChange = (event) => {
        handleJSONUpdate(personaIndex, element, event.target.value);
      };


  return (
    <div className="p-2">
    <label className="text-neutral-500 dark:text-neutral-200" for={`${personaIndex}_${element}`}>{label}: </label>
    <input className="p-1" id={`${personaIndex}_${element}`} type="text"  onChange={handleChange} />
    </div>
    
  );
}

export { TextInput };
