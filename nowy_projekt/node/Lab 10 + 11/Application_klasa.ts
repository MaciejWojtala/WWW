import { Memes } from "./Memes_klasa";
import { Builder } from "./Builder_klasa";
import { Database } from "./Database_klasa";

export class Application {
    private port : number;
    private express : any;
    private session : any;
    private app : any;
    private source : string;
    private memes : Memes;
    private csurf : any;
    private cookieParser : any;
    private csrfProtection : any;
    private bodyParser : any;
    private database : Database;

    constructor() {};
    async init (port : number, source : string) : Promise<void> {
        this.express = require('express');
        this.session = require('express-session');
        this.bodyParser = require('body-parser');
        this.csurf = require('csurf');
        this.cookieParser = require('cookie-parser');

        this.app = this.express();

        this.csrfProtection = this.csurf({
            cookie: true
        });

        this.app.use(this.session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }))

        this.app.use(this.bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(this.cookieParser());
        this.app.use(this.csrfProtection);

        this.app.set('views', "./");
        this.app.set('view engine', 'pug');

        this.port = port;
        this.source = source;
        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');

        const builder = new Builder();
            const pair = await builder.init();
            this.memes = pair[0];
            this.database = pair[1];
    }

    private getHomepage() : void {
        this.app.get('/', (req, res) => {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            this.memes.findBestMemes()
            .then(() => {
                const bestMemes = this.memes.getBestMemes();
                if (!req.session.isLogged)
                    res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                else
                    res.render('Memy_zalogowany', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
            });
        });
    }

    private getMemePage() : void {
        this.app.get('/meme/:memeId', (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null) {
                return next('error');
            }

            const title : string = 'Meme price changing';
            const meme = _meme.getAnonymousMeme();
            res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                    message: 'Change price!', meme: meme});
        });
    }

    private errorHandler(err, req, res, next) : void {
        res.status(500).send('Something broke!');
    }

    private postPriceChange() : void {
        this.app.post('/meme/:memeId/submit-form', async (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');

            const price : number = req.body.price;
            const user : string = req.session.username;
            if (req.session.isLogged && await _meme.setPrice(price, user) === true) {
                res.render('Zmiana_ceny', { title: 'Meme price changing', req: req,
                        message: 'Changing succeeded!', meme: _meme.getAnonymousMeme()});
            }
            else {
                res.render('Zmiana_ceny', { title: 'Invalid meme price changing', req: req,
                        message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme()});
            }
        });
    }

    private postLogin() : void {
        this.app.post('/', async (req, res, next) => {
            if (req.session.isLogged === undefined)
                req.session.isLogged = false;
            const username = req.body.login as string;
            const password = req.body.password as string;
            const logout = req.body.Logout;
            if (logout) {
                req.session.isLogged = false;
                const bestMemes = this.memes.getBestMemes();
                res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                return;
            }

           const sql = `SELECT *
                    FROM users
                    WHERE user = ? AND password = ?`;
            this.database.getDatabase().all(sql, [username, password], (err, rows) => {
                if (err) {
                    next(err);
                }
                rows.forEach((row) => {
                    req.session.isLogged = true;
                    req.session.username = username;
                    this.memes.findBestMemes()
                    .then(() => {
                        const bestMemes = this.memes.getBestMemes();
                        res.render('Memy_zalogowany', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                    });
                });
                if (!req.session.isLogged) {
                    const bestMemes = this.memes.getBestMemes();
                    res.render('Memy', { title: 'Meme market', req: req,  message: 'Hello there!', memes: bestMemes});
                }
            });
        });
    }

    run() : void {
        this.getHomepage();

        this.getMemePage();

        this.postPriceChange();

        this.postLogin();

        this.app.use(this.errorHandler);

        this.app.listen(this.port, () => {});
    }

}