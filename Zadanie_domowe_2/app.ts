import { DbClass } from "./database";

export class App {
    private port : number;
    private express : any;
    private app : any;
    private session : any;
    private csurf : any;
    private cookieParser : any;
    private csrfProtection : any;
    private bodyParser : any;
    private store : any;
    private SQLiteStore : any;
    private source : string;
    private db : DbClass;

    constructor(port : number, source : string) {
        this.port = port;
        this.source = source;
        this.db = new DbClass();

        this.express = require('express');
        this.session = require('express-session');
        this.bodyParser = require('body-parser');
        this.csurf = require('csurf');
        this.cookieParser = require('cookie-parser');
        this.SQLiteStore = require('connect-sqlite3')(this.session);
        this.store = new this.SQLiteStore({db: ':memory:', dir: './'});

        this.app = this.express();

        this.csrfProtection = this.csurf({
            cookie: true
        });

        this.app.use(this.session({
            store: this.store,
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }))

        this.app.use(this.bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(this.cookieParser('secret'));
        this.app.use(this.csrfProtection);

        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');

        this.app.use(this.express.urlencoded({
            extended: true
        }));

        this.app.use(this.express.static(__dirname));

    }

    private round(arg : number) : number {
        return Math.round((arg + Number.EPSILON) * 100) / 100;
    }

    private getLoginPage(req : any, res : any, message: string) : void {
        res.render('login', { title: 'Logowanie', _message: message, _req: req});
    }

    private getQuizMenuPage(req : any, res : any, quiz_name : string, message : string) {
        req.session.quiz_name = quiz_name;
        res.render('quiz_menu', {_message : message, _req : req});
    }

    private async changePassword(req : any, res : any, new_password : string) : Promise<void>{
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.db.open();
                const username = req.session.username as string;
                let sql = 'INSERT OR REPLACE INTO USERS (user_name, user_password) VALUES (?, ?);';
                await this.db.run(sql, [username, new_password]);
                sql = 'SELECT session_ID FROM sessions WHERE user_name = ?';
                const session_rows = await this.db.all(sql, [username]);
                sql = 'DELETE FROM sessions WHERE user_name = ?';
                await this.db.run(sql, [username]);
                session_rows.forEach((row) => {
                   this.store.destroy(row.session_id, (err) => {
                        if (err)
                            reject(err);
                   });
                });
                req.session.destroy();

                await this.db.close();
                resolve();
            }
            catch (err) {
                try {
                    await this.db.close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private async getQuizPage(req, res, quiz_name : string) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            let quiz : string;
            try {
                await this.db.open();
                const sql = 'SELECT quiz_json from quizzes WHERE quiz_name = ?;';
                const quiz_rows = await this.db.all(sql, [quiz_name]);
                quiz_rows.forEach((row) => {
                    quiz = row.quiz_json as string;
                });
                try {
                    await this.db.close();
                }
                catch (err) {
                    reject(err);
                }
            }
            catch (err) {
                try {
                    await this.db.close();
                }
                catch (err) {
                    reject(err);
                }
                reject(err);
            }
            req.session.begin_time = new Date().getTime();
            res.render('quiz', {_quiz : quiz, _req : req });
            resolve();
        });
    }

