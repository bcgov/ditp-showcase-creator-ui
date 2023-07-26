import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faPen,
  faTrash,
  faDisplay,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

export const ScenarioStep = ({
  selectedStep,
  setSelectedStep,
  setSelectedScenario,
  selectedCharacter,
  step,
  stepIndex,
  scenarioIndex,
  totalSteps,
  showcaseJSON,
  deleteStep,
  setState,
}) => {
  //Attribute we need to apply to the element we want to make sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: step.screenId,
    });

  const style = {
    // We can use the `transform` prop to have the element
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const MAX_CHARS = 110;
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 flex flex-row justify-items-center items-center w-full"
    >
      <span className="text-2xl mt-10">
        <FontAwesomeIcon icon={faGripVertical} />
      </span>
      <button className="w-full" onClick={(e) => {
        e.preventDefault();
        setSelectedStep(stepIndex);
        setSelectedScenario(scenarioIndex);
        setState("basic-step-edit")
      }}>
      <div className="px-3 flex-flex-col w-full justify-items-center">
        <p
          className={`text-sm ${
            step.credentials ? "text-highlight font-bold" : ""
          }`}
        >
          {step.requestOptions ? "Proof Step" : "Basic Step"}
        </p>
        <p className="font-bold">
          {step.title} - ({stepIndex + 1} / {totalSteps})
        </p>

        <div
          className={`highlight-container w-full flex flex-col justify-items-center items-center rounded p-3 
        ${selectedStep == stepIndex - 1 ? "selected-item" : "unselected-item"}`}
        >
          
          <div className="highlight-container w-full flex flex-row justify-items-center items-center rounded p-3">
            {
              // SCREEN IMAGE HERE
              <p className="text-2xl p-2 mx-2 rounded highlight-text">
                {
                  // showcaseJSON.personas[selectedCharacter].onboarding[stepIndex - 1].image

                  // ? <img width="100px" src={showcaseJSON.personas[selectedCharacter].onboarding[stepIndex - 1].image}/> :
                  <FontAwesomeIcon icon={faDisplay} />
                }
              </p>
            }

            {step.text.length > MAX_CHARS ? (
              <p>
                {step.text.slice(0, MAX_CHARS)}...{" "}
                <span className="font-bold">see more</span>
              </p>
            ) : (
              step.text
            )}
          </div>
          

          {
            step.requestOptions ? (
              <>
                    <hr />
                    <div className="flex-row flex items-center justify-around w-full">
                      <p className="text-center">
                        Proof Request
                      </p>
                      <div className="added-credential-main p-2 m-2 rounded">
                    {
                        Object.keys(step.requestOptions.proofRequest.attributes).map(key =>
                          <p key={key}>{key}</p>
                        )

                      }
                      </div>
                      
                    </div>
                    
                  </>
            ) : null
                  
                }
        </div>
      </div>
      </button>
      <button className="px-3 hover-red" onClick={e => deleteStep(e,scenarioIndex,stepIndex)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
