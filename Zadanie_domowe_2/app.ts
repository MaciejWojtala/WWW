import express, { Express, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { Server } from "http";
import session from "express-session";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passwordHash from "password-hash";
import { DbClass } from "./database";
import { ParsedQs } from "qs";


export class App {
    private port : number;
    private app : Express;
    private csrfProtection : RequestHandler<ParamsDictionary, any, any, ParsedQs>;
    private store : any;
    private SQLiteStore : any;
    private source : string;
    private server : Server;
    private exportQuizList : string;
    private exportQuiz : string;
    private exportQuizResult : string;

    constructor(port : number, source : string) {
        this.port = port;
        this.source = source;
        this.exportQuizList = "";
        this.exportQuiz = "";
        this.exportQuizResult = "";

        this.SQLiteStore = require('connect-sqlite3')(session);
        this.store = new this.SQLiteStore({db: ':memory:', dir: './'});

        this.app = express();

        this.csrfProtection = csurf({
            cookie: true
        });

        this.app.use(cookieParser('secret'));

        this.app.use(session({
            store: this.store,
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }))

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        this.app.use(this.csrfProtection);

        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');

        this.app.use(express.urlencoded({
            extended: true
        }));

        this.app.use(express.static(__dirname));

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
            const db = new DbClass();
            try {
                await db.open_with_transaction();
                const username = req.session.username as string;
                let sql = 'INSERT OR REPLACE INTO USERS (user_name, user_password) VALUES (?, ?);';
                await db.run(sql, [username, passwordHash.generate(new_password)]);
                sql = 'SELECT session_ID FROM sessions WHERE user_name = ?';
                const session_rows = await db.all(sql, [username]);
                sql = 'DELETE FROM sessions WHERE user_name = ?';
                await db.run(sql, [username]);
                session_rows.forEach((row) => {
                   this.store.destroy(row.session_id, (err) => {
                        if (err)
                            reject(err);
                   });
                });
                req.session.destroy();

                await db.commit_close();
                resolve();
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private getQuizPage(req, res, quiz_name : string) : void {
        res.render('quiz', {_req : req});
    }

    private async setStatsTable(req : any, res : any)
    {
        return new Promise(async (resolve, reject) => {
            const db = new DbClass();
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

                await db.open_with_transaction();

                let sql : string;
                let highscore_rows : any[];

                for (let i = 0; i < quiz_size - 1; i++) {
                    sql = 'SELECT result FROM question_results WHERE question_nr = ? AND quiz_name = ? ORDER BY result ASC';
                    highscore_rows = await db.all(sql, [i + 1, req.session.quiz_name as string]);
                    for (let j = 0; j < highscore_rows.length; j++) {
                        if (j >= 5)
                            break;
                        bests[i][j] = highscore_rows[j].result as string;
                    }
                    sql = 'SELECT AVG(result) as avg FROM question_results WHERE question_nr = ? AND quiz_name = ? AND punishment = ?';
                    highscore_rows = await db.all(sql, [i + 1, req.session.quiz_name as string, 0]);
                    for (let j = 0; j < highscore_rows.length; j++) {
                        if (j >= 5)
                            break;
                        if (highscore_rows[j].avg != null)
                            avg[i] = this.round(highscore_rows[j].avg).toString();
                    }
                }

                sql = 'SELECT result FROM results WHERE quiz_name = ? ORDER BY result  ASC';
                highscore_rows = await db.all(sql, [req.session.quiz_name as string]);
                for (let j = 0; j < highscore_rows.length; j++) {
                    if (j >= 5)
                        break;
                     bests[6][j] = highscore_rows[j].result as string;
                }
                sql = 'SELECT AVG(result) as avg FROM results WHERE quiz_name = ?';
                highscore_rows = await db.all(sql, [req.session.quiz_name as string]);
                for (let j = 0; j < highscore_rows.length; j++) {
                    if (j >= 5)
                        break;
                    if (highscore_rows[j].avg != null)
                        avg[6] = this.round(highscore_rows[j].avg).toString();
                }

                await db.commit_close();

                resolve({ bests, avg });
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
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
        res.render('choose_quiz', {_req : req});
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

    private postQuizRequest(req : any, res : any, quiz_name : string) {
        return new Promise<void>(async (resolve, reject) => {
            let quiz : string;
            const db = new DbClass();
            try {
                await db.open_with_transaction();
                const sql = 'SELECT quiz_json from quizzes WHERE quiz_name = ?;';
                const quiz_rows = await db.all(sql, [quiz_name]);
                quiz_rows.forEach((row) => {
                    quiz = row.quiz_json as string;
                    this.exportQuiz = quiz as string;
                });
                await db.commit_close();
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
            try {
                req.session.begin_time = new Date().getTime();
                res.send(JSON.parse(quiz));
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }

    getExportQuiz() : string {
        return this.exportQuiz;
    }

    private async save_result(req : any, res : any, next : any, quiz_result : {
                jsonString : string,
                answers : string[],
                percentage : number[]
            }) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const total_time = (req.session.end_time as number - req.session.begin_time as number) / 1000;
            let result = 0;
            const db = new DbClass();
            try {
                await db.open_with_transaction();
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
                await db.run('INSERT OR REPLACE INTO results (user_name, quiz_name, result) VALUES (?, ?, ?);',
                        [req.session.username as string, quiz.name, result]);
                for (let i = 0; i < quiz.questions.length; i++)
                    await db.run('INSERT OR REPLACE INTO question_results (question_nr, user_name, quiz_name, time, answer, correct_answer, punishment, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ;',
                            [i + 1, req.session.username as string, quiz.name,
                            question_times[i], quiz_result.answers[i], quiz.correct_answers[i],
                            punishments[i], question_results[i]]);
                await db.commit_close();
                const json = {};
                res.send(json);
                resolve();

            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    getExportQuizResult() : string {
        return this.exportQuizResult;
    }

    private async getSummarize(req : any, res : any) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const db = new DbClass();
            try {
                await db.open_with_transaction();
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
                const summarize_rows = await db.all(sql, [username, quiz_name]);
                summarize_rows.forEach((row) => {
                    result = row.result;
                });


                for (let i = 0; i < quiz_length; i++) {
                    const _sql = 'SELECT * FROM question_results WHERE question_nr = ? AND user_name = ? AND quiz_name = ?';
                    const _summarize_rows = await db.all(_sql, [i + 1, username, quiz_name]);
                    _summarize_rows.forEach((row) => {
                        question_times[i] = row.time as number;
                        answers[i] = row.answer as string;
                        correct_answers[i] = row.correct_answer as string;
                        punishments[i] = row.punishment as number;
                        question_results[i] = row.result as number;
                    });
                }
                await db.commit_close();

                res.render('result', {title : 'Podsumowanie', message : 'Twój wynik', _req : req, _quiz_result :
                        JSON.stringify({result, question_times, answers, correct_answers, punishments, question_results})});

                resolve();
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private postQuizList(req : any, res : any, next : any) {
        try {
            res.send(JSON.parse(req.session.quizzes_list));
        }
        catch (err) {
            next(err);
        }
    }

    private async postLoginPage(req : any, res : any) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            const username = req.body.username as string;
            const password = req.body.password as string;
            const db = new DbClass();
            let sql =
                `SELECT *
                FROM users
                WHERE user_name = ?;`;
            try {
                await db.open_with_transaction();
                const user_rows = await db.all(sql, [username]);
                if (user_rows.length === 1) {
                    if (passwordHash.verify(password, user_rows[0].user_password as string)) {
                        req.session.isLogged = true;
                        req.session.username = username;
                        sql = 'INSERT OR REPLACE INTO sessions (session_id, user_name) VALUES (?, ?);';
                        await db.run(sql, [req.sessionID, username]);
                    }
                }
                if (!req.session.isLogged) {
                    this.getLoginPage(req, res, "Błędne dane logowania");
                }
                else {
                    sql =
                        `SELECT quiz_list
                        FROM quizzes_list;`;
                    const quizzes_lists_array = await db.all(sql, []);
                    quizzes_lists_array.forEach((row) => {
                        req.session.quizzes_list = row.quiz_list as string;
                        this.exportQuizList = req.session.quizzes_list as string;
                    });

                    this.getChooseQuizPage(req, res);
                }
                await db.commit_close();
                resolve();
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    getExportQuizList() : string {
        return this.exportQuizList;
    }

    private async wasFilled(req : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const db = new DbClass();
            try {
                await db.open_with_transaction();
                const results_rows = await db.all('SELECT * FROM results WHERE user_name = ? AND quiz_name = ?;',
                        [req.session.username as string, req.session.quiz_name as string]);
                await db.commit_close();
                if (results_rows.length > 0)
                    resolve(true);
                else
                    resolve(false);
            }
            catch (err) {
                try {
                    await db.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

    private async loging_handle(req : any, res : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (req.body.login_send) {
                try {
                    await this.postLoginPage(req, res);
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }
            else if (!req.session.isLogged) {
                this.getLoginPage(req, res, 'Zaloguj się');
                resolve(true);
            }
            else if (req.body.logout) {
                try {
                    req.session.isLogged = false;
                    this.getLoginPage(req, res, 'Zaloguj się');
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }
            else if (req.body.change_password) {
                this.getChangePasswordPage(req, res, 'Zmień hasło');
                resolve(true);
            }
            else if (req.body.comeback_change || req.body.comeback_quiz_menu) {
                this.getChooseQuizPage(req, res);
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }

    private async quiz_menu_handle(req : any, res : any, next : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (req.body.quiz) {
                const db = new DbClass();
                try {
                    await db.open_with_transaction();
                    const sql =
                        `SELECT quiz_name, quiz_json
                        FROM quizzes;`;
                    const quizes_rows = await db.all(sql, []);
                    await db.commit_close();
                    quizes_rows.forEach((row) => {
                        if (req.body.quiz as string === row.quiz_name as string) {
                            this.getQuizMenuPage(req, res, row.quiz_name as string, row.quiz_name as string + ' - menu');
                        }
                    });
                    resolve(true);
                }
                catch (err) {
                    try {
                        await db.rollback_close();
                        reject(err);
                    }
                    catch (err) {
                        reject(err);
                    }
                }
            }
            else if (req.body.begin_quiz) {
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Już wypełniono quiz');
                    }
                    else if (req.session.begin_time &&
                            (!req.session.end_time || req.session.begin_time > req.session.end_time)) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Quiz jest aktualnie wypełniany');
                    }
                    else {
                        this.getQuizPage(req, res, req.session.quiz_name as string);
                    }
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }
            else if (req.body.my_score) {
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (!wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Jeszcze nie wypełniono quizu');
                    }
                    else {
                        await this.getSummarize(req, res);
                    }
                }
                catch (err) {
                    reject(err);
                }
                resolve(true);
            }
            else if (req.body.stats) {
                try {
                    await this.getStats(req, res);
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }
            else if (req.body.comeback_stats) {
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name + ' - menu');
                resolve(true);
            }
            else if (req.body.getQuizList) {
                this.postQuizList(req, res, next);
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }

    private async change_password_handle(req : any, res : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (req.body.commit_change) {
                if (!req.body.new_password_1 || !req.body.new_password_2) {
                    this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                    resolve(true);
                }
                else {
                    const new_password_1 = req.body.new_password_1 as string;
                    const new_password_2 = req.body.new_password_2 as string;
                    if (new_password_1 !== new_password_2 || new_password_1 === "") {
                        this.getChangePasswordPage(req, res, 'Błędna zmiana hasła');
                        resolve(true);
                    }
                    else {
                        const db = new DbClass();
                        try {
                            await this.changePassword(req, res, new_password_1);
                            this.getLoginPage(req, res, 'Zaloguj się');
                            resolve(true);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                }
            }
            else {
                resolve(false);
            }
        });
    }

    private async quiz_handle(req : any, res : any, next : any) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (req.body.cancel_quiz) {
                req.session.end_time = new Date().getTime();
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name as string + ' - menu');
                resolve(true);
            }
            else if (req.body.quiz_result) {
                req.session.end_time = new Date().getTime();
                try {
                    const wasSolved = await this.wasFilled(req);
                    if (wasSolved) {
                        this.getQuizMenuPage(req, res, req.session.quiz_name as string, 'Już wypełniono quiz');
                    }
                    else {
                        this.exportQuizResult = JSON.stringify(req.body.quiz_result);
                        await this.save_result(req, res, next, req.body.quiz_result);
                    }
                    resolve(true);
                }
                catch (err) {
                    reject(err);
                }
            }
            else if (req.body.comeback_quiz) {
                this.getQuizMenuPage(req, res, req.session.quiz_name as string, req.session.quiz_name + ' - menu');
                resolve(true);
            }
            else if (req.body.getQuizJSON) {
                this.postQuizRequest(req, res, req.session.quiz_name as string);
            }
            else {
                resolve(false);
            }
        });
    }

    private postPage() : void {
        this.app.post('/', async (req, res, next) => {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            let flag = false;
            try {
                flag = await this.loging_handle(req, res);
                if (!flag)
                    flag = await this.quiz_menu_handle(req, res, next);
                if (!flag)
                    flag = await this.change_password_handle(req, res);
                if (!flag)
                    flag = await this.quiz_handle(req, res, next);
            }
            catch (err) {
                next(err);
            }
        });
    }

    close() {
        this.server.close();
    }

    private errorHandler(err, req, res, next) : void {
        console.log(err);
        res.status(500).send('Something broke!');
    }

    run() {
        this.getPage();
        this.postPage();

        this.app.use(this.errorHandler);

        this.server = this.app.listen(this.port, () => {});
    }
}