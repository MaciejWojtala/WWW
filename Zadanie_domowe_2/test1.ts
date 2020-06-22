import {Builder, Capabilities, WebDriver, ThenableWebDriver, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import { App }    from './app';
import { create_db } from './create_db';
import { login } from './test'

describe('Zmiana hasła', function () {
    it('Zmiana hasła', async function() {
        await create_db();
        const app = new App(8080, './');
        app.run();
        this.timeout(20000);
        const driver_1 = await new Builder().forBrowser('firefox').build();
        const driver_2 = await new Builder().forBrowser('firefox').build();
        await login(driver_1);
        await login(driver_2);
        await (await driver_1.findElement(By.name('change_password'))).click();
        await driver_1.findElement(By.name('new_password_1')).sendKeys('ala');
        await driver_1.findElement(By.name('new_password_2')).sendKeys('ala');
        await (await driver_1.findElement(By.name('commit_change'))).click();
        await driver_1.findElement(By.name('password'));
        await (await driver_2.findElement(By.name('change_password'))).click();
        await driver_1.findElement(By.name('password'));

    });
});