window.addEventListener('DOMContentLoaded', event => {
        const name_element = document.querySelector<HTMLInputElement>("input[name=Imię]");
        name_element.value = "Maciej";
        const surname_element = document.querySelector<HTMLInputElement>("input[name=Nazwisko]");
        surname_element.value = "Wojtala";
    });