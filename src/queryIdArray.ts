/**
 * Convert query param id=1,2,3 to array of numbers
 * @param {string} id
 * @returns {number[]}
 */
export function queryIdArray(id: string) {
  return id.split(',').map(Number);
}
