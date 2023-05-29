import {NewCharacterButton} from './NewCharacterButton'
import {TextInput} from './../TextInput'

function CharacterScreen({ showcaseJSON, setShowcaseJSON, selectedCharacter, setSelectedCharacter, handleJSONUpdate}) {

  const handleClick = (e) => {
    setSelectedCharacter(e.target.value)
  }



  return (
    <div className="border grid grid-cols-2">
      <div className="flex justify-center items-center flex-col">

        <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
          SELECT CHARACTER
        </h2>

        <div className="grid grid-cols-4">
          {showcaseJSON.personas.map((person, index) => (
            <div key={index} className={`border p-1 m-3 flex justify-center items-center flex-col ${selectedCharacter == index ? 'bg-white' : ''}`} >
              <p className="text-center">{person.name}</p>
              <button className="bg-white border rounded p-1 m-3"
                value={index}
                onClick={handleClick}>
                Select {person.name}
              </button>
            </div>
          ))}
        </div>

        <NewCharacterButton showcaseJSON={showcaseJSON} setShowcaseJSON={setShowcaseJSON} setSelectedCharacter={setSelectedCharacter}/>

      </div>

      <div className="flex justify-center items-center flex-col">
        <h2 className="text-1xl text-neutral-700 dark:text-white font-bold mb-5">
          EDIT CHARACTER
        </h2>
        <TextInput 
            label={"Name:"}
            personaIndex={selectedCharacter}
            element={"name"}
            handleJSONUpdate={handleJSONUpdate}
            showcaseJSON={showcaseJSON}
            selectedCharacter={selectedCharacter}
          />
      </div>
    </div>
  );
}

export { CharacterScreen };
