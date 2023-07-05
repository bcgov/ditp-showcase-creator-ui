import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripVertical,
  faPen,
  faTrash,
  faDisplay,
} from "@fortawesome/free-solid-svg-icons";

export const SortableStep = ({
  selectedStep,
  setSelectedStep,
  myScreen,
  stepIndex,
  totalSteps,
}) => {
  //Attribute we need to apply to the element we want to make sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: myScreen.screenId,
    });

  const style = {
    // We can use the `transform` prop to have the element
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
            myScreen.credentials ? "text-highlight font-bold" : ""
          }`}
        >
          {myScreen.credentials ? "Issue Step" : "Basic Step"}
        </p>
        <p className="font-bold">
          {myScreen.title} - ({stepIndex} / {totalSteps})
        </p>

        <div
          className={`highlight-container w-full flex flex-row justify-items-center items-center rounded p-3 
        ${selectedStep == stepIndex - 1 ? "selected-item" : "unselected-item"}`}
        >
          {
            // SCREEN IMAGE HERE
            <p className="text-2xl p-2 mx-2 rounded highlight-text">
              <FontAwesomeIcon icon={faDisplay} />
            </p>
          }

          {myScreen.text.length > 90 ? (
            <p>
              {myScreen.text.slice(0, 90)}...{" "}

              <span className="font-bold">
              see more
                 
              </span>
            </p>
          ) : (
            myScreen.text
          )}
        </div>
      </div>
      
    </div>
    
  );
};
