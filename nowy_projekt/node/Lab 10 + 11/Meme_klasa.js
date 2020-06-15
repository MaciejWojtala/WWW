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
exports.Meme = void 0;
var Lokalne_1 = require("./Lokalne");
var Meme = /** @class */ (function () {
    function Meme() {
    }
    Meme.prototype.init = function (id, name, price, url, history, database) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.id = id;
                this.name = name;
                this.price = price;
                this.url = url;
                this.history = new Array(1);
                this.history = history;
                this.database = database;
                return [2 /*return*/];
            });
        });
    };
    Meme.prototype.getHistoryLocal = function () {
        return this.history;
    };
    Meme.prototype.getIdLocal = function () {
        return this.id;
    };
    Meme.prototype.getPriceLocal = function () {
        return this.price;
    };
    Meme.prototype.getNameLocal = function () {
        return this.name;
    };
    Meme.prototype.getUrlLocal = function () {
        return this.url;
    };
    Meme.prototype.getId = function () {
        return this.id;
    };
    Meme.prototype.copy = function (actualState) {
        this.name = actualState.name;
        this.price = actualState.price;
        this.url = actualState.url;
        this.history = actualState.history;
    };
    Meme.prototype.getHistory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.getMeme(this.id)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("getHistory error");
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.copy(actualState);
                        return [2 /*return*/, this.history];
                }
            });
        });
    };
    Meme.prototype.getPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.getMeme(this.id)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log("getPrice error");
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3:
                        this.copy(actualState);
                        return [2 /*return*/, this.price];
                }
            });
        });
    };
    Meme.prototype.getName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.getMeme(this.id)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log("getName error");
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3:
                        this.copy(actualState);
                        return [2 /*return*/, this.name];
                }
            });
        });
    };
    Meme.prototype.getUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actualState, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.database.getMeme(this.id)];
                    case 1:
                        actualState = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log("get url error");
                        console.log(error_4);
                        return [3 /*break*/, 3];
                    case 3:
                        this.copy(actualState);
                        return [2 /*return*/, this.url];
                }
            });
        });
    };
    Meme.prototype.getAnonymousMeme = function () {
        return ({ 'id': this.id, 'name': this.name, 'price': this.price,
            'url': this.url, history: this.history });
    };
    Meme.prototype.setPrice = function (anyNewPrice, committer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var newPrice = Lokalne_1.anyToNumber(anyNewPrice);
                        if (newPrice[1] === false)
                            resolve(false);
                        _this.price = newPrice[0];
                        _this.history.push([_this.price, committer]);
                        _this.database.insertMeme(_this)
                            .then(function () {
                            resolve(true);
                        });
                    })];
            });
        });
    };
    return Meme;
}());
exports.Meme = Meme;
