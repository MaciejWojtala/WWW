import { Memes } from "./Memes_klasa";
import { Builder } from "./Builder_klasa";

export class Application {
    private port : number;
    private express : any;
    private app : any;
    private source : string;
    private memes : Memes;

    constructor(port : number, source : string) {
        this.express = require('express');
        this.app = this.express();
        this.port = port;
        this.source = source;
        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');

        const builder = new Builder();
        this.memes = builder.init();

        this.app.use(this.express.urlencoded({
            extended: true
        }));

    }

    private getHomepage() {
        this.app.get('/', (req, res) => {
            res.render('Memy', { title: 'Meme market', message: 'Hello there!', memes: this.memes.getBestMemes()});
        });
    }

    private getMemePage() {
        this.app.get('/meme/:memeId', (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');

            res.render('Zmiana_ceny', { title: 'Meme price changing',
                message: 'Change price!', meme: _meme.getAnonymousMeme()});
        });
    }

    private errorHandler(err, req, res, next) {
        res.status(500).send('Something broke!');
    }

    private postPriceChange() {
        this.app.post('/meme/:memeId/submit-form', (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');

            const price : number = req.body.price;
            _meme.setPrice(price);
            res.render('Zmiana_ceny', { title: 'Meme price changing',
                message: 'Changing succeeded!', meme: _meme.getAnonymousMeme()});
        });
    }

    run() {
        this.getHomepage();
        this.app.use(this.errorHandler);

        this.getMemePage();
        this.app.use(this.errorHandler);

        this.postPriceChange();
        this.app.use(this.errorHandler);

        this.app.listen(this.port, () => {});
    }

}