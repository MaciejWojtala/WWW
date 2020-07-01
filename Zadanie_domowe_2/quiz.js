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
        function check_IQuiz(data) {
            if (!data || typeof data !== "object")
                return false;
            var projection = data;
            return projection.questions !== undefined &&
                projection.introduction !== undefined &&
                projection.correct_answers !== undefined;
        }
        function check_quiz() {
            var any_quiz = JSON.parse(jsonString);
            if (check_IQuiz(any_quiz)) {
                quiz = any_quiz;
                return true;
            }
            else {
                console.log("Błąd tworzenia quizu");
                return false;
            }
        }
        function clear_after_quiz(local_question_number) {
            if (local_question_number < 1 ||
                local_question_number > quiz.questions.length)
                return;
            var grid_introduction = document.getElementById("grid_wstęp");
            var grid_change_question = document.getElementById("grid_przyciski_zmiana_pytania");
            var grid_question = document.getElementById("grid_pytanie " + local_question_number.toString());
            var grid_end_quiz = document.getElementById("grid_przycisk_zakończenie_quizu");
            var grid_cancel_quiz = document.getElementById("grid_przycisk_anulowanie_quizu");
            var grid_scoring_system = document.getElementById("grid_punktacja");
            var grid_questions_number = document.getElementById("grid_liczba_pytań");
            var grid_time = document.getElementById("grid_czas");
            grid_introduction.style.display = "none";
            grid_change_question.style.display = "none";
            grid_question.style.display = "none";
            grid_end_quiz.style.display = "none";
            grid_cancel_quiz.style.display = "none";
            grid_scoring_system.style.display = "none";
            grid_questions_number.style.display = "none";
            grid_time.style.display = "none";
        }
        function set_text_content_to_question_number(local_question_number) {
            if (local_question_number < 1 || local_question_number > quiz.questions.length)
                return;
            var grid_question = document.getElementById("grid_pytanie " + local_question_number.toString());
            var question = document.getElementById("pytanie " + local_question_number.toString());
            var header = document.getElementById("tytuł_strony");
            var grid_scoring_system = document.getElementById("grid_punktacja");
            var scoring_system = document.getElementById("punktacja");
            var grid_questions_number = document.getElementById("grid_liczba_pytań");
            var questions_number = document.getElementById("liczba_pytań");
            var scoring_text = "Błędna odpowiedź w tym zadaniu odpowiada doliczeniu do czasu ";
            if (local_question_number === 1)
                previous_question_button_1.disabled = true;
            else
                previous_question_button_1.disabled = false;
            if (local_question_number === quiz.questions.length)
                next_question_button_1.disabled = true;
            else
                next_question_button_1.disabled = false;
            grid_scoring_system.style.display = "block";
            scoring_system.textContent = scoring_text +
                (local_question_number * 10).toString() + " sekund.";
            grid_questions_number.style.display = "block";
            questions_number.textContent = "Test zawiera " + quiz.questions.length + " zadań.";
            grid_question.style.display = "block";
            question.textContent = quiz.questions[local_question_number - 1];
            header.textContent = "Zadanie " + question_number_1.toString();
        }
        function switch_off_old_question(old_question_number) {
            var grid_old_question = document.getElementById("grid_pytanie " + old_question_number.toString());
            grid_old_question.style.display = "none";
        }
        function get_back_from_quiz_to_homepage(local_question_number) {
            if (local_question_number < 1 ||
                local_question_number > quiz.questions.length)
                return;
            clear_after_quiz(local_question_number);
            clear_forms();
        }
        function clear_forms() {
            var forms = document.getElementsByClassName("formularz_odpowiedzi");
            end_quiz_button_1.disabled = true;
            for (var i = 0; i < answers_1.length; i++)
                answers_1[i] = "";
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                form.reset();
            }
        }
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
        function round(arg) {
            return Math.round((arg + Number.EPSILON) * 100) / 100;
        }
        function start() {
            var grid_introduction = document.getElementById("grid_wstęp");
            var grid_change_question = document.getElementById("grid_przyciski_zmiana_pytania");
            var grid_end_quiz = document.getElementById("grid_przycisk_zakończenie_quizu");
            var grid_cancel_quiz = document.getElementById("grid_przycisk_anulowanie_quizu");
            var headers3 = document.getElementsByClassName("pytanie_nagłówek");
            var grid_time = document.getElementById("grid_czas");
            var introduction_content = document.getElementById("wstęp");
            var time_content = document.getElementById("czas");
            clear_forms();
            for (var i = 0; i < headers3.length; i++) {
                var header3 = headers3[i];
                header3.textContent = "Treść zadania";
            }
            for (var i = 0; i < spent_time_1.length; i++)
                spent_time_1[i] = 0;
            question_number_1 = 1;
            time_1 = 0;
            time_content.textContent = time_1.toString() + " sekund" +
                get_polish_suffix(time_1);
            grid_introduction.style.display = "block";
            grid_change_question.style.display = "block";
            grid_end_quiz.style.display = "block";
            grid_cancel_quiz.style.display = "block";
            grid_time.style.display = "block";
            end_quiz_button_1.disabled = true;
            introduction_content.innerHTML = quiz.introduction;
            set_text_content_to_question_number(question_number_1);
        }
        function send_results() {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var percentage, whole_time, i, result_json, err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        whole_time = 0;
                                        spent_time_1.forEach(function (problem) {
                                            whole_time += problem;
                                        });
                                        percentage = new Array(quiz.questions.length);
                                        for (i = 0; i < percentage.length; i++) {
                                            percentage[i] = round(spent_time_1[i] * 100 / whole_time);
                                        }
                                        result_json = { jsonString: jsonString, answers: answers_1, percentage: percentage };
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, fetch('/', {
                                                credentials: 'same-origin',
                                                method: 'POST',
                                                body: JSON.stringify({
                                                    quiz_result: result_json
                                                }),
                                                headers: {
                                                    'CSRF-Token': token,
                                                    "Content-Type": "application/json"
                                                }
                                            })
                                                .then(function (response) { return response.json(); })
                                                .then(function (data) {
                                                document.getElementById('render_summarize').click();
                                                resolve();
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_2 = _a.sent();
                                        reject(err_2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                });
            });
        }
        var jsonString, csrf_value, token, err_1, IQuestions, ICorrectAnswers, quiz, previous_question_button_1, next_question_button_1, cancel_quiz_button, end_quiz_button_1, input_answers, answers_1, spent_time_1, time_1, question_number_1, _loop_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    csrf_value = document.getElementsByName('_csrf')[0].value;
                    token = document.querySelector('input[name="_csrf"]').getAttribute('value');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch('/', {
                            credentials: 'same-origin',
                            method: 'POST',
                            body: JSON.stringify({
                                getQuizJSON: true
                            }),
                            headers: {
                                'CSRF-Token': token,
                                "Content-Type": "application/json"
                            }
                        })
                            .then(function (response) { return response.json(); })
                            .then(function (data) {
                            jsonString = JSON.stringify(data);
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4:
                    IQuestions = /** @class */ (function () {
                        function IQuestions() {
                        }
                        return IQuestions;
                    }());
                    ICorrectAnswers = /** @class */ (function () {
                        function ICorrectAnswers() {
                        }
                        return ICorrectAnswers;
                    }());
                    if (check_quiz()) {
                        previous_question_button_1 = document.getElementById("poprzednie_pytanie");
                        next_question_button_1 = document.getElementById("następne_pytanie");
                        cancel_quiz_button = document.getElementById("anuluj_quiz");
                        end_quiz_button_1 = document.getElementById("zakończ_quiz");
                        input_answers = document.querySelectorAll("input[type=number][class=odpowiedź]");
                        answers_1 = new Array(quiz.questions.length);
                        spent_time_1 = new Array(quiz.questions.length);
                        time_1 = -1;
                        question_number_1 = 0;
                        start();
                        window.addEventListener('DOMContentLoaded', clear_forms);
                        _loop_1 = function (i) {
                            var input_answer = input_answers[i];
                            input_answer.addEventListener('input', function (event) {
                                answers_1[i] = input_answer.value;
                                var count = 0;
                                for (var j = 0; j < answers_1.length; j++) {
                                    if (answers_1[j] !== "")
                                        count++;
                                }
                                if (count === answers_1.length) {
                                    end_quiz_button_1.disabled = false;
                                }
                                else {
                                    end_quiz_button_1.disabled = true;
                                }
                            });
                        };
                        for (i = 0; i < input_answers.length; i++) {
                            _loop_1(i);
                        }
                        cancel_quiz_button.addEventListener('click', function (event) {
                            get_back_from_quiz_to_homepage(question_number_1);
                            question_number_1 = 0;
                            time_1 = -1;
                        });
                        previous_question_button_1.addEventListener('click', function (event) {
                            switch_off_old_question(question_number_1);
                            question_number_1--;
                            set_text_content_to_question_number(question_number_1);
                        });
                        next_question_button_1.addEventListener('click', function (event) {
                            switch_off_old_question(question_number_1);
                            question_number_1++;
                            set_text_content_to_question_number(question_number_1);
                        });
                        end_quiz_button_1.addEventListener('click', function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var err_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        clear_after_quiz(question_number_1);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, send_results()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_3 = _a.sent();
                                        console.log(err_3);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        setInterval(function () {
                            if (time_1 >= 0) {
                                var time_content = document.getElementById("czas");
                                time_1++;
                                time_content.textContent = time_1.toString() + " sekund" +
                                    get_polish_suffix(time_1);
                                spent_time_1[question_number_1 - 1]++;
                            }
                        }, 1000);
                    }
                    return [2 /*return*/];
            }
        });
    });
})();
