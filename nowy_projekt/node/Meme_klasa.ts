import { anyToNumber } from "./Lokalne";

export class Meme {
    private id : number;
    private name : string;
    private price : number;
    private url : string;
    private history : number[];
    private historyIterator;
    private anonymousMeme =
    {
        'id': -1,
        'name': '',
        'price': -1,
        'url': '',
        'history': [-1]
    };

    constructor(id : number, name : string, price : number, url : string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.setAnonymousMeme();
        this.history = new Array<number>(100000);
        this.history[0] = this.price;
        this.historyIterator = 0;
    }

    private setAnonymousMeme() {
        this.anonymousMeme.id = this.id;
        this.anonymousMeme.name = this.name;
        this.anonymousMeme.price = this.price;
        this.anonymousMeme.url = this.url;
        this.anonymousMeme.history = [this.price];
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

    getAnonymousMeme() {
        return this.anonymousMeme;
    }

    setPrice(anyNewPrice : any) {
        const newPrice = anyToNumber(anyNewPrice);
        this.price = newPrice;
        this.anonymousMeme.price = this.price;
        this.historyIterator++;
        if (this.historyIterator === this.history.length)
            this.history = this.reallocateHistory();
        this.history[this.historyIterator] = this.price;
        this.anonymousMeme.history[this.historyIterator] = this.price;
    }

    private reallocateHistory() {
        const newHistory = new Array<number>(2 * this.history.length);
        for (let i = 0; i < this.history.length; i++)
            newHistory[i] = this.history[i];
        return newHistory;
    }
}