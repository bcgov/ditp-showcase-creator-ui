import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { OnePageLayout } from "../onboarding-screen/OnePageLayout";

export const OnboardingPage = () => {
  const [myScreens, setMyScreens] = useState([
    {
      title: "title 1 here",
      content: "content 1here",
      image: "image 1 here",
      id: 1,
    },
    {
      title: "title 2 here",
      content: "content 2here",
      image: "image 2 here",
      id: 2,
    },
    {
      title: "title 3 here",
      content: "content 3here",
      image: "image 3 here",
      id: 3,
    },
    {
      title: "title 4 here",
      content: "content 4here",
      image: "image 4 here",
      id: 4,
    },
    {
      title: "title 5 here",
      content: "content 5here",
      image: "image 5 here",
      id: 5,
    },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === over.id
      );
      console.log("oldIndex", oldIndex);
      console.log("newIndex", newIndex);
      return arrayMove(myScreens, oldIndex, newIndex);
      //console.log(finalOrder)
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="justify-center items-center flex content-center">
        <div className="flex p-3 w-2/5 justify-center items-center flex-col">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-slate-50">
                Add your Steps
              </h2>
              <p className="w-full">
                Add pages below to create the onboarding steps.
              </p>
              <div className="mt-10">
                Hello world
                <SortableContext
                  items={myScreens}
                  strategy={verticalListSortingStrategy}
                >
                  {myScreens.map((myScreen) => (
                    <OnePageLayout myScreen={myScreen} key={myScreen.id} />
                  ))}
                </SortableContext>
              </div>
            </div>
          </div>
        </div>

        <div className="highlight-container w-2/5 rounded p-3">
          {
            /* Save or cancel button */

            <button
              className="p-1 w-20 button-dark hover:bg-neutral-600"
              onClick={null}
            >
              SAVE
            </button>
          }
        </div>
      </div>
    </DndContext>
  );
};
