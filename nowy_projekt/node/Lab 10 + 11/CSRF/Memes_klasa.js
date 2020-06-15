"use strict";
exports.__esModule = true;
exports.Memes = void 0;
var Lokalne_1 = require("./Lokalne");
var Memes = /** @class */ (function () {
    function Memes(allMemes) {
        this.bestMemes = [
            { 'id': -1,
                'name': '',
                'price': -1,
                'url': '' },
            { 'id': -1,
                'name': '',
                'price': -1,
                'url': '' },
            { 'id': -1,
                'name': '',
                'price': -1,
                'url': '' }
        ];
        this.allMemes = allMemes;
        this.findBestMemes();
    }
    Memes.prototype.getAllMemes = function () {
        return this.allMemes;
    };
    Memes.prototype.getBestMemes = function () {
        this.findBestMemes();
        return this.bestMemes;
    };
    Memes.prototype.findMemeById = function (anyId) {
        var id = Lokalne_1.anyToNumber(anyId);
        if (id[1] === false) {
            console.error("Invalid id");
            return null;
        }
        for (var i = 0; i < this.allMemes.length; i++) {
            if (this.allMemes[i].getId() === id[0])
                return this.allMemes[i];
        }
        console.error("Invalid id");
        return null;
    };
    Memes.prototype.findBestMemes = function () {
        this.allMemes.sort(function (a, b) {
            var aPrice = a.getPrice();
            var bPrice = b.getPrice();
            return aPrice < bPrice ? 1 : (aPrice > bPrice ? -1 : 0);
        });
        for (var i = 0; i < 3; i++) {
            if (this.allMemes[i] !== undefined) {
                this.bestMemes[i].id = this.allMemes[i].getId();
                this.bestMemes[i].name = this.allMemes[i].getName();
                this.bestMemes[i].price = this.allMemes[i].getPrice();
                this.bestMemes[i].url = this.allMemes[i].getUrl();
            }
            else {
                this.bestMemes[i] = null;
            }
        }
    };
    return Memes;
}());
exports.Memes = Memes;
