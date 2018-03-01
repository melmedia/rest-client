"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert query param id=1,2,3 to array of numbers
 * @param {string} id
 * @returns {number[]}
 */
function queryIdArray(id) {
    return id.split(',').map(Number);
}
exports.queryIdArray = queryIdArray;
//# sourceMappingURL=queryIdArray.js.map