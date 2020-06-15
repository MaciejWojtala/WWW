"use strict";
exports.__esModule = true;
exports.anyToNumber = void 0;
function anyToNumber(arg) {
    console.log(arg);
    try {
        var result = Number(arg);
        if (!Number.isNaN(result))
            return [result, true];
        return [-1, false];
    }
    catch (e) {
        console.log("Cannot convert to number");
    }
    return [-1, false];
}
exports.anyToNumber = anyToNumber;
