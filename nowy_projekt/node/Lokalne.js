"use strict";
exports.__esModule = true;
exports.anyToNumber = void 0;
function anyToNumber(arg) {
    try {
        var result = Number(arg);
        return result;
    }
    catch (e) {
        console.log("Cannot convert to number");
    }
    return -1;
}
exports.anyToNumber = anyToNumber;
