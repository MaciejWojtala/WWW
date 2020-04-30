import {Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';

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

describe('test1', function () {
    it('Reset', async function() {
        this.timeout(20000);
        await driver.get('file:///C:/Users/macie/Desktop/Studia/WWW/nowy_projekt/Loty.html');
        
        expect(await driver.find('select[id=Dokąd]').getText()).to.include('Warszawa');
        await driver.find('input[name=Imię]').sendKeys('Jan');
        await driver.find('input[name=Nazwisko]').sendKeys('Woreczko');
        await driver.find('input[type=reset]').doClick();
    });
})

describe('test2', function () {
    it('Submit', async function() {
        this.timeout(20000);
        await driver.get('file:///C:/Users/macie/Desktop/Studia/WWW/nowy_projekt/Loty.html');
        await driver.find('input[type=submit]');

        let clickable : boolean = true;
        try {
            await driver.find('input[type=submit]').doClick();
        }
        catch (e) {
            clickable = false;
        }
        expect(clickable).to.be.false;

        await driver.find('input[type=reset]').doClick();
        await driver.find('input[name=Imię]').sendKeys('Jan');
        await driver.find('input[name=Nazwisko]').sendKeys('Woreczko');
        await driver.find('select[id=Skąd]').sendKeys('Warszawa');
        await driver.find('select[id=Dokąd]').sendKeys('Londyn');
        await driver.find('input[name=data]').sendKeys(yearAfterDate());
        await driver.find('input[type=submit]').doClick();
    });
})

describe('test3', function () {
    it('Zasłona', async function() {
        const date = yearAfterDate();

        this.timeout(20000);
        await driver.get('file:///C:/Users/macie/Desktop/Studia/WWW/nowy_projekt/Loty.html');
        await driver.find('input[type=reset]').doClick();

        await driver.find('input[name=Imię]').sendKeys('Jan');
        await driver.find('input[name=Nazwisko]').sendKeys('Woreczko');
        await driver.find('select[id=Skąd]').sendKeys('Warszawa');
        await driver.find('select[id=Dokąd]').sendKeys('Londyn');
        await driver.find('input[name=data]').sendKeys(date);
        await driver.find('input[type=submit]').doClick();

        await driver.find('div[class=zaslona]');
        expect (await driver.find('p[id=zaslona_gratulacje]').getText()).equal('Udana rezerwacja!');
        expect (await driver.find('p[id=zaslona_miasto_odlotu]').getText()).equal('Lot z: ' + 'Warszawa');
        expect (await driver.find('p[id=zaslona_miasto_przylotu]').getText()).equal('Lot do: ' + 'Londyn');
        expect (await driver.find('p[id=zaslona_data_lotu]').getText()).equal('Data lotu: ' + date);
        expect (await driver.find('p[id=zaslona_imię]').getText()).equal('Imię: ' + 'Jan');
        expect (await driver.find('p[id=zaslona_nazwisko]').getText()).equal('Nazwisko: ' + 'Woreczko');

    });
})

describe('test4', function () {
    it('Linki', async function() {
        const date = yearAfterDate();

        this.timeout(20000);
        await driver.get('file:///C:/Users/macie/Desktop/Studia/WWW/nowy_projekt/Loty.html');
        await driver.find('input[type=reset]').doClick();

        await driver.find('input[name=Imię]').sendKeys('Jan');
        await driver.find('input[name=Nazwisko]').sendKeys('Woreczko');
        await driver.find('select[id=Skąd]').sendKeys('Warszawa');
        await driver.find('select[id=Dokąd]').sendKeys('Londyn');
        await driver.find('input[name=data]').sendKeys(date);
        await driver.find('input[type=submit]').doClick();

        await driver.find('div[class=zaslona]');

        let i;
        for (i = 1; i <= 8; i++) {
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

