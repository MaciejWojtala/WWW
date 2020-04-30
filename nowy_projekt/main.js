var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
console.log("Ależ skomplikowany program!");
function zaloguj() {
    var komunikaty = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        komunikaty[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(["Ależ skomplikowany program!"], komunikaty));
}
zaloguj("Ja", "cię", "nie", "mogę");
var jsonString = "{\n    \"piloci\": [\n        \"Pirx\",\n        \"Exupery\",\n        \"Idzikowski\",\n        \"G\u0142\u00F3wczewski\"\n    ],\n    \"lotniska\": {\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n        \"NRT\": [\"Narita\", [4000, 2500]],\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n    }\n}";
var Pilot = /** @class */ (function () {
    function Pilot() {
    }
    return Pilot;
}());
function check_ILiniaLotnicza(data) {
    if (!data || typeof data !== "object")
        return false;
    var projection = data;
    return projection.piloci !== undefined && projection.lotniska !== undefined;
}
function wait(milisec) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () { resolve(); }, milisec);
    });
}
var fib_table;
function fill_fib_table(range) {
    fib_table = new Array(range);
    fib_table[0] = 0;
    fib_table[1] = 1;
    var i;
    for (i = 2; i < range; i++) {
        fib_table[i] = fib_table[i - 1] + fib_table[i - 2];
    }
}
function fib_rek(arg) {
    if (arg < 0)
        return -1;
    if (arg == 1)
        return 1;
    if (arg == 0)
        return 0;
    return fib_rek(arg - 1) + fib_rek(arg - 2);
}
function fib_with_table(arg) {
    if (arg < 0)
        return -1;
    return fib_table[arg];
}
var colors = ['red', 'orange', 'yellow', 'green',
    'blue', 'indygo', 'purple'];
function teczoweKolory(el) {
    var promise = wait(1000);
    var _loop_1 = function (color) {
        promise = promise.then(function () {
            el.style.backgroundColor = color;
            console.log(color);
            return wait(1000);
        });
    };
    for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
        var color = colors_1[_i];
        _loop_1(color);
    }
    promise["catch"](function () {
        console.log("Błąd");
    });
}
var h1_element = document.querySelector("h1");
teczoweKolory(h1_element);
var airlane_data = JSON.parse(jsonString);
if (check_ILiniaLotnicza(airlane_data)) {
    var checked_airlane_data = airlane_data;
}
//const name_element = document.querySelector<HTMLInputElement>("input[name=Imię]");
//name_element.value = "Maciej";
var paragraph = document.querySelector("p");
paragraph.textContent = "To jest akapit";
var new_div = document.createElement("div");
var new_paragraph = document.createElement("p");
new_div.appendChild(new_paragraph);
new_div.setAttribute("align", "center");
new_paragraph.style.backgroundColor = "blue";
new_paragraph.style.fontSize = "20px";
new_paragraph.textContent = "Ala ma kota";
var body_end = document.getElementById("main_script");
document.body.insertBefore(new_div, body_end);
setTimeout(function () {
    console.log("Minęły 2 sekundy");
}, 2000);
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then(function (response) {
    return response.text(); // text();
})
    .then(function (data) {
    var reg = /"avatar_url": ".*"/;
    var raw_avatar_url = data.match(reg)[0];
    var avatar_url = raw_avatar_url.substring("\"avatar_url\": \"".length, raw_avatar_url.length - 1);
    var photo = document.createElement("img");
    photo.src = avatar_url;
    photo.alt = "Autor ostatniego commitu";
    document.body.insertBefore(photo, body_end);
})["catch"](function () {
    console.log("Błąd");
});
function handler_1() {
    var table = document.getElementById("opoznienia");
    var it = 0;
    var form = document.getElementById("formularz_lotu");
    var it_2 = 0;
    var grid = document.getElementById("first_level_grid");
    grid.addEventListener('click', function (event) {
        var event_projection = event.target;
        if (form.contains(event_projection)) {
            var children = form.querySelectorAll('*');
            var i = void 0;
            for (i = 0; i < children.length; i++) {
                var child = children[i];
                child.style.backgroundColor = colors[it_2];
            }
            form.style.backgroundColor = colors[it_2];
            it_2 = (it_2 + 1) % colors.length;
        }
        if (table.contains(event_projection)) {
            var children = table.querySelectorAll('*');
            var i = void 0;
            for (i = 0; i < children.length; i++) {
                var child = children[i];
                child.style.backgroundColor = colors[it];
            }
            table.style.backgroundColor = colors[it];
            it = (it + 1) % colors.length;
        }
    });
}
function handler_2() {
    var form_grid = document.querySelector(".grid-item4");
    var grid = document.getElementById("first_level_grid");
    var it = 0;
    var all = grid.querySelectorAll('*');
    var i = 0;
    var clicks = 0;
    var _loop_2 = function () {
        var el = all[i];
        el.addEventListener('click', function (event) {
            event.stopPropagation();
            if (!form_grid.contains(el)) {
                var children = el.querySelectorAll('*');
                var i_1;
                for (i_1 = 0; i_1 < children.length; i_1++) {
                    var child = children[i_1];
                    if (!form_grid.contains(child))
                        child.style.backgroundColor = colors[it];
                }
                el.style.backgroundColor = colors[it];
                clicks++;
                fill_fib_table(10 * clicks + 1);
                console.log(fib_with_table(10 * clicks));
                it = (it + 1) % colors.length;
            }
        });
    };
    for (i = 0; i < all.length; i++) {
        _loop_2();
    }
}
handler_2();
var submit_element = document.querySelector("input[type=submit]");
var name_element = document.querySelector("input[name=Imię]");
var surname_element = document.querySelector("input[name=Nazwisko]");
var date_element = document.querySelector("input[name=data]");
var city_from_element = document.getElementById("Skąd");
var city_to_element = document.getElementById("Dokąd");
var current_date = new Date();
var cities_flag = (city_from_element.value !== city_to_element.value);
var input_date = new Date(date_element.value);
var date_flag = (input_date >= current_date);
var name_flag = true;
var surname_flag = true;
if (name_flag && surname_flag && date_flag && cities_flag)
    submit_element.style.display = 'inline';
