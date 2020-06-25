import * as sqlite3 from 'sqlite3';
import { Meme } from "./Meme_klasa";
import passwordHash from "password-hash";

export class Database {
    private db : sqlite3.Database;
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

    async open() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.db = new sqlite3.Database("database.db");
            try {
                await this.run('BEGIN TRANSACTION;', []);
                resolve();
            }
            catch(err) {
                console.log("Begin transaction error");
                reject(err);
            }
        });
    }

    async run(sql : string, params : any[]) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.log("Database run error");
                    reject(err);
                }
                else {
                    resolve();
                }
            })
        });
    }

    async all(sql : string, params : any[]) : Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log("Database all error");
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            })
        });
    }

    async close() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.run('COMMIT;', []);
                this.db.close();
                resolve();
            }
            catch (err) {
                console.log("Commit error");
                this.db.close();
                reject(err);
            }
        });
    }

    connection_close() {
        this.db.close();
    }

    async init() : Promise<void> {
        return new Promise<void>(async (resolve, reject) =>  {
            try {
                await this.open();
                await this.run('DROP TABLE IF EXISTS memes', []);
                await this.run('DROP TABLE IF EXISTS histories', []);
                await this.run('DROP TABLE IF EXISTS users', []);
                await this.run('CREATE TABLE IF NOT EXISTS memes (id INT PRIMARY KEY, name VARCHAR(255), price INT, url VARCHAR(255));', []);
                await this.run('CREATE TABLE IF NOT EXISTS histories (meme_id INT, commiter varchar(255), generation INT, price INT, PRIMARY KEY(meme_id, generation));', []);
                await this.run('CREATE TABLE IF NOT EXISTS users (user VARCHAR(255) PRIMARY KEY, password VARCHAR(255));', []);
                await this.run('INSERT OR REPLACE INTO users (user, password) VALUES (?, ?), (?, ?);',
                        ["user", passwordHash.generate('user'), "admin", passwordHash.generate('admin')]);
                await this.close();
                resolve();
            }
            catch (err) {
                console.log("init error");
                reject(err);
            }
        });
    }

    constructor() {};

    getDatabase() : sqlite3.Database {
        return this.db;
    }

    async insertToHistory(id : number, length : number, arg : Meme) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (id < length - 1) {
                try {
                    await this.insertToHistory(id + 1, length, arg);
                    await this.open();
                    await this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getHistoryLocal()[id][1],
                        id,
                        arg.getHistoryLocal()[id][0]
                    ]);
                    await this.close();
                    resolve();
                }
                catch (err) {
                    console.log("insert history error");
                    reject (err);
                }
            }
            else {
                try {
                    await this.open();
                    await this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getHistoryLocal()[id][1],
                        id,
                        arg.getHistoryLocal()[id][0]
                    ]);
                    await this.close();
                    resolve();
                }
                catch (err) {
                    console.log("insert history error");
                    reject(err);
                }
            }
        });
    }

    async insertMeme(arg: Meme) : Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.open();
                await this.run('INSERT OR REPLACE INTO memes (id, name, price, url) VALUES (?, ?, ?, ?);', [
                    arg.getIdLocal(),
                    arg.getNameLocal(),
                    arg.getPriceLocal(),
                    arg.getUrlLocal()
                ]);
                await this.close();
                await this.insertToHistory(0, arg.getHistoryLocal().length, arg);
                resolve();
            }
            catch (err) {
                console.log("insert meme error");
                reject(err);
            }
        });
    }

    async getMeme(id : number) : Promise<Meme> {
        return new Promise<Meme>(async (resolve, reject) => {
            let name : string;
            let price : number;
            let url : string;
            let history : [number, string][];
            try{
                await this.open();
                const sql = `SELECT *
                    FROM memes
                    WHERE id = ?`;
                let rows = await this.all(sql, [id]);
                rows.forEach((row) => {
                    name = row.name;
                    price = row.price;
                    url = row.url;
                });

                const sql2 = `SELECT *
                    FROM histories
                    WHERE meme_id = ?`;
                let historyLength = 0;
                rows = await this.all(sql2, [id]);
                rows.forEach((row) => {
                    historyLength++;
                });
                history = new Array<[number, string]>(historyLength);
                rows = await this.all(sql2, [id]);
                rows.forEach((row) => {
                    history[row.generation] = [row.price, row.commiter];
                });
                await this.close();
                const resMeme = new Meme();
                resMeme.init(id, name, price, url, history, this);
                resolve(resMeme);
            }
            catch (err) {
                console.log("get meme error");
                reject(err);
            }
        });
    }

    async _getBestMemes() : Promise<Meme[]> {
        return new Promise<Meme[]>(async (resolve, reject) => {
            try {
                await this.open();
                const sql = 'SELECT id FROM memes ORDER BY price DESC';
                const rows = await this.all(sql, []);
                await this.close();
                let size = rows.length;
                if (size > 3)
                    size = 3;
                const result = new Array<Meme>(size);
                for (let i = 0; i < size; i++) {
                    result[i] = await this.getMeme(rows[i].id as number);
                }
                resolve(result);
            }
            catch (err) {
                console.log("get best memes error");
                reject(err);
            }
        });
    }

    async getBestMemes() : Promise<{id: number; name: string; price: number; url: string; history: [number, string][]}[]> {
        return new Promise<{id: number; name: string; price: number; url: string; history: [number, string][]}[]>
                (async (resolve, reject) => {
            try {
                const bestMemes = await this._getBestMemes();
                const result = new Array<{id: number; name: string; price: number; url: string; history: [number, string][]}>
                        (bestMemes.length);
                for (let i = 0; i < result.length; i++) {
                    result[i] = bestMemes[i].getAnonymousMeme();
                }
                resolve(result);
            }
            catch (err) {
                console.log("get best memes error");
                reject(err);
            }
        });
    }

    closeDatabase() : void {
        this.db.close();
    }


}