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
var chai_1 = require("chai");
var mocha_webdriver_1 = require("mocha-webdriver");
var filePath = 'file://' + process.cwd() + '/Loty.html';
function yearAfterDate() {
    var d = new Date();
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate().toString();
    var year = (d.getFullYear() + 1).toString();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
describe('test1', function () {
    it('Reset', function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                    case 1:
                        _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Dokąd]').getText()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.include('Warszawa');
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Imię]').sendKeys('Jan')];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Nazwisko]').sendKeys('Woreczko')];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=reset]').doClick()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('test2', function () {
    it('Submit', function () {
        return __awaiter(this, void 0, void 0, function () {
            var clickable, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]')];
                    case 2:
                        _a.sent();
                        clickable = true;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        clickable = false;
                        return [3 /*break*/, 6];
                    case 6:
                        chai_1.expect(clickable).to.be["false"];
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=reset]').doClick()];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Imię]').sendKeys('Jan')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Nazwisko]').sendKeys('Woreczko')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Skąd]').sendKeys('Warszawa')];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Dokąd]').sendKeys('Londyn')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=data]').sendKeys(yearAfterDate())];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                    case 13:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('test3', function () {
    it('Zasłona', function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        date = yearAfterDate();
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=reset]').doClick()];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Imię]').sendKeys('Jan')];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Nazwisko]').sendKeys('Woreczko')];
                    case 4:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Skąd]').sendKeys('Warszawa')];
                    case 5:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Dokąd]').sendKeys('Londyn')];
                    case 6:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=data]').sendKeys(date)];
                    case 7:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                    case 8:
                        _g.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('div[class=zaslona]')];
                    case 9:
                        _g.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_gratulacje]').getText()];
                    case 10:
                        _a.apply(void 0, [_g.sent()]).equal('Udana rezerwacja!');
                        _b = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_miasto_odlotu]').getText()];
                    case 11:
                        _b.apply(void 0, [_g.sent()]).equal('Lot z: ' + 'Warszawa');
                        _c = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_miasto_przylotu]').getText()];
                    case 12:
                        _c.apply(void 0, [_g.sent()]).equal('Lot do: ' + 'Londyn');
                        _d = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_data_lotu]').getText()];
                    case 13:
                        _d.apply(void 0, [_g.sent()]).equal('Data lotu: ' + date);
                        _e = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_imię]').getText()];
                    case 14:
                        _e.apply(void 0, [_g.sent()]).equal('Imię: ' + 'Jan');
                        _f = chai_1.expect;
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('p[id=zaslona_nazwisko]').getText()];
                    case 15:
                        _f.apply(void 0, [_g.sent()]).equal('Nazwisko: ' + 'Woreczko');
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('test4', function () {
    it('Linki', function () {
        return __awaiter(this, void 0, void 0, function () {
            var date, i, clickable, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = yearAfterDate();
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=reset]').doClick()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Imię]').sendKeys('Jan')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=Nazwisko]').sendKeys('Woreczko')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Skąd]').sendKeys('Warszawa')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('select[id=Dokąd]').sendKeys('Londyn')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[name=data]').sendKeys(date)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('div[class=zaslona]')];
                    case 9:
                        _a.sent();
                        i = 1;
                        _a.label = 10;
                    case 10:
                        if (!(i <= 8)) return [3 /*break*/, 16];
                        clickable = true;
                        _a.label = 11;
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('a[id=menu_link' + i.toString() + ']').doClick()];
                    case 12:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _a.sent();
                        clickable = false;
                        return [3 /*break*/, 14];
                    case 14:
                        chai_1.expect(clickable).to.be["false"];
                        _a.label = 15;
                    case 15:
                        i++;
                        return [3 /*break*/, 10];
                    case 16: return [2 /*return*/];
                }
            });
        });
    });
});
