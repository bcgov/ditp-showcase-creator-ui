import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCirclePlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


import { SortableStep } from "../onboarding-screen/SortableStep";
import { BasicStepEdit } from "../onboarding-screen/BasicStepEdit";
import { IssueStepEdit } from "../onboarding-screen/IssueStepEdit";
import { CreateNewStep } from "../onboarding-screen/CreateNewStep";
import { NoSelection } from ".././credentials/NoSelection"

export const OnboardingPage = ({
  showcaseJSON,
  selectedCharacter,
  setShowcaseJSON,
  handleJSONUpdate
}) => {
  
  
  // Storing the onboarding data into local state.
  const [myScreens, setMyScreens] = useState(
    showcaseJSON.personas[selectedCharacter].onboarding
  );

  // Handling state; what step is editable
  const [selectedStep, setSelectedStep] = useState(null);

  // Handling state; what screen is shown, if not editing
  const [stepState, setStepState] = useState("no-selection");

  // Add new step
  const addNewStep = (isIssue) => {
    if(isIssue){
      setShowcaseJSON( (json) =>{
        json.personas[selectedCharacter].onboarding.push(
          {
            screenId: `${new Date().now}`,
            title: "",
            text: "",
            image: "",
            credentials:[]
          }
        )
      });
    }else{
      setShowcaseJSON( (json) =>{
        json.personas[selectedCharacter].onboarding.push(
          {
            screenId: `${new Date().now}`,
            title: "",
            text: "",
            image: "",
          }
        )
      });
    }
      setSelectedStep(showcaseJSON.personas[selectedCharacter].onboarding.length)
    
  }

  useEffect(() => {
    if (selectedStep == null){
      setStepState("no-selection")
    }else if (showcaseJSON.personas[selectedCharacter].onboarding[selectedStep].credentials){
      setStepState("editing-issue")
    }else{
      setStepState("editing-basic")
    }
  },[selectedStep])

  // When the JSON changes, re-collect the onboarding data.
  // This is primarily used for when a step is deleted.
  useEffect(() => {
    setMyScreens(showcaseJSON.personas[selectedCharacter].onboarding)
  }, [showcaseJSON.personas[selectedCharacter].onboarding]);

  // Handles a step being removed.
  const handleRemoveStep = (e, i) => {
    if (selectedStep == i) setSelectedStep(null);

    setShowcaseJSON((json) => {
      json.personas[selectedCharacter].onboarding.splice(i, 1);
    });
  };
  

  // Handles how draggable componants are re-arranged
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setSelectedStep(null);
    setMyScreens((myScreens) => {
      const oldIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === active.id
      );
      const newIndex = myScreens.findIndex(
        (myScreen) => myScreen.screenId === over.id
      );
      setShowcaseJSON((json) => {
        json.personas[selectedCharacter].onboarding = arrayMove(
          myScreens,
          oldIndex,
          newIndex
        );
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
              <button className="button-light p-2 hover:bg-neutral-600"
              onClick={(e) => {setStepState("creating-new")}}>
                Add Step <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-bold">Steps Added: ({myScreens.length})</p>
            <SortableContext
              items={myScreens}
              strategy={verticalListSortingStrategy}
            >
              {myScreens.map((myScreen, index) => (
                <div className="flex flex-row">
                  <SortableStep
                    selectedStep={selectedStep}
                    setSelectedStep={setSelectedStep}
                    myScreen={myScreen}
                    key={myScreen.screenId}
                    stepIndex={index + 1}
                    totalSteps={myScreens.length}
                  />
                  <button
                    className="mx-1 mt-5"
                    onClick={(event) => handleRemoveStep(event, index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button 
                    className="mx-1 mt-5"
                    onClick={(e) => setSelectedStep(index)}>
                    
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </div>
              ))}
            </SortableContext>
          </div>
        </div>

        <div className="highlight-container w-2/5 rounded p-3">
                {
                stepState == "no-selection" ? <NoSelection Text={"No Step Selected"}/> : null
                }
                {
                stepState == "creating-new" ? <CreateNewStep addNewStep={addNewStep}/> : null
                }
                {
                stepState == "editing-basic" ? <BasicStepEdit selectedCharacter={selectedCharacter} handleJSONUpdate={handleJSONUpdate} setSelectedStep={setSelectedStep} selectedStep={selectedStep} showcaseJSON={showcaseJSON}
                setShowcaseJSON={setShowcaseJSON}/> : null
                }
                {
                stepState == "editing-issue" ? <IssueStepEdit/> : null
                }
              
          
        </div>
      </div>
    </DndContext>
  );
};
