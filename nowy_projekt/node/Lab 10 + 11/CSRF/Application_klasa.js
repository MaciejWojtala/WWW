"use strict";
exports.__esModule = true;
exports.Application = void 0;
var Builder_klasa_1 = require("./Builder_klasa");
var Application = /** @class */ (function () {
    function Application(port, source) {
        this.express = require('express');
        this.app = this.express();
        this.port = port;
        this.source = source;
        this.app.set('views', this.source);
        this.app.set('view engine', 'pug');
        var builder = new Builder_klasa_1.Builder();
        this.memes = builder.init();
        this.app.use(this.express.urlencoded({
            extended: true
        }));
    }
    Application.prototype.getHomepage = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.render('Memy', { title: 'Meme market', message: 'Hello there!', memes: _this.memes.getBestMemes() });
        });
    };
    Application.prototype.getMemePage = function () {
        var _this = this;
        this.app.get('/meme/:memeId', function (req, res, next) {
            var _meme = _this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');
            //this.csrf(res, _meme);
            res.render('CSRF', { title: 'Meme price changing',
                message: 'Change price!', meme: _meme.getAnonymousMeme() });
            //const csrfForm = document.getElementById("csrf") as HTMLFormElement;
            //csrfForm.submit();
            //res.render('Zmiana_ceny', { title: 'Meme price changing',
            //  message: 'Change price!', meme: _meme.getAnonymousMeme()});
        });
        this.app.post('/meme/:memeId', function (req, res, next) {
            var _meme = _this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');
            var price = req.body._csrf;
            _meme.setPrice(price);
            res.render('Zmiana_ceny', { title: 'Meme price changing',
                message: 'Change price!', meme: _meme.getAnonymousMeme() });
        });
    };
    Application.prototype.csrf = function (res, _meme) {
        res.render('CSRF', { title: 'CSRF',
            message: 'Change price!', meme: _meme.getAnonymousMeme() });
        var csrfForm = document.getElementById("csrf");
        csrfForm.submit();
    };
    Application.prototype.errorHandler = function (err, req, res, next) {
        res.status(500).send('Something broke!');
    };
    Application.prototype.postPriceChange = function () {
        var _this = this;
        this.app.post('/meme/:memeId/submit-form', function (req, res, next) {
            var _meme = _this.memes.findMemeById(req.params.memeId);
            if (_meme === null)
                return next('error');
            var price = req.body.price;
            if (_meme.setPrice(price) === true) {
                res.render('Zmiana_ceny', { title: 'Meme price changing',
                    message: 'Changing succeeded!', meme: _meme.getAnonymousMeme() });
            }
            else {
                console.log("Invalid price");
                res.render('Zmiana_ceny', { title: 'Invalid meme price changing',
                    message: 'Changing unsucceeded!', meme: _meme.getAnonymousMeme() });
            }
        });
    };
    Application.prototype.run = function () {
        this.getHomepage();
        this.getMemePage();
        this.postPriceChange();
        this.app.use(this.errorHandler);
        this.app.listen(this.port, function () { });
    };
    return Application;
}());
exports.Application = Application;
