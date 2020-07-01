import {Builder, WebDriver, By } from 'selenium-webdriver';
import { expect } from 'chai';
import { create_db } from './create_db';
import { App } from './app';

const filePath : string = 'http://localhost:8080/';

export async function login(_driver : WebDriver) {
    await _driver.get(filePath);
    await _driver.findElement(By.name('username')).sendKeys('user1');
    await _driver.findElement(By.name('password')).sendKeys('user1');
    await (await _driver.findElement(By.name('login_send'))).click();
}

export async function start_quiz(_driver : WebDriver) : Promise<void> {
   return new Promise<void>(async (resolve, reject) => {
        /// Oczekiwanie na komunikację z przeglądarką
        _driver.sleep(2000)
        .then(async () => {
                await (await _driver.findElement(By.name('quiz'))).click()
                await (_driver.findElement(By.name('begin_quiz'))).click();
                resolve();
        })
        .catch ((err) => {
            reject(err);
        });
    });
}

export async function run_quiz(_driver : WebDriver) : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        /// Oczekiwanie na komunikację z przeglądarką
        _driver.sleep(2000)
        .then(async () => {
            for (let i = 1; i <= 6; i++) {
                await _driver.findElement(By.id('odpowiedź ' + i.toString())).sendKeys('0');
                if (i !== 6)
                    await _driver.findElement(By.id('następne_pytanie')).click();
            }
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    });
}

export async function finish_quiz(_driver : WebDriver) : Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await (await _driver.findElement(By.id('zakończ_quiz'))).click();
            await (await _driver.findElement(By.name('comeback_quiz'))).click();
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

describe('Zmiana hasła', function () {
    it('Zmiana hasła', async function() {
        this.timeout(25000);
        const app = new App(8080, './');
        let flag = true;
        try {
            await create_db();
            app.run();
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
        }
        catch (err) {
            flag = false;
        }
        expect(flag).to.equal(true);
        app.close();

    });
});

describe('Ponowne wypełnienie quizu', function () {
    it('Ponowne wypełnienie quizu', async function() {
        this.timeout(25000);
        let flag = true;
        const app = new App(8080, './');
        try {
            await create_db();
            app.run();
            const driver_3 = await new Builder().forBrowser('firefox').build();
            await login(driver_3);
            await start_quiz(driver_3);
            await run_quiz(driver_3);
            await finish_quiz(driver_3);

            await (driver_3.findElement(By.name('begin_quiz'))).click();
            const header =  await driver_3.findElement(By.id('tytuł_strony'));
            expect(await header.getAttribute('textContent')).to.equal('Już wypełniono quiz');
        }
        catch (err) {
            flag = false;
        }
        expect(flag).to.equal(true);

        app.close();
    });
});

describe('Przesyłanie JSON-ów', function () {
    it('Przesyłanie JSON-ów', async function() {
        const app = new App(8080, './');
        app.run();
        this.timeout(25000);
        let flag = true;
        try {
            await create_db();
            expect(app.getExportQuizList()).to.equal('');
            const driver_4 = await new Builder().forBrowser('firefox').build();
            await login(driver_4);

            /// Wysyłanie listy quizów
            const quiz_list_json = JSON.parse(app.getExportQuizList());
            const quiz_list = quiz_list_json.quizzes as string[];
            expect(quiz_list.length).to.equal(4);

            /// Wysyłanie quizu
            expect(app.getExportQuiz()).to.equal('');
            await start_quiz(driver_4);
            await run_quiz(driver_4);

            const quiz_json_string = app.getExportQuiz();
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
            expect(quiz_json.questions.length).to.equal(6);
            expect(quiz_json.correct_answers).to.not.equal(null);
            expect(quiz_json.correct_answers).to.not.equal(undefined);
            expect(quiz_json.correct_answers.length).to.equal(6);
            expect(quiz_json.introduction).to.not.equal(null);
            expect(quiz_json.introduction).to.not.equal(undefined);
            expect(quiz_json.introduction).to.not.equal('');

            /// Przesłany wynik
            expect(app.getExportQuizResult()).to.equal('');
            await finish_quiz(driver_4);
            const quiz_result = JSON.parse(app.getExportQuizResult()) as {
                jsonString : string,
                answers : string[],
                percentage : number[]
            }
            expect(quiz_result.jsonString).to.not.equal(null);
            expect(quiz_result.jsonString).to.not.equal(undefined);
            expect(quiz_result.jsonString).to.not.equal('');
            expect(quiz_result.answers.length).to.equal(6);
            expect(quiz_result.percentage.length).to.equal(6);
            for (let i = 0; i < 6; i++) {
                expect(quiz_result.answers[i]).to.not.equal(null);
                expect(quiz_result.answers[i]).to.not.equal(undefined);
                expect(quiz_result.answers[i]).to.not.equal('');
                expect(quiz_result.percentage[i]).to.not.equal(null);
                expect(quiz_result.percentage[i]).to.not.equal(undefined);
            }
        }
        catch (err) {
            flag = false;
        }
        expect(flag).to.equal(true);
        app.close();
    });
});

