import { anyToNumber } from "./Lokalne";
import { Meme } from "./Meme_klasa";

export class Memes {
    private allMemes : Meme[];
    private bestMemes  = [
        {'id': -1,
        'name': '',
        'price': -1,
        'url': ''},
        {'id': -1,
        'name': '',
        'price': -1,
        'url': ''},
        {'id': -1,
        'name': '',
        'price': -1,
        'url': ''}
    ];

    constructor (allMemes : Meme[]) {
        this.allMemes = allMemes;
        this.findBestMemes();
    }

    getAllMemes() : Meme[] {
        return this.allMemes;
    }

    getBestMemes() : {id : number, name : string, price : number, url : string}[] {
        return this.bestMemes;
    }

    findMemeById(anyId : any) : Meme {
        const id = anyToNumber(anyId);
        if (id[1] === false) {
            console.log("Invalid id");
            return null;
        }
        for (let i = 0; i < this.allMemes.length; i++) {
            if (this.allMemes[i].getId() === id[0])
                return this.allMemes[i];
        }

        console.log("Invalid id");
        return null;
    }

    private async getPrice(id : number, length : number) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (id < length - 1) {
                this.getPrice(id + 1, length).then(() => {
                    this.allMemes[id].getPrice().then(() => {
                        resolve();
                    });
                })
            }
            else {
                this.allMemes[id].getPrice().then(() => {
                    resolve();
                });
            }
        });
    }

    private async getPrices(length : number) : Promise<void> {
        return this.getPrice(0, length);
    }

    async findBestMemes() : Promise<void> {
        return new Promise((resolve, reject) => {
            this.getPrices(this.allMemes.length)
            .then(() => {
                this.allMemes.sort((a, b) => {
                    const aPrice = a.getPriceLocal();
                    const bPrice = b.getPriceLocal();
                    return aPrice < bPrice ? 1 : (aPrice > bPrice ? -1 : 0);
                });

                for (let i = 0; i < 3; i++) {
                    if (this.allMemes[i] !== undefined) {
                        this.bestMemes[i].id = this.allMemes[i].getIdLocal();
                        this.bestMemes[i].name = this.allMemes[i].getNameLocal();
                        this.bestMemes[i].price = this.allMemes[i].getPriceLocal();
                        this.bestMemes[i].url = this.allMemes[i].getUrlLocal();
                    }
                    else {
                        this.bestMemes[i] = null;
                    }
                }
                resolve();
            });
        });
    }
}