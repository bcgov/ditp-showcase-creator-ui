import {useState} from 'react';

function TextInput({ label, personaIndex, element, handleJSONUpdate, placeholder}) {

    const handleChange = (event) => {
        handleJSONUpdate(personaIndex, element, event.target.value);
      };


  return (
    <div className="">
    <label className="text-neutral-500 dark:text-neutral-200" for={`${personaIndex}_${element}`}>{label}: </label>
    <input className="ml- block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6" 
      id={`${personaIndex}_${element}`} 
      type="text"  
      placeholder= {`  ${ placeholder}`}
      onChange={handleChange} />
    </div>
    
  );
}

export { TextInput };