else
    submit_element.style.display = "none";
city_from_element.addEventListener('input', function (event) {
    cities_flag = (city_from_element.value !== city_to_element.value);
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});
city_to_element.addEventListener('input', function (event) {
    cities_flag = (city_from_element.value !== city_to_element.value);
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});
date_element.addEventListener('input', function (event) {
    var input_date = new Date(date_element.value);
    date_flag = (input_date >= current_date);
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});
name_element.addEventListener('input', function (event) {
    name_flag = (name_element.value !== "");
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});
surname_element.addEventListener('input', function (event) {
    surname_flag = (surname_element.value !== "");
    if (name_flag && surname_flag && date_flag && cities_flag)
        submit_element.style.display = 'inline';
    else
        submit_element.style.display = "none";
});
var reset_element = document.querySelector("input[type=reset]");
reset_element.addEventListener('click', function (event) {
    name_flag = false;
    surname_flag = false;
    date_flag = false;
    cities_flag = false;
    submit_element.style.display = "none";
});
submit_element.addEventListener('click', function (event) {
    var new_div = document.createElement("div");
    new_div.classList.add("zaslona");
    var strings = [
        "Udana rezerwacja!",
        "Lot z: " + city_from_element.value,
        "Lot do: " + city_to_element.value,
        "Data lotu: " + date_element.value,
        "Imię: " + name_element.value,
        "Nazwisko: " + surname_element.value
    ];
    var ids = [
        "gratulacje",
        "miasto_odlotu",
        "miasto_przylotu",
        "data_lotu",
        "imię",
        "nazwisko",
    ];
    var i;
    for (i = 0; i < strings.length; i++) {
        var new_paragraph_1 = document.createElement("p");
        new_paragraph_1.classList.add("zaslona");
        new_paragraph_1.setAttribute("id", "zaslona_" + ids[i]);
        new_paragraph_1.textContent = strings[i];
        new_div.appendChild(new_paragraph_1);
    }
    var grid = document.getElementById("first_level_grid");
    document.body.insertBefore(new_div, grid);
});
