import '@testing-library/jest-dom'
import { useCredentials } from './use-credentials'

describe('useCredentials', () => {
  beforeEach(() => {
    useCredentials.getState().reset()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useCredentials.getState()
      expect(state.selectedCredential).toBeNull()
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(false)
    })
  })

  describe('setSelectedCredential', () => {
    it('should set selected credential', () => {
      const { setSelectedCredential } = useCredentials.getState()
      setSelectedCredential('test-id')
      expect(useCredentials.getState().selectedCredential).toBe('test-id')
    })

    it('should set selected credential to null', () => {
      const { setSelectedCredential } = useCredentials.getState()
      setSelectedCredential('test-id')
      setSelectedCredential(null)
      expect(useCredentials.getState().selectedCredential).toBeNull()
    })
  })

  describe('startCreating', () => {
    it('should set up creation state and return new id', () => {
      const mockDate = new Date('2024-01-01').getTime()
      jest.spyOn(Date, 'now').mockImplementation(() => mockDate)

      const { startCreating } = useCredentials.getState()
      const newId = startCreating()

      const state = useCredentials.getState()
      expect(newId).toBe(mockDate.toString())
      expect(state.selectedCredential).toBe(mockDate.toString())
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(true)

      jest.restoreAllMocks()
    })
  })

  describe('startEditing', () => {
    it('should set up editing state', () => {
      const { startEditing } = useCredentials.getState()
      startEditing('test-id')

      const state = useCredentials.getState()
      expect(state.selectedCredential).toBe('test-id')
      expect(state.mode).toBe('edit')
      expect(state.isCreating).toBe(false)
    })
  })

  describe('viewCredential', () => {
    it('should set up view state', () => {
      const { viewCredential } = useCredentials.getState()
      viewCredential('test-id')

      const state = useCredentials.getState()
      expect(state.selectedCredential).toBe('test-id')
      expect(state.mode).toBe('view')
      expect(state.isCreating).toBe(false)
    })
  })

  describe('cancel', () => {
    it('should reset to initial state except mode', () => {
      const { startCreating, cancel } = useCredentials.getState()
      startCreating()
      cancel()

      const state = useCredentials.getState()
      expect(state.selectedCredential).toBeNull()
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(false)
    })
  })

  describe('reset', () => {
    it('should reset to initial state', () => {
      const { startEditing, reset } = useCredentials.getState()
      startEditing('test-id')
      reset()

      const state = useCredentials.getState()
      expect(state.selectedCredential).toBeNull()
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(false)
    })
  })

  describe('state transitions', () => {
    it('should handle complete workflow', () => {
      // Start creating
      const newId = useCredentials.getState().startCreating()
      let state = useCredentials.getState()
      expect(state.selectedCredential).toBe(newId)
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(true)

      // Switch to editing
      useCredentials.getState().startEditing(newId)
      state = useCredentials.getState()
      expect(state.selectedCredential).toBe(newId)
      expect(state.mode).toBe('edit')
      expect(state.isCreating).toBe(false)

      // Switch to viewing
      useCredentials.getState().viewCredential(newId)
      state = useCredentials.getState()
      expect(state.selectedCredential).toBe(newId)
      expect(state.mode).toBe('view')
      expect(state.isCreating).toBe(false)

      // Cancel
      useCredentials.getState().cancel()
      state = useCredentials.getState()
      expect(state.selectedCredential).toBeNull()
      expect(state.mode).toBe('create')
      expect(state.isCreating).toBe(false)
    })
  })
})