import {Builder, Capabilities, WebDriver, ThenableWebDriver, By } from 'selenium-webdriver';

const filePath : string = 'http://localhost:8080/';

export async function login(_driver : WebDriver) {
    await _driver.get(filePath);
    await _driver.findElement(By.name('username')).sendKeys('user1');
    await _driver.findElement(By.name('password')).sendKeys('user1');
    await (await _driver.findElement(By.name('login_send'))).click();
}

export async function start_quiz(_driver : WebDriver) {
    await (_driver.findElement(By.name('quiz'))).click();
    await (_driver.findElement(By.name('begin_quiz'))).click();
}

 export async function run_quiz(_driver : WebDriver) {
    for (let i = 1; i <= 6; i++) {
        await (await _driver.findElement(By.id('odpowiedź ' + i.toString()))).sendKeys('0');
        if (i !== 6)
            await _driver.findElement(By.id('następne_pytanie')).click();
    }
}

export async function finish_quiz(_driver : WebDriver) {
    await (await _driver.findElement(By.id('zakończ_quiz'))).click();
    await (await _driver.findElement(By.name('comeback_quiz'))).click();
}
