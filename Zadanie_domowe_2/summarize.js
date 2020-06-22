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
(function () {
    return __awaiter(this, void 0, void 0, function () {
        function get_polish_suffix(value) {
            if (value === 1)
                return "a";
            var remainder_100 = value % 100;
            var remainder_10 = value % 10;
            if (remainder_10 <= 1 || remainder_10 >= 5 ||
                (remainder_100 >= 12 && remainder_100 <= 14))
                return "";
            return "y";
        }
        function getCell(row, cell_class_name) {
            var cells = row.getElementsByClassName(cell_class_name);
            return cells[0];
        }
        function summarize() {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var header, grid_result, result, grid_summary, quiz_result_json_el, result_json, quiz_length, quiz_result, i, row, id_prefix, cell, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        header = document.getElementById("tytuł_strony");
                                        grid_result = document.getElementById("grid_liczba_punktów");
                                        result = document.getElementById("liczba_punktów");
                                        grid_summary = document.getElementById("grid_tabela_podsumowanie");
                                        quiz_result_json_el = document.getElementById("quiz_result_json");
                                        result_json = quiz_result_json_el.value;
                                        quiz_length = 6;
                                        console.log("Podsumuj");
                                        console.log(result_json);
                                        return [4 /*yield*/, JSON.parse(result_json)];
                                    case 1:
                                        quiz_result = _a.sent();
                                        header.textContent = "Podsumowanie";
                                        grid_result.style.display = "block";
                                        grid_summary.style.display = "block";
                                        //result_value = summarize();
                                        console.log(quiz_result);
                                        result.textContent = "Twój wynik to " + quiz_result.result.toString() + " sekund" +
                                            get_polish_suffix(quiz_result.result) + ".";
                                        //let result = 0;
                                        for (i = 0; i < quiz_length; i++) {
                                            row = document.getElementById("tabela_podsumowanie_wiersz" +
                                                (i + 1).toString());
                                            id_prefix = "tabela_podsumowanie_kolumna";
                                            cell = getCell(row, id_prefix + "1");
                                            cell.textContent = (i + 1).toString();
                                            cell = getCell(row, id_prefix + "2");
                                            cell.textContent = quiz_result.answers[i];
                                            cell = getCell(row, id_prefix + "3");
                                            cell.textContent = quiz_result.correct_answers[i];
                                            cell = getCell(row, id_prefix + "4");
                                            cell.textContent = quiz_result.question_times[i].toString();
                                            cell = getCell(row, id_prefix + "5");
                                            cell.textContent = quiz_result.punishments[i].toString();
                                            cell = getCell(row, id_prefix + "6");
                                            cell.textContent = quiz_result.question_results[i].toString();
                                        }
                                        resolve();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_2 = _a.sent();
                                        console.log("reject");
                                        reject(err_2);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        }
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("run summarize");
                    return [4 /*yield*/, summarize()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
