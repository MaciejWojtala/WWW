"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Database = void 0;
var sqlite3 = __importStar(require("sqlite3"));
var Meme_klasa_1 = require("./Meme_klasa");
var password_hash_1 = __importDefault(require("password-hash"));
var Database = /** @class */ (function () {
    function Database(mutex) {
        this.mutex = mutex;
    }
    Database.prototype.open_with_transaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.db = new sqlite3.Database("database.db");
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.run('BEGIN TRANSACTION;', [])];
                                case 2:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    console.log("begin transaction error");
                                    reject(err_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.run = function (sql, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db.run(sql, params, function (err) {
                            if (err) {
                                console.log("Database run error");
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    })];
            });
        });
    };
    Database.prototype.all = function (sql, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db.all(sql, params, function (err, rows) {
                            if (err) {
                                console.log("Database all error");
                                reject(err);
                            }
                            else {
                                resolve(rows);
                            }
                        });
                    })];
            });
        });
    };
    Database.prototype.commit_close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.run('COMMIT;', [])];
                                case 1:
                                    _a.sent();
                                    this.db.close();
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    console.log("Commit error");
                                    reject(err_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.rollback_close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.run('ROLLBACK;', [])];
                                case 1:
                                    _a.sent();
                                    this.db.close();
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_3 = _a.sent();
                                    console.log("Commit error");
                                    this.db.close();
                                    reject(err_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.connection_close = function () {
        this.db.close();
    };
    Database.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 10, , 11]);
                                    return [4 /*yield*/, this.open_with_transaction()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('DROP TABLE IF EXISTS memes', [])];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('DROP TABLE IF EXISTS histories', [])];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('DROP TABLE IF EXISTS users', [])];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('CREATE TABLE IF NOT EXISTS memes (id INT PRIMARY KEY, name VARCHAR(255), price INT, url VARCHAR(255));', [])];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('CREATE TABLE IF NOT EXISTS histories (meme_id INT, commiter varchar(255), generation INT, price INT, PRIMARY KEY(meme_id, generation));', [])];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('CREATE TABLE IF NOT EXISTS users (user VARCHAR(255) PRIMARY KEY, password VARCHAR(255));', [])];
                                case 7:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('INSERT OR REPLACE INTO users (user, password) VALUES (?, ?), (?, ?);', ["user", password_hash_1["default"].generate('user'), "admin", password_hash_1["default"].generate('admin')])];
                                case 8:
                                    _a.sent();
                                    return [4 /*yield*/, this.commit_close()];
                                case 9:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_4 = _a.sent();
                                    console.log("init error");
                                    reject(err_4);
                                    return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ;
    Database.prototype.getDatabase = function () {
        return this.db;
    };
    Database.prototype.insertToHistory = function (id, length, arg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_5, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(id < length - 1)) return [3 /*break*/, 6];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, this.insertToHistory(id + 1, length, arg)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                                            arg.getIdLocal(),
                                            arg.getHistoryLocal()[id][1],
                                            id,
                                            arg.getHistoryLocal()[id][0]
                                        ])];
                                case 3:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_5 = _a.sent();
                                    console.log("insert history error");
                                    reject(err_5);
                                    return [3 /*break*/, 5];
                                case 5: return [3 /*break*/, 9];
                                case 6:
                                    _a.trys.push([6, 8, , 9]);
                                    return [4 /*yield*/, this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                                            arg.getIdLocal(),
                                            arg.getHistoryLocal()[id][1],
                                            id,
                                            arg.getHistoryLocal()[id][0]
                                        ])];
                                case 7:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 9];
                                case 8:
                                    err_6 = _a.sent();
                                    console.log("insert history error");
                                    reject(err_6);
                                    return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.insertMeme = function (arg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, this.run('INSERT OR REPLACE INTO memes (id, name, price, url) VALUES (?, ?, ?, ?);', [
                                            arg.getIdLocal(),
                                            arg.getNameLocal(),
                                            arg.getPriceLocal(),
                                            arg.getUrlLocal()
                                        ])];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.insertToHistory(0, arg.getHistoryLocal().length, arg)];
                                case 2:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_7 = _a.sent();
                                    console.log("insert meme error");
                                    reject(err_7);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.getMeme = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var name, price, url, history, sql, rows, sql2, historyLength_1, resMeme, err_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    sql = "SELECT *\n                    FROM memes\n                    WHERE id = ?";
                                    return [4 /*yield*/, this.all(sql, [id])];
                                case 1:
                                    rows = _a.sent();
                                    rows.forEach(function (row) {
                                        name = row.name;
                                        price = row.price;
                                        url = row.url;
                                    });
                                    sql2 = "SELECT *\n                    FROM histories\n                    WHERE meme_id = ?";
                                    historyLength_1 = 0;
                                    return [4 /*yield*/, this.all(sql2, [id])];
                                case 2:
                                    rows = _a.sent();
                                    rows.forEach(function (row) {
                                        historyLength_1++;
                                    });
                                    history = new Array(historyLength_1);
                                    return [4 /*yield*/, this.all(sql2, [id])];
                                case 3:
                                    rows = _a.sent();
                                    rows.forEach(function (row) {
                                        history[row.generation] = [row.price, row.commiter];
                                    });
                                    resMeme = new Meme_klasa_1.Meme();
                                    resMeme.init(id, name, price, url, history, this.mutex);
                                    resolve(resMeme);
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_8 = _a.sent();
                                    console.log("get meme error");
                                    reject(err_8);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype._getBestMemes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var sql, rows, size, result, _loop_1, this_1, i, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    sql = 'SELECT id, name, price, url FROM memes ORDER BY price DESC';
                                    return [4 /*yield*/, this.all(sql, [])];
                                case 1:
                                    rows = _a.sent();
                                    size = rows.length;
                                    if (size > 3)
                                        size = 3;
                                    result = new Array(size);
                                    _loop_1 = function (i) {
                                        var historyRows, history_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    sql = "SELECT *\n                        FROM histories\n                        WHERE meme_id = ?";
                                                    return [4 /*yield*/, this_1.all(sql, [rows[i].id])];
                                                case 1:
                                                    historyRows = _a.sent();
                                                    history_1 = new Array(historyRows.length);
                                                    historyRows.forEach(function (row) {
                                                        history_1[row.generation] = [row.price, row.commiter];
                                                    });
                                                    result[i] = new Meme_klasa_1.Meme();
                                                    result[i].init(rows[i].id, rows[i].name, rows[i].price, rows[i].url, history_1, this_1.mutex);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    this_1 = this;
                                    i = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < size)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_1(i)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    i++;
                                    return [3 /*break*/, 2];
                                case 5:
                                    resolve(result);
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_9 = _a.sent();
                                    console.log("get best memes error");
                                    reject(err_9);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.getBestMemes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var bestMemes, result, i, err_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this._getBestMemes()];
                                case 1:
                                    bestMemes = _a.sent();
                                    result = new Array(bestMemes.length);
                                    for (i = 0; i < result.length; i++) {
                                        result[i] = bestMemes[i].getAnonymousMeme();
                                    }
                                    resolve(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_10 = _a.sent();
                                    console.log("get best memes error");
                                    reject(err_10);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Database.prototype.closeDatabase = function () {
        this.db.close();
    };
    return Database;
}());
exports.Database = Database;
