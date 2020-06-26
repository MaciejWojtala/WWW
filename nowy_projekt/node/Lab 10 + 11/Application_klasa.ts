import { Builder } from "./Builder_klasa";
import { Meme } from "./Meme_klasa";
import { Database } from "./Database_klasa";
import express from "express";
import session from "express-session";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passwordHash from "password-hash";
import { anyToNumber } from "./Lokalne";
import { Mutex } from 'async-mutex';


export class Application {
    private port : number;
    private app : any;
    private source : string;
    private csrfProtection : any;
    private mutex : Mutex;

    constructor() {};
    async init (port : number, source : string) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.mutex = new Mutex();

            this.app = express();

            this.app.use(cookieParser('secret'));

            this.app.use(session({
                secret: 'secret',
                resave: true,
                saveUninitialized: true
            }))

            this.app.use(bodyParser.urlencoded({
                extended: true
            }));

            this.app.set('views', "./");
            this.app.set('view engine', 'pug');

            this.port = port;
            this.source = source;
            this.app.set('views', this.source);
            this.app.set('view engine', 'pug');

            const builder = new Builder(this.mutex);
            try {
                await builder.init(this.mutex);
                resolve();
            }
            catch (err) {
                console.log("init error");
                reject(err);
            }
        });
    }

    private getHomepage() : void {
        this.app.get('/', async (req, res, next) => {
            try {
                if (req.session.isLogged === undefined)
                    req.session.isLogged = false;
                const bestMemes = await this.getBestMemes();
                if (!req.session.isLogged)
                    res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                else
                    res.render('Memy_zalogowany', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
            }
            catch (err) {
                next(err);
            }
        });
    }

    private getMemePage() : void {
        this.app.get('/meme/:memeId', async (req, res, next) => {
            try {
                const _meme = await this.getMeme(req.params.memeId as number);
                if (_meme === null) {
                    return next('error');
                }

                const title : string = 'Meme price changing';
                const meme = _meme.getAnonymousMeme();
                res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                        message: 'Change price!', meme: meme});
            }
            catch (err) {
                next(err);
            }
        });
    }

    private errorHandler(err, req, res, next) : void {
        console.log(err);
        res.status(500).send('Something broke!');
    }

    private postPriceChange() : void {
        this.app.post('/meme/:memeId/submit-form', async (req, res, next) => {
            try {
                const _meme = await this.getMeme(req.params.memeId as number);
                if (_meme === null)
                    next('null error');

                const priceCheck = anyToNumber(req.body.price);
                const user : string = req.session.username;
                if (priceCheck[1] && req.session.isLogged && await _meme.setPrice(priceCheck[0], user) === true) {
                    res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                            message: 'Changing succeeded!', meme: _meme.getAnonymousMeme()});
                }
                else {
                    res.render('Zmiana_ceny', { title: 'Invalid meme price changing', req: req,
                            message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme()});
                }
            }
            catch (err) {
                next(err);
            }
        });
    }

    private async getBestMemes() :
            Promise<{id: number; name: string; price: number; url: string; history: [number, string][]}[]> {
        return new Promise<{id: number; name: string; price: number; url: string; history: [number, string][]}[]>
                (async (resolve, reject) => {
            let endFlag = false;
            while (!endFlag) {
                const database = new Database(this.mutex);
                try {
                    await database.open_with_transaction();
                    const bestMemes = await database.getBestMemes();
                    await database.commit_close();
                    endFlag = true;
                    resolve(bestMemes);
                }
                catch (err) {
                    console.log(err);
                    let flag = false;
                    while (!flag) {
                        try {
                            await database.rollback_close();
                            flag = true;
                        }
                        catch (err) {
                            database.closeDatabase();
                            console.log(err);
                        }
                    }
                }
            }
        });
    }

    private async getMeme(id : number) : Promise<Meme> {
        return new Promise<Meme>
                (async (resolve, reject) => {
            let endFlag = false;
            while (!endFlag) {
                const database = new Database(this.mutex);
                try {
                    await database.open_with_transaction();
                    const meme = await database.getMeme(id);
                    await database.commit_close();
                    endFlag = true;
                    resolve(meme);
                }
                catch (err) {
                    console.log(err);
                    let flag = false;
                    while (!flag) {
                        try {
                            await database.rollback_close();
                            flag = true;
                        }
                        catch (err) {
                            database.closeDatabase();
                            console.log(err);
                        }
                    }
                }
            }
        });
    }

    private async all(sql : string, params : any[]) : Promise<any[]> {
        return new Promise<any[]>
                (async (resolve, reject) => {
            let endFlag = false;
            while (!endFlag) {
                const database = new Database(this.mutex);
                try {
                    await database.open_with_transaction();
                    const rows = await database.all(sql, params);
                    await database.commit_close();
                    endFlag = true;
                    resolve(rows);
                }
                catch (err) {
                    console.log(err);
                    let flag = false;
                    while (!flag) {
                        try {
                            await database.rollback_close();
                            flag = true;
                        }
                        catch (err) {
                            database.closeDatabase();
                            console.log(err);
                        }
                    }
                }
            }
        });
    }

    private postLogin() : void {
        this.app.post('/', async (req, res, next) => {
            try {
                if (req.session.isLogged === undefined)
                    req.session.isLogged = false;
                const username = req.body.login as string;
                const password = req.body.password as string;
                const logout = req.body.Logout;
                if (logout) {
                    req.session.isLogged = false;
                    const bestMemes = await this.getBestMemes();
                    res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                    return;
                }

                const sql = `SELECT *
                        FROM users
                        WHERE user = ?`;
                const rows = await this.all(sql, [username]);
                if (rows.length === 1) {
                    if (passwordHash.verify(password, rows[0].password as string)) {
                        req.session.isLogged = true;
                        req.session.username = username;
                        const bestMemes = await this.getBestMemes();
                        res.render('Memy_zalogowany', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                    }
                }
                if (!req.session.isLogged) {
                    const bestMemes = await this.getBestMemes();

                    res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                }
            }
            catch (err) {
                next(err);
            }
        });
    }

    run() : void {
        this.getHomepage();

        this.postLogin();

        this.csrfProtection = csurf({
            cookie: true
        });
        this.app.use(this.csrfProtection);

        this.getMemePage();

        this.postPriceChange();

        this.app.use(this.errorHandler);

        this.app.listen(this.port, () => {});
    }

}