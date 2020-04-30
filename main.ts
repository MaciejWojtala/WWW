console.log("Ależ skomplikowany program!");

function zaloguj(...komunikaty: string[]) {
    console.log("Ależ skomplikowany program!", ...komunikaty);
}

zaloguj("Ja", "cię", "nie", "mogę");

let jsonString: string = `{
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

function wait(milisec: number) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {resolve();}, milisec);
    });
}

let fib_table: number[];
function fill_fib_table(range : number) : void {
    fib_table = new Array(range);
    fib_table[0] = 0;
    fib_table[1] = 1;
    let i : number;
    for (i = 2; i < range; i++) {
        fib_table[i] = fib_table[i-1] + fib_table[i-2];
    }
}

function fib_rek(arg : number) : number {
    if (arg < 0)
        return -1;
    
    if (arg == 1)
        return 1;
    if (arg == 0)
        return 0;
    return fib_rek(arg - 1) + fib_rek(arg - 2);
}

function fib_with_table(arg : number) : number {
    if (arg < 0)
        return -1;
    
    return fib_table[arg];
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

const h1_element = document.querySelector<HTMLElement>("h1");
teczoweKolory(h1_element);

const airlane_data = JSON.parse(jsonString);
if (check_ILiniaLotnicza(airlane_data)) {
    const checked_airlane_data = airlane_data;

}

//const name_element = document.querySelector<HTMLInputElement>("input[name=Imię]");
//name_element.value = "Maciej";

const paragraph = document.querySelector("p");
paragraph.textContent = "To jest akapit";

const new_div = document.createElement("div");
const new_paragraph = document.createElement("p");
new_div.appendChild(new_paragraph);
new_div.setAttribute("align", "center");
new_paragraph.style.backgroundColor = "blue";
new_paragraph.style.fontSize = "20px";
new_paragraph.textContent = "Ala ma kota";

const body_end = document.getElementById("main_script") as HTMLElement;
document.body.insertBefore(new_div, body_end);

setTimeout(() => {
    console.log("Minęły 2 sekundy");
    }, 2000
);


fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then((response) => {
        return response.text();// text();
    })
    .then((data) => {
        const reg = /"avatar_url": ".*"/;
        const raw_avatar_url = data.match(reg)[0];
        const avatar_url = raw_avatar_url.substring
                ("\"avatar_url\": \"".length, raw_avatar_url.length - 1);
        const photo = document.createElement("img");
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

        if (form.contains(event_projection)) {
            const children = form.querySelectorAll('*');
            let i : number;
            for (i = 0; i < children.length; i++) {
                const child = children[i] as HTMLLIElement;
                child.style.backgroundColor = colors[it_2];
            }
            form.style.backgroundColor = colors[it_2];
            it_2 = (it_2 + 1) % colors.length;
        }
        if (table.contains(event_projection)) {
            const children = table.querySelectorAll('*');
            let i : number;
            for (i = 0; i < children.length; i++) {
                const child = children[i] as HTMLLIElement;
                child.style.backgroundColor = colors[it];
            }
            table.style.backgroundColor = colors[it];
            it = (it + 1) % colors.length;
        }
    });
}

function handler_2() : void {
    const form_grid = document.querySelector(".grid-item4");
    const grid = document.getElementById("first_level_grid") as HTMLElement;
    let it : number = 0;
    const all = grid.querySelectorAll('*');
    let i : number = 0;
    let clicks : number = 0;
    for (i = 0; i < all.length; i++) {
        const el = all[i] as HTMLLIElement;
        el.addEventListener('click', (event) => {
            event.stopPropagation();
            if (!form_grid.contains(el)) {
                const children = el.querySelectorAll('*');
                let i : number;
                for (i = 0; i < children.length; i++) {
                    const child = children[i] as HTMLLIElement;
                    if (!form_grid.contains(child))
                        child.style.backgroundColor = colors[it];
                }
                el.style.backgroundColor = colors[it];
                clicks++;
                fill_fib_table(10*clicks + 1);
                console.log(fib_with_table(10*clicks));
                it = (it + 1) % colors.length;
            }
        });
        
        
    }
}

handler_2();

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

if (name_flag && surname_flag && date_flag && cities_flag)
    submit_element.style.display = 'inline';
else
    submit_element.style.display = "none";

city_from_element.addEventListener('input', (event) => {
    cities_flag = (city_from_element.value !== city_to_element.value);

    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});

city_to_element.addEventListener('input', (event) => {
    cities_flag = (city_from_element.value !== city_to_element.value);

    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});

date_element.addEventListener('input', (event) => {
    const input_date : Date = new Date(date_element.value);
    date_flag = (input_date >= current_date);
    
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});

name_element.addEventListener('input', (event) => {
    name_flag = (name_element.value !== "");
    
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});

surname_element.addEventListener('input', (event) => {
    surname_flag = (surname_element.value !== "");
    
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});

const reset_element = document.querySelector<HTMLElement>("input[type=reset]");

reset_element.addEventListener('click', (event) => {
    name_flag = false;
    surname_flag = false;
    date_flag = false;
    cities_flag = false;
    submit_element.style.display = "none";
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

    let i;
    for (i = 0; i < strings.length; i++) {
        const new_paragraph = document.createElement("p");
        new_paragraph.classList.add("zaslona");
        new_paragraph.setAttribute("id", "zaslona_" + ids[i])
        new_paragraph.textContent = strings[i];
        new_div.appendChild(new_paragraph);
    }

    
    const grid = document.getElementById("first_level_grid") as HTMLElement;
    document.body.insertBefore(new_div, grid);
});



