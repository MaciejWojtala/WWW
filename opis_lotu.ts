const passengers = document.getElementById("lista pasazerow").querySelectorAll("li");
let max_index = 0;
let i;

for (i = 0; i < passengers.length; i++) {
    passengers[i].dataset.identyfikatorPasazera = Math.random().toString(36).substring(2, 7);
    if (passengers[i].dataset.identyfikatorPasazera > passengers[max_index].dataset.identyfikatorPasazera)
        max_index = i;
}

console.log(passengers[max_index].textContent.substring(passengers[max_index].querySelector("span").textContent.length));