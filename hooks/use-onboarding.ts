import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { OnboardingStep } from '@/types'
import { useShowcaseStore } from './use-showcase-store'
import { produce } from 'immer'
import { OnboardingStepFormData, onboardingStepFormSchema } from '@/schemas/onboarding'
import { stepTypeSchema } from '@/schemas/onboarding'
import { useForm } from 'react-hook-form'
import { StepTypeData } from '@/schemas/onboarding'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

type OnboardingStepState = "editing-basic" | "editing-issue" | "no-selection" | "creating-new";

interface State {
  selectedStep: number | null
  stepState: OnboardingStepState
  screens: OnboardingStep[]
}

interface Actions {
  setSelectedStep: (index: number | null) => void
  setStepState: (state: OnboardingStepState) => void
  initializeScreens: (screens: OnboardingStep[]) => void
  moveStep: (oldIndex: number, newIndex: number) => void
  removeStep: (index: number) => void
  createStep: (step: OnboardingStep) => void
  updateStep: (index: number, step: OnboardingStep) => void
  reset: () => void
}

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useOnboarding = create<State & Actions>()(
  immer((set) => ({
    selectedStep: null,
    stepState: 'no-selection',
    screens: [],

    setSelectedStep: (index) =>
      set((state) => {
        state.selectedStep = index
      }),

    setStepState: (newState) =>
      set((state) => {
        state.stepState = newState
      }),

    initializeScreens: (screens) =>
      set(produce((state) => {
        state.screens = deepClone(screens)
      })),

    moveStep: (oldIndex, newIndex) =>
      set(produce((state) => {
        const newScreens = [...state.screens]
        const [movedStep] = newScreens.splice(oldIndex, 1)
        newScreens.splice(newIndex, 0, movedStep)
        state.screens = newScreens

        const { selectedCharacter } = useShowcaseStore.getState()
        useShowcaseStore.setState(produce((draft) => {
          draft.showcaseJSON.personas[selectedCharacter].onboarding = deepClone(newScreens)
        }))
      })),

    removeStep: (index) =>
      set(produce((state) => {
        const newScreens = [...state.screens]
        newScreens.splice(index, 1)
        state.screens = newScreens

        const { selectedCharacter } = useShowcaseStore.getState()
        useShowcaseStore.setState(produce((draft) => {
          draft.showcaseJSON.personas[selectedCharacter].onboarding = deepClone(newScreens)
        }))

        if (state.selectedStep === index) {
          state.selectedStep = null
          state.stepState = 'no-selection'
        }
      })),

      createStep: (step) =>
        set((state) => {
          const newScreens = [...state.screens, step];
          state.screens = newScreens;
          state.selectedStep = newScreens.length - 1;
          state.stepState = step.credentials ? "editing-issue" : "editing-basic";

          const { selectedCharacter } = useShowcaseStore.getState();
          useShowcaseStore.setState((showcaseState) => {
            showcaseState.showcaseJSON.personas[selectedCharacter].onboarding = newScreens;
          });
        }),

    updateStep: (index, step) =>
      set(produce((state) => {
        const newScreens = [...state.screens]
        newScreens[index] = deepClone(step)
        state.screens = newScreens

        const { selectedCharacter } = useShowcaseStore.getState()
        useShowcaseStore.setState(produce((draft) => {
          draft.showcaseJSON.personas[selectedCharacter].onboarding = deepClone(newScreens)
        }))
      })),

    reset: () =>
      set(produce((state) => {
        state.selectedStep = null
        state.stepState = 'no-selection'
        state.screens = []
      })),
  }))
)


export const useCreateStep = () => {
  const { createStep, setStepState } = useOnboarding();
  const [stepType, setStepType] = useState<'basic' | 'issue' | null>(null);

  const typeForm = useForm<StepTypeData>({
    resolver: zodResolver(stepTypeSchema),
  });

  const stepForm = useForm<OnboardingStepFormData>({
    resolver: zodResolver(onboardingStepFormSchema),
  });

  const handleTypeSelection = (type: 'basic' | 'issue') => {
    setStepType(type);
    stepForm.reset({
      type,
      title: '',
      text: '',
      image: '',
      ...(type === 'issue' && { credentials: [] }),
    });
  };

  const onSubmit = (data: OnboardingStepFormData) => {
    const newStep = {
      screenId: `${Date.now()}`,
      title: data.title,
      text: data.text,
      image: data.image || '',
      ...(data.type === 'issue' && { credentials: data.credentials || [] }),
    };

    createStep(newStep);
    setStepState('no-selection');
  };

  return {
    stepType,
    handleTypeSelection,
    stepForm,
    onSubmit,
  };
};