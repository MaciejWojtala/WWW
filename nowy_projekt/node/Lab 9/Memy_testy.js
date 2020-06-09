"use strict";
exports.__esModule = true;
var Meme_klasa_1 = require("./Meme_klasa");
var Memes_klasa_1 = require("./Memes_klasa");
var chai_1 = require("chai");
require("mocha");
describe("Meme class", function () {
    it("setPrice method", function () {
        var meme = new Meme_klasa_1.Meme(123, 'Ala', 228, '/sok');
        meme.setPrice(1234);
        chai_1.expect(meme.getPrice()).to.equal(1234);
    });
});
describe("Memes class", function () {
    it("getBestMemes method", function () {
        var memes = new Array(10);
        for (var i = 0; i < 5; i++)
            memes[i] = new Meme_klasa_1.Meme(i, 'Meme' + i.toString(), i, '/sok');
        for (var i = 5; i < 10; i++)
            memes[i] = new Meme_klasa_1.Meme(i, 'Meme' + i.toString(), 10 - i, '/sok');
        var memesInstance = new Memes_klasa_1.Memes(memes);
        var bestMemes = memesInstance.getBestMemes();
        chai_1.expect(bestMemes[0].price).to.equal(5);
        chai_1.expect(bestMemes[1].price).to.equal(4);
        chai_1.expect(bestMemes[2].price).to.equal(4);
    });
    it("findMemeById method", function () {
        var memes = new Array(10);
        for (var i = 0; i < 5; i++)
            memes[i] = new Meme_klasa_1.Meme(10 * i, 'Meme' + i.toString(), i, '/sok');
        for (var i = 5; i < 10; i++)
            memes[i] = new Meme_klasa_1.Meme(100 - i, 'Meme' + i.toString(), i, '/sok');
        var memesInstance = new Memes_klasa_1.Memes(memes);
        chai_1.expect(memesInstance.findMemeById(0).getName()).to.equal('Meme0');
        chai_1.expect(memesInstance.findMemeById(30).getName()).to.equal('Meme3');
        chai_1.expect(memesInstance.findMemeById(95).getName()).to.equal('Meme5');
        chai_1.expect(memesInstance.findMemeById(91).getName()).to.equal('Meme9');
        chai_1.expect(memesInstance.findMemeById(50)).to.equal(null);
    });
});
