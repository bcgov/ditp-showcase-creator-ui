import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type Mode = 'create' | 'edit' | 'view';

interface State {
  selectedCredential: string | null
  mode: Mode
  isCreating: boolean
}

interface Actions {
  setSelectedCredential: (id: string | null) => void
  startCreating: () => string
  startEditing: (id: string) => void
  viewCredential: (id: string) => void
  cancel: () => void
  reset: () => void
}

export const useCredentials = create<State & Actions>()(
  immer((set) => ({
    selectedCredential: null,
    mode: 'create',
    isCreating: false,

    setSelectedCredential: (id) => 
      set((state) => {
        state.selectedCredential = id
      }),

    startCreating: () => {
      const newId = Date.now().toString()
      set((state) => {
        state.selectedCredential = newId
        state.mode = 'create'
        state.isCreating = true
      })
      return newId
    },

    startEditing: (id) =>
      set((state) => {
        state.selectedCredential = id
        state.mode = 'edit'
        state.isCreating = false
      }),

    viewCredential: (id) =>
      set((state) => {
        state.selectedCredential = id
        state.mode = 'view'
        state.isCreating = false
      }),

    cancel: () =>
      set((state) => {
        state.selectedCredential = null
        state.mode = 'create'
        state.isCreating = false
      }),

    reset: () =>
      set((state) => {
        state.selectedCredential = null
        state.mode = 'create'
        state.isCreating = false
      })
  }))
)