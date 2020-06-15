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
exports.Application = void 0;
var Builder_klasa_1 = require("./Builder_klasa");
var Application = /** @class */ (function () {
    function Application() {
    }
    ;
    Application.prototype.init = function (port, source) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, pair;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.express = require('express');
                        this.session = require('express-session');
                        this.bodyParser = require('body-parser');
                        this.csurf = require('csurf');
                        this.cookieParser = require('cookie-parser');
                        this.app = this.express();
                        this.csrfProtection = this.csurf({
                            cookie: true
                        });
                        this.app.use(this.session({
                            secret: 'secret',
                            resave: true,
                            saveUninitialized: true
                        }));
                        this.app.use(this.bodyParser.urlencoded({
                            extended: true
                        }));
                        this.app.use(this.cookieParser());
                        this.app.use(this.csrfProtection);
                        this.app.set('views', "./");
                        this.app.set('view engine', 'pug');
                        this.port = port;
                        this.source = source;
                        this.app.set('views', this.source);
                        this.app.set('view engine', 'pug');
                        builder = new Builder_klasa_1.Builder();
                        return [4 /*yield*/, builder.init()];
                    case 1:
                        pair = _a.sent();
                        this.memes = pair[0];
                        this.database = pair[1];
                        return [2 /*return*/];
                }
            });
        });
    };
    Application.prototype.getHomepage = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            _this.memes.findBestMemes()
                .then(function () {
                var bestMemes = _this.memes.getBestMemes();
                if (!req.session.isLogged)
                    res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                else
                    res.render('Memy_zalogowany', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
            });
        });
    };
    Application.prototype.getMemePage = function () {
        var _this = this;
        this.app.get('/meme/:memeId', function (req, res, next) {
            var _meme = _this.memes.findMemeById(req.params.memeId);
            if (_meme === null) {
                return next('error');
            }
            var title = 'Meme price changing';
            var meme = _meme.getAnonymousMeme();
            res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                message: 'Change price!', meme: meme });
        });
    };
    Application.prototype.errorHandler = function (err, req, res, next) {
        res.status(500).send('Something broke!');
    };
    Application.prototype.postPriceChange = function () {
        var _this = this;
        this.app.post('/meme/:memeId/submit-form', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _meme, price, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _meme = this.memes.findMemeById(req.params.memeId);
                        if (_meme === null)
                            return [2 /*return*/, next('error')];
                        price = req.body.price;
                        user = req.session.username;
                        _a = req.session.isLogged;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, _meme.setPrice(price, user)];
                    case 1:
                        _a = (_b.sent()) === true;
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                                message: 'Changing succeeded!', meme: _meme.getAnonymousMeme() });
                        }
                        else {
                            res.render('Zmiana_ceny', { title: 'Invalid meme price changing', req: req,
                                message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme() });
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Application.prototype.postLogin = function () {
        var _this = this;
        this.app.post('/', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var username, password, logout, bestMemes, sql;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.session.isLogged === undefined)
                    req.session.isLogged = false;
                username = req.body.login;
                password = req.body.password;
                logout = req.body.Logout;
                if (logout) {
                    req.session.isLogged = false;
                    bestMemes = this.memes.getBestMemes();
                    res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                    return [2 /*return*/];
                }
                sql = "SELECT *\n                    FROM users\n                    WHERE user = ? AND password = ?";
                this.database.getDatabase().all(sql, [username, password], function (err, rows) {
                    if (err) {
                        next(err);
                    }
                    rows.forEach(function (row) {
                        req.session.isLogged = true;
                        req.session.username = username;
                        _this.memes.findBestMemes()
                            .then(function () {
                            var bestMemes = _this.memes.getBestMemes();
                            res.render('Memy_zalogowany', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                        });
                    });
                    if (!req.session.isLogged) {
                        var bestMemes = _this.memes.getBestMemes();
                        res.render('Memy', { title: 'Meme market', req: req, message: 'Hello there!', memes: bestMemes });
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    Application.prototype.run = function () {
        this.getHomepage();
        this.getMemePage();
        this.postPriceChange();
        this.postLogin();
        this.app.use(this.errorHandler);
        this.app.listen(this.port, function () { });
    };
    return Application;
}());
exports.Application = Application;
