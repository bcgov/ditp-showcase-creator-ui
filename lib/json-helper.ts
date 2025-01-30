/* eslint-disable @typescript-eslint/no-explicit-any */

import { WritableDraft } from "immer";
import { Attribute, Credentials, ElementPath, OnboardingStep, ProofRequest, ShowcaseJSON } from "../types";

/**
 * Retrieves a nested value from an object using an array of keys as a path
 * @template T - The type of the input object
 * @param {T} obj - The object to traverse
 * @param {string[]} path - Array of keys representing the path to the desired value
 * @returns {unknown} The value at the specified path, empty string if the path leads to null/undefined, or the value if found
 * @example
 * const obj = { user: { profile: { name: "John" } } };
 * const path = ["user", "profile", "name"];
 * const name = getNestedValue(obj, path); // Returns "John"
 */

export const getNestedValue = <T,>(json: T, path: string[]): unknown => {
  return path.reduce((acc: unknown, key: string) => {
    if (acc === undefined || acc === null) return "";
    return (acc as any)[key];
  }, json);
};


/**
 * Removes a credential and all its references from scenarios
 * @param json - The ShowcaseJSON draft to modify
 * @param selectedCharacter - The index of the selected character
 * @param credential - The credential key to remove
 * @returns boolean - Whether the removal was successful
 */
export const removeCredentialAndReferences = (
  json: WritableDraft<ShowcaseJSON>,
  selectedCharacter: number,
  credential: keyof Credentials
): boolean => {
  const credentials = json.personas[selectedCharacter].credentials;
  
  // Check if this is the last credential
  if (Object.keys(credentials).length <= 1) {
    return false;
  }

  // Remove the credential
  delete json.personas[selectedCharacter].credentials[credential];

  // Remove references from scenarios
  const scenarios = json.personas[selectedCharacter].scenarios;
  scenarios.forEach((scenario) => {
    scenario.steps.forEach((step) => {
      if (step.requestOptions?.proofRequest) {
        cleanProofRequestReferences(step.requestOptions.proofRequest, credential);
      }
    });
  });

  return true;
};


/**
 * Cleans proof request references to a deleted credential
 * @param proofRequest - The proof request to clean
 * @param credential - The credential key that was removed
 */
export const cleanProofRequestReferences = (
  proofRequest: WritableDraft<ProofRequest>,
  credential: keyof Credentials
): void => {
  // Clean attributes
  Object.entries(proofRequest.attributes).forEach(([key, value]) => {
    if (value.restrictions && value.restrictions[0] === credential) {
      delete proofRequest.attributes[key];
    }
  });

  // Clean predicates
  Object.entries(proofRequest.predicates).forEach(([key, value]) => {
    if (value.restrictions[0] === credential) {
      delete proofRequest.predicates[key];
    }
  });
};

/**
 * Creates a new credential with default values
 * @param draft - The credentials draft to modify
 * @param credentialId - The new credential ID
 */
export const createNewCredential = (
  draft: WritableDraft<Credentials>,
  credentialId: string
): void => {
  draft[credentialId] = {
    issuer_name: "",
    name: "",
    version: "1.0",
    icon: "",
    attributes: [],
  };
};

/**
 * Updates a credential's attribute
 * @param draft - The credentials draft to modify
 * @param credentialId - The credential ID to update
 * @param attributeIndex - The index of the attribute to update
 * @param key - The attribute key to update
 * @param value - The new value
 */
export const updateCredentialAttribute = (
  draft: WritableDraft<Credentials>,
  credentialId: keyof Credentials,
  attributeIndex: number,
  key: keyof Attribute,
  value: string
): void => {
  if (draft[credentialId]?.attributes[attributeIndex]) {
    draft[credentialId].attributes[attributeIndex][key] = value;
  }
};


/**
 * Updates a credential's property
 * @param draft - The credentials draft to modify
 * @param credentialId - The credential ID to update
 * @param key - The credential key to update
 * @param value - The new value
 */
