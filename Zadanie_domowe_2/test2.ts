import {Builder, Capabilities, WebDriver, ThenableWebDriver, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import { App }    from './app';
import { create_db } from './create_db';
import { login } from './test'
import { start_quiz } from './test'
import { run_quiz } from './test'
import { finish_quiz } from './test'

describe('Ponowne wypełnienie quizu', function () {
    it('Ponowne wypełnienie quizu', async function() {
        await create_db();
        const app = new App(8080, './');
        app.run();
        this.timeout(20000);
        await login(driver);
        await start_quiz(driver);
        await run_quiz(driver);
        await finish_quiz(driver);

        await (driver.findElement(By.name('begin_quiz'))).click();
        const header =  await driver.findElement(By.id('tytuł_strony'));
        expect(await header.getAttribute('textContent')).to.equal('Już wypełniono quiz');
    });
});