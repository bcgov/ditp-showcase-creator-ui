import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faTrash,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";
import { ScenarioStep as ScenarioStepType, ScenarioStepState } from "../../types";

export const ScenarioStep = ({
  selectedStep,
  setSelectedStep,
  setSelectedScenario,
  step,
  stepIndex,
  scenarioIndex,
  totalSteps,
  deleteStep,
  setState,
}: {
  selectedStep: number | null;
  setSelectedStep: (step: number | null) => void;
  setSelectedScenario: (scenario: number | null) => void;
  step: ScenarioStepType;
  stepIndex: number;
  scenarioIndex: number;
  totalSteps: number;
  deleteStep: (scenarioIndex: number, stepIndex: number) => void;
  setState: (state: ScenarioStepState) => void;
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
      <button
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          setSelectedStep(stepIndex);
          setSelectedScenario(scenarioIndex);
          setState("basic-step-edit");
        }}
      >
        <div className="px-3 flex flex-col w-full ">
          <p
            className={`text-sm ${
              step.requestOptions ? "text-highlight font-bold" : ""
            }`}
          >
            {step.requestOptions ? "Proof Step" : "Basic Step"}
          </p>
          <p className="font-bold">
            {step.title} - ({stepIndex + 1} / {totalSteps})
          </p>

          <div
            className={`w-full flex text-sm flex-col rounded  hover:bg-light-btn-hover dark:hover:bg-dark-btn-hover
        ${
          selectedStep === stepIndex - 1
            ? "selected-item"
            : "border border-light-border dark:border-dark-border "
        }`}
          >
            <div className="w-full flex flex-row justify-items-center items-center rounded p-3">
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

              {step.text && step.text.length > MAX_CHARS ? (
                <p>
                  {step.text.slice(0, MAX_CHARS)}...{" "}
                  <span className="font-bold">see more</span>
                </p>
              ) : (
                step.text
              )}
            </div>

            {step.requestOptions &&
            step.requestOptions.proofRequest &&
            step.requestOptions.proofRequest.attributes ? (
              <>
                <hr />
                <div className="w-full py-2">
                  {/* <p className="">Proof Request</p> */}
                  <div className="">
                    {/* {
                      Object.keys(step.requestOptions.proofRequest.attributes)
                        .length
                    } */}
                    <p className="text-sm m-1 mt-2 font-bold">
                      Requested Credentials:
                    </p>
                    <div className="flex items-center align-center justify-center">
                      {Object.keys(
                        step.requestOptions.proofRequest.attributes
                      ).map((key) => (
                        <div key={key}>
                          <div className="border dark:border-dark-border  rounded p-2 my-2 mx-2">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <p>Proof Request</p> */}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </button>
      <button
        className="px-3 hover-red"
        onClick={(e) => {
          e.preventDefault();
          deleteStep(scenarioIndex, stepIndex);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};
