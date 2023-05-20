import {useState} from 'react';

function TextInput({ label, element, handleJSONUpdate, path }) {

    const handleChange = (event) => {
        handleJSONUpdate(path, event.target.value);
      };


  return (
    <label>
      {label}
      <input type="text"  onChange={handleChange} />
    </label>
  );
}

export { TextInput };
