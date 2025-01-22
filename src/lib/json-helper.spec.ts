import { getNestedValue } from "./json-helper";

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