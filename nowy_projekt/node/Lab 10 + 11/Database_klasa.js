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
exports.Database = void 0;
var sqlite3 = require("sqlite3");
var Meme_klasa_1 = require("./Meme_klasa");
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db = new sqlite3.Database("database.db", function (err) {
                            sqlite3.verbose();
                            _this.db.serialize(function () {
                                _this.db.run('DROP TABLE IF EXISTS memes')
                                    .run('DROP TABLE IF EXISTS histories')
                                    .run('DROP TABLE IF EXISTS users')
                                    .run('CREATE TABLE IF NOT EXISTS memes (id INT PRIMARY KEY, name VARCHAR(255), price INT, url VARCHAR(255));', function (err) {
                                    if (err) {
                                        console.log("error");
                                        reject(err);
                                    }
                                }).run('CREATE TABLE IF NOT EXISTS histories (meme_id INT, commiter varchar(255), generation INT, price INT, PRIMARY KEY(meme_id, generation));', function (err) {
                                    if (err) {
                                        console.log("error");
                                        reject(err);
                                    }
                                    resolve();
                                }).run('CREATE TABLE IF NOT EXISTS users (user VARCHAR(255) PRIMARY KEY, password VARCHAR(255));', function (err) {
                                    if (err) {
                                        console.log("error");
                                        reject(err);
                                    }
                                })
                                    .run('INSERT OR REPLACE INTO users (user, password) VALUES ("user", "user"), ("admin", "admin");', function (err) {
                                    if (err) {
                                        console.log("error");
                                        reject(err);
                                    }
                                });
                            });
                        });
                    })];
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
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (id < length - 1) {
                            _this.insertToHistory(id + 1, length, arg)
                                .then(function () {
                                _this.db.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                                    arg.getIdLocal(),
                                    arg.getHistoryLocal()[id][1],
                                    id,
                                    arg.getHistoryLocal()[id][0]
                                ], function (err) {
                                    if (err) {
                                        console.log("error insert history");
                                        reject(err);
                                    }
                                    resolve();
                                });
                            });
                        }
                        else {
                            _this.db.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                                arg.getIdLocal(),
                                arg.getHistoryLocal()[id][1],
                                id,
                                arg.getHistoryLocal()[id][0]
                            ], function (err) {
                                if (err) {
                                    console.log("error insert history");
                                    reject(err);
                                }
                                resolve();
                            });
                        }
                    })];
            });
        });
    };
    Database.prototype.insertMeme = function (arg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        sqlite3.verbose();
                        try {
                            _this.db.run('INSERT OR REPLACE INTO memes (id, name, price, url) VALUES (?, ?, ?, ?);', [
                                arg.getIdLocal(),
                                arg.getNameLocal(),
                                arg.getPriceLocal(),
                                arg.getUrlLocal()
                            ], function (err) {
                                if (err) {
                                    console.log("error insert price");
                                    reject(err);
                                }
                                _this.insertToHistory(0, arg.getHistoryLocal().length, arg).then(function () {
                                    resolve();
                                });
                            });
                        }
                        catch (error) {
                            console.log("insert error");
                            reject(error);
                        }
                    })];
            });
        });
    };
    Database.prototype.getMeme = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var name;
                        var price;
                        var url;
                        var history;
                        sqlite3.verbose();
                        try {
                            var sql = "SELECT *\n                    FROM memes\n                    WHERE id = ?";
                            var promise = _this.db.all(sql, [id], function (err, rows) {
                                if (err) {
                                    console.log("error select");
                                    reject(err);
                                }
                                rows.forEach(function (row) {
                                    name = row.name;
                                    price = row.price;
                                    url = row.url;
                                });
                                var sql2 = "SELECT *\n                        FROM histories\n                        WHERE meme_id = ?";
                                var historyLength = 0;
                                _this.db.all(sql2, [id], function (err, rows) {
                                    if (err) {
                                        console.log("error select");
                                        reject(err);
                                    }
                                    rows.forEach(function (row) {
                                        historyLength++;
                                    });
                                    history = new Array(historyLength);
                                    _this.db.all(sql2, [id], function (err, rows) {
                                        if (err) {
                                            console.log("error select");
                                            reject(err);
                                        }
                                        rows.forEach(function (row) {
                                            history[row.generation] = [row.price, row.commiter];
                                        });
                                        var resMeme = new Meme_klasa_1.Meme();
                                        resMeme.init(id, name, price, url, history, _this);
                                        resolve(resMeme);
                                    });
                                });
                            });
                        }
                        catch (error) {
                            console.log("get error");
                            reject(error);
                        }
                    })];
            });
        });
    };
    Database.prototype.closeDatabase = function () {
        this.db.close();
    };
    return Database;
}());
exports.Database = Database;