export const updateCredentialProperty = (
  draft: WritableDraft<Credentials>,
  credentialId: keyof Credentials,
  key: keyof Omit<Credentials[keyof Credentials], 'attributes'>,
  value: string
): void => {
  if (draft[credentialId]) {
    draft[credentialId][key] = value;
  }
};

/**
 * Adds a new attribute to a credential
 * @param draft - The credentials draft to modify
 * @param credentialId - The credential ID to update
 */
export const addCredentialAttribute = (
  draft: WritableDraft<Credentials>,
  credentialId: keyof Credentials
): void => {
  draft[credentialId].attributes.push({
    name: "",
    value: "",
    type: "",
  });
};

/**
 * Removes an attribute from a credential
 * @param draft - The credentials draft to modify
 * @param credentialId - The credential ID to update
 * @param index - The index of the attribute to remove
 */
export const removeCredentialAttribute = (
  draft: WritableDraft<Credentials>,
  credentialId: keyof Credentials,
  index: number
): void => {
  draft[credentialId].attributes.splice(index, 1);
};


type OnboardingStepValue = string | string[] | undefined;

/**
 * Updates a property in an OnboardingStep
 * @param draft - The OnboardingStep draft to modify
 * @param key - The key to update
 * @param value - The new value
 */
export const updateOnboardingStep = (
  draft: WritableDraft<OnboardingStep>,
  key: keyof OnboardingStep,
  value: OnboardingStepValue
): void => {
  if (key === 'credentials' && typeof value === 'string') {
    // Handle credentials array specially
    if (!draft.credentials) {
      draft.credentials = [];
    }
    draft.credentials.push(value);
  } else {
    (draft[key] as OnboardingStepValue) = value;
  }
};

/**
 * Type guard to check if a key in OnboardingStep expects an array value
 */
export const isArrayProperty = (key: keyof OnboardingStep): boolean => {
  return key === 'credentials';
};

/**
 * Updates a single value property in an OnboardingStep
 */
export const updateOnboardingStepSingleValue = (
  draft: WritableDraft<OnboardingStep>,
  key: keyof Omit<OnboardingStep, 'credentials'>,
  value: string
): void => {
  draft[key] = value;
};

/**
 * Updates the credentials array in an OnboardingStep
 */
export const updateOnboardingStepCredentials = (
  draft: WritableDraft<OnboardingStep>,
  credentials: string[]
): void => {
  draft.credentials = credentials;
};

/**
 * Removes a credential from an onboarding step
 * @param draft - The OnboardingStep draft to modify
 * @param credential - The credential to remove
 */
export const removeOnboardingStepCredential = (
  draft: WritableDraft<OnboardingStep>,
  credential: string
): void => {
  if (draft.credentials) {
    const index = draft.credentials.indexOf(credential);
    if (index !== -1) {
      draft.credentials.splice(index, 1);
    }
  }
};

/**
 * Adds a credential to an onboarding step
 * @param draft - The OnboardingStep draft to modify
 * @param credential - The credential to add
 */
export const addOnboardingStepCredential = (
  draft: WritableDraft<OnboardingStep>,
  credential: string
): void => {
  if (draft.credentials) {
    draft.credentials.push(credential);
  }
};


/**
 * Updates a property in an object based on the element path
 */
export const updateProperty = <T extends UpdateableObject>(
  draft: WritableDraft<T>,
  path: ElementPath,
  value: string
): void => {
  if (typeof path === 'string') {
    (draft as any)[path] = value;
  } else {
    const [section, field] = path;
    if (!draft[section]) {
      (draft as any)[section] = {};
    }
    (draft[section] as any)[field] = value;
  }
};

/**
 * Type guard to check if a path is an array path
 */
export const isArrayPath = (path: ElementPath): path is [string, string] => {
  return Array.isArray(path);
};

type UpdateableObject = {
  [key: string]: any;
  [key: number]: any;
};
/**
 * Gets a value from an object based on the element path
 */
export const getPropertyValue = <T extends UpdateableObject>(
  obj: T,
  path: ElementPath
): string | undefined => {
  if (typeof path === 'string') {
    return obj[path];
  }
  const [section, field] = path;
  return obj[section]?.[field];
};