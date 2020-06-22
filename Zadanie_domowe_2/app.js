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
exports.App = void 0;
var database_1 = require("./database");
var App = /** @class */ (function () {
    function App(port, source) {
        this.port = port;
        this.source = source;
        this.db = new database_1.DbClass();
        this.express = require('express');
        this.session = require('express-session');
        this.bodyParser = require('body-parser');
        this.csurf = require('csurf');
        this.cookieParser = require('cookie-parser');
        this.SQLiteStore = require('connect-sqlite3')(this.session);
        this.store = new this.SQLiteStore({ db: ':memory:', dir: './' });
        this.app = this.express();
        this.csrfProtection = this.csurf({
            cookie: true
        });
        this.app.use(this.session({
            store: this.store,
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(this.bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(this.cookieParser('secret'));
        this.app.use(this.csrfProtection);
        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');
        this.app.use(this.express.urlencoded({
            extended: true
        }));
        this.app.use(this.express.static(__dirname));
    }
    App.prototype.round = function (arg) {
        return Math.round((arg + Number.EPSILON) * 100) / 100;
    };
    App.prototype.getLoginPage = function (req, res, message) {
        res.render('login', { title: 'Logowanie', _message: message, _req: req });
    };
    App.prototype.getQuizMenuPage = function (req, res, quiz_name, message) {
        req.session.quiz_name = quiz_name;
        res.render('quiz_menu', { _message: message, _req: req });
    };
    App.prototype.changePassword = function (req, res, new_password) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var username, sql, session_rows, err_1, err_2;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 11]);
                                    return [4 /*yield*/, this.db.open()];
                                case 1:
                                    _a.sent();
                                    username = req.session.username;
                                    sql = 'INSERT OR REPLACE INTO USERS (user_name, user_password) VALUES (?, ?);';
                                    return [4 /*yield*/, this.db.run(sql, [username, new_password])];
                                case 2:
                                    _a.sent();
                                    sql = 'SELECT session_ID FROM sessions WHERE user_name = ?';
                                    return [4 /*yield*/, this.db.all(sql, [username])];
                                case 3:
                                    session_rows = _a.sent();
                                    sql = 'DELETE FROM sessions WHERE user_name = ?';
                                    return [4 /*yield*/, this.db.run(sql, [username])];
                                case 4:
                                    _a.sent();
                                    session_rows.forEach(function (row) {
                                        _this.store.destroy(row.session_id, function (err) {
                                            if (err)
                                                reject(err);
                                        });
                                    });
                                    req.session.destroy();
                                    return [4 /*yield*/, this.db.close()];
                                case 5:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 11];
                                case 6:
                                    err_1 = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    _a.trys.push([7, 9, , 10]);
                                    return [4 /*yield*/, this.db.close()];
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
    App.prototype.getQuizPage = function (req, res, quiz_name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var quiz, sql, quiz_rows, err_3, err_4, err_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 7, , 12]);
                                    return [4 /*yield*/, this.db.open()];
                                case 1:
                                    _a.sent();
                                    sql = 'SELECT quiz_json from quizzes WHERE quiz_name = ?;';
                                    return [4 /*yield*/, this.db.all(sql, [quiz_name])];
                                case 2:
                                    quiz_rows = _a.sent();
                                    quiz_rows.forEach(function (row) {
                                        quiz = row.quiz_json;
                                    });
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, this.db.close()];
                                case 4:
                                    _a.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    err_3 = _a.sent();
                                    reject(err_3);
                                    return [3 /*break*/, 6];
                                case 6: return [3 /*break*/, 12];
                                case 7:
                                    err_4 = _a.sent();
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, this.db.close()];
                                case 9:
                                    _a.sent();
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_5 = _a.sent();
                                    reject(err_5);
                                    return [3 /*break*/, 11];
                                case 11:
                                    reject(err_4);
                                    return [3 /*break*/, 12];
                                case 12:
                                    req.session.begin_time = new Date().getTime();
                                    res.render('quiz', { _quiz: quiz, _req: req });
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.setStatsTable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var quiz_size, highscore, avg, bests, i, i, j, i, sql_1, highscore_rows_1, j, j, sql, highscore_rows, j, j, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 10, , 11]);
                                    quiz_size = 7;
                                    highscore = 5;
                                    avg = new Array(quiz_size);
                                    bests = new Array(quiz_size);
                                    for (i = 0; i < quiz_size; i++) {
                                        bests[i] = new Array(highscore);
                                    }
                                    for (i = 0; i < quiz_size; i++) {
                                        avg[i] = '-';
                                        for (j = 0; j < highscore; j++)
                                            bests[i][j] = '-';
                                    }
                                    return [4 /*yield*/, this.db.open()];
                                case 1:
                                    _a.sent();
                                    i = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < quiz_size - 1)) return [3 /*break*/, 6];
                                    sql_1 = 'SELECT result FROM question_results WHERE question_nr = ? AND quiz_name = ? ORDER BY result  ASC';
                                    return [4 /*yield*/, this.db.all(sql_1, [i + 1, req.session.quiz_name])];
                                case 3:
                                    highscore_rows_1 = _a.sent();
                                    for (j = 0; j < highscore_rows_1.length; j++) {
                                        if (j >= 5)
                                            break;
                                        bests[i][j] = highscore_rows_1[j].result;
                                    }
                                    sql_1 = 'SELECT AVG(result) as avg FROM question_results WHERE question_nr = ? AND quiz_name = ? AND punishment = ?';
                                    return [4 /*yield*/, this.db.all(sql_1, [i + 1, req.session.quiz_name, 0])];
                                case 4:
                                    highscore_rows_1 = _a.sent();
                                    for (j = 0; j < highscore_rows_1.length; j++) {
                                        if (j >= 5)
                                            break;
                                        if (highscore_rows_1[j].avg != null)
                                            avg[i] = this.round(highscore_rows_1[j].avg).toString();
                                    }
                                    _a.label = 5;
                                case 5:
                                    i++;
                                    return [3 /*break*/, 2];
                                case 6:
                                    sql = 'SELECT result FROM results WHERE quiz_name = ? ORDER BY result  ASC';
                                    return [4 /*yield*/, this.db.all(sql, [req.session.quiz_name])];
                                case 7:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        bests[6][j] = highscore_rows[j].result;
                                    }
                                    sql = 'SELECT AVG(result) as avg FROM results WHERE quiz_name = ?';
                                    return [4 /*yield*/, this.db.all(sql, [req.session.quiz_name])];
                                case 8:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        if (highscore_rows[j].avg != null)
                                            avg[6] = this.round(highscore_rows[j].avg).toString();
                                    }
                                    return [4 /*yield*/, this.db.close()];
                                case 9:
                                    _a.sent();
                                    resolve({ bests: bests, avg: avg });
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_6 = _a.sent();
                                    reject(err_6);
                                    return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getStats = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var json_result, err_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, (this.setStatsTable(req, res))];
                                case 1:
                                    json_result = _a.sent();
                                    res.render('stats', { _result: json_result, _req: req });
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_7 = _a.sent();
                                    reject(err_7);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getChooseQuizPage = function (req, res) {
        var quizzes_list = req.session.quizzes_list;
        res.render('choose_quiz', { quizzes: JSON.parse(quizzes_list).quizzes, _req: req });
    };
    App.prototype.getChangePasswordPage = function (req, res, message) {
        res.render("change_password", { title: 'Zmiana hasła', _message: message, _req: req });
    };
    App.prototype.getPage = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            if (!req.session.isLogged) {
                _this.getLoginPage(req, res, 'Zaloguj się');
            }
            else {
                _this.getChooseQuizPage(req, res);
            }
        });
    };
    App.prototype.save_result = function (req, next, quiz_result_json) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var total_time, result, quiz_result, quiz, punishments, question_results, question_times, i, i, err_8, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    total_time = (req.session.end_time - req.session.begin_time) / 1000;
                                    result = 0;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 11, , 16]);
                                    return [4 /*yield*/, this.db.open()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, JSON.parse(quiz_result_json)];
                                case 3:
                                    quiz_result = _a.sent();
                                    return [4 /*yield*/, JSON.parse(quiz_result.jsonString)];
                                case 4:
                                    quiz = _a.sent();
                                    punishments = new Array(quiz.questions.length);
                                    question_results = new Array(quiz.questions.length);
                                    question_times = new Array(quiz.questions.length);
                                    for (i = 0; i < quiz.questions.length; i++) {
                                        punishments[i] = 0;
                                        if (quiz_result.answers[i] !== quiz.correct_answers[i])
                                            punishments[i] = 10 * (i + 1);
                                        question_times[i] = this.round(quiz_result.percentage[i] * total_time / 100);
                                        question_results[i] = question_times[i] + punishments[i];
                                        result += question_results[i];
                                    }
                                    result = this.round(result);
                                    return [4 /*yield*/, this.db.run('INSERT OR REPLACE INTO results (user_name, quiz_name, result) VALUES (?, ?, ?);', [req.session.username, quiz.name, result])];
                                case 5:
                                    _a.sent();
                                    i = 0;
                                    _a.label = 6;
                                case 6:
                                    if (!(i < quiz.questions.length)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, this.db.run('INSERT OR REPLACE INTO question_results (question_nr, user_name, quiz_name, time, answer, correct_answer, punishment, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;', [i + 1, req.session.username, quiz.name,
                                            question_times[i], quiz_result.answers[i], quiz.correct_answers[i],
                                            punishments[i], question_results[i]])];
                                case 7:
                                    _a.sent();
                                    _a.label = 8;
                                case 8:
                                    i++;
                                    return [3 /*break*/, 6];
                                case 9: return [4 /*yield*/, this.db.close()];
                                case 10:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 16];
                                case 11:
                                    err_8 = _a.sent();
                                    _a.label = 12;
                                case 12:
                                    _a.trys.push([12, 14, , 15]);
                                    return [4 /*yield*/, this.db.close()];
                                case 13:
                                    _a.sent();
                                    reject(err_8);
                                    return [3 /*break*/, 15];
                                case 14:
                                    err_9 = _a.sent();
                                    reject(err_9);
                                    return [3 /*break*/, 15];
                                case 15: return [3 /*break*/, 16];
                                case 16: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getSummarize = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var username, quiz_name, result_1, quiz_length, question_times_1, answers_1, correct_answers_1, punishments_1, question_results_1, sql, summarize_rows, _loop_1, this_1, i, err_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    username = req.session.username;
                                    quiz_name = req.session.quiz_name;
                                    quiz_length = 6;
                                    question_times_1 = new Array(quiz_length);
                                    answers_1 = new Array(quiz_length);
                                    correct_answers_1 = new Array(quiz_length);
                                    punishments_1 = new Array(quiz_length);
                                    question_results_1 = new Array(quiz_length);
                                    sql = 'SELECT * FROM results WHERE user_name = ? AND quiz_name = ?';
                                    return [4 /*yield*/, this.db.all(sql, [username, quiz_name])];
                                case 1:
                                    summarize_rows = _a.sent();
                                    summarize_rows.forEach(function (row) {
                                        result_1 = row.result;
                                    });
                                    _loop_1 = function (i) {
                                        var _sql, _summarize_rows;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    _sql = 'SELECT * FROM question_results WHERE question_nr = ? AND user_name = ? AND quiz_name = ?';
                                                    return [4 /*yield*/, this_1.db.all(_sql, [i + 1, username, quiz_name])];
                                                case 1:
                                                    _summarize_rows = _a.sent();
                                                    _summarize_rows.forEach(function (row) {
                                                        question_times_1[i] = row.time;
                                                        answers_1[i] = row.answer;
                                                        correct_answers_1[i] = row.correct_answer;
                                                        punishments_1[i] = row.punishment;
                                                        question_results_1[i] = row.result;
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    this_1 = this;
                                    i = 0;
                                    _a.label = 2;
                                case 2:
                                    if (!(i < quiz_length)) return [3 /*break*/, 5];
                                    return [5 /*yield**/, _loop_1(i)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    i++;
                                    return [3 /*break*/, 2];
                                case 5:
                                    res.render('result', { title: 'Podsumowanie', message: 'Twój wynik', _req: req, _quiz_result: JSON.stringify({ result: result_1, question_times: question_times_1, answers: answers_1, correct_answers: correct_answers_1, punishments: punishments_1, question_results: question_results_1 }) });
                                    resolve();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_10 = _a.sent();
                                    reject(err_10);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.postLoginPage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var username, password, sql, user_rows, err_11, quizzes_lists_array, err_12, err_13, err_14;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    username = req.body.username;
                                    password = req.body.password;
                                    sql = "SELECT *\n                FROM users\n                WHERE user_name = ? AND user_password = ?;";
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 14, , 19]);
                                    return [4 /*yield*/, this.db.open()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, this.db.all(sql, [username, password])];
                                case 3:
                                    user_rows = _a.sent();
                                    user_rows.forEach(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                        var err_15, err_16;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    req.session.isLogged = true;
                                                    req.session.username = username;
                                                    sql = 'INSERT OR REPLACE INTO sessions (session_id, user_name) VALUES (?, ?);';
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 8]);
                                                    return [4 /*yield*/, this.db.run(sql, [req.sessionID, username])];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 8];
                                                case 3:
                                                    err_15 = _a.sent();
                                                    _a.label = 4;
                                                case 4:
                                                    _a.trys.push([4, 6, , 7]);
                                                    return [4 /*yield*/, this.db.close()];
                                                case 5:
                                                    _a.sent();
                                                    reject(err_15);
                                                    return [3 /*break*/, 7];
                                                case 6:
                                                    err_16 = _a.sent();
                                                    reject(err_16);
                                                    return [3 /*break*/, 7];
                                                case 7: return [3 /*break*/, 8];
                                                case 8: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    if (!!req.session.isLogged) return [3 /*break*/, 8];
                                    this.getLoginPage(req, res, "Błędne dane logowania");
                                    _a.label = 4;
                                case 4:
                                    _a.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, this.db.close()];
                                case 5:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_11 = _a.sent();
                                    reject(err_11);
                                    return [3 /*break*/, 7];
                                case 7: return [3 /*break*/, 13];
                                case 8:
                                    sql =
                                        "SELECT quiz_list\n                    FROM quizzes_list;";
                                    return [4 /*yield*/, this.db.all(sql, [])];
                                case 9:
                                    quizzes_lists_array = _a.sent();
                                    quizzes_lists_array.forEach(function (row) {
                                        req.session.quizzes_list = row.quiz_list;
                                    });
                                    this.getChooseQuizPage(req, res);
                                    _a.label = 10;
                                case 10:
                                    _a.trys.push([10, 12, , 13]);
                                    return [4 /*yield*/, this.db.close()];
                                case 11:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 13];
                                case 12:
                                    err_12 = _a.sent();
                                    reject(err_12);
                                    return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 19];
                                case 14:
                                    err_13 = _a.sent();
                                    _a.label = 15;
                                case 15:
                                    _a.trys.push([15, 17, , 18]);
                                    return [4 /*yield*/, this.db.close()];
                                case 16:
                                    _a.sent();
                                    reject(err_13);
                                    return [3 /*break*/, 18];
                                case 17:
                                    err_14 = _a.sent();
                                    reject(err_14);
                                    return [3 /*break*/, 18];
                                case 18: return [3 /*break*/, 19];
                                case 19: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.wasFilled = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var results_rows, err_17, err_18;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 9]);
                                    return [4 /*yield*/, this.db.open()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.db.all('SELECT * FROM results WHERE user_name = ? AND quiz_name = ?;', [req.session.username, req.session.quiz_name])];
                                case 2:
                                    results_rows = _a.sent();
                                    return [4 /*yield*/, this.db.close()];
                                case 3:
                                    _a.sent();
                                    if (results_rows.length > 0)
                                        resolve(true);
                                    else
                                        resolve(false);
                                    return [3 /*break*/, 9];
                                case 4:
                                    err_17 = _a.sent();
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, this.db.close()];
                                case 6:
                                    _a.sent();
                                    reject(err_17);
                                    return [3 /*break*/, 8];
                                case 7:
                                    err_18 = _a.sent();
                                    reject(err_18);
                                    return [3 /*break*/, 8];
                                case 8: return [3 /*break*/, 9];
                                case 9: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.postPage = function () {
        var _this = this;
        this.app.post('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var err_19, err_20, sql, quizes_rows, err_21, err_22, err_23, wasSolved, err_24, new_password_1, new_password_2, err_25, wasSolved, err_26, wasSolved, err_27, err_28;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.session.isLogged === undefined)
                            req.session.isLogged = false;
                        if (!req.body.login_send) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postLoginPage(req, res)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_19 = _a.sent();
                        next(err_19);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 64];
                    case 5:
                        if (!!req.session.isLogged) return [3 /*break*/, 6];
                        this.getLoginPage(req, res, 'Zaloguj się');
                        return [3 /*break*/, 64];
                    case 6:
                        if (!req.body.logout) return [3 /*break*/, 11];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        req.session.isLogged = false;
                        return [4 /*yield*/, this.getLoginPage(req, res, 'Zaloguj się')];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_20 = _a.sent();
                        next(err_20);
                        return [3 /*break*/, 10];
                    case 10: return [3 /*break*/, 64];
                    case 11:
                        if (!req.body.change_password) return [3 /*break*/, 12];
                        this.getChangePasswordPage(req, res, 'Zmień hasło');
                        return [3 /*break*/, 64];
                    case 12:
                        if (!(req.body.comeback_change || req.body.comeback_quiz_menu)) return [3 /*break*/, 13];
                        this.getChooseQuizPage(req, res);
                        return [3 /*break*/, 64];
                    case 13:
                        if (!req.body.quiz) return [3 /*break*/, 27];
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 21, , 26]);
                        return [4 /*yield*/, this.db.open()];
                    case 15:
                        _a.sent();
                        sql = "SELECT quiz_name, quiz_json\n                    FROM quizzes;";
                        return [4 /*yield*/, this.db.all(sql, [])];
                    case 16:
                        quizes_rows = _a.sent();
                        _a.label = 17;
                    case 17:
                        _a.trys.push([17, 19, , 20]);
                        return [4 /*yield*/, this.db.close()];
                    case 18:
                        _a.sent();
                        return [3 /*break*/, 20];
                    case 19:
                        err_21 = _a.sent();
                        next(err_21);
                        return [3 /*break*/, 20];
                    case 20:
                        quizes_rows.forEach(function (row) {
                            if (req.body.quiz === row.quiz_name) {
                                _this.getQuizMenuPage(req, res, row.quiz_name, row.quiz_name + ' - menu');
                            }
                        });
                        return [3 /*break*/, 26];
                    case 21:
                        err_22 = _a.sent();
                        _a.label = 22;
                    case 22:
                        _a.trys.push([22, 24, , 25]);
                        return [4 /*yield*/, this.db.close()];
                    case 23:
                        _a.sent();
                        next(err_22);
                        return [3 /*break*/, 25];
                    case 24:
                        err_23 = _a.sent();
                        next(err_23);
                        return [3 /*break*/, 25];
                    case 25: return [3 /*break*/, 26];
                    case 26: return [3 /*break*/, 64];
                    case 27:
                        if (!req.body.begin_quiz) return [3 /*break*/, 35];
                        _a.label = 28;
                    case 28:
                        _a.trys.push([28, 33, , 34]);
                        return [4 /*yield*/, this.wasFilled(req)];
                    case 29:
                        wasSolved = _a.sent();
                        if (!wasSolved) return [3 /*break*/, 30];
                        this.getQuizMenuPage(req, res, req.session.quiz_name, 'Już wypełniono quiz');
                        return [3 /*break*/, 32];
                    case 30: return [4 /*yield*/, this.getQuizPage(req, res, req.session.quiz_name)];
                    case 31:
                        _a.sent();
                        _a.label = 32;
                    case 32: return [3 /*break*/, 34];
                    case 33:
                        err_24 = _a.sent();
                        next(err_24);
                        return [3 /*break*/, 34];
                    case 34: return [3 /*break*/, 64];
                    case 35:
                        if (!req.body.cancel_quiz) return [3 /*break*/, 36];
                        this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                        return [3 /*break*/, 64];
                    case 36:
                        if (!req.body.commit_change) return [3 /*break*/, 44];
                        if (!(!req.body.new_password_1 || !req.body.new_password_2)) return [3 /*break*/, 37];
                        this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                        return [3 /*break*/, 43];
                    case 37:
                        new_password_1 = req.body.new_password_1;
                        new_password_2 = req.body.new_password_2;
                        if (!(new_password_1 !== new_password_2 || new_password_1 === "")) return [3 /*break*/, 38];
                        this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                        return [3 /*break*/, 43];
                    case 38:
                        _a.trys.push([38, 42, , 43]);
                        return [4 /*yield*/, this.changePassword(req, res, new_password_1)];
                    case 39:
                        _a.sent();
                        return [4 /*yield*/, this.db.open()];
                    case 40:
                        _a.sent();
                        return [4 /*yield*/, this.db.close()];
                    case 41:
                        _a.sent();
                        this.getLoginPage(req, res, 'Zaloguj się');
                        return [3 /*break*/, 43];
                    case 42:
                        err_25 = _a.sent();
                        next(err_25);
                        return [3 /*break*/, 43];
                    case 43: return [3 /*break*/, 64];
                    case 44:
                        if (!req.body.quiz_result) return [3 /*break*/, 52];
                        req.session.end_time = new Date().getTime();
                        _a.label = 45;
                    case 45:
                        _a.trys.push([45, 50, , 51]);
                        return [4 /*yield*/, this.wasFilled(req)];
                    case 46:
                        wasSolved = _a.sent();
                        if (!wasSolved) return [3 /*break*/, 47];
                        this.getQuizMenuPage(req, res, req.session.quiz_name, 'Już wypełniono quiz');
                        return [3 /*break*/, 49];
                    case 47: return [4 /*yield*/, this.save_result(req, next, req.body.quiz_result)];
                    case 48:
                        _a.sent();
                        this.getSummarize(req, res);
                        _a.label = 49;
                    case 49: return [3 /*break*/, 51];
                    case 50:
                        err_26 = _a.sent();
                        next(err_26);
                        return [3 /*break*/, 51];
                    case 51: return [3 /*break*/, 64];
                    case 52:
                        if (!req.body.comeback_quiz) return [3 /*break*/, 53];
                        this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                        return [3 /*break*/, 64];
                    case 53:
                        if (!req.body.my_score) return [3 /*break*/, 58];
                        _a.label = 54;
                    case 54:
                        _a.trys.push([54, 56, , 57]);
                        return [4 /*yield*/, this.wasFilled(req)];
                    case 55:
                        wasSolved = _a.sent();
                        if (!wasSolved) {
                            this.getQuizMenuPage(req, res, req.session.quiz_name, 'Jeszcze nie wypełniono quizu');
                        }
                        else {
                            this.getSummarize(req, res);
                        }
                        return [3 /*break*/, 57];
                    case 56:
                        err_27 = _a.sent();
                        next(err_27);
                        return [3 /*break*/, 57];
                    case 57: return [3 /*break*/, 64];
                    case 58:
                        if (!req.body.stats) return [3 /*break*/, 63];
                        _a.label = 59;
                    case 59:
                        _a.trys.push([59, 61, , 62]);
                        return [4 /*yield*/, this.getStats(req, res)];
                    case 60:
                        _a.sent();
                        return [3 /*break*/, 62];
                    case 61:
                        err_28 = _a.sent();
                        next(err_28);
                        return [3 /*break*/, 62];
                    case 62: return [3 /*break*/, 64];
                    case 63:
                        if (req.body.comeback_stats) {
                            this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                        }
                        _a.label = 64;
                    case 64: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.errorHandler = function (err, req, res, next) {
        console.log(err);
        res.status(500).send('Something broke!');
    };
    App.prototype.run = function () {
        this.getPage();
        this.postPage();
        this.app.use(this.errorHandler);
        this.app.listen(this.port, function () { });
    };
    return App;
}());
exports.App = App;
