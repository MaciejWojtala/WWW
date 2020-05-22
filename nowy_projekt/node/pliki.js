"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var util_1 = require("util");
function files1() {
    fs.open('plik.txt', 'a', function (err, fd) {
        if (err) {
            console.log('Nie udało się otworzyć pliku :(', err);
            return;
        }
        fs.write(fd, 'Kolejny wpis do pliku!\n', function (err, written, str) {
            if (err) {
                console.log('Nie udało się zapisać', err);
            }
            fs.close(fd, function () { });
        });
    });
}
function files2() {
    var open = util_1.promisify(fs.open);
    var write = util_1.promisify(fs.write);
    var close = util_1.promisify(fs.close);
    var fd;
    open('plik.txt', 'a').then(function (_fd) {
        fd = _fd;
        write(fd, 'A z promisami też się może zapisze?\n');
    }).then(function () { return close(fd); })["catch"](function (reason) {
        console.log('Błąd był straszliwy!', reason);
    });
}
function writeSomething() {
    return __awaiter(this, void 0, void 0, function () {
        var open, write, close, fd, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    open = util_1.promisify(fs.open);
                    write = util_1.promisify(fs.write);
                    close = util_1.promisify(fs.close);
                    fd = -1;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 8]);
                    return [4 /*yield*/, open('plik3.txt', 'a')];
                case 2:
                    fd = _a.sent();
                    return [4 /*yield*/, write(fd, 'To jeszcze z async/await')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, close(fd)];
                case 4:
                    _a.sent();
                    console.log("OK");
                    return [3 /*break*/, 8];
                case 5:
                    e_1 = _a.sent();
                    console.log('Jakiś błąd w trakcie zapisywania', e_1);
                    if (!(fd != -1)) return [3 /*break*/, 7];
                    return [4 /*yield*/, close(fd)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
/*function files3() {
    (async function() {
        await writeSomething();
    });
}
*/
function files3() {
    try {
        writeSomething();
    }
    catch (e) {
        console.log(e);
    }
}
files3();
