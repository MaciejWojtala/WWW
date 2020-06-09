"use strict";
exports.__esModule = true;
exports.fib_rek = void 0;
function fib_rek(arg) {
    if (arg < 0)
        return -1;
    if (arg == 1)
        return 1;
    if (arg == 0)
        return 0;
    return fib_rek(arg - 1) + fib_rek(arg - 2);
}
exports.fib_rek = fib_rek;
