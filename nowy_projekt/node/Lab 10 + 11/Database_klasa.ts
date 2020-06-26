import * as sqlite3 from 'sqlite3';
import { Meme } from "./Meme_klasa";
import passwordHash from "password-hash";
import { Mutex } from 'async-mutex';

export class Database {
    private db : sqlite3.Database;
    private mutex : Mutex;

    async open_with_transaction() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            this.db = new sqlite3.Database("database.db");
            try {
                await this.run('BEGIN TRANSACTION;', []);
                resolve();
            }
            catch(err) {
                console.log("begin transaction error");
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

    async commit_close() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.run('COMMIT;', []);
                this.db.close();
                resolve();
            }
            catch (err) {
                console.log("Commit error");
                reject(err);
            }
        });
    }

    async rollback_close() : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.run('ROLLBACK;', []);
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
                await this.open_with_transaction();
                await this.run('DROP TABLE IF EXISTS memes', []);
                await this.run('DROP TABLE IF EXISTS histories', []);
                await this.run('DROP TABLE IF EXISTS users', []);
                await this.run('CREATE TABLE IF NOT EXISTS memes (id INT PRIMARY KEY, name VARCHAR(255), price INT, url VARCHAR(255));', []);
                await this.run('CREATE TABLE IF NOT EXISTS histories (meme_id INT, commiter varchar(255), generation INT, price INT, PRIMARY KEY(meme_id, generation));', []);
                await this.run('CREATE TABLE IF NOT EXISTS users (user VARCHAR(255) PRIMARY KEY, password VARCHAR(255));', []);
                await this.run('INSERT OR REPLACE INTO users (user, password) VALUES (?, ?), (?, ?);',
                        ["user", passwordHash.generate('user'), "admin", passwordHash.generate('admin')]);
                await this.commit_close();
                resolve();
            }
            catch (err) {
                console.log("init error");
                reject(err);
            }
        });
    }

    constructor(mutex : Mutex) {
        this.mutex = mutex;
    };

    getDatabase() : sqlite3.Database {
        return this.db;
    }

    async insertToHistory(id : number, length : number, arg : Meme) : Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (id < length - 1) {
                try {
                    await this.insertToHistory(id + 1, length, arg);
                    await this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getHistoryLocal()[id][1],
                        id,
                        arg.getHistoryLocal()[id][0]
                    ]);
                    resolve();
                }
                catch (err) {
                    console.log("insert history error");
                    reject (err);
                }
            }
            else {
                try {
                    await this.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getHistoryLocal()[id][1],
                        id,
                        arg.getHistoryLocal()[id][0]
                    ]);
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
        return new Promise<void>(async (resolve, reject) => {
            try {
                await this.run('INSERT OR REPLACE INTO memes (id, name, price, url) VALUES (?, ?, ?, ?);', [
                    arg.getIdLocal(),
                    arg.getNameLocal(),
                    arg.getPriceLocal(),
                    arg.getUrlLocal()
                ]);
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
                const resMeme = new Meme();
                resMeme.init(id, name, price, url, history, this.mutex);
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
                let sql = 'SELECT id, name, price, url FROM memes ORDER BY price DESC';
                const rows = await this.all(sql, []);
                let size = rows.length;
                if (size > 3)
                    size = 3;
                const result = new Array<Meme>(size);
                for (let i = 0; i < size; i++) {
                    sql = `SELECT *
                        FROM histories
                        WHERE meme_id = ?`;
                    const historyRows = await this.all(sql, [rows[i].id as number]);
                    const history = new Array<[number, string]>(historyRows.length);
                    historyRows.forEach((row) => {
                        history[row.generation as number] = [row.price as number, row.commiter as string];
                    });
                    result[i] = new Meme();
                    result[i].init(rows[i].id as number, rows[i].name as string,
                            rows[i].price as number, rows[i].url as string, history, this.mutex);
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