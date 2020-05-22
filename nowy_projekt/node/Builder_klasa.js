"use strict";
exports.__esModule = true;
exports.Builder = void 0;
var Meme_klasa_1 = require("./Meme_klasa");
var Memes_klasa_1 = require("./Memes_klasa");
var Builder = /** @class */ (function () {
    function Builder() {
        this.memesNumber = 4;
        this.memeTable = new Array(this.memesNumber);
    }
    Builder.prototype.init = function () {
        this.memeTable[0] = new Meme_klasa_1.Meme(0, 'Gold', 1150, 'https://i.redd.it/h7rplf9jt8y21.png');
        this.memeTable[1] = new Meme_klasa_1.Meme(1, 'Platinum', 1100, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg');
        this.memeTable[2] = new Meme_klasa_1.Meme(2, 'Elite', 1200, 'https://i.imgflip.com/30zz5g.jpg');
        this.memeTable[3] = new Meme_klasa_1.Meme(3, 'Meme meme', 1300, 'https://i.imgflip.com/41wdb2.jpg');
        return new Memes_klasa_1.Memes(this.memeTable);
    };
    return Builder;
}());
exports.Builder = Builder;
