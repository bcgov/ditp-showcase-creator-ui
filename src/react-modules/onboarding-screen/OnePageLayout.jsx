import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export const OnePageLayout = ({myScreen}) => {


  //Attribute we need to apply to the element we want to make sortable
 const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
 } = useSortable({
    id: myScreen.id
  })


  const style = {
    // We can use the `transform` prop to have the element
    transform: CSS.Transform.toString(transform), 
    transition
  }


  return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className="p-4"
    >
      <h1>{myScreen.title}</h1>
    </div>
  )
}
