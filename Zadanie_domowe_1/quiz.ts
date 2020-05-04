(function () {
    const jsonString: string = `{
        "questions": [
            "2 + 2 = ",
            "3 * 6 : 9 = ",
            "8 - 7 * 15 = ",
            "83 * (7 * 15 - 35 * 3) = ",
            "80 : (9 * 7 - 8 * 8) = ",
            "64 : 2 : 4 : 8 = "
        ],
        "correct_answers": [
            "4",
            "2",
            "-97",
            "0",
            "-80",
            "1"
        ],
        "introduction": "Quiz algebraiczny, w każdym zadaniu należy podać jako wynik liczbę całkowitą.<br>Nie należy podawać zer wiodących, poprzedzać liczb znakiem \\"+\\" lub poprzedzać zera znakiem \\"-\\".<br>Na wynik mają wpływ: poprawność odpowiedzi i czas wypełniania quizu."
    }`;

    class IQuestions {
        length: number;
    }

    class ICorrectAnswers {
        length: number;
    }

    interface IQuiz {
        questions: IQuestions;
        introduction: string;
        correct_answers: ICorrectAnswers;
    }

    function check_IQuiz(data: any): data is IQuiz {
        if (!data || typeof data !== "object")
            return false;

        const projection = data as IQuiz;

        return projection.questions !== undefined &&
                projection.introduction !== undefined &&
                projection.correct_answers !== undefined;
    }

    let quiz: IQuiz;

    function check_quiz() : boolean {
        const any_quiz = JSON.parse(jsonString);
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
        const start_button = document.getElementById
                ("nowy_quiz") as HTMLInputElement;
        const highscore_button = document.getElementById
                ("najlepsze_wyniki") as HTMLInputElement;
        const previous_question_button = document.getElementById
                ("poprzednie_pytanie") as HTMLInputElement;
        const next_question_button = document.getElementById
                ("następne_pytanie") as HTMLInputElement;
        const cancel_quiz_button = document.getElementById
                ("anuluj_quiz") as HTMLInputElement;
        const end_quiz_button = document.getElementById
                ("zakończ_quiz") as HTMLInputElement;
        const save_only_result_button = document.getElementById
                ("zapis_wyniku") as HTMLInputElement;
        const save_with_statistics_button = document.getElementById
                ("zapis_wyniku_i_statystyk") as HTMLInputElement;
        const comeback_button = document.getElementById
                ("przycisk_wróć") as HTMLInputElement;
        const input_answers = document.querySelectorAll
                ("input[type=number][class=odpowiedź]");

        const database_name : string = "database";
        const result_storage_name : string = "result_storage";
        const statistics_storage_name : string = "statistics_storage";
        const highscore_table_length : number = 5;

        const answers : string[] = new Array<string>(quiz.questions.length);
        const statistics : number[] = new Array<number>(quiz.questions.length);
        const spent_time : number[] = new Array<number>(quiz.questions.length);
        let result_value = -1;

        let database : IDBDatabase;
        let database_open_flag = false;
        let time = -1;
        let question_number = 0;

        interface IStoredObject {

        }

        class ResultObject implements IStoredObject {
            result: number;

            constructor(result: number) {
                this.result = result;
            }
        }

        class StatisticObject implements IStoredObject {
            statistics: number[];

            constructor(statistics_table: number[]) {
                this.statistics = new Array<number>(statistics_table.length);
                for (let i = 0; i < statistics_table.length; i++)
                    this.statistics[i] = statistics_table[i];
            }
        }

        function clear_after_quiz(local_question_number : number) : void {
            if (local_question_number < 1 ||
                    local_question_number > quiz.questions.length)
                return;

            const grid_introduction = document.getElementById
                    ("grid_wstęp") as HTMLElement;
            const grid_change_question = document.getElementById
                    ("grid_przyciski_zmiana_pytania") as HTMLElement;
            const grid_question = document.getElementById
                    ("grid_pytanie " + local_question_number.toString()) as HTMLElement;
            const grid_end_quiz = document.getElementById
                    ("grid_przycisk_zakończenie_quizu") as HTMLElement;
            const grid_cancel_quiz = document.getElementById
                    ("grid_przycisk_anulowanie_quizu") as HTMLElement;
            const grid_scoring_system = document.getElementById
                    ("grid_punktacja") as HTMLElement;
            const grid_questions_number = document.getElementById
                    ("grid_liczba_pytań") as HTMLElement;
            const grid_time = document.getElementById("grid_czas");

            grid_introduction.style.display = "none";
            grid_change_question.style.display = "none";

            grid_question.style.display = "none";
            grid_end_quiz.style.display = "none";
            grid_cancel_quiz.style.display = "none";
            grid_scoring_system.style.display = "none";
            grid_questions_number.style.display = "none";
            grid_time.style.display = "none";
        }

        function set_text_content_to_question_number(local_question_number : number) : void {
            if (local_question_number < 1 || local_question_number > quiz.questions.length)
                return;

            const grid_question = document.getElementById
                    ("grid_pytanie " + local_question_number.toString()) as HTMLElement;
            const question = document.getElementById
                    ("pytanie " + local_question_number.toString()) as HTMLElement;
            const header = document.getElementById("tytuł_strony") as HTMLElement;
            const grid_scoring_system = document.getElementById
                    ("grid_punktacja") as HTMLElement;
            const scoring_system = document.getElementById("punktacja") as HTMLElement;
            const grid_questions_number = document.getElementById
                    ("grid_liczba_pytań") as HTMLElement;
            const questions_number = document.getElementById
                    ("liczba_pytań") as HTMLElement;

            const scoring_text : string =
                    "Błędna odpowiedź w tym zadaniu odpowiada doliczeniu do czasu ";

            if (local_question_number === 1)
                previous_question_button.disabled = true;
            else
                previous_question_button.disabled = false;

            if (local_question_number === quiz.questions.length)
                next_question_button.disabled = true;
            else
                next_question_button.disabled = false;

            grid_scoring_system.style.display = "block";
            scoring_system.textContent = scoring_text +
                    (local_question_number * 10).toString() + " sekund.";
            grid_questions_number.style.display = "block";
            questions_number.textContent = "Test zawiera " + quiz.questions.length + " pytań";
            grid_question.style.display = "block";
            question.textContent = quiz.questions[local_question_number - 1];
            header.textContent = "Zadanie " + question_number.toString();
        }

        function switch_off_old_question(old_question_number : number) : void {
            const grid_old_question = document.getElementById
                    ("grid_pytanie " + old_question_number.toString()) as HTMLElement;
            grid_old_question.style.display = "none";
        }

        function get_back_from_quiz_to_homepage(local_question_number : number) : void {
            if (local_question_number < 1 ||
                    local_question_number > quiz.questions.length)
                return;

            clear_after_quiz(local_question_number);
            show_homepage_view()
            clear_forms();
        }

        function get_back_from_summary_to_homepage() : void {
            const grid_result = document.getElementById
                    ("grid_liczba_punktów") as HTMLElement;
            const grid_summary = document.getElementById
                    ("grid_tabela_podsumowanie") as HTMLElement;
            const grid_save_buttons = document.getElementById
                    ("grid_przyciski_zapis") as HTMLElement;
            const header = document.getElementById
                    ("tytuł_strony") as HTMLElement;

            grid_result.style.display = "none";
            grid_summary.style.display = "none";
            grid_save_buttons.style.display = "none";

            clear_forms();
            show_homepage_view();
            header.textContent = "Quiz";
        }

        function show_homepage_view() : void {
            const header = document.getElementById("tytuł_strony") as HTMLElement;

            start_button.style.display = "inline-block";
            highscore_button.style.display = "inline-block";
            header.textContent = "Quiz";
        }

        function clear_forms() : void {
            const forms = document.getElementsByClassName("formularz_odpowiedzi");

            end_quiz_button.disabled = true;
            for (let i = 0; i < answers.length; i++)
                answers[i] = "";

            for (let i = 0; i < forms.length; i++) {
                const form = forms[i] as HTMLFormElement;
                form.reset();
            }
        }

        function getCell(row: HTMLElement, cell_class_name: string) : HTMLElement {
            const cells = row.getElementsByClassName(cell_class_name);

            return cells[0] as HTMLElement;
        }

        function summarize() : number {
            let result = 0;

            for (let i = 0; i < quiz.questions.length; i++) {
                const row = document.getElementById("tabela_podsumowanie_wiersz" +
                        (i+1).toString()) as HTMLElement;

                const id_prefix : string = "tabela_podsumowanie_kolumna";
                let cell = getCell(row, id_prefix + "1");
                cell.textContent = (i+1).toString();

                cell = getCell(row, id_prefix + "2");
                cell.textContent = answers[i];

                cell = getCell(row, id_prefix + "3");
                cell.textContent = quiz.correct_answers[i];

                cell = getCell(row, id_prefix + "4");
                cell.textContent = spent_time[i].toString();

                let punishment = 0;
                if (answers[i] !== quiz.correct_answers[i])
                    punishment = 10*(i+1);

                cell = getCell(row, id_prefix + "5");
                cell.textContent = punishment.toString();

                cell = getCell(row, id_prefix + "6");
                statistics[i] = spent_time[i] + punishment;
                cell.textContent = statistics[i].toString();
                result += statistics[i];
            }

            return result;
        }

        function fill_highscore_table() {
            const id_prefix : string = "tabela_najlepsze_wyniki_kolumna";

            for (let i = 0; i < highscore_table_length; i++) {
                const row = document.getElementById("tabela_najlepsze_wyniki_wiersz" +
                        (i+1).toString()) as HTMLElement;

                let cell = getCell(row, id_prefix + "1");
                cell.textContent = (i+1).toString();

                cell = getCell(row, id_prefix + "2");
                cell.textContent = "-";
            }

            const transaction = database.transaction([result_storage_name], "readonly");

            transaction.oncomplete = function(event) {};

            transaction.onerror = function(event) {
                console.log("Nie udało się wczytać wyników");
            };

            const objectStore = transaction.objectStore(result_storage_name);
            const request = objectStore.getAll() as IDBRequest<ResultObject[]>;
            request.onsuccess = function(event) {
                const projection = event.target as IDBRequest<ResultObject[]>;
                const result = projection.result;
                result.sort((a, b) => a.result - b.result);

                for (let i = 0; i < highscore_table_length; i++) {
                    const row = document.getElementById
                            ("tabela_najlepsze_wyniki_wiersz" +
                            (i+1).toString()) as HTMLElement;
                    const cell = getCell(row, id_prefix + "2");
                    if (i < result.length)
                            cell.textContent = result[i].result + " sekund" +
                            get_polish_suffix(result[i].result);
                }

            };

            request.onerror = function(event) {
                console.log("Nie udało się wczytać wyników");
            };

        }

        function open_database() : void {
            const request = indexedDB.open(database_name);

            request.onerror = function (event) {
                console.log("Otworzenie bazy danych nie powiodło się");
            };

            request.onsuccess = function (event) {
                database = request.result;
                database_open_flag = true;
            };

            request.onupgradeneeded = function (event) {
                const event_target_projection = event.target as IDBOpenDBRequest;
                const local_database = event_target_projection.result;
                local_database.createObjectStore
                        (result_storage_name);
                local_database.createObjectStore
                        (statistics_storage_name);
            };

            request.onblocked = function(event) {
                console.log("Baza zablokowana");
            };
        }

        function getRandom() : string {
            return Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15);
        }

        function save_data(object : IStoredObject, storage_name : string) : void {
            const transaction = database.transaction([storage_name], "readwrite");

            transaction.oncomplete = function(event) {};

            transaction.onerror = function(event) {
                console.log("Błąd zapisu wyniku");
            };

            const objectStore = transaction.objectStore(storage_name);
            let request : IDBRequest<IDBValidKey>;

            try {
                request = objectStore.add(object, getRandom());
                request.onsuccess = function (event) {};
                request.onerror = function(event) {
                    console.log("Błąd zapisu wyniku");
                };
            }
            catch (e) {
                console.log("Błąd zapisu wyniku");
            }
        }

        function check_database_flag() : boolean {
            if (!database_open_flag) {
                console.log("Błąd komunikacji z bazą danych");
                return false;
            }

            return true;
        }

        function save_result() : void {
            if (!check_database_flag())
                return;

            const object = new ResultObject(result_value);
            save_data(object, result_storage_name);
        }

        function save_statistics() : void {
            if (!check_database_flag())
                return;

            const object = new StatisticObject(statistics);
            save_data(object, statistics_storage_name);
        }

        function get_polish_suffix(value : number) : string {
            if (value === 1)
                return "a";

            const remainder_100 = value % 100;
            const remainder_10 = value % 10;

            if (remainder_10 <= 1 || remainder_10 >= 5 ||
                    (remainder_100 >= 12 && remainder_100 <= 14) )
                return "";

            return "y";
        }

        window.addEventListener('DOMContentLoaded', clear_forms);

        for (let i = 0; i < input_answers.length; i++) {
            const input_answer = input_answers[i] as HTMLInputElement;
            input_answer.addEventListener('input', (event) => {
                answers[i] = input_answer.value;

                let count = 0;
                for (let j = 0; j < answers.length; j++) {
                    if (answers[j] !== "")
                        count++;
                }

                if (count === answers.length)
                    end_quiz_button.disabled = false;
                else
                    end_quiz_button.disabled = true;

            });
        }

        window.addEventListener('load', open_database);

        start_button.addEventListener('click', event => {
            const grid_introduction = document.getElementById
                    ("grid_wstęp") as HTMLElement;
            const grid_change_question = document.getElementById
                    ("grid_przyciski_zmiana_pytania") as HTMLElement;
            const grid_end_quiz = document.getElementById
                    ("grid_przycisk_zakończenie_quizu") as HTMLElement;
            const grid_cancel_quiz = document.getElementById
                    ("grid_przycisk_anulowanie_quizu") as HTMLElement;
            const headers3 = document.getElementsByClassName("pytanie_nagłówek");
            const grid_time = document.getElementById("grid_czas");
            const introduction_content = document.getElementById("wstęp");

            for (let i = 0; i < headers3.length; i++) {
                const header3 = headers3[i] as HTMLElement;
                header3.textContent = "Treść zadania";
            }

            for (let i = 0; i < spent_time.length; i++)
                spent_time[i] = 0;

            question_number = 1;
            time = 0;
            start_button.style.display = "none";
            highscore_button.style.display = "none";
            grid_introduction.style.display = "block";
            grid_change_question.style.display = "block";
            grid_end_quiz.style.display = "block";
            grid_cancel_quiz.style.display = "block";
            grid_time.style.display = "block";
            end_quiz_button.disabled = true;
            introduction_content.innerHTML = quiz.introduction;

            set_text_content_to_question_number(question_number);
        });

        cancel_quiz_button.addEventListener('click', event => {
            get_back_from_quiz_to_homepage(question_number);
            question_number = 0;
            time = -1;
        });

        previous_question_button.addEventListener('click', event => {
            switch_off_old_question(question_number);

            question_number--;
            set_text_content_to_question_number(question_number);
        });

        next_question_button.addEventListener('click', event => {
            switch_off_old_question(question_number);

            question_number++;
            set_text_content_to_question_number(question_number);
        });

        highscore_button.addEventListener('click', event => {
            if (!check_database_flag())
                return;

            const header = document.getElementById("tytuł_strony") as HTMLElement;
            const grid_highscore_table = document.getElementById
                    ("grid_tabela_najlepsze_wyniki") as HTMLElement;
            const grid_comeback_button = document.getElementById
                    ("grid_przycisk_wróć") as HTMLElement;

            start_button.style.display = "none";
            highscore_button.style.display = "none";
            header.textContent = "Najlepsze wyniki";
            grid_highscore_table.style.display = "block";
            grid_comeback_button.style.display = "block";

            fill_highscore_table();
        });

        comeback_button.addEventListener('click', event => {
            const grid_highscore_table = document.getElementById
                    ("grid_tabela_najlepsze_wyniki") as HTMLElement;
            const grid_comeback_button = document.getElementById
                    ("grid_przycisk_wróć") as HTMLElement;

            grid_highscore_table.style.display = "none";
            grid_comeback_button.style.display = "none";

            show_homepage_view();
        });

        end_quiz_button.addEventListener('click', event => {
            const header = document.getElementById
                    ("tytuł_strony") as HTMLElement;
            const grid_result = document.getElementById
                    ("grid_liczba_punktów") as HTMLElement;
            const result = document.getElementById
                    ("liczba_punktów") as HTMLElement;
            const grid_summary = document.getElementById
                    ("grid_tabela_podsumowanie") as HTMLElement;
            const grid_save_buttons = document.getElementById
                    ("grid_przyciski_zapis") as HTMLElement;

            clear_after_quiz(question_number);
            header.textContent = "Podsumowanie";
            grid_result.style.display = "block";
            grid_summary.style.display = "block";
            grid_save_buttons.style.display = "block";

            result_value = summarize();
            result.textContent = "Twój wynik to " + result_value.toString() + " sekund" +
                    get_polish_suffix(result_value) + ".";
        });

        save_only_result_button.addEventListener('click', event => {
            save_result();

            get_back_from_summary_to_homepage();
        });

        save_with_statistics_button.addEventListener('click', event => {
            save_result();
            save_statistics();

            get_back_from_summary_to_homepage();
        });

        setInterval(() => {
            if (time >= 0) {
                const time_content = document.getElementById("czas");
                time++;
                time_content.textContent = time.toString() + " sekund" +
                        get_polish_suffix(time);
                spent_time[question_number - 1]++;
            }
        }, 1000);
    }
})();
