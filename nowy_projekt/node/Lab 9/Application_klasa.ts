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

    private getHomepage() : void {
        this.app.get('/', (req, res) => {
            res.render('Memy', { title: 'Meme market', message: 'Hello there!', memes: this.memes.getBestMemes()});
        });
    }

    private getMemePage() : void {
        this.app.get('/meme/:memeId', (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');

            res.render('Zmiana_ceny', { title: 'Meme price changing',
                message: 'Change price!', meme: _meme.getAnonymousMeme()});
        });
    }

    private errorHandler(err, req, res, next) : void {
        res.status(500).send('Something broke!');
    }

    private postPriceChange() : void {
        this.app.post('/meme/:memeId/submit-form', (req, res, next) => {
            const _meme = this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');

            const price : number = req.body.price;
            if (_meme.setPrice(price) === 0)
                res.render('Zmiana_ceny', { title: 'Meme price changing',
                        message: 'Changing succeeded!', meme: _meme.getAnonymousMeme()});
            else {
                console.log("Invalid price");
                res.render('Zmiana_ceny', { title: 'Invalid meme price changing',
                        message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme()});
            }
        });
    }

    run() : void {
        this.getHomepage();
        this.app.use(this.errorHandler);

        this.getMemePage();

        this.postPriceChange();

        this.app.listen(this.port, () => {});
    }

}