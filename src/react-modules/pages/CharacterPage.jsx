import {CharacterScreen} from './../character-screen/CharacterScreen'

export const CharacterPage = ({showcaseJSON, setShowcaseJSON, selectedCharacter, setSelectedCharacter, handleJSONUpdate}) => {
  return (
    <>
    <div>CharacterPage</div>
    <CharacterScreen showcaseJSON={showcaseJSON} setShowcaseJSON={setShowcaseJSON} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} handleJSONUpdate={handleJSONUpdate}/>
    </>
  )
}
