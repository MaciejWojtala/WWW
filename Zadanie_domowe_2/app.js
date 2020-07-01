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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var csurf_1 = __importDefault(require("csurf"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var password_hash_1 = __importDefault(require("password-hash"));
var database_1 = require("./database");
var App = /** @class */ (function () {
    function App(port, source) {
        this.port = port;
        this.source = source;
        this.exportQuizList = "";
        this.exportQuiz = "";
        this.exportQuizResult = "";
        this.SQLiteStore = require('connect-sqlite3')(express_session_1["default"]);
        this.store = new this.SQLiteStore({ db: ':memory:', dir: './' });
        this.app = express_1["default"]();
        this.csrfProtection = csurf_1["default"]({
            cookie: true
        });
        this.app.use(cookie_parser_1["default"]('secret'));
        this.app.use(express_session_1["default"]({
            store: this.store,
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(body_parser_1["default"].urlencoded({
            extended: true
        }));
        this.app.use(body_parser_1["default"].json());
        this.app.use(this.csrfProtection);
        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');
        this.app.use(express_1["default"].urlencoded({
            extended: true
        }));
        this.app.use(express_1["default"].static(__dirname));
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
                        var db, username, sql, session_rows, err_1, err_2;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 7, , 12]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    username = req.session.username;
                                    sql = 'INSERT OR REPLACE INTO USERS (user_name, user_password) VALUES (?, ?);';
                                    return [4 /*yield*/, db.run(sql, [username, password_hash_1["default"].generate(new_password)])];
                                case 3:
                                    _a.sent();
                                    sql = 'SELECT session_ID FROM sessions WHERE user_name = ?';
                                    return [4 /*yield*/, db.all(sql, [username])];
                                case 4:
                                    session_rows = _a.sent();
                                    sql = 'DELETE FROM sessions WHERE user_name = ?';
                                    return [4 /*yield*/, db.run(sql, [username])];
                                case 5:
                                    _a.sent();
                                    session_rows.forEach(function (row) {
                                        _this.store.destroy(row.session_id, function (err) {
                                            if (err)
                                                reject(err);
                                        });
                                    });
                                    req.session.destroy();
                                    return [4 /*yield*/, db.commit_close()];
                                case 6:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 12];
                                case 7:
                                    err_1 = _a.sent();
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 9:
                                    _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_2 = _a.sent();
                                    reject(err_2);
                                    return [3 /*break*/, 11];
                                case 11: return [3 /*break*/, 12];
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getQuizPage = function (req, res, quiz_name) {
        res.render('quiz', { _req: req });
    };
    App.prototype.setStatsTable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var db, quiz_size, highscore, avg, bests, i, i, j, sql, highscore_rows, i, j, j, j, j, err_3, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 11, , 16]);
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
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    sql = void 0;
                                    highscore_rows = void 0;
                                    i = 0;
                                    _a.label = 3;
                                case 3:
                                    if (!(i < quiz_size - 1)) return [3 /*break*/, 7];
                                    sql = 'SELECT result FROM question_results WHERE question_nr = ? AND quiz_name = ? ORDER BY result ASC';
                                    return [4 /*yield*/, db.all(sql, [i + 1, req.session.quiz_name])];
                                case 4:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        bests[i][j] = highscore_rows[j].result;
                                    }
                                    sql = 'SELECT AVG(result) as avg FROM question_results WHERE question_nr = ? AND quiz_name = ? AND punishment = ?';
                                    return [4 /*yield*/, db.all(sql, [i + 1, req.session.quiz_name, 0])];
                                case 5:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        if (highscore_rows[j].avg != null)
                                            avg[i] = this.round(highscore_rows[j].avg).toString();
                                    }
                                    _a.label = 6;
                                case 6:
                                    i++;
                                    return [3 /*break*/, 3];
                                case 7:
                                    sql = 'SELECT result FROM results WHERE quiz_name = ? ORDER BY result  ASC';
                                    return [4 /*yield*/, db.all(sql, [req.session.quiz_name])];
                                case 8:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        bests[6][j] = highscore_rows[j].result;
                                    }
                                    sql = 'SELECT AVG(result) as avg FROM results WHERE quiz_name = ?';
                                    return [4 /*yield*/, db.all(sql, [req.session.quiz_name])];
                                case 9:
                                    highscore_rows = _a.sent();
                                    for (j = 0; j < highscore_rows.length; j++) {
                                        if (j >= 5)
                                            break;
                                        if (highscore_rows[j].avg != null)
                                            avg[6] = this.round(highscore_rows[j].avg).toString();
                                    }
                                    return [4 /*yield*/, db.commit_close()];
                                case 10:
                                    _a.sent();
                                    resolve({ bests: bests, avg: avg });
                                    return [3 /*break*/, 16];
                                case 11:
                                    err_3 = _a.sent();
                                    _a.label = 12;
                                case 12:
                                    _a.trys.push([12, 14, , 15]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 13:
                                    _a.sent();
                                    reject(err_3);
                                    return [3 /*break*/, 15];
                                case 14:
                                    err_4 = _a.sent();
                                    reject(err_4);
                                    return [3 /*break*/, 15];
                                case 15: return [3 /*break*/, 16];
                                case 16: return [2 /*return*/];
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
                        var json_result, err_5;
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
                                    err_5 = _a.sent();
                                    reject(err_5);
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
        res.render('choose_quiz', { _req: req });
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
    App.prototype.postQuizRequest = function (req, res, quiz_name) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var quiz, db, sql, quiz_rows, err_6, err_7;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = new database_1.DbClass();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 10]);
                        return [4 /*yield*/, db.open_with_transaction()];
                    case 2:
                        _a.sent();
                        sql = 'SELECT quiz_json from quizzes WHERE quiz_name = ?;';
                        return [4 /*yield*/, db.all(sql, [quiz_name])];
                    case 3:
                        quiz_rows = _a.sent();
                        quiz_rows.forEach(function (row) {
                            quiz = row.quiz_json;
                            _this.exportQuiz = quiz;
                        });
                        return [4 /*yield*/, db.commit_close()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        err_6 = _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, db.rollback_close()];
                    case 7:
                        _a.sent();
                        reject(err_6);
                        return [3 /*break*/, 9];
                    case 8:
                        err_7 = _a.sent();
                        reject(err_7);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 10];
                    case 10:
                        try {
                            req.session.begin_time = new Date().getTime();
                            res.send(JSON.parse(quiz));
                            resolve();
                        }
                        catch (err) {
                            reject(err);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.getExportQuiz = function () {
        return this.exportQuiz;
    };
    App.prototype.save_result = function (req, res, next, quiz_result) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var total_time, result, db, quiz, punishments, question_results, question_times, i, i, json, err_8, err_9;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    total_time = (req.session.end_time - req.session.begin_time) / 1000;
                                    result = 0;
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 10, , 15]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, JSON.parse(quiz_result.jsonString)];
                                case 3:
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
                                    return [4 /*yield*/, db.run('INSERT OR REPLACE INTO results (user_name, quiz_name, result) VALUES (?, ?, ?);', [req.session.username, quiz.name, result])];
                                case 4:
                                    _a.sent();
                                    i = 0;
                                    _a.label = 5;
                                case 5:
                                    if (!(i < quiz.questions.length)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, db.run('INSERT OR REPLACE INTO question_results (question_nr, user_name, quiz_name, time, answer, correct_answer, punishment, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;', [i + 1, req.session.username, quiz.name,
                                            question_times[i], quiz_result.answers[i], quiz.correct_answers[i],
                                            punishments[i], question_results[i]])];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    i++;
                                    return [3 /*break*/, 5];
                                case 8: return [4 /*yield*/, db.commit_close()];
                                case 9:
                                    _a.sent();
                                    json = {};
                                    res.send(json);
                                    resolve();
                                    return [3 /*break*/, 15];
                                case 10:
                                    err_8 = _a.sent();
                                    _a.label = 11;
                                case 11:
                                    _a.trys.push([11, 13, , 14]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 12:
                                    _a.sent();
                                    reject(err_8);
                                    return [3 /*break*/, 14];
                                case 13:
                                    err_9 = _a.sent();
                                    reject(err_9);
                                    return [3 /*break*/, 14];
                                case 14: return [3 /*break*/, 15];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getExportQuizResult = function () {
        return this.exportQuizResult;
    };
    App.prototype.getSummarize = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var db, username, quiz_name, result_1, quiz_length, question_times_1, answers_1, correct_answers_1, punishments_1, question_results_1, sql, summarize_rows, _loop_1, i, err_10, err_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 9, , 14]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    username = req.session.username;
                                    quiz_name = req.session.quiz_name;
                                    quiz_length = 6;
                                    question_times_1 = new Array(quiz_length);
                                    answers_1 = new Array(quiz_length);
                                    correct_answers_1 = new Array(quiz_length);
                                    punishments_1 = new Array(quiz_length);
                                    question_results_1 = new Array(quiz_length);
                                    sql = 'SELECT * FROM results WHERE user_name = ? AND quiz_name = ?';
                                    return [4 /*yield*/, db.all(sql, [username, quiz_name])];
                                case 3:
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
                                                    return [4 /*yield*/, db.all(_sql, [i + 1, username, quiz_name])];
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
                                    i = 0;
                                    _a.label = 4;
                                case 4:
                                    if (!(i < quiz_length)) return [3 /*break*/, 7];
                                    return [5 /*yield**/, _loop_1(i)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    i++;
                                    return [3 /*break*/, 4];
                                case 7: return [4 /*yield*/, db.commit_close()];
                                case 8:
                                    _a.sent();
                                    res.render('result', { title: 'Podsumowanie', message: 'Twój wynik', _req: req, _quiz_result: JSON.stringify({ result: result_1, question_times: question_times_1, answers: answers_1, correct_answers: correct_answers_1, punishments: punishments_1, question_results: question_results_1 }) });
                                    resolve();
                                    return [3 /*break*/, 14];
                                case 9:
                                    err_10 = _a.sent();
                                    _a.label = 10;
                                case 10:
                                    _a.trys.push([10, 12, , 13]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 11:
                                    _a.sent();
                                    reject(err_10);
                                    return [3 /*break*/, 13];
                                case 12:
                                    err_11 = _a.sent();
                                    reject(err_11);
                                    return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 14];
                                case 14: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.postQuizList = function (req, res, next) {
        try {
            res.send(JSON.parse(req.session.quizzes_list));
        }
        catch (err) {
            next(err);
        }
    };
    App.prototype.postLoginPage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var username, password, db, sql, user_rows, quizzes_lists_array, err_12, err_13;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    username = req.body.username;
                                    password = req.body.password;
                                    db = new database_1.DbClass();
                                    sql = "SELECT *\n                FROM users\n                WHERE user_name = ?;";
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 10, , 15]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, db.all(sql, [username])];
                                case 3:
                                    user_rows = _a.sent();
                                    if (!(user_rows.length === 1)) return [3 /*break*/, 5];
                                    if (!password_hash_1["default"].verify(password, user_rows[0].user_password)) return [3 /*break*/, 5];
                                    req.session.isLogged = true;
                                    req.session.username = username;
                                    sql = 'INSERT OR REPLACE INTO sessions (session_id, user_name) VALUES (?, ?);';
                                    return [4 /*yield*/, db.run(sql, [req.sessionID, username])];
                                case 4:
                                    _a.sent();
                                    _a.label = 5;
                                case 5:
                                    if (!!req.session.isLogged) return [3 /*break*/, 6];
                                    this.getLoginPage(req, res, "Błędne dane logowania");
                                    return [3 /*break*/, 8];
                                case 6:
                                    sql =
                                        "SELECT quiz_list\n                        FROM quizzes_list;";
                                    return [4 /*yield*/, db.all(sql, [])];
                                case 7:
                                    quizzes_lists_array = _a.sent();
                                    quizzes_lists_array.forEach(function (row) {
                                        req.session.quizzes_list = row.quiz_list;
                                        _this.exportQuizList = req.session.quizzes_list;
                                    });
                                    this.getChooseQuizPage(req, res);
                                    _a.label = 8;
                                case 8: return [4 /*yield*/, db.commit_close()];
                                case 9:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 15];
                                case 10:
                                    err_12 = _a.sent();
                                    _a.label = 11;
                                case 11:
                                    _a.trys.push([11, 13, , 14]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 12:
                                    _a.sent();
                                    reject(err_12);
                                    return [3 /*break*/, 14];
                                case 13:
                                    err_13 = _a.sent();
                                    reject(err_13);
                                    return [3 /*break*/, 14];
                                case 14: return [3 /*break*/, 15];
                                case 15: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.getExportQuizList = function () {
        return this.exportQuizList;
    };
    App.prototype.wasFilled = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var db, results_rows, err_14, err_15;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 10]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, db.all('SELECT * FROM results WHERE user_name = ? AND quiz_name = ?;', [req.session.username, req.session.quiz_name])];
                                case 3:
                                    results_rows = _a.sent();
                                    return [4 /*yield*/, db.commit_close()];
                                case 4:
                                    _a.sent();
                                    if (results_rows.length > 0)
                                        resolve(true);
                                    else
                                        resolve(false);
                                    return [3 /*break*/, 10];
                                case 5:
                                    err_14 = _a.sent();
                                    _a.label = 6;
                                case 6:
                                    _a.trys.push([6, 8, , 9]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 7:
                                    _a.sent();
                                    reject(err_14);
                                    return [3 /*break*/, 9];
                                case 8:
                                    err_15 = _a.sent();
                                    reject(err_15);
                                    return [3 /*break*/, 9];
                                case 9: return [3 /*break*/, 10];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.loging_handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_16;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!req.body.login_send) return [3 /*break*/, 5];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.postLoginPage(req, res)];
                                case 2:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_16 = _a.sent();
                                    reject(err_16);
                                    return [3 /*break*/, 4];
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    if (!req.session.isLogged) {
                                        this.getLoginPage(req, res, 'Zaloguj się');
                                        resolve(true);
                                    }
                                    else if (req.body.logout) {
                                        try {
                                            req.session.isLogged = false;
                                            this.getLoginPage(req, res, 'Zaloguj się');
                                            resolve(true);
                                        }
                                        catch (err) {
                                            reject(err);
                                        }
                                    }
                                    else if (req.body.change_password) {
                                        this.getChangePasswordPage(req, res, 'Zmień hasło');
                                        resolve(true);
                                    }
                                    else if (req.body.comeback_change || req.body.comeback_quiz_menu) {
                                        this.getChooseQuizPage(req, res);
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.quiz_menu_handle = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var db, sql, quizes_rows, err_17, err_18, wasSolved, err_19, wasSolved, err_20, err_21;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!req.body.quiz) return [3 /*break*/, 11];
                                    db = new database_1.DbClass();
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 10]);
                                    return [4 /*yield*/, db.open_with_transaction()];
                                case 2:
                                    _a.sent();
                                    sql = "SELECT quiz_name, quiz_json\n                        FROM quizzes;";
                                    return [4 /*yield*/, db.all(sql, [])];
                                case 3:
                                    quizes_rows = _a.sent();
                                    return [4 /*yield*/, db.commit_close()];
                                case 4:
                                    _a.sent();
                                    quizes_rows.forEach(function (row) {
                                        if (req.body.quiz === row.quiz_name) {
                                            _this.getQuizMenuPage(req, res, row.quiz_name, row.quiz_name + ' - menu');
                                        }
                                    });
                                    resolve(true);
                                    return [3 /*break*/, 10];
                                case 5:
                                    err_17 = _a.sent();
                                    _a.label = 6;
                                case 6:
                                    _a.trys.push([6, 8, , 9]);
                                    return [4 /*yield*/, db.rollback_close()];
                                case 7:
                                    _a.sent();
                                    reject(err_17);
                                    return [3 /*break*/, 9];
                                case 8:
                                    err_18 = _a.sent();
                                    reject(err_18);
                                    return [3 /*break*/, 9];
                                case 9: return [3 /*break*/, 10];
                                case 10: return [3 /*break*/, 30];
                                case 11:
                                    if (!req.body.begin_quiz) return [3 /*break*/, 16];
                                    _a.label = 12;
                                case 12:
                                    _a.trys.push([12, 14, , 15]);
                                    return [4 /*yield*/, this.wasFilled(req)];
                                case 13:
                                    wasSolved = _a.sent();
                                    if (wasSolved) {
                                        this.getQuizMenuPage(req, res, req.session.quiz_name, 'Już wypełniono quiz');
                                    }
                                    else if (req.session.begin_time &&
                                        (!req.session.end_time || req.session.begin_time > req.session.end_time)) {
                                        this.getQuizMenuPage(req, res, req.session.quiz_name, 'Quiz jest aktualnie wypełniany');
                                    }
                                    else {
                                        this.getQuizPage(req, res, req.session.quiz_name);
                                    }
                                    resolve(true);
                                    return [3 /*break*/, 15];
                                case 14:
                                    err_19 = _a.sent();
                                    reject(err_19);
                                    return [3 /*break*/, 15];
                                case 15: return [3 /*break*/, 30];
                                case 16:
                                    if (!req.body.my_score) return [3 /*break*/, 24];
                                    _a.label = 17;
                                case 17:
                                    _a.trys.push([17, 22, , 23]);
                                    return [4 /*yield*/, this.wasFilled(req)];
                                case 18:
                                    wasSolved = _a.sent();
                                    if (!!wasSolved) return [3 /*break*/, 19];
                                    this.getQuizMenuPage(req, res, req.session.quiz_name, 'Jeszcze nie wypełniono quizu');
                                    return [3 /*break*/, 21];
                                case 19: return [4 /*yield*/, this.getSummarize(req, res)];
                                case 20:
                                    _a.sent();
                                    _a.label = 21;
                                case 21: return [3 /*break*/, 23];
                                case 22:
                                    err_20 = _a.sent();
                                    reject(err_20);
                                    return [3 /*break*/, 23];
                                case 23:
                                    resolve(true);
                                    return [3 /*break*/, 30];
                                case 24:
                                    if (!req.body.stats) return [3 /*break*/, 29];
                                    _a.label = 25;
                                case 25:
                                    _a.trys.push([25, 27, , 28]);
                                    return [4 /*yield*/, this.getStats(req, res)];
                                case 26:
                                    _a.sent();
                                    resolve(true);
                                    return [3 /*break*/, 28];
                                case 27:
                                    err_21 = _a.sent();
                                    reject(err_21);
                                    return [3 /*break*/, 28];
                                case 28: return [3 /*break*/, 30];
                                case 29:
                                    if (req.body.comeback_stats) {
                                        this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                                        resolve(true);
                                    }
                                    else if (req.body.getQuizList) {
                                        this.postQuizList(req, res, next);
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                    _a.label = 30;
                                case 30: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.change_password_handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var new_password_1, new_password_2, db, err_22;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!req.body.commit_change) return [3 /*break*/, 7];
                                    if (!(!req.body.new_password_1 || !req.body.new_password_2)) return [3 /*break*/, 1];
                                    this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                                    resolve(true);
                                    return [3 /*break*/, 6];
                                case 1:
                                    new_password_1 = req.body.new_password_1;
                                    new_password_2 = req.body.new_password_2;
                                    if (!(new_password_1 !== new_password_2 || new_password_1 === "")) return [3 /*break*/, 2];
                                    this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                                    resolve(true);
                                    return [3 /*break*/, 6];
                                case 2:
                                    db = new database_1.DbClass();
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, this.changePassword(req, res, new_password_1)];
                                case 4:
                                    _a.sent();
                                    this.getLoginPage(req, res, 'Zaloguj się');
                                    resolve(true);
                                    return [3 /*break*/, 6];
                                case 5:
                                    err_22 = _a.sent();
                                    reject(err_22);
                                    return [3 /*break*/, 6];
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    resolve(false);
                                    _a.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.quiz_handle = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var wasSolved, err_23;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!req.body.cancel_quiz) return [3 /*break*/, 1];
                                    req.session.end_time = new Date().getTime();
                                    this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                                    resolve(true);
                                    return [3 /*break*/, 10];
                                case 1:
                                    if (!req.body.quiz_result) return [3 /*break*/, 9];
                                    req.session.end_time = new Date().getTime();
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 7, , 8]);
                                    return [4 /*yield*/, this.wasFilled(req)];
                                case 3:
                                    wasSolved = _a.sent();
                                    if (!wasSolved) return [3 /*break*/, 4];
                                    this.getQuizMenuPage(req, res, req.session.quiz_name, 'Już wypełniono quiz');
                                    return [3 /*break*/, 6];
                                case 4:
                                    this.exportQuizResult = JSON.stringify(req.body.quiz_result);
                                    return [4 /*yield*/, this.save_result(req, res, next, req.body.quiz_result)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6:
                                    resolve(true);
                                    return [3 /*break*/, 8];
                                case 7:
                                    err_23 = _a.sent();
                                    reject(err_23);
                                    return [3 /*break*/, 8];
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    if (req.body.comeback_quiz) {
                                        this.getQuizMenuPage(req, res, req.session.quiz_name, req.session.quiz_name + ' - menu');
                                        resolve(true);
                                    }
                                    else if (req.body.getQuizJSON) {
                                        this.postQuizRequest(req, res, req.session.quiz_name);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                    _a.label = 10;
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    App.prototype.postPage = function () {
        var _this = this;
        this.app.post('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var flag, err_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.session.isLogged === undefined)
                            req.session.isLogged = false;
                        flag = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, this.loging_handle(req, res)];
                    case 2:
                        flag = _a.sent();
                        if (!!flag) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.quiz_menu_handle(req, res, next)];
                    case 3:
                        flag = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!!flag) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.change_password_handle(req, res)];
                    case 5:
                        flag = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!!flag) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.quiz_handle(req, res, next)];
                    case 7:
                        flag = _a.sent();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_24 = _a.sent();
                        next(err_24);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.close = function () {
        this.server.close();
    };
    App.prototype.errorHandler = function (err, req, res, next) {
        console.log(err);
        res.status(500).send('Something broke!');
    };
    App.prototype.run = function () {
        this.getPage();
        this.postPage();
        this.app.use(this.errorHandler);
        this.server = this.app.listen(this.port, function () { });
    };
    return App;
}());
exports.App = App;
