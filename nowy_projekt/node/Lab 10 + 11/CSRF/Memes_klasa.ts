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
        this.findBestMemes();
        return this.bestMemes;
    }

    findMemeById(anyId : any) : Meme {
        const id = anyToNumber(anyId);
        if (id[1] === false) {
            console.error("Invalid id");
            return null;
        }
        for (let i = 0; i < this.allMemes.length; i++) {
                  if (this.allMemes[i].getId() === id[0])
                      return this.allMemes[i];
          }

        console.error("Invalid id");
        return null;
    }

    private findBestMemes() : void {
        this.allMemes.sort((a, b) => {
            const aPrice = a.getPrice();
            const bPrice = b.getPrice();
            return aPrice < bPrice ? 1 : (aPrice > bPrice ? -1 : 0);
        });

        for (let i = 0; i < 3; i++) {
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
    }
}