import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useImmer } from 'use-immer'; // useImmer is an alternative to useState; it is useful for dealing with nested JSON
import { FileUploadFull, FileUploadBar } from './react-modules/FileUpload';
import {TextInput} from './react-modules/TextInput'
import {SaveButton} from './react-modules/SaveButton';
import {NavBar} from './react-modules/NavBar';
import {CharacterScreen} from './react-modules/character-screen/CharacterScreen';
import {DEFAULT_JSON} from './DEFAULT_JSON'

function App() {

  const [showcaseJSON, setShowcaseJSON] = useImmer(
    {
      personas: [
        DEFAULT_JSON
      ]
    }
  );

  const [darkMode, setDarkMode] = useState(true)
  const [selectedCharacter, setSelectedCharacter] = useState(0)


  function handleJSONUpdate(index, element, newValue) {
    setShowcaseJSON((json) => {
      json["personas"][index][element] = newValue;
    });
  }

  return (
    <>
      <div className={`dark:bg-gray-500 bg-white ${darkMode ? "dark" : ""}`}>

        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} showcaseJSON={showcaseJSON}/>
        
        
        <div className="container mx-auto bg-neutral-200 dark:bg-zinc-500 rounded-xl shadow-xl border p-8 m-10 mt-5">
          <p className="text-3xl text-neutral-700 dark:text-white font-bold mb-5">
            Welcome!
          </p>
          <p className="text-neutral-500 dark:text-neutral-200 text-lg">
            React and Tailwind CSS in action
          </p>

          <CharacterScreen showcaseJSON={showcaseJSON} setShowcaseJSON={setShowcaseJSON} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} handleJSONUpdate={handleJSONUpdate}/>

          <TextInput 
            label={"My text input"}
            personaIndex={0}
            element={"name"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
          />



          <FileUploadBar text={"Upload My Custom Image:"}/>
          <FileUploadFull text={"SVG, PNG, JPG or GIF (MAX. 800x400px)"}/>

        </div>

        <p className="p-10 m-5 border rounded dark:text-neutral-200">
          {JSON.stringify(showcaseJSON, null, "\t")}
        </p>
      </div>
    </>
  );
}
export default App;
