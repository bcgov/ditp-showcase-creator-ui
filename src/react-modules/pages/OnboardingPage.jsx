import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { OnePageLayout } from "../onboarding-screen/OnePageLayout";

export const OnboardingPage = ({showcaseJSON, selectedCharacter, setShowcaseJSON}) => {

  const [myScreens, setMyScreens] = useState(showcaseJSON.personas[selectedCharacter].onboarding);


  const handleDragEnd = (event) => {
    const { active, over } = event;
    // console.log(active);
    // console.log(over);
    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === over.id
      );

      console.log(arrayMove(myScreens, oldIndex, newIndex));

      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding = arrayMove(myScreens, oldIndex, newIndex);
      });

      return arrayMove(myScreens, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="two-column-container mx-20 my-16">
        <div className="two-column-col md:w-3/5 pr-4">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-slate-50">
                Add your Steps
              </h2>
              <p className="w-full">
                Add pages below to create the onboarding steps.
              </p>
            </div>
            <div className="ml-auto m-5">
              <button className="button-light p-2 hover:bg-neutral-600">Add Step <FontAwesomeIcon icon={faCirclePlus}/></button>
            </div>
            </div>


            <div className="mt-10">
              <p className="font-bold">Steps Added: ({myScreens.length})</p>
              <SortableContext
                items={myScreens}
                strategy={verticalListSortingStrategy}
              >
                {myScreens.map((myScreen, index) => (
                  <OnePageLayout myScreen={myScreen} key={myScreen.screenId} stepIndex={index + 1} totalSteps={myScreens.length} />
                ))}
              </SortableContext>
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
