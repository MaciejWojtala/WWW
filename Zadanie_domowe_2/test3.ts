import {Builder, Capabilities, WebDriver, ThenableWebDriver, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { driver } from 'mocha-webdriver';
import { App }    from './app';
import { create_db } from './create_db';
import { login } from './test'
import { start_quiz } from './test'
import { run_quiz } from './test'


describe('Przesyłanie JSON-ów', function () {
    it('Przesyłanie JSON-ów', async function() {
        await create_db();
        const app = new App(8080, './');
        app.run();
        this.timeout(20000);
        await login(driver);
        let flag = true;
        try {
            /// Wysyłanie listy quizów
            (await driver.findElements(By.name('quiz'))).forEach((row) => {
                expect(row).to.not.equal(null);
                expect(row).to.not.equal(undefined);
            });
            await start_quiz(driver);

            /// Wysyłanie quizu
            const quiz_json_string =
                    await (await (driver.findElement(By.id('quiz_json')))).getAttribute('value');
            const quiz_json : {
                name : string,
                questions : string[],
                correct_answers : string[],
                introduction : string
            } = JSON.parse(quiz_json_string);

            expect(quiz_json.name).to.not.equal(null);
            expect(quiz_json.name).to.not.equal(undefined);
            expect(quiz_json.name).to.not.equal('');
            expect(quiz_json.questions).to.not.equal(null);
            expect(quiz_json.questions).to.not.equal(undefined);
            expect(quiz_json.correct_answers).to.not.equal(null);
            expect(quiz_json.correct_answers).to.not.equal(undefined);
            expect(quiz_json.introduction).to.not.equal(null);
            expect(quiz_json.introduction).to.not.equal(undefined);
            expect(quiz_json.introduction).to.not.equal('');

            const quiz_json_result =
                    await (await (driver.findElement(By.id('quiz_result')))).getAttribute('value');
            await run_quiz(driver);
            /// Wysyłanie fragmentaryczne
            expect (quiz_json_result).to.equal('');

            /// Przesłany wynik - już w tabelce
            await (await driver.findElement(By.id('zakończ_quiz'))).click();
            (await driver.findElements(By.tagName('td'))).forEach((row) => {
                expect(row.getAttribute('textContent')).not.equal('');
            });
        }
        catch (err) {
            throw err;
            flag = false;
        }
        expect(flag).to.equal(true);
    });
});
