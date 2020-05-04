import {Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';

const filePath : string = 'file://' + process.cwd() + '/Loty.html';

function yearAfterDate() : string {
    const d = new Date();
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = (d.getFullYear() + 1).toString();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

async function set_element_with_clear(element_name : string, value : string) : Promise<void> {
    const element = await driver.find(element_name);
    await element.clear();
    await element.sendKeys(value);
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

async function check_selected(element_name : string) {
    expect(await (await driver.find(element_name)).isSelected()).to.be.true;
}

async function check_equal(element_name : string, value : string) {
    expect(await driver.find(element_name).getText()).equal(value);
}

describe('Przycisk "reset"', function () {
    it('Resetowanie', async function() {
        this.timeout(20000);
        await driver.get(filePath);
        
        await input_data();
        await driver.find('input[type=reset]').doClick();

        await check_equal('input[name=Imię]', '');
        await check_selected('option[value=Warszawa]');
        await check_selected('option[value=Warszawa]');
        await check_equal('input[name=data]', '');
    });
})

describe('Przycisk "submit"', function () {
    it('Chowanie przycisku wysyłania', async function() {
        this.timeout(20000);
        await driver.get(filePath);
        await driver.find('input[type=submit]');

        let clickable : boolean = true;
        try {
            await driver.find('input[type=submit]').doClick();
        }
        catch (e) {
            clickable = false;
        }
        expect(clickable).to.be.false;

        await input_data();
        await driver.find('input[type=submit]').doClick();
    });
})

describe('Rezerwacja', function () {
    it('Wyświetlanie potwierdzenia rezerwacji i poprawność danych tam zawartych',
            async function() {
        const date = yearAfterDate();

        this.timeout(20000);
        await driver.get(filePath);

        await input_data();
        await driver.find('input[type=submit]').doClick();

        await driver.find('div[class=zaslona]');
        expect (await driver.find('p[id=zaslona_gratulacje]').getText()).equal
                ('Udana rezerwacja!');
        expect (await driver.find('p[id=zaslona_miasto_odlotu]').getText()).equal
                ('Lot z: ' + 'Warszawa');
        expect (await driver.find('p[id=zaslona_miasto_przylotu]').getText()).equal
                ('Lot do: ' + 'Londyn');
        expect (await driver.find('p[id=zaslona_data_lotu]').getText()).equal
                ('Data lotu: ' + date);
        expect (await driver.find('p[id=zaslona_imię]').getText()).equal
                ('Imię: ' + 'Jan');
        expect (await driver.find('p[id=zaslona_nazwisko]').getText()).equal
                ('Nazwisko: ' + 'Woreczko');

    });
})

describe('Zasłanianie linków', function () {
    it('Sprawdzenie, że podczas wyświetlania potwierdzenia nie można klikać w linki',
            async function() {
        this.timeout(20000);
        await driver.get(filePath);

        await input_data();

        await driver.find('div[class=zaslona]');

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

