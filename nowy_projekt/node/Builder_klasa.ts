import { Meme } from "./Meme_klasa";
import { Memes } from "./Memes_klasa";

export class Builder {
    memeTable : Meme[];
    private memesNumber : number;

    constructor() {
        this.memesNumber = 4;
        this.memeTable = new Array<Meme>(this.memesNumber);
    }

    init() {
        this.memeTable[0] = new Meme(0, 'Gold', 1150, 'https://i.redd.it/h7rplf9jt8y21.png');
        this.memeTable[1] = new Meme(1, 'Platinum', 1100, 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg');
        this.memeTable[2] = new Meme(2, 'Elite', 1200, 'https://i.imgflip.com/30zz5g.jpg');
        this.memeTable[3] = new Meme(3, 'Meme meme', 1300, 'https://i.imgflip.com/41wdb2.jpg');

        return new Memes(this.memeTable);
    }
}