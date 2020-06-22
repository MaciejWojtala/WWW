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
exports.DbClass = void 0;
var sqlite3 = require("sqlite3");
var DbClass = /** @class */ (function () {
    function DbClass() {
    }
    DbClass.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.db = new sqlite3.Database("database.db", function (err) { return __awaiter(_this, void 0, void 0, function () {
                            var err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err) {
                                            console.log("Create/Open database error");
                                            reject(err);
                                        }
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
                                        console.log("Begin transaction error");
                                        reject(err_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    ;
    DbClass.prototype.run = function (sql, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.run(sql, params, function (err) {
                if (err) {
                    console.log("Database error");
                    _this.close();
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    DbClass.prototype.all = function (sql, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log("Database error");
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    };
    DbClass.prototype.close = function () {
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
                                    this.db.close();
                                    reject(err_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DbClass.prototype.connection_close = function () {
        this.db.close();
    };
    DbClass.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, quiz_json, quiz_name, quiz_list_json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 19, , 20]);
                        sql = 'DROP TABLE IF EXISTS users;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 1:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS users (user_name VARCHAR(255) PRIMARY KEY, user_password VARCHAR(255) NOT NULL);';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 2:
                        _a.sent();
                        sql = 'INSERT OR REPLACE INTO users (user_name, user_password) VALUES (?, ?), (?, ?);';
                        return [4 /*yield*/, this.run(sql, ["user1", "user1", "user2", "user2"])];
                    case 3:
                        _a.sent();
                        sql = 'DROP TABLE IF EXISTS sessions;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 4:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS sessions(session_id VARCHAR(255) PRIMARY KEY, user_name VARCHAR(255), FOREIGN KEY(user_name) REFERENCES users(user_name));';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 5:
                        _a.sent();
                        sql = 'DROP TABLE IF EXISTS results;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 6:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS results(user_name VARCHAR(255), quiz_name VARCHAR(255), result REAL, PRIMARY KEY(user_name, quiz_name), FOREIGN KEY(user_name) REFERENCES users(user_name));';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 7:
                        _a.sent();
                        sql = 'DROP TABLE IF EXISTS question_results;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 8:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS question_results(question_nr INTEGER, user_name VARCHAR(255), quiz_name VARCHAR(255), time REAL, answer VARCHAR(255), correct_answer VARCHAR(255), punishment REAL, result REAL, PRIMARY KEY(question_nr, user_name, quiz_name), FOREIGN KEY(user_name) REFERENCES users(user_name));';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 9:
                        _a.sent();
                        sql = 'DROP TABLE IF EXISTS quizzes;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 10:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS quizzes (quiz_name VARCHAR(255) PRIMARY KEY, quiz_json VARCHAR(2047) NOT NULL);';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 11:
                        _a.sent();
                        quiz_json = "{\n                \"name\": \"Quiz A\",\n                \"questions\": [\n                    \"2 + 2 = \",\n                    \"3 * 6 : 9 = \",\n                    \"8 - 7 * 15 = \",\n                    \"83 * (7 * 15 - 35 * 3) = \",\n                    \"80 : (9 * 7 - 8 * 8) = \",\n                    \"64 : 2 : 4 : 8 = \"\n                ],\n                \"correct_answers\": [\n                    \"4\",\n                    \"2\",\n                    \"-97\",\n                    \"0\",\n                    \"-80\",\n                    \"1\"\n                ],\n                \"introduction\": \"Quiz algebraiczny, w ka\u017Cdym zadaniu nale\u017Cy poda\u0107 jako wynik liczb\u0119 ca\u0142kowit\u0105.<br>Nie nale\u017Cy podawa\u0107 zer wiod\u0105cych, poprzedza\u0107 liczb znakiem \\\"+\\\" lub poprzedza\u0107 zera znakiem \\\"-\\\".<br>Na wynik maj\u0105 wp\u0142yw: poprawno\u015B\u0107 odpowiedzi i czas wype\u0142niania quizu.\"\n            }";
                        quiz_name = "Quiz A";
                        sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
                        return [4 /*yield*/, this.run(sql, [quiz_name, quiz_json])];
                    case 12:
                        _a.sent();
                        quiz_json = "{\n                \"name\": \"Quiz B\",\n                \"questions\": [\n                    \"3 + 3 = \",\n                    \"8 * 19 : 4 = \",\n                    \"8 - 7 * 7 = \",\n                    \"16 * (7 * 8 - 6 * 9) = \",\n                    \"17 : (13 * 5 - 8 * 8) = \",\n                    \"13 * 68 : 2 : 17 = \"\n                ],\n                \"correct_answers\": [\n                    \"6\",\n                    \"38\",\n                    \"-41\",\n                    \"32\",\n                    \"17\",\n                    \"26\"\n                ],\n                \"introduction\": \"Quiz algebraiczny, w ka\u017Cdym zadaniu nale\u017Cy poda\u0107 jako wynik liczb\u0119 ca\u0142kowit\u0105.<br>Nie nale\u017Cy podawa\u0107 zer wiod\u0105cych, poprzedza\u0107 liczb znakiem \\\"+\\\" lub poprzedza\u0107 zera znakiem \\\"-\\\".<br>Na wynik maj\u0105 wp\u0142yw: poprawno\u015B\u0107 odpowiedzi i czas wype\u0142niania quizu.\"\n            }";
                        quiz_name = "Quiz B";
                        sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
                        return [4 /*yield*/, this.run(sql, [quiz_name, quiz_json])];
                    case 13:
                        _a.sent();
                        quiz_json = "{\n                \"name\": \"Quiz C\",\n                \"questions\": [\n                    \"1 + 1 = \",\n                    \"5 * 6 : 2 = \",\n                    \"(8 - 7) * 15 = \",\n                    \"433 * (7 * 15 - 35 * 3) = \",\n                    \"321 : (9 * 7 - 8 * 8) = \",\n                    \"128 : 2 : 4 : 8 = \"\n                ],\n                \"correct_answers\": [\n                    \"2\",\n                    \"15\",\n                    \"15\",\n                    \"0\",\n                    \"-321\",\n                    \"2\"\n                ],\n                \"introduction\": \"Quiz algebraiczny, w ka\u017Cdym zadaniu nale\u017Cy poda\u0107 jako wynik liczb\u0119 ca\u0142kowit\u0105.<br>Nie nale\u017Cy podawa\u0107 zer wiod\u0105cych, poprzedza\u0107 liczb znakiem \\\"+\\\" lub poprzedza\u0107 zera znakiem \\\"-\\\".<br>Na wynik maj\u0105 wp\u0142yw: poprawno\u015B\u0107 odpowiedzi i czas wype\u0142niania quizu.\"\n            }";
                        quiz_name = "Quiz C";
                        sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
                        return [4 /*yield*/, this.run(sql, [quiz_name, quiz_json])];
                    case 14:
                        _a.sent();
                        quiz_json = "{\n                \"name\": \"Quiz D\",\n                \"questions\": [\n                    \"10 - 0 = \",\n                    \"243 * 6 : 27 = \",\n                    \"13 * 6 = \",\n                    \"22 * (8 * 5 - 7 * 6) = \",\n                    \"(255 + 10 - 53 * 5) : (20 * 6 - 8 * 8) = \",\n                    \"3072 : 2 : 4 : 8 = \"\n                ],\n                \"correct_answers\": [\n                    \"10\",\n                    \"54\",\n                    \"78\",\n                    \"-44\",\n                    \"0\",\n                    \"48\"\n                ],\n                \"introduction\": \"Quiz algebraiczny, w ka\u017Cdym zadaniu nale\u017Cy poda\u0107 jako wynik liczb\u0119 ca\u0142kowit\u0105.<br>Nie nale\u017Cy podawa\u0107 zer wiod\u0105cych, poprzedza\u0107 liczb znakiem \\\"+\\\" lub poprzedza\u0107 zera znakiem \\\"-\\\".<br>Na wynik maj\u0105 wp\u0142yw: poprawno\u015B\u0107 odpowiedzi i czas wype\u0142niania quizu.\"\n            }";
                        quiz_name = "Quiz D";
                        sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
                        return [4 /*yield*/, this.run(sql, [quiz_name, quiz_json])];
                    case 15:
                        _a.sent();
                        sql = 'DROP TABLE IF EXISTS quizzes_list;';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 16:
                        _a.sent();
                        sql = 'CREATE TABLE IF NOT EXISTS quizzes_list (quiz_list VARCHAR(255) PRIMARY KEY);';
                        return [4 /*yield*/, this.run(sql, [])];
                    case 17:
                        _a.sent();
                        quiz_list_json = "{\n                \"quizzes\": [\n                    \"Quiz A\",\n                    \"Quiz B\",\n                    \"Quiz C\",\n                    \"Quiz D\"\n                ]\n            }";
                        sql = 'INSERT OR REPLACE INTO quizzes_list (quiz_list) VALUES (?);';
                        return [4 /*yield*/, this.run(sql, [quiz_list_json])];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        error_1 = _a.sent();
                        console.log("Database error");
                        console.log(error_1);
                        return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ;
    return DbClass;
}());
exports.DbClass = DbClass;
