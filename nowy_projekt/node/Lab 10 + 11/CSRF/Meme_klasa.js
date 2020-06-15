"use strict";
exports.__esModule = true;
exports.Meme = void 0;
var Lokalne_1 = require("./Lokalne");
var Meme = /** @class */ (function () {
    function Meme(id, name, price, url) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.history = new Array(1);
        this.history[0] = this.price;
        this.historyIterator = 0;
    }
    Meme.prototype.getHistory = function () {
        return this.history;
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
        return { 'id': this.id, 'name': this.name, 'price': this.price, 'url': this.url, history: this.history };
    };
    Meme.prototype.setPrice = function (anyNewPrice) {
        var newPrice = Lokalne_1.anyToNumber(anyNewPrice);
        if (newPrice[1] === false)
            return false;
        this.price = newPrice[0];
        this.history.push(this.price);
        return true;
    };
    return Meme;
}());
exports.Meme = Meme;
