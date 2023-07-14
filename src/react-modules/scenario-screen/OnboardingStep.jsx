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

export const OnboardingStep = ({
  selectedStep,
  setSelectedStep,
  selectedCharacter,
  step,
  stepIndex,
  totalSteps,
  showcaseJSON,
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
      <div className="px-3 flex-flex-col w-full justify-items-center">
        <p
          className={`text-sm ${
            step.credentials ? "text-highlight font-bold" : ""
          }`}
        >
          {step.credentials ? "Issue Step" : "Basic Step"}
        </p>
        <p className="font-bold">
          {step.title} - ({stepIndex + 1} / {totalSteps})
        </p>

        <div
          className={`highlight-container w-full flex flex-row justify-items-center items-center rounded p-3 
        ${selectedStep == stepIndex - 1 ? "selected-item" : "unselected-item"}`}
        >
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
        <hr />
        <div className="flex-col flex">
          {step.requestOptions.requestedCredentials
            ? step.requestOptions.requestedCredentials.map(
                (credential, index) => (
                  <div className="flex-row flex items-center justify-between">
                    <div className="flex">
                      {credential.icon ? (
                        <img width="100px" src={credential.icon} />
                      ) : (
                        <FontAwesomeIcon icon={faBuilding} />
                      )}
                    </div>
                    <div className="mx-5 w-full">
                      <p className="text-xs">
                        {
                          showcaseJSON.personas[selectedCharacter].credentials[
                            credential.name
                          ].issuer_name
                        }
                      </p>
                      <p className="text-lg font-bold">
                        {
                          showcaseJSON.personas[selectedCharacter].credentials[
                            credential.name
                          ].name
                        }
                      </p>
                    </div>
                    <p className="text-center">
                      Total Proofs: <span className="font-bold">{"???"}</span>
                    </p>
                  </div>
                )
              )
            : null}
        </div>
      </div>
      <button className="px-3 hover-red">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};