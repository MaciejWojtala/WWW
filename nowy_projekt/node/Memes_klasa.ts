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

    getAllMemes() {
        return this.allMemes;
    }

    getBestMemes() {
        this.findBestMemes();
        return this.bestMemes;
    }

    findMemeById(anyId : any) {
        const id = anyToNumber(anyId);
        if (id < 0)
            return null;
          for (let i = 0; i < this.allMemes.length; i++) {
                  if (this.allMemes[i].getId() === id)
                      return this.allMemes[i];
          }

          console.error("Invalid id");
              return null;
    }

    private findBestMemes() {
        this.allMemes.sort((a, b) => {
            if (a.getPrice() < b.getPrice())
                return 1;
            if (a.getPrice() > b.getPrice())
                return -1;
            return 0;
        });

        for (let i = 0; i < 3; i++) {
            this.bestMemes[i].id = this.allMemes[i].getId();
            this.bestMemes[i].name = this.allMemes[i].getName();
            this.bestMemes[i].price = this.allMemes[i].getPrice();
            this.bestMemes[i].url = this.allMemes[i].getUrl();
        }
    }
}