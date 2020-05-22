import { Meme } from "./Meme_klasa";
import { Memes } from "./Memes_klasa";
import { expect } from "chai";
import "mocha";

describe("Meme class", () => {
    it("setPrice method", () => {
        const meme = new Meme(123, 'Ala', 228, '/sok');
        meme.setPrice(1234);
        expect(meme.getPrice()).to.equal(1234);
    });
});

describe("Memes class", () => {
    it("getBestMemes method", () => {
        const memes = new Array<Meme>(10);
        for (let i = 0; i < 5; i++)
            memes[i] = new Meme(i, 'Meme' + i.toString(), i, '/sok');
        for (let i = 5; i < 10; i++)
            memes[i] = new Meme(i, 'Meme' + i.toString(), 10 - i, '/sok');

        const memesInstance = new Memes(memes);
        const bestMemes = memesInstance.getBestMemes();
        expect(bestMemes[0].price).to.equal(5);
        expect(bestMemes[1].price).to.equal(4);
        expect(bestMemes[2].price).to.equal(4);
    });

    it("findMemeById method", () => {
        const memes = new Array<Meme>(10);
        for (let i = 0; i < 5; i++)
            memes[i] = new Meme(10*i, 'Meme' + i.toString(), i, '/sok');
        for (let i = 5; i < 10; i++)
            memes[i] = new Meme(100 - i, 'Meme' + i.toString(), i, '/sok');

        const memesInstance = new Memes(memes);
        expect(memesInstance.findMemeById(0).getName()).to.equal('Meme0');
        expect(memesInstance.findMemeById(30).getName()).to.equal('Meme3');
        expect(memesInstance.findMemeById(95).getName()).to.equal('Meme5');
        expect(memesInstance.findMemeById(91).getName()).to.equal('Meme9');
        expect(memesInstance.findMemeById(50)).to.equal(null);
    });
});
