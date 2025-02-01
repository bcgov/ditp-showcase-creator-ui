import '@testing-library/jest-dom'
import { useScenarios, createEmptyStep } from './use-scenarios'
import { useShowcaseStore } from './use-showcase-store'
import { RequestType, Scenario, ScenarioStep, StepType } from '@/types'

jest.mock('./use-showcase-store', () => ({
  useShowcaseStore: {
    getState: () => ({
      selectedCharacter: 0,
      showcaseJSON: {
        personas: [{ scenarios: [] }]
      }
    }),
    setState: jest.fn()
  }
}))

describe('useScenarios', () => {
  beforeEach(() => {
    useScenarios.getState().reset()
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useScenarios.getState()
      expect(state.scenarios).toEqual([])
      expect(state.selectedScenario).toBeNull()
      expect(state.selectedStep).toBeNull()
      expect(state.stepState).toBeNull()
    })
  })

  describe('setScenarios', () => {
    it('should set scenarios array', () => {
      const mockScenarios = [
        {
          id: '1',
          name: 'Test Scenario',
          overview: { title: 'Overview', text: 'Test', image: 'test.jpg' },
          summary: { title: 'Summary', text: 'Test', image: 'test.jpg' },
          steps: []
        }
      ]
      
      useScenarios.getState().setScenarios(mockScenarios)
      const state = useScenarios.getState()
      expect(state.scenarios).toEqual(mockScenarios)
    })
  })

  describe('scenario selection', () => {
    it('should handle view scenario', () => {
      useScenarios.getState().viewScenario(1)
      const state = useScenarios.getState()
      expect(state.selectedScenario).toBe(1)
      expect(state.selectedStep).toBeNull()
      expect(state.stepState).toBe('viewing-scenario')
    })

    it('should handle edit scenario', () => {
      useScenarios.getState().editScenario(1)
      const state = useScenarios.getState()
      expect(state.selectedScenario).toBe(1)
      expect(state.selectedStep).toBeNull()
      expect(state.stepState).toBe('editing-scenario')
    })
  })

  describe('scenario management', () => {
    const mockScenario: Omit<Scenario, 'id'> = {
      name: 'Test Scenario',
      overview: { title: 'Overview', text: 'Test', image: 'test.jpg' },
      summary: { title: 'Summary', text: 'Test', image: 'test.jpg' },
      steps: []
    }

    it('should add new scenario', () => {
      const { addScenario } = useScenarios.getState()
      const mockDate = new Date('2024-01-01').getTime()
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate)

      addScenario(mockScenario)
      const state = useScenarios.getState()
      
      expect(state.scenarios).toHaveLength(1)
      expect(state.scenarios[0]).toEqual({
        ...mockScenario,
        id: mockDate.toString()
      })
      expect(useShowcaseStore.setState).toHaveBeenCalled()

      jest.restoreAllMocks()
    })

    it('should update existing scenario', () => {
      const { addScenario, updateScenario } = useScenarios.getState()
      addScenario(mockScenario)
      
      const updatedScenario = {
        ...useScenarios.getState().scenarios[0],
        name: 'Updated Scenario'
      }
      
      updateScenario(0, updatedScenario)
      const state = useScenarios.getState()
      
      expect(state.scenarios[0].name).toBe('Updated Scenario')
      expect(state.selectedScenario).toBeNull()
      expect(state.stepState).toBe('none-selected')
    })

    it('should remove scenario', () => {
      const { addScenario, removeScenario } = useScenarios.getState()
      addScenario(mockScenario)
      
      removeScenario(0)
      const state = useScenarios.getState()
      
      expect(state.scenarios).toHaveLength(0)
      expect(state.selectedScenario).toBeNull()
    })
  })

  describe('step management', () => {
    const mockScenario: Omit<Scenario, 'id'> = {
      name: 'Test Scenario',
      overview: { title: 'Overview', text: 'Test', image: 'test.jpg' },
      summary: { title: 'Summary', text: 'Test', image: 'test.jpg' },
      steps: []
    }

    beforeEach(() => {
      useScenarios.getState().addScenario(mockScenario)
    })

    it('should add new step', () => {
      const { addStep } = useScenarios.getState()
      const mockDate = new Date('2024-01-01').getTime()
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate)

      const newStep = createEmptyStep(StepType.BASIC)
      addStep(0, newStep)
      const state = useScenarios.getState()
      
      expect(state.scenarios[0].steps).toHaveLength(1)
      expect(state.scenarios[0].steps[0]).toEqual({
        ...newStep,
        screenId: mockDate.toString()
      })

      jest.restoreAllMocks()
    })

    it('should update existing step', () => {
      const { addStep, updateStep } = useScenarios.getState()
      const newStep = createEmptyStep(StepType.BASIC)
      addStep(0, newStep)
      
      const updatedStep = {
        ...useScenarios.getState().scenarios[0].steps[0],
        title: 'Updated Step'
      }
      
      updateStep(0, 0, updatedStep)
      const state = useScenarios.getState()
      
      expect(state.scenarios[0].steps[0].title).toBe('Updated Step')
    })

    it('should remove step', () => {
      const { addStep, removeStep } = useScenarios.getState()
      const newStep = createEmptyStep(StepType.BASIC)
      addStep(0, newStep)
      
      removeStep(0, 0)
      const state = useScenarios.getState()
      
      expect(state.scenarios[0].steps).toHaveLength(0)
    })

    it('should move step', () => {
      const { addStep, moveStep } = useScenarios.getState()
      const step1 = { ...createEmptyStep(StepType.BASIC), title: 'Step 1' }
      const step2 = { ...createEmptyStep(StepType.CONNECT_AND_VERIFY), title: 'Step 2' }
      
      addStep(0, step1)
      addStep(0, step2)
      
      moveStep(0, 0, 1)
      const state = useScenarios.getState()
      
      expect(state.scenarios[0].steps[0].title).toBe('Step 2')
      expect(state.scenarios[0].steps[1].title).toBe('Step 1')
    })
  })

  describe('createEmptyStep', () => {
    it('should create basic step by default', () => {
      const step = createEmptyStep(StepType.BASIC)
      expect(step.type).toBe(StepType.BASIC)
      expect(step.requestOptions.type).toBe(RequestType.BASIC)
    })

    it('should create proof step when specified', () => {
      const step = createEmptyStep(StepType.CONNECT_AND_VERIFY)
      expect(step.type).toBe(StepType.CONNECT_AND_VERIFY)
      expect(step.requestOptions.type).toBe(RequestType.OOB)
    })
  })
})