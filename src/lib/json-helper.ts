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