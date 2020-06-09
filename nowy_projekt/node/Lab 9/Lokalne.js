"use strict";
exports.__esModule = true;
exports.anyToNumber = void 0;
function anyToNumber(arg) {
    try {
        var result = Number(arg);
        if (!Number.isNaN(result))
            return result;
        return -1;
    }
    catch (e) {
        console.log("Cannot convert to number");
    }
    return -1;
}
exports.anyToNumber = anyToNumber;
