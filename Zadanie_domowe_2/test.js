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
exports.finish_quiz = exports.run_quiz = exports.start_quiz = exports.login = void 0;
var selenium_webdriver_1 = require("selenium-webdriver");
var chai_1 = require("chai");
var create_db_1 = require("./create_db");
var app_1 = require("./app");
var filePath = 'http://localhost:8080/';
function login(_driver) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _driver.get(filePath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.name('username')).sendKeys('user1')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.name('password')).sendKeys('user1')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.name('login_send'))];
                case 4: return [4 /*yield*/, (_a.sent()).click()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function start_quiz(_driver) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        /// Oczekiwanie na komunikację z przeglądarką
                        _driver.sleep(2000)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.name('quiz'))];
                                    case 1: return [4 /*yield*/, (_a.sent()).click()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (_driver.findElement(selenium_webdriver_1.By.name('begin_quiz'))).click()];
                                    case 3:
                                        _a.sent();
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (err) {
                            reject(err);
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.start_quiz = start_quiz;
function run_quiz(_driver) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        /// Oczekiwanie na komunikację z przeglądarką
                        _driver.sleep(2000)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i <= 6)) return [3 /*break*/, 5];
                                        return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.id('odpowiedź ' + i.toString())).sendKeys('0')];
                                    case 2:
                                        _a.sent();
                                        if (!(i !== 6)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.id('następne_pytanie')).click()];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 5:
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (err) {
                            reject(err);
                        });
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
exports.run_quiz = run_quiz;
function finish_quiz(_driver) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, , 6]);
                                return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.id('zakończ_quiz'))];
                            case 1: return [4 /*yield*/, (_a.sent()).click()];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, _driver.findElement(selenium_webdriver_1.By.name('comeback_quiz'))];
                            case 3: return [4 /*yield*/, (_a.sent()).click()];
                            case 4:
                                _a.sent();
                                resolve();
                                return [3 /*break*/, 6];
                            case 5:
                                err_1 = _a.sent();
                                reject(err_1);
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.finish_quiz = finish_quiz;
describe('Zmiana hasła', function () {
    it('Zmiana hasła', function () {
        return __awaiter(this, void 0, void 0, function () {
            var app, flag, driver_1, driver_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(25000);
                        app = new app_1.App(8080, './');
                        flag = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 17, , 18]);
                        return [4 /*yield*/, create_db_1.create_db()];
                    case 2:
                        _a.sent();
                        app.run();
                        return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('firefox').build()];
                    case 3:
                        driver_1 = _a.sent();
                        return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('firefox').build()];
                    case 4:
                        driver_2 = _a.sent();
                        return [4 /*yield*/, login(driver_1)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, login(driver_2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('change_password'))];
                    case 7: return [4 /*yield*/, (_a.sent()).click()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('new_password_1')).sendKeys('ala')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('new_password_2')).sendKeys('ala')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('commit_change'))];
                    case 11: return [4 /*yield*/, (_a.sent()).click()];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('password'))];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, driver_2.findElement(selenium_webdriver_1.By.name('change_password'))];
                    case 14: return [4 /*yield*/, (_a.sent()).click()];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, driver_1.findElement(selenium_webdriver_1.By.name('password'))];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 17:
                        err_2 = _a.sent();
                        flag = false;
                        return [3 /*break*/, 18];
                    case 18:
                        chai_1.expect(flag).to.equal(true);
                        app.close();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('Ponowne wypełnienie quizu', function () {
    it('Ponowne wypełnienie quizu', function () {
        return __awaiter(this, void 0, void 0, function () {
            var flag, app, driver_3, header, _a, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.timeout(25000);
                        flag = true;
                        app = new app_1.App(8080, './');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, create_db_1.create_db()];
                    case 2:
                        _b.sent();
                        app.run();
                        return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('firefox').build()];
                    case 3:
                        driver_3 = _b.sent();
                        return [4 /*yield*/, login(driver_3)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, start_quiz(driver_3)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, run_quiz(driver_3)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, finish_quiz(driver_3)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, (driver_3.findElement(selenium_webdriver_1.By.name('begin_quiz'))).click()];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, driver_3.findElement(selenium_webdriver_1.By.id('tytuł_strony'))];
                    case 9:
                        header = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, header.getAttribute('textContent')];
                    case 10:
                        _a.apply(void 0, [_b.sent()]).to.equal('Już wypełniono quiz');
                        return [3 /*break*/, 12];
                    case 11:
                        err_3 = _b.sent();
                        flag = false;
                        return [3 /*break*/, 12];
                    case 12:
                        chai_1.expect(flag).to.equal(true);
                        app.close();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('Przesyłanie JSON-ów', function () {
    it('Przesyłanie JSON-ów', function () {
        return __awaiter(this, void 0, void 0, function () {
            var app, flag, driver_4, quiz_list_json, quiz_list, quiz_json_string, quiz_json, quiz_result, i, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        app = new app_1.App(8080, './');
                        app.run();
                        this.timeout(25000);
                        flag = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, create_db_1.create_db()];
                    case 2:
                        _a.sent();
                        chai_1.expect(app.getExportQuizList()).to.equal('');
                        return [4 /*yield*/, new selenium_webdriver_1.Builder().forBrowser('firefox').build()];
                    case 3:
                        driver_4 = _a.sent();
                        return [4 /*yield*/, login(driver_4)];
                    case 4:
                        _a.sent();
                        quiz_list_json = JSON.parse(app.getExportQuizList());
                        quiz_list = quiz_list_json.quizzes;
                        chai_1.expect(quiz_list.length).to.equal(4);
                        /// Wysyłanie quizu
                        chai_1.expect(app.getExportQuiz()).to.equal('');
                        return [4 /*yield*/, start_quiz(driver_4)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, run_quiz(driver_4)];
                    case 6:
                        _a.sent();
                        quiz_json_string = app.getExportQuiz();
                        quiz_json = JSON.parse(quiz_json_string);
                        chai_1.expect(quiz_json.name).to.not.equal(null);
                        chai_1.expect(quiz_json.name).to.not.equal(undefined);
                        chai_1.expect(quiz_json.name).to.not.equal('');
                        chai_1.expect(quiz_json.questions).to.not.equal(null);
                        chai_1.expect(quiz_json.questions).to.not.equal(undefined);
                        chai_1.expect(quiz_json.questions.length).to.equal(6);
                        chai_1.expect(quiz_json.correct_answers).to.not.equal(null);
                        chai_1.expect(quiz_json.correct_answers).to.not.equal(undefined);
                        chai_1.expect(quiz_json.correct_answers.length).to.equal(6);
                        chai_1.expect(quiz_json.introduction).to.not.equal(null);
                        chai_1.expect(quiz_json.introduction).to.not.equal(undefined);
                        chai_1.expect(quiz_json.introduction).to.not.equal('');
                        /// Przesłany wynik
                        chai_1.expect(app.getExportQuizResult()).to.equal('');
                        return [4 /*yield*/, finish_quiz(driver_4)];
                    case 7:
                        _a.sent();
                        quiz_result = JSON.parse(app.getExportQuizResult());
                        chai_1.expect(quiz_result.jsonString).to.not.equal(null);
                        chai_1.expect(quiz_result.jsonString).to.not.equal(undefined);
                        chai_1.expect(quiz_result.jsonString).to.not.equal('');
                        chai_1.expect(quiz_result.answers.length).to.equal(6);
                        chai_1.expect(quiz_result.percentage.length).to.equal(6);
                        for (i = 0; i < 6; i++) {
                            chai_1.expect(quiz_result.answers[i]).to.not.equal(null);
                            chai_1.expect(quiz_result.answers[i]).to.not.equal(undefined);
                            chai_1.expect(quiz_result.answers[i]).to.not.equal('');
                            chai_1.expect(quiz_result.percentage[i]).to.not.equal(null);
                            chai_1.expect(quiz_result.percentage[i]).to.not.equal(undefined);
                        }
                        return [3 /*break*/, 9];
                    case 8:
                        err_4 = _a.sent();
                        flag = false;
                        return [3 /*break*/, 9];
                    case 9:
                        chai_1.expect(flag).to.equal(true);
                        app.close();
                        return [2 /*return*/];
                }
            });
        });
    });
});
