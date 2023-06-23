import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faPen, faTrash, faDisplay } from "@fortawesome/free-solid-svg-icons";

export const OnePageLayout = ({ myScreen, stepIndex, totalSteps }) => {
  //Attribute we need to apply to the element we want to make sortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: myScreen.screenId
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
      className="p-4 flex flex-row justify-items-center items-center"
    >
      <FontAwesomeIcon icon={faGripVertical} />
      <div className="px-3 flex-flex-col w-full justify-items-center">
        <p className="font-bold">
          {myScreen.title} - ({stepIndex} / {totalSteps})
        </p>

        <div className="highlight-container w-full flex flex-row justify-items-center items-center rounded p-3">
          {
            // SCREEN IMAGE HERE
            <p className="text-2xl p-2 mx-2 rounded highlight-text"><FontAwesomeIcon icon={faDisplay} /></p>
          }
        
            {
            myScreen.text.length > 90 ?
            <p>{(myScreen.text.slice(0,90))}... <span className="font-bold"> see more</span></p>
               
            : 
              myScreen.text
              }
        </div>
      </div>

      <button className="mx-2 mt-5"><FontAwesomeIcon icon={faTrash} /></button>
      <button className="mx-2 mt-5"><FontAwesomeIcon icon={faPen} /></button>
      
      
    </div>
  );
};
