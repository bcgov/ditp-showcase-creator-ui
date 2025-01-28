import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DEFAULT_JSON } from '@/lib/fixtures'
import { ShowcaseJSON } from '@/types'

interface State {
  showcaseJSON: ShowcaseJSON
  selectedCharacter: number
  currentPage: string
  editMode: boolean
}

interface Actions {
  setShowcaseJSON: (json: ShowcaseJSON) => void
  setSelectedCharacter: (index: number) => void
  setEditMode: (mode: boolean) => void
  updateCharacterDetails: (data: {name: string, type: string, description: string}) => void
  updateCharacterImage: (imageType: 'headshot_image' | 'body_image', imageData: string) => void
  removeCharacter: (index: number) => void
  reset: () => void
}

export const useShowcaseStore = create<State & Actions>()(
  immer((set) => ({
    showcaseJSON: {
      personas: [DEFAULT_JSON],
    },
    selectedCharacter: 0,
    currentPage: 'character',
    editMode: false,

    // Actions
    setShowcaseJSON: (json) => 
      set((state) => {
        state.showcaseJSON = json
      }),
    
    setSelectedCharacter: (index) => 
      set((state) => {
        state.selectedCharacter = index
      }),
    
    // Edit Mode from the form 
    setEditMode: (mode) => 
      set((state) => {
        state.editMode = mode
      }),
 
    // Character Details
    // those methods are temporary, to be replaced with each dedicated service
    updateCharacterDetails: ({name, type, description}) =>
      set((state) => {
        const persona = state.showcaseJSON.personas[state.selectedCharacter]
        persona.name = name
        persona.type = type
        persona.description = description
      }),

    updateCharacterImage: (imageType, imageData) =>
      set((state) => {
        state.showcaseJSON.personas[state.selectedCharacter][imageType] = imageData
      }),

    removeCharacter: (index) =>
      set((state) => {
        state.showcaseJSON.personas.splice(index, 1)
        if (state.selectedCharacter === index) {
          state.selectedCharacter = 0
        }
      }),
    
    reset: () =>
      set((state) => {
        state.showcaseJSON = { personas: [DEFAULT_JSON] }
        state.selectedCharacter = 0
        state.currentPage = 'character'
        state.editMode = false
      }),
  }))
)