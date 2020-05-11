(function () {
    function json_data() {
        var jsonString = "{\n            \"piloci\": [\n                \"Pirx\",\n                \"Exupery\",\n                \"Idzikowski\",\n                \"G\u0142\u00F3wczewski\"\n            ],\n            \"lotniska\": {\n                \"WAW\": [\"Warszawa\", [3690, 2800]],\n                \"NRT\": [\"Narita\", [4000, 2500]],\n                \"BQH\": [\"Biggin Hill\", [1802, 792]],\n                \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n            }\n        }";
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
        var airlane_data = JSON.parse(jsonString);
        if (!check_ILiniaLotnicza(airlane_data)) {
            console.log("Nieudane parsowanie");
            return false;
        }
        return true;
    }
    if (json_data()) {
        function wait(milisec) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () { resolve(); }, milisec);
            });
        }
        function fill_fib_table(range, fib_table) {
            if (range < 0 || range > fib_table.length)
                return;
            fib_table[0] = 0;
            fib_table[1] = 1;
            for (var i = 2; i < range; i++) {
                fib_table[i] = fib_table[i - 1] + fib_table[i - 2];
            }
        }
        function fib_rek(arg) {
            if (arg < 0)
                return -1;
            if (arg === 1)
                return 1;
            if (arg === 0)
                return 0;
            return fib_rek(arg - 1) + fib_rek(arg - 2);
        }
        function fib_with_table(index, fib_table) {
            if (index < 0 || index >= fib_table.length)
                return -1;
            return fib_table[index];
        }
        var colors_1 = ['red', 'orange', 'yellow', 'green',
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
            for (var _i = 0, colors_2 = colors_1; _i < colors_2.length; _i++) {
                var color = colors_2[_i];
                _loop_1(color);
            }
            promise["catch"](function () {
                console.log("Błąd");
            });
        }
        function check_letter(arg) {
            if (arg.length !== 1)
                return false;
            var lower = arg.toLowerCase();
            if (lower >= 'a' && lower <= 'z')
                return true;
            if (lower === 'ą' || lower === 'ę' || lower === 'ć' ||
                lower === 'ś' || lower === 'ź' || lower === 'ż' ||
                lower === 'ł' || lower === 'ó' || lower === 'ń')
                return true;
            return false;
        }
        function check_string(arg) {
            if (arg === '')
                return false;
            for (var i = 0; i < arg.length; i++)
                if (!check_letter(arg[i]))
                    return false;
            return true;
        }
        function get_date() {
            var raw_date = new Date();
            var month = (raw_date.getMonth() + 1).toString();
            var day = raw_date.getDate().toString();
            var year = raw_date.getFullYear().toString();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
            var string_date = [year, month, day].join('-');
            return new Date(string_date);
        }
        function modifications() {
            var h1_element = document.querySelector("h1");
            var body_end = document.getElementById("main_script");
            var paragraph = document.querySelector("p");
            var new_div = document.createElement("div");
            var new_paragraph = document.createElement("p");
            teczoweKolory(h1_element);
            paragraph.textContent = "To jest akapit";
            new_div.appendChild(new_paragraph);
            new_div.setAttribute("align", "center");
            new_paragraph.style.backgroundColor = "blue";
            new_paragraph.style.fontSize = "20px";
            new_paragraph.textContent = "Ala ma kota";
            document.body.insertBefore(new_div, body_end);
            setTimeout(function () {
                console.log("Minęły 2 sekundy");
            }, 2000);
        }
        modifications();
        fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
            .then(function (response) {
            return response.text();
        })
            .then(function (data) {
            var reg = /"avatar_url": ".*"/;
            var raw_avatar_url = data.match(reg)[0];
            var avatar_url = raw_avatar_url.substring("\"avatar_url\": \"".length, raw_avatar_url.length - 1);
            var photo = document.createElement("img");
            var body_end = document.getElementById("main_script");
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
                function coloring(element, iterator) {
                    if (element.contains(event_projection)) {
                        var children = element.querySelectorAll('*');
                        for (var i = 0; i < children.length; i++) {
                            var child = children[i];
                            child.style.backgroundColor = colors_1[iterator];
                        }
                        element.style.backgroundColor = colors_1[iterator];
                        return true;
                    }
                    return false;
                }
                if (coloring(form, it_2))
                    it_2 = (it_2 + 1) % colors_1.length;
                if (coloring(table, it))
                    it = (it + 1) % colors_1.length;
            });
        }
        function handler_2() {
            var grid = document.getElementById("first_level_grid");
            var it = 0;
            var all = grid.querySelectorAll('*');
            var clicks = 0;
            var _loop_2 = function (i) {
                var element = all[i];
                element.addEventListener('click', function (event) {
                    var form_grid = document.querySelector(".grid-item4");
                    event.stopPropagation();
                    if (!form_grid.contains(element)) {
                        var children = element.querySelectorAll('*');
                        for (var j = 0; j < children.length; j++) {
                            var child = children[j];
                            if (!form_grid.contains(child))
                                child.style.backgroundColor = colors_1[it];
                        }
                        element.style.backgroundColor = colors_1[it];
                        clicks++;
                        var fib_table = new Array(10 * clicks + 1);
                        fill_fib_table(10 * clicks + 1, fib_table);
                        console.log(fib_with_table(10 * clicks, fib_table));
                        it = (it + 1) % colors_1.length;
                    }
                });
            };
            for (var i = 0; i < all.length; i++) {
                _loop_2(i);
            }
        }
        handler_2();
        function events() {
            var submit_element = document.querySelector("input[type=submit]");
            var name_element = document.querySelector("input[name=Imię]");
            var surname_element = document.querySelector("input[name=Nazwisko]");
            var date_element = document.querySelector("input[name=data]");
            var city_from_element = document.getElementById("Skąd");
            var city_to_element = document.getElementById("Dokąd");
            var load_date = get_date();
            var cities_flag = (city_from_element.value !== city_to_element.value);
            var input_date = new Date(date_element.value);
            var date_flag = (input_date >= load_date);
            var name_flag = true;
            var surname_flag = true;
            function set_display_to_flags() {
                if (name_flag && surname_flag && date_flag && cities_flag)
                    submit_element.style.display = 'inline';
                else
                    submit_element.style.display = "none";
            }
            set_display_to_flags();
            function cities_event_function() {
                cities_flag = (city_from_element.value !== city_to_element.value);
                set_display_to_flags();
            }
            city_from_element.addEventListener('input', cities_event_function);
            city_to_element.addEventListener('input', cities_event_function);
            date_element.addEventListener('input', function (event) {
                var click_date = get_date();
                var input_date = new Date(date_element.value);
                date_flag = (input_date >= click_date);
                set_display_to_flags();
            });
            name_element.addEventListener('input', function (event) {
                name_flag = check_string(name_element.value);
                set_display_to_flags();
            });
            surname_element.addEventListener('input', function (event) {
                surname_flag = check_string(surname_element.value);
                set_display_to_flags();
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
                for (var i = 0; i < strings.length; i++) {
                    var new_paragraph = document.createElement("p");
                    new_paragraph.classList.add("zaslona");
                    new_paragraph.setAttribute("id", "zaslona_" + ids[i]);
                    new_paragraph.textContent = strings[i];
                    new_div.appendChild(new_paragraph);
                }
                var grid = document.getElementById("first_level_grid");
                document.body.insertBefore(new_div, grid);
            });
        }
        events();
    }
})();
