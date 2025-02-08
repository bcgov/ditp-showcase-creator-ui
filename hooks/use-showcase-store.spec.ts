import '@testing-library/jest-dom'
import { useShowcaseStore } from './use-showcase-store'
import { DEFAULT_JSON } from '@/lib/fixtures'
import { ShowcaseJSON } from '@/types'

describe('useShowcaseStore', () => {
  beforeEach(() => {
    useShowcaseStore.getState().reset()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = useShowcaseStore.getState()
      expect(state.showcaseJSON).toEqual({ personas: [DEFAULT_JSON] })
      expect(state.selectedCharacter).toBe(0)
      expect(state.currentPage).toBe('character')
      expect(state.editMode).toBe(false)
    })
  })

  describe('setShowcaseJSON', () => {
    it('should update showcase JSON', () => {
      const newJSON = {
        personas: [
          {
            ...DEFAULT_JSON,
            name: 'Test Character'
          }
        ]
      }

      useShowcaseStore.getState().setShowcaseJSON(newJSON as ShowcaseJSON)
      expect(useShowcaseStore.getState().showcaseJSON).toEqual(newJSON)
    })
  })

  describe('setSelectedCharacter', () => {
    it('should update selected character index', () => {
      useShowcaseStore.getState().setSelectedCharacter(1)
      expect(useShowcaseStore.getState().selectedCharacter).toBe(1)
    })
  })

  describe('setEditMode', () => {
    it('should update edit mode', () => {
      useShowcaseStore.getState().setEditMode(true)
      expect(useShowcaseStore.getState().editMode).toBe(true)
    })
  })

  describe('character management', () => {
    describe('updateCharacterDetails', () => {
      it('should update character details', () => {
        const newDetails = {
          name: 'New Name',
          type: 'New Type',
          description: 'New Description'
        }

        useShowcaseStore.getState().updateCharacterDetails(newDetails)
        const state = useShowcaseStore.getState()
        const character = state.showcaseJSON.personas[state.selectedCharacter]
        
        expect(character.name).toBe(newDetails.name)
        expect(character.type).toBe(newDetails.type)
        expect(character.description).toBe(newDetails.description)
      })
    })

    describe('updateCharacterImage', () => {
      it('should update headshot image', () => {
        useShowcaseStore.getState().updateCharacterImage('headshot_image', 'new-image.jpg')
        const state = useShowcaseStore.getState()
        const character = state.showcaseJSON.personas[state.selectedCharacter]
        
        expect(character.headshot_image).toBe('new-image.jpg')
      })

      it('should update body image', () => {
        useShowcaseStore.getState().updateCharacterImage('body_image', 'new-body.jpg')
        const state = useShowcaseStore.getState()
        const character = state.showcaseJSON.personas[state.selectedCharacter]
        
        expect(character.body_image).toBe('new-body.jpg')
      })
    })

    describe('removeCharacter', () => {
      it('should remove character and update selection if needed', () => {
        const newJSON = {
          personas: [
            { ...DEFAULT_JSON },
            { ...DEFAULT_JSON }
          ]
        }
        useShowcaseStore.getState().setShowcaseJSON(newJSON as ShowcaseJSON)
        useShowcaseStore.getState().setSelectedCharacter(1)

        useShowcaseStore.getState().removeCharacter(1)
        const state = useShowcaseStore.getState()
        
        expect(state.showcaseJSON.personas).toHaveLength(1)
        expect(state.selectedCharacter).toBe(0)
      })

      it('should maintain selection when removing different character', () => {
        const newJSON = {
          personas: [
            { ...DEFAULT_JSON },
            { ...DEFAULT_JSON }
          ]
        }
        useShowcaseStore.getState().setShowcaseJSON(newJSON as ShowcaseJSON)
        useShowcaseStore.getState().setSelectedCharacter(0)

        useShowcaseStore.getState().removeCharacter(1)
        const state = useShowcaseStore.getState()
        
        expect(state.selectedCharacter).toBe(0)
      })
    })
  })

  describe('credential management', () => {
    const mockCredentialData = {
      name: 'Test Credential',
      issuer_name: 'Test Issuer',
      version: '1.0',
      icon: 'test-icon.jpg',
      attributes: [
        { name: 'attr1', value: 'value1', type: 'string' as const }
      ]
    }

    describe('createCredential', () => {
      it('should create new credential', () => {
        useShowcaseStore.getState().createCredential('cred1', mockCredentialData)
        const state = useShowcaseStore.getState()
        const credentials = state.showcaseJSON.personas[state.selectedCharacter].credentials

        expect(credentials.cred1).toEqual(mockCredentialData)
      })
    })

    describe('updateCredential', () => {
      it('should update existing credential', () => {
        const store = useShowcaseStore.getState()
        store.createCredential('cred1', mockCredentialData)

        const updatedData = {
          ...mockCredentialData,
          name: 'Updated Credential'
        }

        store.updateCredential('cred1', updatedData)
        const state = useShowcaseStore.getState()
        const credentials = state.showcaseJSON.personas[state.selectedCharacter].credentials

        expect(credentials.cred1.name).toBe('Updated Credential')
      })
    })

    describe('removeCredential', () => {
      it('should remove credential', () => {
        const store = useShowcaseStore.getState()
        store.createCredential('cred1', mockCredentialData)
        store.removeCredential('cred1')

        const state = useShowcaseStore.getState()
        const credentials = state.showcaseJSON.personas[state.selectedCharacter].credentials

        expect(credentials.cred1).toBeUndefined()
      })
    })
  })

  describe('reset', () => {
    it('should reset store to initial state', () => {
      const store = useShowcaseStore.getState()
      
      const newJSON = {
        personas: [
          { ...DEFAULT_JSON, name: 'Original' },
          { ...DEFAULT_JSON, name: 'Second' }
        ]
      }
      store.setShowcaseJSON(newJSON as ShowcaseJSON)
      
      store.setSelectedCharacter(1)
      store.setEditMode(true)
      store.updateCharacterDetails({
        name: 'Test',
        type: 'Test',
        description: 'Test'
      })

      store.reset()
      
      const state = useShowcaseStore.getState()
      expect(state.showcaseJSON).toEqual({ personas: [DEFAULT_JSON] })
      expect(state.selectedCharacter).toBe(0)
      expect(state.currentPage).toBe('character')
      expect(state.editMode).toBe(false)
    })
  })
})