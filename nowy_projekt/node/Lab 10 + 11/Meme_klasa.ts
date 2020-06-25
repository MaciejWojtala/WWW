import { anyToNumber } from "./Lokalne";
import { Database } from "./Database_klasa";

export class Meme {
    private id : number;
    private name : string;
    private price : number;
    private url : string;
    private history : [number, string][];
    private database : Database;

    constructor() {
        this.id = -1;
        this.name = '';
        this.price = -1;
        this.url = '';
        this.history = [];
    }

    init(id : number, name : string, price : number, url : string,
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
        return new Promise<[number, string][]>(async (resolve, reject) => {
            let actualState : Meme;
            try {
                actualState = await this.database.getMeme(this.id);
                this.copy(actualState);
                resolve(this.history);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getPrice() : Promise<number> {
        return new Promise<number>(async (resolve, reject) => {
            let actualState : Meme;
            try {
                actualState = await this.database.getMeme(this.id);
                this.copy(actualState);
                resolve(this.price);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getName() : Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let actualState : Meme;
            try {
                actualState = await this.database.getMeme(this.id);
                this.copy(actualState);
                resolve(this.name);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getUrl() : Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let actualState : Meme;
            try {
                actualState = await this.database.getMeme(this.id);
                this.copy(actualState);
                resolve(this.url);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    getAnonymousMeme() : {id: number; name: string; price: number; url: string; history: [number, string][]} {
        return ({'id': this.id, 'name': this.name, 'price': this.price,
                'url': this.url, history: this.history});
    }

    async setPrice(anyNewPrice : any, committer : string) : Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                const newPrice = anyToNumber(anyNewPrice);
                if (newPrice[1] === false)
                    resolve(false);
                this.price = newPrice[0];
                this.history.push([this.price, committer]);
                await this.database.insertMeme(this);
                resolve(true);
            }
            catch (err) {
                try {
                    this.database.close();
                    reject(err);
                }
                catch (err) {
                    reject(err);
                }
            }
        });
    }

}