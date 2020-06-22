(async function() {
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

    function getCell(row: HTMLElement, cell_class_name: string) : HTMLElement {
        const cells = row.getElementsByClassName(cell_class_name);

        return cells[0] as HTMLElement;
    }

    async function summarize() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const header = document.getElementById
                        ("tytuł_strony") as HTMLElement;
                const grid_result = document.getElementById
                        ("grid_liczba_punktów") as HTMLElement;
                const result = document.getElementById
                        ("liczba_punktów") as HTMLElement;
                const grid_summary = document.getElementById
                        ("grid_tabela_podsumowanie") as HTMLElement;
                const quiz_result_json_el = document.getElementById("quiz_result_json") as HTMLInputElement;
                const result_json : string = quiz_result_json_el.value;
                const quiz_length = 6;
                const quiz_result : {
                    result : number,
                    question_times : number[],
                    answers : string[],
                    correct_answers : string[],
                    punishments : number[],
                    question_results : number[]
                } = await JSON.parse(result_json);
                header.textContent = "Podsumowanie";
                grid_result.style.display = "block";
                grid_summary.style.display = "block";

                result.textContent = "Twój wynik to " + quiz_result.result.toString() + " sekund" +
                        get_polish_suffix(quiz_result.result) + ".";

                for (let i = 0; i < quiz_length; i++) {
                    const row = document.getElementById("tabela_podsumowanie_wiersz" +
                            (i+1).toString()) as HTMLElement;

                    const id_prefix : string = "tabela_podsumowanie_kolumna";
                    let cell = getCell(row, id_prefix + "1");
                    cell.textContent = (i+1).toString();

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
            }
            catch (err) {
                console.log("reject");
                reject(err);
            }
        });
    }

    try {
        await summarize();
    }
    catch (err) {
        console.log(err);
    }
})();