import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useCreateStep } from './use-onboarding'
import { useOnboarding } from './use-onboarding'

const mockReset = jest.fn()
const mockHandleSubmit = jest.fn()

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    reset: mockReset,
    handleSubmit: mockHandleSubmit,
    register: jest.fn(),
    formState: { errors: {} }
  })
}))

describe('useCreateStep', () => {
  beforeEach(() => {
    useOnboarding.getState().reset()
    mockReset.mockClear()
    mockHandleSubmit.mockClear()
  })

  it('should initialize with null step type', () => {
    const { result } = renderHook(() => useCreateStep())
    expect(result.current.stepType).toBeNull()
  })

  describe('handleTypeSelection', () => {
    it('should set basic step type', async () => {
      const { result } = renderHook(() => useCreateStep())
      
      await act(async () => {
        result.current.handleTypeSelection('basic')
      })

      expect(result.current.stepType).toBe('basic')
      expect(mockReset).toHaveBeenCalledWith({
        type: 'basic',
        title: '',
        text: '',
        image: ''
      })
    })

    it('should set issue step type', async () => {
      const { result } = renderHook(() => useCreateStep())
      
      await act(async () => {
        result.current.handleTypeSelection('issue')
      })

      expect(result.current.stepType).toBe('issue')
      expect(mockReset).toHaveBeenCalledWith({
        type: 'issue',
        title: '',
        text: '',
        image: '',
        credentials: []
      })
    })
  })

  describe('onSubmit', () => {
    it('should create basic step', async () => {
      const mockDate = new Date('2024-01-01').getTime()
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate)

      const { result } = renderHook(() => useCreateStep())
      
      await act(async () => {
        result.current.onSubmit({
          type: 'basic',
          title: 'Test Step',
          text: 'Content',
          image: 'test.jpg' // atm its base64 but we save as string
        })
      })

      const state = useOnboarding.getState()
      expect(state.screens[0]).toEqual({
        screenId: mockDate.toString(),
        title: 'Test Step',
        text: 'Content',
        image: 'test.jpg'
      })
      expect(state.stepState).toBe('no-selection')

      jest.restoreAllMocks()
    })

    it('should create issue step', async () => {
      const mockDate = new Date('2024-01-01').getTime()
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate)

      const { result } = renderHook(() => useCreateStep())
      
      await act(async () => {
        result.current.onSubmit({
          type: 'issue',
          title: 'Test Step',
          text: 'Content',
          image: 'test.jpg',
          credentials: ['cred1']
        })
      })

      const state = useOnboarding.getState()
      expect(state.screens[0]).toEqual({
        screenId: mockDate.toString(),
        title: 'Test Step',
        text: 'Content',
        image: 'test.jpg',
        credentials: ['cred1']
      })
      expect(state.stepState).toBe('no-selection')

      jest.restoreAllMocks()
    })
  })
})