    private async setStatsTable(req : any, res : any)
    {
        return new Promise
        (async (resolve, reject) => {
            try {
                const quiz_size = 7;
                const highscore = 5;
                const avg = new Array<string>(quiz_size);
                const bests = new Array<string[]>(quiz_size);
                for(let i = 0; i < quiz_size; i++) {
                     bests[i] = new Array<string>(highscore);
                }

                for(let i = 0; i < quiz_size; i++) {
                     avg[i] = '-';
                    for(let j = 0; j < highscore; j++)
                        bests[i][j] = '-';
                }

                await this.db.open();

                for (let i = 0; i < quiz_size - 1; i++) {
                    let sql = 'SELECT result FROM question_results WHERE question_nr = ? AND quiz_name = ? ORDER BY result  ASC';
                    let highscore_rows = await this.db.all(sql, [i + 1, req.session.quiz_name as string]);
                    for (let j = 0; j < highscore_rows.length; j++) {
                        if (j >= 5)
                            break;
                        bests[i][j] = highscore_rows[j].result as string;
                    }
                    sql = 'SELECT AVG(result) as avg FROM question_results WHERE question_nr = ? AND quiz_name = ? AND punishment = ?';
                    highscore_rows = await this.db.all(sql, [i + 1, req.session.quiz_name as string, 0]);
                    for (let j = 0; j < highscore_rows.length; j++) {
                        if (j >= 5)
                            break;
                        if (highscore_rows[j].avg != null)
                            avg[i] = this.round(highscore_rows[j].avg).toString();
                    }
                }

                let sql = 'SELECT result FROM results WHERE quiz_name = ? ORDER BY result  ASC';
                let highscore_rows = await this.db.all(sql, [req.session.quiz_name as string]);
                for (let j = 0; j < highscore_rows.length; j++) {
                    if (j >= 5)
                        break;
                     bests[6][j] = highscore_rows[j].result as string;
                }
                sql = 'SELECT AVG(result) as avg FROM results WHERE quiz_name = ?';
                highscore_rows = await this.db.all(sql, [req.session.quiz_name as string]);
                for (let j = 0; j < highscore_rows.length; j++) {
                    if (j >= 5)
                        break;
                    if (highscore_rows[j].avg != null)
                        avg[6] = this.round(highscore_rows[j].avg).toString();
                }

                await this.db.close();

                resolve({ bests, avg });
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private async getStats(req : any, res : any) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const json_result = await(this.setStatsTable(req, res));
                res.render('stats', {_result : json_result, _req : req});
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private getChooseQuizPage(req : any, res : any) : void {
        const quizzes_list = req.session.quizzes_list as string;
        res.render('choose_quiz', {quizzes : JSON.parse(quizzes_list).quizzes, _req : req});
    }

    private getChangePasswordPage(req : any, res : any, message : string) {
        res.render("change_password", { title : 'Zmiana hasła', _message : message, _req : req });
    }

    private getPage() : void {
        this.app.get('/', (req, res) => {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            if (!req.session.isLogged) {
                this.getLoginPage(req, res, 'Zaloguj się');
            }
            else {
                this.getChooseQuizPage(req, res);
            }
        });
    }

    private async save_result(req : any, next : any, quiz_result_json : string) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const total_time = (req.session.end_time as number - req.session.begin_time as number) / 1000;
            let result = 0;
            try {
                await this.db.open();
                const quiz_result = await JSON.parse(quiz_result_json) as {
                    jsonString : string,
                    answers : string[],
                    percentage : number[]
                }
                const quiz = await JSON.parse(quiz_result.jsonString) as {
                    name : string,
                    questions : string[],
                    correct_answers : string[],
                    introduction : string
                }
                const punishments : number[] = new Array(quiz.questions.length);
                const question_results : number[] = new Array(quiz.questions.length);
                const question_times : number[] = new Array(quiz.questions.length);
                for (let i = 0; i < quiz.questions.length; i++) {
                    punishments[i] = 0;
                    if (quiz_result.answers[i] !== quiz.correct_answers[i])
                        punishments[i] = 10*(i+1);

                    question_times[i] = this.round(quiz_result.percentage[i] * total_time / 100);
                    question_results[i] = question_times[i] + punishments[i];
                    result += question_results[i];
                }
                result = this.round(result);
                await this.db.run('INSERT OR REPLACE INTO results (user_name, quiz_name, result) VALUES (?, ?, ?);',
                        [req.session.username as string, quiz.name, result]);
                for (let i = 0; i < quiz.questions.length; i++)
                    await this.db.run('INSERT OR REPLACE INTO question_results (question_nr, user_name, quiz_name, time, answer, correct_answer, punishment, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;',
                            [i + 1, req.session.username as string, quiz.name,
                            question_times[i], quiz_result.answers[i], quiz.correct_answers[i],
                            punishments[i], question_results[i]]);
                await this.db.close();
                resolve();

            }
            catch (err) {
                try {
                    await this.db.close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private async getSummarize(req : any, res : any) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const username = req.session.username as string;
                const quiz_name = req.session.quiz_name as string;
                let result : number;
                const quiz_length = 6;
                const question_times = new Array<number>(quiz_length);
                const answers = new Array<string>(quiz_length);
                const correct_answers = new Array<string>(quiz_length);
                const punishments = new Array<number>(quiz_length);
                const question_results = new Array<number>(quiz_length);
                const sql = 'SELECT * FROM results WHERE user_name = ? AND quiz_name = ?';
                const summarize_rows = await this.db.all(sql, [username, quiz_name]);
                summarize_rows.forEach((row) => {
                    result = row.result;
                });


                for (let i = 0; i < quiz_length; i++) {
                    const _sql = 'SELECT * FROM question_results WHERE question_nr = ? AND user_name = ? AND quiz_name = ?';
                    const _summarize_rows = await this.db.all(_sql, [i + 1, username, quiz_name]);
                    _summarize_rows.forEach((row) => {
                        question_times[i] = row.time as number;
                        answers[i] = row.answer as string;
                        correct_answers[i] = row.correct_answer as string;
                        punishments[i] = row.punishment as number;
                        question_results[i] = row.result as number;
                    });
                }

                res.render('result', {title : 'Podsumowanie', message : 'Twój wynik', _req : req, _quiz_result :
                        JSON.stringify({result, question_times, answers, correct_answers, punishments, question_results})});

                resolve();
            }
            catch (err) {
                reject(err);
            }
        });


    }

    private async postLoginPage(req : any, res : any) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const username = req.body.username as string;
            const password = req.body.password as string;
            let sql =
                `SELECT *
                FROM users
                WHERE user_name = ? AND user_password = ?;`;
            try {
                await this.db.open();
                const user_rows = await this.db.all(sql, [username, password]);
                user_rows.forEach(async (row) => {
                    req.session.isLogged = true;
                    req.session.username = username;
                    sql = 'INSERT OR REPLACE INTO sessions (session_id, user_name) VALUES (?, ?);';
                    try {
                        await this.db.run(sql, [req.sessionID, username]);
                    }
                    catch (err) {
                        try {
                            await this.db.close();
                            reject(err);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                });
                if (!req.session.isLogged) {
                    this.getLoginPage(req, res, "Błędne dane logowania");
                    try {
                        await this.db.close();
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }
                else {
                    sql =
                    `SELECT quiz_list
                    FROM quizzes_list;`;
                    const quizzes_lists_array = await this.db.all(sql, []);
                    quizzes_lists_array.forEach((row) => {
                        req.session.quizzes_list = row.quiz_list as string;
                    });

                    this.getChooseQuizPage(req, res);
                    try {
                        await this.db.close();
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            }
            catch (err) {
                try {
                    await this.db.close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private async wasFilled(req : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await this.db.open();
                const results_rows = await this.db.all('SELECT * FROM results WHERE user_name = ? AND quiz_name = ?;',
                        [req.session.username as string, req.session.quiz_name as string]);
                await this.db.close();
                if (results_rows.length > 0)
                    resolve(true);
                else
                    resolve(false);
            }
            catch (err) {
                try {
                    await this.db.close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private postPage() : void {
        this.app.post('/', async (req, res, next) => {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            if (req.body.login_send) {
                try {
                    await this.postLoginPage(req, res);
                }
                catch (err) {
                    next(err);
                }
            }
            else if (!req.session.isLogged) {
                this.getLoginPage(req, res, 'Zaloguj się');
            }
            else if (req.body.logout) {
                try {
                    req.session.isLogged = false;
                    await this.getLoginPage(req, res, 'Zaloguj się');
                }
                catch (err) {
                    next(err);
                }
            }
            else if (req.body.change_password) {
                this.getChangePasswordPage(req, res, 'Zmień hasło');
            }
            else if (req.body.comeback_change || req.body.comeback_quiz_menu) {
                this.getChooseQuizPage(req, res);
            }
            else if (req.body.quiz) {
                try {
                    await this.db.open();
                    const sql =
                    `SELECT quiz_name, quiz_json
                    FROM quizzes;`;
                    const quizes_rows = await this.db.all(sql, []);
                    try {
                        await this.db.close();
                    }
                    catch (err) {
                        next(err);
                    }
                    quizes_rows.forEach((row) => {
                        if (req.body.quiz as string === row.quiz_name as string) {
                            this.getQuizMenuPage(req, res, row.quiz_name as string, row.quiz_name as string + ' - menu');
                        }
                    });
                }
                catch (err) {
                    try {
                        await this.db.close();
                        next(err);
                    }
                    catch (err) {
                        next(err);
                    }
                }
            }
            else if (req.body.begin_quiz) {
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Już wypełniono quiz');
                    }
                    else {
                        await this.getQuizPage(req, res, req.session.quiz_name);
                    }
                }
                catch (err) {
                    next(err);
                }
            }
            else if (req.body.cancel_quiz) {
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name as string + ' - menu');
            }
            else if (req.body.commit_change) {
                if (!req.body.new_password_1 || !req.body.new_password_2)
                    this.getChangePasswordPage(req, res, 'Błędna zmiana hasła') 
                else {
                    const new_password_1 = req.body.new_password_1 as string;
                    const new_password_2 = req.body.new_password_2 as string;
                    if (new_password_1 !== new_password_2 || new_password_1 === "")
                        this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                    else {
                        try {
                            await this.changePassword(req, res, new_password_1);
                            await this.db.open();
                            await this.db.close();
                            this.getLoginPage(req, res, 'Zaloguj się');
                        }
                        catch (err) {
                            next(err);
                        }
                    }
                }
            }
            else if (req.body.quiz_result) {
                req.session.end_time = new Date().getTime();
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Już wypełniono quiz');
                    }
                    else {
                        await this.save_result(req, next, req.body.quiz_result as string);
                        this.getSummarize(req, res);
                    }
                }
                catch (err) {
                    next(err);
                }
            }
            else if (req.body.comeback_quiz) {
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name + ' - menu');
            }
            else if (req.body.my_score) {
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (!wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Jeszcze nie wypełniono quizu');
                    }
                    else {
                        this.getSummarize(req, res);
                    }
                }
                catch (err) {
                    next(err);
                }
            }
            else if (req.body.stats) {
                try {
                    await this.getStats(req, res);
                }
                catch (err) {
                    next(err);
                }
            }
            else if (req.body.comeback_stats) {
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name + ' - menu');
            }
        });
    }



    private errorHandler(err, req, res, next) : void {
        console.log(err);
        res.status(500).send('Something broke!');
    }

    run() {
        this.getPage();
        this.postPage();

        this.app.use(this.errorHandler);

        this.app.listen(this.port, () => {});
    }
}