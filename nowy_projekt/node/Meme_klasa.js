"use strict";
exports.__esModule = true;
exports.Meme = void 0;
var Lokalne_1 = require("./Lokalne");
var Meme = /** @class */ (function () {
    function Meme(id, name, price, url) {
        this.anonymousMeme = {
            'id': -1,
            'name': '',
            'price': -1,
            'url': '',
            'history': [-1]
        };
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.setAnonymousMeme();
        this.history = new Array(100000);
        this.history[0] = this.price;
        this.historyIterator = 0;
    }
    Meme.prototype.setAnonymousMeme = function () {
        this.anonymousMeme.id = this.id;
        this.anonymousMeme.name = this.name;
        this.anonymousMeme.price = this.price;
        this.anonymousMeme.url = this.url;
        this.anonymousMeme.history = [this.price];
    };
    Meme.prototype.getId = function () {
        return this.id;
    };
    Meme.prototype.getPrice = function () {
        return this.price;
    };
    Meme.prototype.getName = function () {
        return this.name;
    };
    Meme.prototype.getUrl = function () {
        return this.url;
    };
    Meme.prototype.getAnonymousMeme = function () {
        return this.anonymousMeme;
    };
    Meme.prototype.setPrice = function (anyNewPrice) {
        var newPrice = Lokalne_1.anyToNumber(anyNewPrice);
        this.price = newPrice;
        this.anonymousMeme.price = this.price;
        this.historyIterator++;
        if (this.historyIterator === this.history.length)
            this.history = this.reallocateHistory();
        this.history[this.historyIterator] = this.price;
        this.anonymousMeme.history[this.historyIterator] = this.price;
    };
    Meme.prototype.reallocateHistory = function () {
        var newHistory = new Array(2 * this.history.length);
        for (var i = 0; i < this.history.length; i++)
            newHistory[i] = this.history[i];
        return newHistory;
    };
    return Meme;
}());
exports.Meme = Meme;
