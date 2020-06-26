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
exports.Builder = void 0;
var Meme_klasa_1 = require("./Meme_klasa");
var Database_klasa_1 = require("./Database_klasa");
var Builder = /** @class */ (function () {
    function Builder(mutex) {
        this.memesNumber = 4;
        this.memeTable = new Array(this.memesNumber);
        this.mutex = mutex;
        this.database = new Database_klasa_1.Database(this.mutex);
    }
    Builder.prototype.init = function (mutex) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var prices, err_1, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 11]);
                                    prices = [1150, 1100, 1200, 1300];
                                    return [4 /*yield*/, this.database.init()];
                                case 1:
                                    _a.sent();
                                    this.memeTable[0] = new Meme_klasa_1.Meme();
                                    this.memeTable[0].init(0, 'Gold', prices[0], 'https://i.redd.it/h7rplf9jt8y21.png', [[prices[0], "init"]], mutex);
                                    this.memeTable[1] = new Meme_klasa_1.Meme();
                                    this.memeTable[1].init(1, 'Platinum', prices[1], 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg', [[prices[1], "init"]], mutex);
                                    this.memeTable[2] = new Meme_klasa_1.Meme();
                                    this.memeTable[2].init(2, 'Elite', prices[2], 'https://i.imgflip.com/30zz5g.jpg', [[prices[2], "init"]], mutex);
                                    this.memeTable[3] = new Meme_klasa_1.Meme();
                                    this.memeTable[3].init(3, 'Meme meme', prices[3], 'https://i.imgflip.com/41wdb2.jpg', [[prices[3], "init"]], mutex);
                                    return [4 /*yield*/, this.database.insertMeme(this.memeTable[0])];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, this.database.insertMeme(this.memeTable[1])];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, this.database.insertMeme(this.memeTable[2])];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, this.database.insertMeme(this.memeTable[3])];
                                case 5:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 11];
                                case 6:
                                    err_1 = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    _a.trys.push([7, 9, , 10]);
                                    return [4 /*yield*/, this.database.rollback_close()];
                                case 8:
                                    _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 10];
                                case 9:
                                    err_2 = _a.sent();
                                    reject(err_2);
                                    return [3 /*break*/, 10];
                                case 10: return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return Builder;
}());
exports.Builder = Builder;
