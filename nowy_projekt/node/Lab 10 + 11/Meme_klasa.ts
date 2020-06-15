import { anyToNumber } from "./Lokalne";
import { Database } from "./Database_klasa";

export class Meme {
    private id : number;
    private name : string;
    private price : number;
    private url : string;
    private history : [number, string][];
    private database : Database;

    constructor() {}
    async init(id : number, name : string, price : number, url : string,
                history : [number, string][], database : Database) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.url = url;
        this.history = new Array<[number, string]>(1);
        this.history = history;
        this.database = database;
    }


    getHistoryLocal() : [number, string][] {
        return this.history;
    }

    getIdLocal() : number {
        return this.id;
    }

    getPriceLocal() : number {
        return this.price;
    }

    getNameLocal() : string {
        return this.name;
    }

    getUrlLocal() : string {
        return this.url;
    }

    getId() : number {
        return this.id;
    }

    private copy(actualState) {
        this.name = actualState.name;
        this.price = actualState.price;
        this.url = actualState.url;
        this.history = actualState.history;
    }

    async getHistory() : Promise<[number, string][]> {
        let actualState : Meme;
        try {
            actualState = await this.database.getMeme(this.id);
        }
        catch (error) {
            console.log("getHistory error");
            console.log(error);
        }
        this.copy(actualState);
        return this.history;
    }

    async getPrice() : Promise<number> {
        let actualState : Meme;
        try {
            actualState = await this.database.getMeme(this.id);
        }
        catch (error) {
            console.log("getPrice error");
            console.log(error);
        }
        this.copy(actualState);
        return this.price;
    }

    async getName() : Promise<string> {
        let actualState : Meme;
        try {
            actualState = await this.database.getMeme(this.id);
        }
        catch (error) {
            console.log("getName error");
            console.log(error);
        }
        this.copy(actualState);
        return this.name;
    }

    async getUrl() : Promise<string> {
        let actualState : Meme;
        try {
            actualState = await this.database.getMeme(this.id);
        }
        catch (error) {
            console.log("get url error");
            console.log(error);
        }
        this.copy(actualState);
        return this.url;
    }

    getAnonymousMeme() : {id: number; name: string; price: number; url: string; history: [number, string][]} {
        return ({'id': this.id, 'name': this.name, 'price': this.price,
                'url': this.url, history: this.history});
    }

    async setPrice(anyNewPrice : any, committer : string) : Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const newPrice = anyToNumber(anyNewPrice);
            if (newPrice[1] === false)
                resolve(false);
            this.price = newPrice[0];
            this.history.push([this.price, committer]);
            this.database.insertMeme(this)
            .then(() => {
                resolve(true);
            });
        });
    }

}