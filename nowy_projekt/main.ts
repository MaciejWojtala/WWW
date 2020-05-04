(function() {
    function json_data() {
        const jsonString: string = `{
            "piloci": [
                "Pirx",
                "Exupery",
                "Idzikowski",
                "Główczewski"
            ],
            "lotniska": {
                "WAW": ["Warszawa", [3690, 2800]],
                "NRT": ["Narita", [4000, 2500]],
                "BQH": ["Biggin Hill", [1802, 792]],
                "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]
            }
        }`;

        class Pilot {
            length: number;
        }

        interface ILotnisko {

        }

        interface ILiniaLotnicza {
            piloci: Pilot;
            lotniska: ILotnisko;
        }


        function check_ILiniaLotnicza(data: any): data is ILiniaLotnicza {
            if (!data || typeof data !== "object")
                return false;

            const projection = data as ILiniaLotnicza;

            return projection.piloci !== undefined && projection.lotniska !== undefined;
        }

        const airlane_data = JSON.parse(jsonString);
        if (!check_ILiniaLotnicza(airlane_data)) {
            console.log("Nieudane parsowanie;")
        }
    }

    json_data();

    function wait(milisec: number) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {resolve();}, milisec);
        });
    }

    function fill_fib_table(range : number, fib_table : number[]) : void {
        if (range < 0 || range > fib_table.length)
            return;

        fib_table[0] = 0;
        fib_table[1] = 1;

        for (let i = 2; i < range; i++) {
            fib_table[i] = fib_table[i-1] + fib_table[i-2];
        }
    }

    function fib_rek(arg : number) : number {
        if (arg < 0)
            return -1;

        if (arg === 1)
            return 1;
        if (arg === 0)
            return 0;
        return fib_rek(arg - 1) + fib_rek(arg - 2);
    }

    function fib_with_table(index : number, fib_table : number[]) : number {
        if (index < 0 || index >= fib_table.length)
            return -1;

        return fib_table[index];
    }

    const colors: string[] = ['red', 'orange', 'yellow', 'green',
            'blue', 'indygo', 'purple'];

    function teczoweKolory(el: HTMLElement) : void {
        let promise: Promise<void> = wait(1000);
        for (const color of colors) {
            promise = promise.then(() => {
                el.style.backgroundColor = color;
                console.log(color);
                return wait(1000);
            })
        }
        promise.catch(() => {
            console.log("Błąd");
        });
    }

    function modifications() : void {
        const h1_element = document.querySelector<HTMLElement>("h1");
        const body_end = document.getElementById("main_script") as HTMLElement;
        const paragraph = document.querySelector("p");
        const new_div = document.createElement("div");
        const new_paragraph = document.createElement("p");

        teczoweKolory(h1_element);

        paragraph.textContent = "To jest akapit";

        new_div.appendChild(new_paragraph);
        new_div.setAttribute("align", "center");

        new_paragraph.style.backgroundColor = "blue";
        new_paragraph.style.fontSize = "20px";
        new_paragraph.textContent = "Ala ma kota";

        document.body.insertBefore(new_div, body_end);
    }

    modifications();

    setTimeout(() => {
        console.log("Minęły 2 sekundy");
        }, 2000
    );


    fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            const reg = /"avatar_url": ".*"/;
            const raw_avatar_url = data.match(reg)[0];
            const avatar_url = raw_avatar_url.substring
                    ("\"avatar_url\": \"".length, raw_avatar_url.length - 1);
            const photo = document.createElement("img");
            const body_end = document.getElementById("main_script") as HTMLElement;

            photo.src = avatar_url;
            photo.alt = "Autor ostatniego commitu";
            document.body.insertBefore(photo, body_end);
        })
        .catch(() => {
            console.log("Błąd");
        }
    );

    function handler_1() : void {
        const table = document.getElementById("opoznienia") as HTMLElement;
        let it : number = 0;

        const form = document.getElementById("formularz_lotu") as HTMLElement;
        let it_2 : number = 0;

        const grid = document.getElementById("first_level_grid") as HTMLElement;
        grid.addEventListener('click', event => {
            const event_projection = event.target as HTMLLIElement;

            function coloring (element : HTMLElement, iterator : number) : boolean{
                if (element.contains(event_projection)) {
                    const children = element.querySelectorAll('*');
                    for (let i = 0; i < children.length; i++) {
                        const child = children[i] as HTMLLIElement;
                        child.style.backgroundColor = colors[iterator];
                    }
                    element.style.backgroundColor = colors[iterator];

                    return true;
                }

                return false;
            }

            if (coloring(form, it_2))
                it_2 = (it_2 + 1) % colors.length;
            if (coloring(table, it))
                it = (it + 1) % colors.length;

        });
    }

    function handler_2() : void {
        const grid = document.getElementById("first_level_grid") as HTMLElement;
        let it = 0;
        const all = grid.querySelectorAll('*');
        let clicks = 0;
        for (let i = 0; i < all.length; i++) {
            const el = all[i] as HTMLLIElement;
            el.addEventListener('click', (event) => {
                const form_grid = document.querySelector(".grid-item4");

                event.stopPropagation();
                if (!form_grid.contains(el)) {
                    const children = el.querySelectorAll('*');
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j] as HTMLLIElement;
                        if (!form_grid.contains(child))
                            child.style.backgroundColor = colors[it];
                    }
                    el.style.backgroundColor = colors[it];
                    clicks++;
                    const fib_table: number[] = new Array<number>(10*clicks + 1);
                    fill_fib_table(10*clicks + 1, fib_table);
                    console.log(fib_with_table(10*clicks, fib_table));
                    it = (it + 1) % colors.length;
                }
            });
        }
    }

    handler_2();

    function events() : void {
        const submit_element = document.querySelector<HTMLElement>("input[type=submit]");
        const name_element = document.querySelector<HTMLInputElement>("input[name=Imię]");
        const surname_element = document.querySelector<HTMLInputElement>("input[name=Nazwisko]");
        const date_element = document.querySelector<HTMLInputElement>("input[name=data]");
        const city_from_element = document.getElementById("Skąd") as HTMLSelectElement;
        const city_to_element = document.getElementById("Dokąd") as HTMLSelectElement;

        const current_date : Date = new Date();

        let cities_flag = (city_from_element.value !== city_to_element.value);
        const input_date : Date = new Date(date_element.value);
        let date_flag = (input_date >= current_date);

        let name_flag : boolean = true;
        let surname_flag : boolean = true;

        function set_display_to_flags() {
            if (name_flag && surname_flag && date_flag && cities_flag)
                submit_element.style.display = 'inline';
            else
                submit_element.style.display = "none";
        }

        set_display_to_flags();

        function cities_event_function() : void {
            cities_flag = (city_from_element.value !== city_to_element.value);

            set_display_to_flags();
        }

        city_from_element.addEventListener('input', cities_event_function);

        city_to_element.addEventListener('input', cities_event_function);

        date_element.addEventListener('input', (event) => {
            const input_date : Date = new Date(date_element.value);
            date_flag = (input_date >= current_date);

            set_display_to_flags();
        });

        name_element.addEventListener('input', (event) => {
            name_flag = (name_element.value !== "");

            set_display_to_flags();
        });

        surname_element.addEventListener('input', (event) => {
            surname_flag = (surname_element.value !== "");

            set_display_to_flags();
        });

        submit_element.addEventListener('click', (event) => {
            const new_div = document.createElement("div");
            new_div.classList.add("zaslona");

            const strings : string[] = [
                "Udana rezerwacja!",
                "Lot z: " + city_from_element.value,
                "Lot do: " + city_to_element.value,
                "Data lotu: " + date_element.value,
                "Imię: " + name_element.value,
                "Nazwisko: " + surname_element.value
            ];

            const ids : string[] = [
                "gratulacje",
                "miasto_odlotu",
                "miasto_przylotu",
                "data_lotu",
                "imię",
                "nazwisko",
            ];

            for (let i = 0; i < strings.length; i++) {
                const new_paragraph = document.createElement("p");
                new_paragraph.classList.add("zaslona");
                new_paragraph.setAttribute("id", "zaslona_" + ids[i])
                new_paragraph.textContent = strings[i];
                new_div.appendChild(new_paragraph);
            }

            const grid = document.getElementById("first_level_grid") as HTMLElement;
            document.body.insertBefore(new_div, grid);
        });
    }

    events();
})();


