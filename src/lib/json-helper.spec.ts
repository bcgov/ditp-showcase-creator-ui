import {
  removeCredentialAndReferences,
  cleanProofRequestReferences,
  createNewCredential,
  updateCredentialAttribute,
  updateCredentialProperty,
  addCredentialAttribute,
  removeCredentialAttribute,
  getNestedValue,
  updateOnboardingStep,
  isArrayProperty,
  updateOnboardingStepSingleValue,
  updateOnboardingStepCredentials,
  removeOnboardingStepCredential,
  addOnboardingStepCredential
} from './json-helper';
import { ShowcaseJSON, Credentials, ProofRequest, OnboardingStep } from '../types';
import { createDraft, WritableDraft } from 'immer';

describe('json-helpers', () => {
  describe("getNestedValue", () => {
    const testObject = {
      level1: {
        level2: {
          stringValue: 'test',
          numberValue: 123,
          boolValue: true,
          nullValue: null,
          arrayValue: [1, 2, 3],
          objectValue: { key: 'value' }
        }
      }
    };
  
    it('should return string value from nested object', () => {
      const path = ['level1', 'level2', 'stringValue'];
      expect(getNestedValue(testObject, path)).toBe('test');
    });
  
    it('should return number value from nested object', () => {
      const path = ['level1', 'level2', 'numberValue'];
      expect(getNestedValue(testObject, path)).toBe(123);
    });
  
    it('should return boolean value from nested object', () => {
      const path = ['level1', 'level2', 'boolValue'];
      expect(getNestedValue(testObject, path)).toBe(true);
    });
  
    it('should return null for null value', () => {
      const path = ['level1', 'level2', 'nullValue'];
      expect(getNestedValue(testObject, path)).toBeNull();
    });
  
    it('should return array value from nested object', () => {
      const path = ['level1', 'level2', 'arrayValue'];
      expect(getNestedValue(testObject, path)).toEqual([1, 2, 3]);
    });
  
    it('should return object value from nested object', () => {
      const path = ['level1', 'level2', 'objectValue'];
      expect(getNestedValue(testObject, path)).toEqual({ key: 'value' });
    });
  
    it('should return empty string for non-existent path', () => {
      const path = ['level1', 'nonexistent', 'value'];
      expect(getNestedValue(testObject, path)).toBe('');
    });
  
    it('should handle empty path array', () => {
      const path: string[] = [];
      expect(getNestedValue(testObject, path)).toBe(testObject);
    });
  
    const personaObject = {
      personas: [
        {
          credentials: {
            student_card: {
              attributes: [
                {
                  name: 'student_first_name',
                  value: 'Bob'
                }
              ]
            }
          }
        }
      ]
    };
  
    it('should handle complex nested persona object', () => {
      const path = ['personas', '0', 'credentials', 'student_card', 'attributes', '0', 'value'];
      expect(getNestedValue(personaObject, path)).toBe('Bob');
    });
  });

  describe('removeCredentialAndReferences', () => {
    let mockJson: WritableDraft<ShowcaseJSON>;

    beforeEach(() => {
      mockJson = createDraft<ShowcaseJSON>({
        personas: [{
          credentials: {
            'cred1': {
              issuer_name: 'Test Issuer 1',
              name: 'Credential 1',
              version: '1.0',
              icon: 'icon1',
              attributes: []
            },
            'cred2': {
              issuer_name: 'Test Issuer 2',
              name: 'Credential 2',
              version: '1.0',
              icon: 'icon2',
              attributes: []
            }
          },
          scenarios: [{
            steps: [{
              screenId: 'screen1',
              requestOptions: {
                proofRequest: {
                  attributes: {
                    test: { restrictions: ['cred1'], attributes: [] }
                  },
                  predicates: {
                    test: {
                      restrictions: ['cred1'], name: '', type: '',
                      value: 0
                    }
                  }
                },
                type: '',
                title: '',
                text: ''
              },
              type: '',
              title: '',
              text: ''
            }],
            id: '',
            name: '',
            overview: {
              title: '',
              text: '',
              image: ''
            },
            summary: {
              title: '',
              text: '',
              image: ''
            }
          }],
          name: '',
          type: '',
          headshot_image: '',
          body_image: '',
          description: '',
          revocationInfo: [],
          progressBar: [],
          onboarding: []
        }]
      });
    });

    it('should not remove the last credential', () => {
      const singleCredentialJson = createDraft<ShowcaseJSON>({
        personas: [{
          credentials: {
            'cred1': {
              issuer_name: 'Test',
              name: 'Test',
              version: '1.0',
              icon: '',
              attributes: []
            }
          },
          scenarios: [],
          name: '',
          type: '',
          headshot_image: '',
          body_image: '',
          description: '',
          revocationInfo: [],
          progressBar: [],
          onboarding: []
        }]
      });

      const result = removeCredentialAndReferences(singleCredentialJson, 0, 'cred1');
      expect(result).toBe(false);
      expect(singleCredentialJson.personas?.[0].credentials?.[
        'cred1']).toBeDefined();
    });

    it('should remove credential and its references', () => {
      const result = removeCredentialAndReferences(mockJson, 0, 'cred1');
      
      expect(result).toBe(true);
      expect(mockJson.personas[0].credentials['cred1']).toBeUndefined();
      expect(mockJson.personas[0].scenarios[0].steps[0].requestOptions.proofRequest.attributes.test).toBeUndefined();
      expect(mockJson.personas[0].scenarios[0].steps[0].requestOptions.proofRequest.predicates.test).toBeUndefined();
    });
  });

  describe('cleanProofRequestReferences', () => {
    let mockProofRequest: ProofRequest;

    beforeEach(() => {
      mockProofRequest = createDraft<ProofRequest>({
        attributes: {
          attr1: { restrictions: ['cred1'], attributes: [] },
          attr2: { restrictions: ['cred2'], attributes: [] }
        },
        predicates: {
          pred1: { restrictions: ['cred1'], name: '', type: '', value: 0 },
          pred2: { restrictions: ['cred2'], name: '', type: '', value: 0 }
        }
      });
    });

    it('should remove all references to specified credential', () => {
      cleanProofRequestReferences(mockProofRequest, 'cred1');
      
      expect(mockProofRequest.attributes.attr1).toBeUndefined();
      expect(mockProofRequest.attributes.attr2).toBeDefined();
      expect(mockProofRequest.predicates.pred1).toBeUndefined();
      expect(mockProofRequest.predicates.pred2).toBeDefined();
    });

    it('should handle non-existent credential references', () => {
      cleanProofRequestReferences(mockProofRequest, 'non-existent');
      
      expect(mockProofRequest.attributes.attr1).toBeDefined();
      expect(mockProofRequest.attributes.attr2).toBeDefined();
      expect(mockProofRequest.predicates.pred1).toBeDefined();
      expect(mockProofRequest.predicates.pred2).toBeDefined();
    });
  });

  describe('createNewCredential', () => {
    it('should create a new credential with default values', () => {
      const mockDraft = createDraft<Credentials>({});
      const credentialId = 'new-cred';

      createNewCredential(mockDraft, credentialId);

      expect(mockDraft[credentialId]).toEqual({
        issuer_name: '',
        name: '',
        version: '1.0',
        icon: '',
        attributes: []
      });
    });
  });

  describe('updateCredentialAttribute', () => {
    let mockDraft: Credentials;

    beforeEach(() => {
      mockDraft = createDraft({
        cred1: {
          issuer_name: 'Test',
          name: 'Test',
          version: '1.0',
          icon: '',
          attributes: [{
            name: 'attr1',
            value: 'value1',
            type: 'type1'
          }]
        }
      });
    });

    it('should update an existing attribute', () => {
      updateCredentialAttribute(mockDraft, 'cred1', 0, 'name', 'newName');
      expect(mockDraft.cred1.attributes[0].name).toBe('newName');
    });

    it('should handle non-existent attribute index', () => {
      updateCredentialAttribute(mockDraft, 'cred1', 999, 'name', 'newName');
      expect(mockDraft.cred1.attributes[0].name).toBe('attr1');
    });

    it('should handle non-existent credential', () => {
      updateCredentialAttribute(mockDraft, 'non-existent' as keyof Credentials, 0, 'name', 'newName');
      expect(mockDraft.cred1.attributes[0].name).toBe('attr1');
    });
  });

  describe('updateCredentialProperty', () => {
    let mockDraft: Credentials;

    beforeEach(() => {
      mockDraft = createDraft({
        cred1: {
          issuer_name: 'Test',
          name: 'Test',
          version: '1.0',
          icon: '',
          attributes: []
        }
      });
    });

    it('should update a credential property', () => {
      updateCredentialProperty(mockDraft, 'cred1', 'issuer_name', 'New Issuer');
      expect(mockDraft.cred1.issuer_name).toBe('New Issuer');
    });

    it('should handle non-existent credential', () => {
      updateCredentialProperty(mockDraft, 'non-existent' as keyof Credentials, 'issuer_name', 'New Issuer');
      expect(mockDraft.cred1.issuer_name).toBe('Test');
    });
  });

  describe('addCredentialAttribute', () => {
    let mockDraft: Credentials;

    beforeEach(() => {
      mockDraft = createDraft({
        cred1: {
          issuer_name: 'Test',
          name: 'Test',
          version: '1.0',
          icon: '',
          attributes: []
        }
      });
    });

    it('should add a new attribute with default values', () => {
      addCredentialAttribute(mockDraft, 'cred1');
      
      expect(mockDraft.cred1.attributes).toHaveLength(1);
      expect(mockDraft.cred1.attributes[0]).toEqual({
        name: '',
        value: '',
        type: ''
      });
    });
  });

  describe('removeCredentialAttribute', () => {
    let mockDraft: Credentials;

    beforeEach(() => {
      mockDraft = createDraft({
        cred1: {
          issuer_name: 'Test',
          name: 'Test',
          version: '1.0',
          icon: '',
          attributes: [
            { name: 'attr1', value: 'value1', type: 'type1' },
            { name: 'attr2', value: 'value2', type: 'type2' }
          ]
        }
      });
    });

    it('should remove an attribute at specified index', () => {
      removeCredentialAttribute(mockDraft, 'cred1', 0);
      
      expect(mockDraft.cred1.attributes).toHaveLength(1);
      expect(mockDraft.cred1.attributes[0].name).toBe('attr2');
    });

    it('should handle out of bounds index', () => {
      removeCredentialAttribute(mockDraft, 'cred1', 999);
      expect(mockDraft.cred1.attributes).toHaveLength(2);
    });

    it('should handle negative index', () => {
      removeCredentialAttribute(mockDraft, 'cred1', -1);
      expect(mockDraft.cred1.attributes).toHaveLength(1);
    });
  });
});

