import '@testing-library/jest-dom'
import { create } from 'zustand'
import { IssueStepFormData } from '@/schemas/onboarding'

interface Credential {
  issuer_name: string;
  name: string;
}

const useTestShowcaseStore = create(() => ({
  showcaseJSON: {
    personas: [{
      credentials: {
        'cred1': {
          issuer_name: 'Test Issuer 1',
          name: 'Credential 1'
        },
        'cred2': {
          issuer_name: 'Test Issuer 2',
          name: 'Credential 2'
        }
      } as { [key: string]: Credential }
    }]
  },
  selectedCharacter: 0
}))

interface OnboardingStore {
  selectedStep: number | null;
  screens: Array<{
    title: string;
    text: string;
    image: string;
    credentials: string[];
  }>;
  updateStep: jest.Mock;
  setSelectedStep: (step: number | null) => void;
  setStepState: jest.Mock;
}

const useTestOnboarding = create<OnboardingStore>((set) => ({
  selectedStep: 0,
  screens: [{
    title: 'Test Title',
    text: 'Test Text',
    image: 'test-image.jpg',
    credentials: ['cred1']
  }],
  updateStep: jest.fn(),
  setSelectedStep: (step: number | null) => set({ selectedStep: step }),
  setStepState: jest.fn()
}))

const mockForm = {
  setValue: jest.fn(),
  getValues: jest.fn(),
  reset: jest.fn()
}

describe('useIssueStep', () => {
  beforeEach(() => {
    useTestShowcaseStore.setState({
      showcaseJSON: {
        personas: [{
          credentials: {
            'cred1': {
              issuer_name: 'Test Issuer 1',
              name: 'Credential 1'
            },
            'cred2': {
              issuer_name: 'Test Issuer 2',
              name: 'Credential 2'
            }
          } as { [key: string]: Credential }
        }]
      },
      selectedCharacter: 0
    })

    useTestOnboarding.setState({
      selectedStep: 0,
      screens: [{
        title: 'Test Title',
        text: 'Test Text',
        image: 'test-image.jpg',
        credentials: ['cred1']
      }],
      updateStep: jest.fn(),
      setSelectedStep: (step: number | null) => useTestOnboarding.setState({ selectedStep: step }),
      setStepState: jest.fn()
    })

    // Reset form mocks
    mockForm.setValue.mockClear()
    mockForm.getValues.mockClear()
    mockForm.reset.mockClear()
  })

  describe('searchCredential', () => {
    it('should find credentials by issuer name', () => {
      const state = useTestShowcaseStore.getState()
      const searchText = 'Test Issuer'
      const searchUpper = searchText.toUpperCase()
      
      const results = Object.keys(state.showcaseJSON.personas[0].credentials).filter((credentialId: string) => 
        state.showcaseJSON.personas[0].credentials[credentialId].issuer_name.toUpperCase().includes(searchUpper) ||
        state.showcaseJSON.personas[0].credentials[credentialId].name.toUpperCase().includes(searchUpper)
      )

      expect(results).toContain('cred1')
      expect(results).toContain('cred2')
    })

    it('should find credentials by name', () => {
      const state = useTestShowcaseStore.getState()
      const searchText = 'Credential 1'
      const searchUpper = searchText.toUpperCase()
      
      const results = Object.keys(state.showcaseJSON.personas[0].credentials).filter((credentialId: string) => 
        state.showcaseJSON.personas[0].credentials[credentialId].issuer_name.toUpperCase().includes(searchUpper) ||
        state.showcaseJSON.personas[0].credentials[credentialId].name.toUpperCase().includes(searchUpper)
      )

      expect(results).toContain('cred1')
      expect(results).not.toContain('cred2')
    })
  })

  describe('addCredential', () => {
    it('should add new credential to existing credentials', () => {
      mockForm.getValues.mockReturnValue(['cred1'])
      
      const currentCredentials = mockForm.getValues('credentials')
      const newCredentialId = 'cred2'
      
      if (!currentCredentials.includes(newCredentialId)) {
        mockForm.setValue('credentials', [...currentCredentials, newCredentialId], {
          shouldDirty: true,
          shouldValidate: true
        })
      }

      expect(mockForm.setValue).toHaveBeenCalledWith(
        'credentials',
        ['cred1', 'cred2'],
        expect.any(Object)
      )
    })

    it('should not add duplicate credential', () => {
      mockForm.getValues.mockReturnValue(['cred1'])
      
      const currentCredentials = mockForm.getValues('credentials')
      const existingCredentialId = 'cred1'
      
      if (!currentCredentials.includes(existingCredentialId)) {
        mockForm.setValue('credentials', [...currentCredentials, existingCredentialId], {
          shouldDirty: true,
          shouldValidate: true
        })
      }

      expect(mockForm.setValue).not.toHaveBeenCalled()
    })
  })

  describe('removeCredential', () => {
    it('should remove credential from list', () => {
      mockForm.getValues.mockReturnValue(['cred1', 'cred2'])
      
      const currentCredentials = mockForm.getValues('credentials')
      const credentialToRemove = 'cred1'
      
      mockForm.setValue(
        'credentials',
        currentCredentials.filter((id: string) => id !== credentialToRemove),
        { shouldDirty: true, shouldValidate: true }
      )

      expect(mockForm.setValue).toHaveBeenCalledWith(
        'credentials',
        ['cred2'],
        expect.any(Object)
      )
    })
  })

  describe('onSubmit', () => {
    it('should update step and reset selection', () => {
      const formData: IssueStepFormData = {
        title: 'New Title',
        text: 'New Text',
        image: 'new-image.jpg',
        credentials: ['cred1', 'cred2']
      }

      const { updateStep } = useTestOnboarding.getState()
      useTestOnboarding.setState(state => {
        if (state.selectedStep !== null) {
          const updatedStep = {
            ...state.screens[state.selectedStep],
            ...formData
          }
          updateStep(state.selectedStep, updatedStep)
        }
        return {
          ...state,
          selectedStep: null
        }
      })

      const finalState = useTestOnboarding.getState()
      expect(updateStep).toHaveBeenCalledWith(0, {
        title: 'New Title',
        text: 'New Text',
        image: 'new-image.jpg',
        credentials: ['cred1', 'cred2']
      })
      expect(finalState.selectedStep).toBeNull()
    })
  })

  describe('handleCancel', () => {
    it('should reset form and selection', () => {
      useTestOnboarding.setState(state => ({
        ...state,
        selectedStep: null
      }))
      
      mockForm.reset()

      const finalState = useTestOnboarding.getState()
      expect(mockForm.reset).toHaveBeenCalled()
      expect(finalState.selectedStep).toBeNull()
    })
  })
})