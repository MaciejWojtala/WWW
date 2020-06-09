import { anyToNumber } from "./Lokalne";

export class Meme {
    private id : number;
    private name : string;
    private price : number;
    private url : string;
    private history : number[];
    private historyIterator;

    constructor(id : number, name : string, price : number, url : string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.history = new Array<number>(1);
        this.history[0] = this.price;
        this.historyIterator = 0;
    }

    getId() : number {
        return this.id;
    }

    getPrice() : number {
        return this.price;
    }

    getName() : string {
        return this.name;
    }

    getUrl() : string {
        return this.url;
    }

    getAnonymousMeme() : {id: number; name: string; price: number; url: string; history: number[]} {
        return {'id': this.id, 'name': this.name, 'price': this.price, 'url': this.url, history: this.history};
    }

    setPrice(anyNewPrice : any) : number {

        const newPrice = anyToNumber(anyNewPrice);
        if (newPrice < 0)
            return -1;
        this.price = newPrice;
        this.history.push(this.price);

        return 0;
    }

}