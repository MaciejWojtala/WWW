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
function yearDifferentDate(difference) {
    var d = new Date();
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate().toString();
    var year = (d.getFullYear() + difference).toString();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
function yearAfterDate() {
    return yearDifferentDate(1);
}
function yearBeforeDate() {
    return yearDifferentDate(-1);
}
function set_element_with_clear(element_name, value) {
    return __awaiter(this, void 0, void 0, function () {
        var element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find(element_name)];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, element.clear()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, element.sendKeys(value)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function clear_element(element_name) {
    return __awaiter(this, void 0, void 0, function () {
        var element;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find(element_name)];
                case 1:
                    element = _a.sent();
                    return [4 /*yield*/, element.clear()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function set_select_element(element_name, value) {
    return __awaiter(this, void 0, void 0, function () {
        var element, option;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.find(element_name)];
                case 1:
                    element = _a.sent();
                    option = element.find("option[value=" + value + "]");
                    return [4 /*yield*/, option];
                case 2:
                    (_a.sent()).click();
                    return [2 /*return*/];
            }
        });
    });
}
function input_data() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, set_element_with_clear('input[name=Imię]', 'Jan')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, set_element_with_clear('input[name=Nazwisko]', 'Woreczko')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, set_select_element('select[id=Skąd]', 'Warszawa')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, set_select_element('select[id=Dokąd]', 'Londyn')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, set_element_with_clear('input[name=data]', yearAfterDate())];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function check_equal(element_name, value) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = chai_1.expect;
                    return [4 /*yield*/, mocha_webdriver_1.driver.find(element_name).getText()];
                case 1:
                    _a.apply(void 0, [_b.sent()]).equal(value);
                    return [2 /*return*/];
            }
        });
    });
}
function get_curtain() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, input_data()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('div[class=zaslona]')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function check_unclickable() {
    return __awaiter(this, void 0, void 0, function () {
        var clickable, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clickable = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    clickable = false;
                    return [3 /*break*/, 4];
                case 4:
                    chai_1.expect(clickable).to.be["false"];
                    return [2 /*return*/];
            }
        });
    });
}
function set_wrong(selector, wrong_value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input_data()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, set_element_with_clear(selector, wrong_value)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, check_equal(selector, '')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, check_unclickable()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function set_empty(selector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input_data()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, clear_element(selector)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
describe('Przycisk "submit"', function () {
    it('Chowanie przycisku wysyłania', function () {
        return __awaiter(this, void 0, void 0, function () {
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
                        return [4 /*yield*/, set_empty('input[name=Imię]')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, set_empty('input[name=Nazwisko]')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, input_data()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, set_select_element('select[id=Skąd]', 'Londyn')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, set_select_element('select[id=Dokąd]', 'Londyn')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, check_unclickable()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, set_wrong('input[name=data]', yearBeforeDate())];
                    case 9:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Pokazywanie przycisku wysyłania', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, mocha_webdriver_1.driver.get(filePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, input_data()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('input[type=submit]').doClick()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('Rezerwacja', function () {
    it('Wyświetlanie potwierdzenia rezerwacji i poprawność danych tam zawartych', function () {
        return __awaiter(this, void 0, void 0, function () {
            var date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = yearAfterDate();
                        this.timeout(20000);
                        return [4 /*yield*/, get_curtain()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_gratulacje]', 'Udana rezerwacja!')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_miasto_odlotu]', 'Lot z: ' + 'Warszawa')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_miasto_przylotu]', 'Lot do: ' + 'Londyn')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_data_lotu]', 'Data lotu: ' + date)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_imię]', 'Imię: ' + 'Jan')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, check_equal('p[id=zaslona_nazwisko]', 'Nazwisko: ' + 'Woreczko')];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe('Zasłanianie linków', function () {
    it('Sprawdzenie, że podczas wyświetlania potwierdzenia nie można klikać w linki', function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, clickable, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(20000);
                        return [4 /*yield*/, get_curtain()];
                    case 1:
                        _a.sent();
                        i = 1;
                        _a.label = 2;
                    case 2:
                        if (!(i <= 8)) return [3 /*break*/, 8];
                        clickable = true;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, mocha_webdriver_1.driver.find('a[id=menu_link' + i.toString() + ']').doClick()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        clickable = false;
                        return [3 /*break*/, 6];
                    case 6:
                        chai_1.expect(clickable).to.be["false"];
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/];
                }
            });
        });
    });
});
