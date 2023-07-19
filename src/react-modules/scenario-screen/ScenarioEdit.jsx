import { useEffect } from "react";
import { useImmer } from "use-immer";
import { LocalFileUpload } from "./../onboarding-screen/LocalFileUpload";

function ScenarioEdit({ selectedScenario, saveScenario, showcaseJSON, selectedCharacter, setState }) {

  const [localData, setLocalData] = useImmer(showcaseJSON.personas[selectedCharacter].scenarios[selectedScenario])

  const changeScenario = (newValue, element, secondElement) => {
    if(!secondElement){
      setLocalData(json =>{
        json[element] = newValue
      })
    }else{
      setLocalData(json =>{
        json[element][secondElement] = newValue
      })
    }
  }

  return (
    <div className="flex flex-col p-5">
      <p>Scenario</p>
      <p className="text-4xl font-bold">Edit Scenario</p>
      <hr />

      <form onSubmit={null}>
        {/* TITLE */}
        <div className="p-1 mt-5">
          <label className="text-neutral-500 dark:text-neutral-200">
            <span className="p-1 text-xl font-bold">Scenario Name</span>
          </label>
          <br />
          <input className="p-1 w-full field-background" type="text" value={localData.name} onChange={(e) => changeScenario(e.target.value, "name")}/>
        </div>

        <div className="my-5">
          <p className="p-1 text-2xl font-bold">Overview</p>

          <div className="p-1">
            <label className="text-neutral-500 dark:text-neutral-200">
              <span className="">Page Title</span>
            </label>
            <br />
            <input className="p-1 w-full field-background" type="text" value={localData.overview.title} onChange={(e) => changeScenario(e.target.value, "overview", "title" )}/>
          </div>

          <div className="flex flex-row">
            <div className="p-1">
              <label className="text-neutral-500 dark:text-neutral-200">
                {"Page Description"}
              </label>
              <textarea
                className="p-1 w-full resize-none field-background"
                rows="8"
                type="text"
                value={localData.overview.text} onChange={(e) => changeScenario(e.target.value, "overview", "text" )}
              />
            </div>
            {/* <LocalFileUpload
            text={null}
            element={"test"}
            handleLocalUpdate={null}
            localJSON={null}
          /> */}
            FILE UPLOAD HERE
          </div>
        </div>


          <hr/>

        <div className="my-5">
          <p className="p-1 text-2xl font-bold">Summary</p>

          <div className="p-1">
            <label className="text-neutral-500 dark:text-neutral-200">
              <span className="">Page Title</span>
            </label>
            <br />
            <input className="p-1 w-full field-background" type="text" value={localData.summary.title} onChange={(e) => changeScenario(e.target.value, "summary", "title" )}/>
          </div>

          <div className="flex flex-row">
            <div className="p-1">
              <label className="text-neutral-500 dark:text-neutral-200">
                {"Page Description"}
              </label>
              <textarea
                className="p-1 w-full resize-none field-background"
                rows="8"
                type="text"
                value={localData.summary.text} onChange={(e) => changeScenario(e.target.value, "summary", "text" )}
              />
            </div>
            {/* <LocalFileUpload
            text={null}
            element={"test"}
            handleLocalUpdate={null}
            localJSON={null}
          /> */}
            FILE UPLOAD HERE
          </div>
        </div>

        <div className="flex flex-cols mx-5 my-3 justify-end space-x-4 items-baseline">
          <button onClick={e => {
            e.preventDefault()
            setState("none-selected")
          }} 
          className="p-1 w-20 hover:underline uppercase">
            Cancel
            </button>

          <input
            type="submit"
            value="Save"
            onClick={(e) => saveScenario(e, localData)}
            className="p-1 w-20 button-dark hover:bg-neutral-600"
          />
        </div>
      </form>
    </div>
  );
}

export { ScenarioEdit };
