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
  console.log(showcaseJSON.personas[selectedCharacter].onboarding)
  // const [myScreens, setMyScreens] = useState//( showcaseJSON[selectedCharacter]["onboarding"])
  
  // ([
  //   {
  //     title: "title 1 here",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     image: "image 1 here",
  //     id: 1,
  //   },
  //   {
  //     title: "title 2 here",
  //     content: "content 2here",
  //     image: "image 2 here",
  //     id: 2,
  //   },
  //   {
  //     title: "title 3 here",
  //     content: "content 3here",
  //     image: "image 3 here",
  //     id: 3,
  //   },
  //   {
  //     title: "title 4 here",
  //     content: "content 4here",
  //     image: "image 4 here",
  //     id: 4,
  //   },
  //   {
  //     title: "title 5 here",
  //     content: "content 5here",
  //     image: "image 5 here",
  //     id: 5,
  //   },
  // ]);


  // sergio's version
  const handleDragEndSergio = (event) => {
    const { active, over } = event;

    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === over.id
      );
      // console.log("oldIndex", oldIndex);
      // console.log("newIndex", newIndex);
      console.log(showcaseJSON.personas[selectedCharacter].onboarding)
      return arrayMove(myScreens, oldIndex, newIndex);
      //console.log(finalOrder)
      
    });
  };
  

  // new version, very broken
  const handleDragEnd = (event) => {
    const { active, over } = event;


      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.id === over.id
      );

      setShowcaseJSON((json) => {
        json["personas"][selectedCharacter]["onboarding"] = arrayMove(myScreens, oldIndex, newIndex);;
      });

      return 
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
                  <OnePageLayout myScreen={myScreen} key={myScreen.id} stepIndex={index} totalSteps={myScreens.length} />
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
