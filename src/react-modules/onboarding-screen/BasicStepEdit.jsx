import { useEffect } from 'react'
import {useImmer} from 'use-immer'

import { LocalTextInput, LocalTextAreaInput } from "./../LocalTextInput";
function BasicStepEdit({ selectedCharacter, selectedStep, showcaseJSON, setShowcaseJSON, saveJSON}) {

  // Seperately update a mini version of the json, containing only the fields for this page
  const [localJSON, setLocalJSON] = useImmer();

  // Change this mini version of the json, when the character changes
  useEffect(() => {
    setLocalJSON({
        "title":showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].title,
        "text":showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].text,
        "image":showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].image,
        "screenId":showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].screenId,
      })
  }, [selectedCharacter, selectedStep]);

  // Function similar to handleJSONUpdate in App.js
  function handleLocalUpdate(element, newValue){
    setLocalJSON((json) => {
      json[element] = newValue;
    });

    // Call save json immediately. Todo: wire this up to a save button
    saveJSON();
  }

  // Save handler. When clicking save after editing a step, send the mini JSON to the real, full JSON file
  function saveJSON(localJSON){
    setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding[selectedStep] = localJSON;
      });
  }

  

  return (
    <div className="flex flex-col p-5">
      <p>Onboarding</p>
      <p className="text-4xl font-bold">Edit a Basic Step</p>
      <hr />
      <LocalTextInput
        label={"Page Title"}
        personaIndex={selectedCharacter}
        element={["title"]}
        handleJSONUpdate={handleLocalUpdate}
        showcaseJSON={showcaseJSON}
        localJSON={localJSON}
      />


    </div>

  );
}

export { BasicStepEdit };
