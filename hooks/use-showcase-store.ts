import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DEFAULT_JSON } from "@/lib/fixtures";
import { Persona, ShowcaseJSON } from "@/types";
import { CredentialFormData } from "@/schemas/credential";

interface State {
  showcaseJSON: ShowcaseJSON;
  selectedCharacter: number;
  currentPage: string;
  editMode: boolean;
}

interface Actions {
  setShowcaseJSON: (json: ShowcaseJSON) => void;
  setSelectedCharacter: (index: number) => void;
  setEditMode: (mode: boolean) => void;
  updateCharacterDetails: (data: {
    name: string;
    type: string;
    description: string;
  }) => void;
  updateCharacterImage: (
    imageType: "headshot_image" | "body_image",
    imageData: string
  ) => void;
  removeCharacter: (index: number) => void;

  // credentials
  updateCredential: (credentialId: string, data: CredentialFormData) => void;
  createCredential: (credentialId: string, data: CredentialFormData) => void;
  removeCredential: (credentialId: string) => void;

  reset: () => void;
}

export const useShowcaseStore = create<State & Actions>()(
  immer((set) => ({
    showcaseJSON: {
      personas: [DEFAULT_JSON] as Persona[],
    },
    selectedCharacter: 0,
    currentPage: "character",
    editMode: false,

    setShowcaseJSON: (json) =>
      set((state) => {
        state.showcaseJSON = json;
      }),

    setSelectedCharacter: (index) =>
      set((state) => {
        state.selectedCharacter = index;
      }),

    // Edit Mode from the form
    setEditMode: (mode) =>
      set((state) => {
        state.editMode = mode;
      }),

    // Character Details
    // those methods are temporary, to be replaced with each dedicated service
    updateCharacterDetails: ({ name, type, description }) =>
      set((state) => {
        const persona = state.showcaseJSON.personas[state.selectedCharacter];
        persona.name = name;
        persona.type = type;
        persona.description = description;
      }),

    updateCharacterImage: (imageType, imageData) =>
      set((state) => {
        state.showcaseJSON.personas[state.selectedCharacter][imageType] =
          imageData;
      }),

    removeCharacter: (index) =>
      set((state) => {
        state.showcaseJSON.personas.splice(index, 1);
        if (state.selectedCharacter === index) {
          state.selectedCharacter = 0;
        }
      }),

    // credentials
    updateCredential: (credentialId, data) =>
      set((state) => {
        const persona = state.showcaseJSON.personas[state.selectedCharacter];
        persona.credentials[credentialId] = {
          name: data.name,
          issuer_name: data.issuer_name,
          version: data.version || "",
          icon: data.icon || "",
          attributes: data.attributes,
        };
      }),

    createCredential: (credentialId, data) =>
      set((state) => {
        const persona = state.showcaseJSON.personas[state.selectedCharacter];
        persona.credentials[credentialId] = {
          name: data.name,
          issuer_name: data.issuer_name,
          version: data.version || "",
          icon: data.icon || "",
          attributes: data.attributes,
        };
      }),

    removeCredential: (credentialId) =>
      set((state) => {
        const persona = state.showcaseJSON.personas[state.selectedCharacter];
        delete persona.credentials[credentialId];
      }),

    reset: () =>
      set((state) => {
        state.showcaseJSON = { personas: [DEFAULT_JSON] as Persona[] };
        state.selectedCharacter = 0;
        state.currentPage = "character";
        state.editMode = false;
      }),
  }))
);
