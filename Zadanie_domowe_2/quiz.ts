(function () {
    const quiz_json_el = document.getElementById("quiz_json") as HTMLInputElement;
    const jsonString: string = quiz_json_el.value;

    class IQuestions {
        length: number;
    }

    class ICorrectAnswers {
        length: number;
    }

    interface IQuiz {
        name: string,
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
        const previous_question_button = document.getElementById
                ("poprzednie_pytanie") as HTMLInputElement;
        const next_question_button = document.getElementById
                ("następne_pytanie") as HTMLInputElement;
        const cancel_quiz_button = document.getElementById
                ("anuluj_quiz") as HTMLInputElement;
        const end_quiz_button = document.getElementById
                ("zakończ_quiz") as HTMLInputElement;
        const input_answers = document.querySelectorAll
                ("input[type=number][class=odpowiedź]");

        const answers : string[] = new Array<string>(quiz.questions.length);;
        const spent_time : number[] = new Array<number>(quiz.questions.length);
        let time = -1;
        let question_number = 0;

        start();

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
            questions_number.textContent = "Test zawiera " + quiz.questions.length + " zadań.";
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
            clear_forms();
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

        function round(arg : number) : number {
            return Math.round((arg + Number.EPSILON) * 100) / 100;
        }

        function start() {
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
            const time_content = document.getElementById("czas");

            for (let i = 0; i < headers3.length; i++) {
                const header3 = headers3[i] as HTMLElement;
                header3.textContent = "Treść zadania";
            }

            for (let i = 0; i < spent_time.length; i++)
                spent_time[i] = 0;

            question_number = 1;
            time = 0;
            time_content.textContent = time.toString() + " sekund" +
                        get_polish_suffix(time);
            grid_introduction.style.display = "block";
            grid_change_question.style.display = "block";
            grid_end_quiz.style.display = "block";
            grid_cancel_quiz.style.display = "block";
            grid_time.style.display = "block";
            end_quiz_button.disabled = true;
            introduction_content.innerHTML = quiz.introduction;

            set_text_content_to_question_number(question_number);
        }

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

        function send_results() {
            const form = document.getElementById('send_form') as HTMLFormElement;
            const send_result = document.getElementById('quiz_result') as HTMLInputElement;
            let percentage : number[];
            let whole_time = 0;
            spent_time.forEach((problem) => {
                whole_time += problem;
            });
            percentage = new Array<number>(quiz.questions.length);
            for (let i = 0; i < percentage.length; i++) {
                percentage[i] = round(spent_time[i] * 100 / whole_time);
            }
            const result_json = { jsonString, answers, percentage };
            send_result.value = JSON.stringify(result_json);
            form.submit();

        }

        end_quiz_button.addEventListener('click', event => {
            clear_after_quiz(question_number);
            send_results();
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