describe('Onboarding Step Helpers', () => {
 describe('updateOnboardingStep', () => {
   let mockDraft: OnboardingStep;

   beforeEach(() => {
     mockDraft = ({
       screenId: 'screen1',
       title: 'Test Title',
       text: 'Test Text',
       image: 'test.jpg',
       credentials: ['cred1', 'cred2']
     });
   });

   it('should update a string property', () => {
     updateOnboardingStep(mockDraft, 'title', 'New Title');
     expect(mockDraft.title).toBe('New Title');
   });

   it('should update credentials array when value is string', () => {
     updateOnboardingStep(mockDraft, 'credentials', 'cred3');
     expect(mockDraft.credentials).toEqual(['cred1', 'cred2', 'cred3']);
   });

   it('should initialize credentials array if undefined', () => {
     const emptyDraft = ({
       screenId: 'screen1',
       title: 'Test',
       text: 'Test',
       credentials: []
     });
     
     updateOnboardingStep(emptyDraft, 'credentials', 'cred1');
     expect(emptyDraft.credentials).toEqual(['cred1']);
   });

   it('should handle optional properties', () => {
     updateOnboardingStep(mockDraft, 'image', undefined);
     expect(mockDraft.image).toBeUndefined();
   });
 });

 describe('isArrayProperty', () => {
   it('should return true for credentials property', () => {
     expect(isArrayProperty('credentials')).toBe(true);
   });

   it('should return false for non-array properties', () => {
     expect(isArrayProperty('title')).toBe(false);
     expect(isArrayProperty('text')).toBe(false);
     expect(isArrayProperty('screenId')).toBe(false);
     expect(isArrayProperty('image')).toBe(false);
   });
 });

 describe('updateOnboardingStepSingleValue', () => {
   let mockDraft: OnboardingStep;

   beforeEach(() => {
     mockDraft = ({
       screenId: 'screen1',
       title: 'Test Title',
       text: 'Test Text',
       image: 'test.jpg',
       credentials: []
     });
   });

   it('should update string properties', () => {
     updateOnboardingStepSingleValue(mockDraft, 'title', 'New Title');
     expect(mockDraft.title).toBe('New Title');

     updateOnboardingStepSingleValue(mockDraft, 'text', 'New Text');
     expect(mockDraft.text).toBe('New Text');
   });

   it('should update optional properties', () => {
     updateOnboardingStepSingleValue(mockDraft, 'image', 'new.jpg');
     expect(mockDraft.image).toBe('new.jpg');
   });
 });

 describe('updateOnboardingStepCredentials', () => {
   let mockDraft: OnboardingStep;

   beforeEach(() => {
     mockDraft = ({
       screenId: 'screen1',
       title: 'Test',
       text: 'Test',
       credentials: ['cred1', 'cred2']
     });
   });

   it('should update credentials array', () => {
     updateOnboardingStepCredentials(mockDraft, ['cred3', 'cred4']);
     expect(mockDraft.credentials).toEqual(['cred3', 'cred4']);
   });

   it('should handle empty array', () => {
     updateOnboardingStepCredentials(mockDraft, []);
     expect(mockDraft.credentials).toEqual([]);
   });
 });

 describe('removeOnboardingStepCredential', () => {
   let mockDraft: OnboardingStep;

   beforeEach(() => {
     mockDraft = ({
       screenId: 'screen1',
       title: 'Test',
       text: 'Test',
       credentials: ['cred1', 'cred2', 'cred3']
     });
   });

   it('should remove an existing credential', () => {
     removeOnboardingStepCredential(mockDraft, 'cred2');
     expect(mockDraft.credentials).toEqual(['cred1', 'cred3']);
   });

   it('should handle non-existent credential', () => {
     removeOnboardingStepCredential(mockDraft, 'non-existent');
     expect(mockDraft.credentials).toEqual(['cred1', 'cred2', 'cred3']);
   });
 });

 describe('addOnboardingStepCredential', () => {
   let mockDraft: OnboardingStep;

   beforeEach(() => {
     mockDraft = ({
       screenId: 'screen1',
       title: 'Test',
       text: 'Test',
       credentials: ['cred1', 'cred2']
     });
   });

   it('should add a new credential to existing array', () => {
     addOnboardingStepCredential(mockDraft, 'cred3');
     expect(mockDraft.credentials).toEqual(['cred1', 'cred2', 'cred3']);
   });

   it('should handle undefined credentials array', () => {
     const emptyDraft = ({
       screenId: 'screen1',
       title: 'Test',
       text: 'Test',
       credentials: []
     });
     
     addOnboardingStepCredential(emptyDraft, 'cred1');
     expect(emptyDraft.credentials).toBeUndefined();
   });

   it('should handle duplicate credentials', () => {
     addOnboardingStepCredential(mockDraft, 'cred1');
     expect(mockDraft.credentials).toEqual(['cred1', 'cred2', 'cred1']);
   });
 });
});