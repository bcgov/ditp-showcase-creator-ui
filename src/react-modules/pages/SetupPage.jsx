
import { useState } from "react"
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { OnePageLayout } from "../setup-screen/OnePageLayout"

export const SetupPage = () => {


  const [myScreens, setMyScreens] = useState([
    { title: 'title 1 here', content: 'content 1here', image: 'image 1 here', id: 1 },
    { title: 'title 2 here', content: 'content 2here', image: 'image 2 here', id: 2 },
    { title: 'title 3 here', content: 'content 3here', image: 'image 3 here', id: 3 },
    { title: 'title 4 here', content: 'content 4here', image: 'image 4 here', id: 4 },
    { title: 'title 5 here', content: 'content 5here', image: 'image 5 here', id: 5 },
  ])


  const handleDragEnd = (event) => {
    const {active, over} = event


    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex((myScreen) => myScreen.id === active.id)
      const newIndex = myScreens.findIndex((myScreen) => myScreen.id === over.id) 
      console.log('oldIndex',oldIndex )
      console.log('newIndex',newIndex )
      return arrayMove(myScreens, oldIndex, newIndex)
      //console.log(finalOrder)

    })
  }


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >

      <h1>SetupPage</h1>

    <SortableContext
    items={myScreens}
    strategy={verticalListSortingStrategy}
    >


    {myScreens.map((myScreen) => (
      <OnePageLayout 
        myScreen={myScreen} 
        key={myScreen.id}
        />
    ))}

    </SortableContext>

    </DndContext>
  )
}
