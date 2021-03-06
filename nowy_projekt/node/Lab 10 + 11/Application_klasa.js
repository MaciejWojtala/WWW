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
exports.Application = void 0;
var Builder_klasa_1 = require("./Builder_klasa");
var Database_klasa_1 = require("./Database_klasa");
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var csurf_1 = __importDefault(require("csurf"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var password_hash_1 = __importDefault(require("password-hash"));
var Lokalne_1 = require("./Lokalne");
var async_mutex_1 = require("async-mutex");
var Application = /** @class */ (function () {
    function Application() {
    }
    ;
    Application.prototype.init = function (port, source) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var builder, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.mutex = new async_mutex_1.Mutex();
                                    this.app = express_1["default"]();
                                    this.app.use(cookie_parser_1["default"]('secret'));
                                    this.app.use(express_session_1["default"]({
                                        secret: 'secret',
                                        resave: true,
                                        saveUninitialized: true
                                    }));
                                    this.app.use(body_parser_1["default"].urlencoded({
                                        extended: true
                                    }));
                                    this.app.set('views', "./");
                                    this.app.set('view engine', 'pug');
                                    this.port = port;
                                    this.source = source;
                                    this.app.set('views', this.source);
                                    this.app.set('view engine', 'pug');
                                    builder = new Builder_klasa_1.Builder(this.mutex);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, builder.init(this.mutex)];
                                case 2:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    console.log("init error");
                                    reject(err_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Application.prototype.getHomepage = function () {
        var _this = this;
        this.app.get('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var bestMemes, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (req.session.isLogged === undefined)
                            req.session.isLogged = false;
                        return [4 /*yield*/, this.getBestMemes()];
                    case 1:
                        bestMemes = _a.sent();
                        if (!req.session.isLogged)
                            res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        else
                            res.render('Memy_zalogowany', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Application.prototype.getMemePage = function () {
        var _this = this;
        this.app.get('/meme/:memeId', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _meme, title, meme, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getMeme(req.params.memeId)];
                    case 1:
                        _meme = _a.sent();
                        if (_meme === null) {
                            return [2 /*return*/, next('error')];
                        }
                        title = 'Meme price changing';
                        meme = _meme.getAnonymousMeme();
                        res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                            message: 'Change price!', meme: meme });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Application.prototype.errorHandler = function (err, req, res, next) {
        console.log(err);
        res.status(500).send('Something broke!');
    };
    Application.prototype.postPriceChange = function () {
        var _this = this;
        this.app.post('/meme/:memeId/submit-form', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _meme, priceCheck, user, _a, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getMeme(req.params.memeId)];
                    case 1:
                        _meme = _b.sent();
                        if (_meme === null)
                            next('null error');
                        priceCheck = Lokalne_1.anyToNumber(req.body.price);
                        user = req.session.username;
                        _a = priceCheck[1] && req.session.isLogged;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, _meme.setPrice(priceCheck[0], user)];
                    case 2:
                        _a = (_b.sent()) === true;
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                                message: 'Changing succeeded!', meme: _meme.getAnonymousMeme() });
                        }
                        else {
                            res.render('Zmiana_ceny', { title: 'Invalid meme price changing', req: req,
                                message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme() });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _b.sent();
                        next(err_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    Application.prototype.getBestMemes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var endFlag, database, bestMemes, err_5, flag, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    endFlag = false;
                                    _a.label = 1;
                                case 1:
                                    if (!!endFlag) return [3 /*break*/, 14];
                                    database = new Database_klasa_1.Database(this.mutex);
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 13]);
                                    return [4 /*yield*/, database.open_with_transaction()];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, database.getBestMemes()];
                                case 4:
                                    bestMemes = _a.sent();
                                    return [4 /*yield*/, database.commit_close()];
                                case 5:
                                    _a.sent();
                                    endFlag = true;
                                    resolve(bestMemes);
                                    return [3 /*break*/, 13];
                                case 6:
                                    err_5 = _a.sent();
                                    console.log(err_5);
                                    flag = false;
                                    _a.label = 7;
                                case 7:
                                    if (!!flag) return [3 /*break*/, 12];
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, database.rollback_close()];
                                case 9:
                                    _a.sent();
                                    flag = true;
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_6 = _a.sent();
                                    database.closeDatabase();
                                    console.log(err_6);
                                    return [3 /*break*/, 11];
                                case 11: return [3 /*break*/, 7];
                                case 12: return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 1];
                                case 14: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Application.prototype.getMeme = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var endFlag, database, meme, err_7, flag, err_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    endFlag = false;
                                    _a.label = 1;
                                case 1:
                                    if (!!endFlag) return [3 /*break*/, 14];
                                    database = new Database_klasa_1.Database(this.mutex);
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 13]);
                                    return [4 /*yield*/, database.open_with_transaction()];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, database.getMeme(id)];
                                case 4:
                                    meme = _a.sent();
                                    return [4 /*yield*/, database.commit_close()];
                                case 5:
                                    _a.sent();
                                    endFlag = true;
                                    resolve(meme);
                                    return [3 /*break*/, 13];
                                case 6:
                                    err_7 = _a.sent();
                                    console.log(err_7);
                                    flag = false;
                                    _a.label = 7;
                                case 7:
                                    if (!!flag) return [3 /*break*/, 12];
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, database.rollback_close()];
                                case 9:
                                    _a.sent();
                                    flag = true;
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_8 = _a.sent();
                                    database.closeDatabase();
                                    console.log(err_8);
                                    return [3 /*break*/, 11];
                                case 11: return [3 /*break*/, 7];
                                case 12: return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 1];
                                case 14: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Application.prototype.all = function (sql, params) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var endFlag, database, rows, err_9, flag, err_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    endFlag = false;
                                    _a.label = 1;
                                case 1:
                                    if (!!endFlag) return [3 /*break*/, 14];
                                    database = new Database_klasa_1.Database(this.mutex);
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 13]);
                                    return [4 /*yield*/, database.open_with_transaction()];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, database.all(sql, params)];
                                case 4:
                                    rows = _a.sent();
                                    return [4 /*yield*/, database.commit_close()];
                                case 5:
                                    _a.sent();
                                    endFlag = true;
                                    resolve(rows);
                                    return [3 /*break*/, 13];
                                case 6:
                                    err_9 = _a.sent();
                                    console.log(err_9);
                                    flag = false;
                                    _a.label = 7;
                                case 7:
                                    if (!!flag) return [3 /*break*/, 12];
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, database.rollback_close()];
                                case 9:
                                    _a.sent();
                                    flag = true;
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_10 = _a.sent();
                                    database.closeDatabase();
                                    console.log(err_10);
                                    return [3 /*break*/, 11];
                                case 11: return [3 /*break*/, 7];
                                case 12: return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 1];
                                case 14: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Application.prototype.postLogin = function () {
        var _this = this;
        this.app.post('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, password, logout, bestMemes, sql, rows, bestMemes, bestMemes, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        if (req.session.isLogged === undefined)
                            req.session.isLogged = false;
                        username = req.body.login;
                        password = req.body.password;
                        logout = req.body.Logout;
                        if (!logout) return [3 /*break*/, 2];
                        req.session.isLogged = false;
                        return [4 /*yield*/, this.getBestMemes()];
                    case 1:
                        bestMemes = _a.sent();
                        res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        return [2 /*return*/];
                    case 2:
                        sql = "SELECT *\n                        FROM users\n                        WHERE user = ?";
                        return [4 /*yield*/, this.all(sql, [username])];
                    case 3:
                        rows = _a.sent();
                        if (!(rows.length === 1)) return [3 /*break*/, 5];
                        if (!password_hash_1["default"].verify(password, rows[0].password)) return [3 /*break*/, 5];
                        req.session.isLogged = true;
                        req.session.username = username;
                        return [4 /*yield*/, this.getBestMemes()];
                    case 4:
                        bestMemes = _a.sent();
                        res.render('Memy_zalogowany', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        _a.label = 5;
                    case 5:
                        if (!!req.session.isLogged) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getBestMemes()];
                    case 6:
                        bestMemes = _a.sent();
                        res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_11 = _a.sent();
                        next(err_11);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
    };
    Application.prototype.run = function () {
        this.getHomepage();
        this.postLogin();
        this.csrfProtection = csurf_1["default"]({
            cookie: true
        });
        this.app.use(this.csrfProtection);
        this.getMemePage();
        this.postPriceChange();
        this.app.use(this.errorHandler);
        this.app.listen(this.port, function () { });
    };
    return Application;
}());
exports.Application = Application;
