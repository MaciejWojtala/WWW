(function () {
    var jsonString = "{\n        \"questions\": [\n            \"2 + 2 = \",\n            \"3 * 6 : 9 = \",\n            \"8 - 7 * 15 = \",\n            \"83 * (7 * 15 - 35 * 3) = \",\n            \"80 : (9 * 7 - 8 * 8) = \",\n            \"64 : 2 : 4 : 8 = \"\n        ],\n        \"correct_answers\": [\n            \"4\",\n            \"2\",\n            \"-97\",\n            \"0\",\n            \"-80\",\n            \"1\"\n        ],\n        \"introduction\": \"Quiz algebraiczny, w ka\u017Cdym zadaniu nale\u017Cy poda\u0107 jako wynik liczb\u0119 ca\u0142kowit\u0105.<br>Nie nale\u017Cy podawa\u0107 zer wiod\u0105cych, poprzedza\u0107 liczb znakiem \\\"+\\\" lub poprzedza\u0107 zera znakiem \\\"-\\\".<br>Na wynik maj\u0105 wp\u0142yw: poprawno\u015B\u0107 odpowiedzi i czas wype\u0142niania quizu.\"\n    }";
    var IQuestions = /** @class */ (function () {
        function IQuestions() {
        }
        return IQuestions;
    }());
    var ICorrectAnswers = /** @class */ (function () {
        function ICorrectAnswers() {
        }
        return ICorrectAnswers;
    }());
    function check_IQuiz(data) {
        if (!data || typeof data !== "object")
            return false;
        var projection = data;
        return projection.questions !== undefined &&
            projection.introduction !== undefined &&
            projection.correct_answers !== undefined;
    }
    var quiz;
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
    if (check_quiz()) {
        var start_button_1 = document.getElementById("nowy_quiz");
        var highscore_button_1 = document.getElementById("najlepsze_wyniki");
        var previous_question_button_1 = document.getElementById("poprzednie_pytanie");
        var next_question_button_1 = document.getElementById("następne_pytanie");
        var cancel_quiz_button = document.getElementById("anuluj_quiz");
        var end_quiz_button_1 = document.getElementById("zakończ_quiz");
        var save_only_result_button = document.getElementById("zapis_wyniku");
        var save_with_statistics_button = document.getElementById("zapis_wyniku_i_statystyk");
        var comeback_button = document.getElementById("przycisk_wróć");
        var input_answers = document.querySelectorAll("input[type=number][class=odpowiedź]");
        var database_name_1 = "database";
        var result_storage_name_1 = "result_storage";
        var statistics_storage_name_1 = "statistics_storage";
        var highscore_table_length_1 = 5;
        var answers_1 = new Array(quiz.questions.length);
        var statistics_1 = new Array(quiz.questions.length);
        var spent_time_1 = new Array(quiz.questions.length);
        var result_value_1 = -1;
        var database_1;
        var database_open_flag_1 = false;
        var time_1 = -1;
        var question_number_1 = 0;
        var ResultObject_1 = /** @class */ (function () {
            function ResultObject(result) {
                this.result = result;
            }
            return ResultObject;
        }());
        var StatisticObject_1 = /** @class */ (function () {
            function StatisticObject(statistics_table) {
                this.statistics = new Array(statistics_table.length);
                for (var i = 0; i < statistics_table.length; i++)
                    this.statistics[i] = statistics_table[i];
            }
            return StatisticObject;
        }());
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
            questions_number.textContent = "Test zawiera " + quiz.questions.length + " pytań";
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
            show_homepage_view();
            clear_forms();
        }
        function get_back_from_summary_to_homepage() {
            var grid_result = document.getElementById("grid_liczba_punktów");
            var grid_summary = document.getElementById("grid_tabela_podsumowanie");
            var grid_save_buttons = document.getElementById("grid_przyciski_zapis");
            var header = document.getElementById("tytuł_strony");
            grid_result.style.display = "none";
            grid_summary.style.display = "none";
            grid_save_buttons.style.display = "none";
            clear_forms();
            show_homepage_view();
            header.textContent = "Quiz";
        }
        function show_homepage_view() {
            var header = document.getElementById("tytuł_strony");
            start_button_1.style.display = "inline-block";
            highscore_button_1.style.display = "inline-block";
            header.textContent = "Quiz";
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
        function getCell(row, cell_class_name) {
            var cells = row.getElementsByClassName(cell_class_name);
            return cells[0];
        }
        function summarize() {
            var result = 0;
            for (var i = 0; i < quiz.questions.length; i++) {
                var row = document.getElementById("tabela_podsumowanie_wiersz" +
                    (i + 1).toString());
                var id_prefix = "tabela_podsumowanie_kolumna";
                var cell = getCell(row, id_prefix + "1");
                cell.textContent = (i + 1).toString();
                cell = getCell(row, id_prefix + "2");
                cell.textContent = answers_1[i];
                cell = getCell(row, id_prefix + "3");
                cell.textContent = quiz.correct_answers[i];
                cell = getCell(row, id_prefix + "4");
                cell.textContent = spent_time_1[i].toString();
                var punishment = 0;
                if (answers_1[i] !== quiz.correct_answers[i])
                    punishment = 10 * (i + 1);
                cell = getCell(row, id_prefix + "5");
                cell.textContent = punishment.toString();
                cell = getCell(row, id_prefix + "6");
                statistics_1[i] = spent_time_1[i] + punishment;
                cell.textContent = statistics_1[i].toString();
                result += statistics_1[i];
            }
            return result;
        }
        function fill_highscore_table() {
            var id_prefix = "tabela_najlepsze_wyniki_kolumna";
            for (var i = 0; i < highscore_table_length_1; i++) {
                var row = document.getElementById("tabela_najlepsze_wyniki_wiersz" +
                    (i + 1).toString());
                var cell = getCell(row, id_prefix + "1");
                cell.textContent = (i + 1).toString();
                cell = getCell(row, id_prefix + "2");
                cell.textContent = "-";
            }
            var transaction = database_1.transaction([result_storage_name_1], "readonly");
            transaction.oncomplete = function (event) { };
            transaction.onerror = function (event) {
                console.log("Nie udało się wczytać wyników");
            };
            var objectStore = transaction.objectStore(result_storage_name_1);
            var request = objectStore.getAll();
            request.onsuccess = function (event) {
                var projection = event.target;
                var result = projection.result;
                result.sort(function (a, b) { return a.result - b.result; });
                for (var i = 0; i < highscore_table_length_1; i++) {
                    var row = document.getElementById("tabela_najlepsze_wyniki_wiersz" +
                        (i + 1).toString());
                    var cell = getCell(row, id_prefix + "2");
                    if (i < result.length)
                        cell.textContent = result[i].result + " sekund" +
                            get_polish_suffix(result[i].result);
                }
            };
            request.onerror = function (event) {
                console.log("Nie udało się wczytać wyników");
            };
        }
        function open_database() {
            var request = indexedDB.open(database_name_1);
            request.onerror = function (event) {
                console.log("Otworzenie bazy danych nie powiodło się");
            };
            request.onsuccess = function (event) {
                database_1 = request.result;
                database_open_flag_1 = true;
            };
            request.onupgradeneeded = function (event) {
                var event_target_projection = event.target;
                var local_database = event_target_projection.result;
                local_database.createObjectStore(result_storage_name_1);
                local_database.createObjectStore(statistics_storage_name_1);
            };
            request.onblocked = function (event) {
                console.log("Baza zablokowana");
            };
        }
        function getRandom() {
            return Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
        }
        function save_data(object, storage_name) {
            var transaction = database_1.transaction([storage_name], "readwrite");
            transaction.oncomplete = function (event) { };
            transaction.onerror = function (event) {
                console.log("Błąd zapisu wyniku");
            };
            var objectStore = transaction.objectStore(storage_name);
            var request;
            try {
                request = objectStore.add(object, getRandom());
                request.onsuccess = function (event) { };
                request.onerror = function (event) {
                    console.log("Błąd zapisu wyniku");
                };
            }
            catch (e) {
                console.log("Błąd zapisu wyniku");
            }
        }
        function check_database_flag() {
            if (!database_open_flag_1) {
                console.log("Błąd komunikacji z bazą danych");
                return false;
            }
            return true;
        }
        function save_result() {
            if (!check_database_flag())
                return;
            var object = new ResultObject_1(result_value_1);
            save_data(object, result_storage_name_1);
        }
        function save_statistics() {
            if (!check_database_flag())
                return;
            var object = new StatisticObject_1(statistics_1);
            save_data(object, statistics_storage_name_1);
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
        window.addEventListener('DOMContentLoaded', clear_forms);
        var _loop_1 = function (i) {
            var input_answer = input_answers[i];
            input_answer.addEventListener('input', function (event) {
                answers_1[i] = input_answer.value;
                var count = 0;
                for (var j = 0; j < answers_1.length; j++) {
                    if (answers_1[j] !== "")
                        count++;
                }
                if (count === answers_1.length)
                    end_quiz_button_1.disabled = false;
                else
                    end_quiz_button_1.disabled = true;
            });
        };
        for (var i = 0; i < input_answers.length; i++) {
            _loop_1(i);
        }
        window.addEventListener('load', open_database);
        start_button_1.addEventListener('click', function (event) {
            var grid_introduction = document.getElementById("grid_wstęp");
            var grid_change_question = document.getElementById("grid_przyciski_zmiana_pytania");
            var grid_end_quiz = document.getElementById("grid_przycisk_zakończenie_quizu");
            var grid_cancel_quiz = document.getElementById("grid_przycisk_anulowanie_quizu");
            var headers3 = document.getElementsByClassName("pytanie_nagłówek");
            var grid_time = document.getElementById("grid_czas");
            var introduction_content = document.getElementById("wstęp");
            for (var i = 0; i < headers3.length; i++) {
                var header3 = headers3[i];
                header3.textContent = "Treść zadania";
            }
            for (var i = 0; i < spent_time_1.length; i++)
                spent_time_1[i] = 0;
            question_number_1 = 1;
            time_1 = 0;
            start_button_1.style.display = "none";
            highscore_button_1.style.display = "none";
            grid_introduction.style.display = "block";
            grid_change_question.style.display = "block";
            grid_end_quiz.style.display = "block";
            grid_cancel_quiz.style.display = "block";
            grid_time.style.display = "block";
            end_quiz_button_1.disabled = true;
            introduction_content.innerHTML = quiz.introduction;
            set_text_content_to_question_number(question_number_1);
        });
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
        highscore_button_1.addEventListener('click', function (event) {
            if (!check_database_flag())
                return;
            var header = document.getElementById("tytuł_strony");
            var grid_highscore_table = document.getElementById("grid_tabela_najlepsze_wyniki");
            var grid_comeback_button = document.getElementById("grid_przycisk_wróć");
            start_button_1.style.display = "none";
            highscore_button_1.style.display = "none";
            header.textContent = "Najlepsze wyniki";
            grid_highscore_table.style.display = "block";
            grid_comeback_button.style.display = "block";
            fill_highscore_table();
        });
        comeback_button.addEventListener('click', function (event) {
            var grid_highscore_table = document.getElementById("grid_tabela_najlepsze_wyniki");
            var grid_comeback_button = document.getElementById("grid_przycisk_wróć");
            grid_highscore_table.style.display = "none";
            grid_comeback_button.style.display = "none";
            show_homepage_view();
        });
        end_quiz_button_1.addEventListener('click', function (event) {
            var header = document.getElementById("tytuł_strony");
            var grid_result = document.getElementById("grid_liczba_punktów");
            var result = document.getElementById("liczba_punktów");
            var grid_summary = document.getElementById("grid_tabela_podsumowanie");
            var grid_save_buttons = document.getElementById("grid_przyciski_zapis");
            clear_after_quiz(question_number_1);
            header.textContent = "Podsumowanie";
            grid_result.style.display = "block";
            grid_summary.style.display = "block";
            grid_save_buttons.style.display = "block";
            result_value_1 = summarize();
            result.textContent = "Twój wynik to " + result_value_1.toString() + " sekund" +
                get_polish_suffix(result_value_1) + ".";
        });
        save_only_result_button.addEventListener('click', function (event) {
            save_result();
            get_back_from_summary_to_homepage();
        });
        save_with_statistics_button.addEventListener('click', function (event) {
            save_result();
            save_statistics();
            get_back_from_summary_to_homepage();
        });
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
})();
