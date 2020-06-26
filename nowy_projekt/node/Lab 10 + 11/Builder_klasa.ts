import { Meme } from "./Meme_klasa";
import {Database} from "./Database_klasa";
import { Mutex } from 'async-mutex';

export class Builder {
    private memeTable : Meme[];
    private memesNumber : number;
    private database : Database;
    private mutex : Mutex;

    constructor(mutex : Mutex) {
        this.memesNumber = 4;
        this.memeTable = new Array<Meme>(this.memesNumber);
        this.mutex = mutex;
        this.database = new Database(this.mutex);
    }

    async init(mutex : Mutex) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const prices = [1150, 1100, 1200, 1300];
                await this.database.init();
                this.memeTable[0] = new Meme();
                this.memeTable[0].init(0, 'Gold', prices[0],
                        'https://i.redd.it/h7rplf9jt8y21.png', [[prices[0], "init"]], mutex);
                this.memeTable[1] = new Meme();
                this.memeTable[1].init(1, 'Platinum', prices[1],
                        'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg',
                        [[prices[1], "init"]], mutex);
                this.memeTable[2] = new Meme();
                this.memeTable[2].init(2, 'Elite', prices[2],
                        'https://i.imgflip.com/30zz5g.jpg', [[prices[2], "init"]], mutex);
                this.memeTable[3] = new Meme();
                this.memeTable[3].init(3, 'Meme meme', prices[3],
                        'https://i.imgflip.com/41wdb2.jpg', [[prices[3], "init"]], mutex);
                await this.database.insertMeme(this.memeTable[0]);
                await this.database.insertMeme(this.memeTable[1]);
                await this.database.insertMeme(this.memeTable[2]);
                await this.database.insertMeme(this.memeTable[3]);
                resolve();
            }
            catch(err) {
                try {
                    await this.database.rollback_close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }
}