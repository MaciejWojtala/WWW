import {Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';

const filePath : string = 'file://' + process.cwd() + '/Loty.html';

function yearDifferentDate(difference : number) : string {
    const d = new Date();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = (d.getFullYear() + difference).toString();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function yearAfterDate() {
    return yearDifferentDate(1);
}

function yearBeforeDate() {
    return yearDifferentDate(-1);
}

async function set_element_with_clear(element_name : string, value : string) : Promise<void> {
    const element = await driver.find(element_name);
    await element.clear();
    await element.sendKeys(value);
}

async function clear_element(element_name : string) : Promise<void> {
    const element = await driver.find(element_name);
    await element.clear();
}

async function set_select_element(element_name : string, value : string) : Promise<void> {
    const element = await driver.find(element_name);
    const option = element.find("option[value=" + value + "]");
    (await option).click();
}

async function input_data() : Promise<void> {
    await set_element_with_clear('input[name=Imię]', 'Jan');
    await set_element_with_clear('input[name=Nazwisko]', 'Woreczko');
    await set_select_element('select[id=Skąd]', 'Warszawa');
    await set_select_element('select[id=Dokąd]', 'Londyn');
    await set_element_with_clear('input[name=data]', yearAfterDate());
}

async function check_equal(element_name : string, value : string) : Promise<void> {
    expect(await driver.find(element_name).getText()).equal(value);
}

async function get_curtain() : Promise<void> {
    await driver.get(filePath);

    await input_data();
    await driver.find('input[type=submit]').doClick();

    await driver.find('div[class=zaslona]');
}

async function check_unclickable() : Promise<void> {
    let clickable : boolean = true;
    try {
        await driver.find('input[type=submit]').doClick();
    }
    catch (e) {
        clickable = false;
    }

    expect(clickable).to.be.false;
}

async function set_wrong(selector : string, wrong_value : string)  : Promise<void> {
    await input_data();
    await set_element_with_clear(selector, wrong_value);
    await check_equal(selector, '');
    await check_unclickable();
}

async function set_empty(selector : string)  : Promise<void> {
    await input_data();
    await clear_element(selector);
}

describe('Przycisk "submit"', function () {
    it('Chowanie przycisku wysyłania', async function() {
        this.timeout(20000);
        await driver.get(filePath);
        await driver.find('input[type=submit]');

        await set_empty('input[name=Imię]');
        await set_empty('input[name=Nazwisko]');

        await input_data();
        await set_select_element('select[id=Skąd]', 'Londyn');
        await set_select_element('select[id=Dokąd]', 'Londyn');
        await check_unclickable();

        await set_wrong('input[name=data]', yearBeforeDate());
    });

    it('Pokazywanie przycisku wysyłania', async function() {
        this.timeout(20000);
        await driver.get(filePath);

        await input_data();
        await driver.find('input[type=submit]').doClick();
    });
})

describe('Rezerwacja', function () {
    it('Wyświetlanie potwierdzenia rezerwacji i poprawność danych tam zawartych',
            async function() {
        const date = yearAfterDate();
        this.timeout(20000);

        await get_curtain();

        await check_equal('p[id=zaslona_gratulacje]', 'Udana rezerwacja!');
        await check_equal('p[id=zaslona_miasto_odlotu]', 'Lot z: ' + 'Warszawa');
        await check_equal('p[id=zaslona_miasto_przylotu]', 'Lot do: ' + 'Londyn');
        await check_equal('p[id=zaslona_data_lotu]', 'Data lotu: ' + date);
        await check_equal('p[id=zaslona_imię]', 'Imię: ' + 'Jan');
        await check_equal('p[id=zaslona_nazwisko]', 'Nazwisko: ' + 'Woreczko');

    });
})


describe('Zasłanianie linków', function () {
    it('Sprawdzenie, że podczas wyświetlania potwierdzenia nie można klikać w linki',
            async function() {
        this.timeout(20000);

        await get_curtain();

        for (let i = 1; i <= 8; i++) {
            let clickable : boolean = true;
            try {
                await driver.find('a[id=menu_link' + i.toString() + ']').doClick();
            }
            catch (e) {
                clickable = false;
            }

            expect(clickable).to.be.false;
        }

    });
})

