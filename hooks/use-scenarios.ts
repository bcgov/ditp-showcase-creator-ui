import { create } from 'zustand';
import { Scenario, ScenarioStep } from '@/types';
import { useShowcaseStore } from './use-showcase-store';

type ScenarioStepState = 
  | "none-selected" 
  | "adding-step" 
  | "basic-step-edit" 
  | "proof-step-edit" 
  | "editing-scenario"
  | "viewing-scenario" 
  | "editing-issue" 
  | null;

interface State {
  scenarios: Scenario[];
  selectedScenario: number | null;
  selectedStep: number | null;
  stepState: ScenarioStepState;
}

interface Actions {
  setScenarios: (scenarios: Scenario[]) => void;
  setSelectedScenario: (index: number | null) => void;
  setSelectedStep: (index: number | null) => void;
  setStepState: (state: ScenarioStepState) => void;
  
  viewScenario: (index: number) => void;
  editScenario: (index: number) => void;
  addScenario: (scenario: Omit<Scenario, 'id'>) => void;
  updateScenario: (index: number, scenario: Scenario) => void;
  removeScenario: (index: number) => void;
  
  addStep: (scenarioIndex: number, step: Omit<ScenarioStep, 'screenId'>) => void;
  updateStep: (scenarioIndex: number, stepIndex: number, step: ScenarioStep) => void;
  removeStep: (scenarioIndex: number, stepIndex: number) => void;
  moveStep: (scenarioIndex: number, oldIndex: number, newIndex: number) => void;
  
  reset: () => void;
}

const updateShowcaseStore = (scenarios: Scenario[]) => {
  const { selectedCharacter } = useShowcaseStore.getState();
  useShowcaseStore.setState(state => ({
    ...state,
    showcaseJSON: {
      ...state.showcaseJSON,
      personas: state.showcaseJSON.personas.map((persona, idx) =>
        idx === selectedCharacter
          ? { ...persona, scenarios }
          : persona
      ),
    },
  }));
};

export const useScenarios = create<State & Actions>((set, get) => ({
  scenarios: [],
  selectedScenario: null,
  selectedStep: null,
  stepState: null,

  setScenarios: (scenarios) => set({ scenarios }),

  setSelectedScenario: (index) => set({ selectedScenario: index }),

  setSelectedStep: (index) => set({ selectedStep: index }),

  setStepState: (stepState) => set({ stepState }),

  viewScenario: (index) => set({
    selectedScenario: index,
    selectedStep: null,
    stepState: "viewing-scenario"
  }),

  editScenario: (index) => set({
    selectedScenario: index,
    selectedStep: null,
    stepState: "editing-scenario"
  }),

  addScenario: (scenario) => {
    const { scenarios } = get();
    const newScenario = {
      ...scenario,
      id: Date.now().toString(),
    };
    
    const newScenarios = [...scenarios, newScenario];
    set({ scenarios: newScenarios });
    updateShowcaseStore(newScenarios);
  },

  updateScenario: (index, scenario) => {
    const { scenarios } = get();
    const newScenarios = [...scenarios];
    newScenarios[index] = { ...scenario };
    
    set({ 
      scenarios: newScenarios,
      selectedScenario: null,
      stepState: "none-selected"
    });
    updateShowcaseStore(newScenarios);
  },

  removeScenario: (index) => {
    const { scenarios, selectedScenario } = get();
    const newScenarios = scenarios.filter((_, i) => i !== index);
    
    set({
      scenarios: newScenarios,
      selectedScenario: selectedScenario === index ? null : selectedScenario,
      stepState: selectedScenario === index ? null : get().stepState,
    });
    updateShowcaseStore(newScenarios);
  },

  addStep: (scenarioIndex, step) => {
    const { scenarios } = get();
    const newScenarios = [...scenarios];
    const newStep = {
      ...step,
      screenId: Date.now().toString(),
    };
    
    newScenarios[scenarioIndex] = {
      ...newScenarios[scenarioIndex],
      steps: [...newScenarios[scenarioIndex].steps, newStep],
    };
    
    set({ scenarios: newScenarios });
    updateShowcaseStore(newScenarios);
  },

  updateStep: (scenarioIndex, stepIndex, step) => {
    const { scenarios } = get();
    const newScenarios = [...scenarios];
    const newSteps = [...newScenarios[scenarioIndex].steps];
    newSteps[stepIndex] = { ...step };
    
    newScenarios[scenarioIndex] = {
      ...newScenarios[scenarioIndex],
      steps: newSteps,
    };
    
    set({ scenarios: newScenarios });
    updateShowcaseStore(newScenarios);
  },

  removeStep: (scenarioIndex, stepIndex) => {
    const { scenarios, selectedStep } = get();
    const newScenarios = [...scenarios];
    const newSteps = newScenarios[scenarioIndex].steps.filter(
      (_, index) => index !== stepIndex
    );
    
    newScenarios[scenarioIndex] = {
      ...newScenarios[scenarioIndex],
      steps: newSteps,
    };
    
    set({
      scenarios: newScenarios,
      selectedStep: selectedStep === stepIndex ? null : selectedStep,
      stepState: selectedStep === stepIndex ? "none-selected" : get().stepState,
    });
    updateShowcaseStore(newScenarios);
  },

  moveStep: (scenarioIndex, oldIndex, newIndex) => {
    const { scenarios } = get();
    const newScenarios = [...scenarios];
    const steps = [...newScenarios[scenarioIndex].steps];
    const [movedStep] = steps.splice(oldIndex, 1);
    steps.splice(newIndex, 0, movedStep);
    
    newScenarios[scenarioIndex] = {
      ...newScenarios[scenarioIndex],
      steps,
    };
    
    set({ scenarios: newScenarios });
    updateShowcaseStore(newScenarios);
  },

  reset: () => set({
    scenarios: [],
    selectedScenario: null,
    selectedStep: null,
    stepState: null,
  }),
}));
export const createEmptyStep = (
  isProof: boolean = false
): Omit<ScenarioStep, "screenId"> => ({
  type: isProof ? "proof" : "basic",
  title: "",
  text: "",
  requestOptions: isProof
    ? {
        type: "proof_request",
        title: "",
        text: "",
        proofRequest: {
          attributes: {},
          predicates: {},
        },
      }
    : {
        type: "basic",
        title: "",
        text: "",
        proofRequest: {
          attributes: {},
          predicates: {},
        },
      },
});
