import * as sqlite3 from 'sqlite3';
import { Meme } from "./Meme_klasa";
import { Memes } from "./Memes_klasa";
import { resolve } from 'dns';

export class Database {
    private db : sqlite3.Database;

    async init() : Promise<void> {
        return new Promise<void>((resolve, reject) =>  {
            this.db = new sqlite3.Database("database.db", (err) => {
                sqlite3.verbose();
                this.db.serialize(() => {
                    this.db.run('DROP TABLE IF EXISTS memes')
                    .run('DROP TABLE IF EXISTS histories')
                    .run('DROP TABLE IF EXISTS users')
                    .run
                    ('CREATE TABLE IF NOT EXISTS memes (id INT PRIMARY KEY, name VARCHAR(255), price INT, url VARCHAR(255));',
                            (err) => {
                        if (err) {
                            console.log("error");
                            reject(err);
                        }
                    }).run
                    ('CREATE TABLE IF NOT EXISTS histories (meme_id INT, commiter varchar(255), generation INT, price INT, PRIMARY KEY(meme_id, generation));',
                            (err) => {
                            if (err) {
                                console.log("error");
                                reject(err);
                            }
                        resolve();
                    }).run
                    ('CREATE TABLE IF NOT EXISTS users (user VARCHAR(255) PRIMARY KEY, password VARCHAR(255));',
                            (err) => {
                        if (err) {
                            console.log("error");
                            reject(err);
                        }
                    })
                    .run('INSERT OR REPLACE INTO users (user, password) VALUES ("user", "user"), ("admin", "admin");',
                            (err) => {
                        if (err){
                            console.log("error");
                            reject(err);
                        }
                    });
                });
            });
        });
    }

    constructor() {};

    getDatabase() : sqlite3.Database {
        return this.db;
    }

    async insertToHistory(id : number, length : number, arg : Meme) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (id < length - 1) {
                this.insertToHistory(id + 1, length, arg)
                .then(() => {
                    this.db.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                            arg.getIdLocal(),
                            arg.getHistoryLocal()[id][1],
                            id,
                            arg.getHistoryLocal()[id][0]
                        ],
                        (err) => {
                            if (err) {
                                console.log("error insert history");
                                reject(err);
                            }
                            resolve();
                    });
                });
            }
            else {
                this.db.run('INSERT OR REPLACE INTO histories (meme_id, commiter, generation, price) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getHistoryLocal()[id][1],
                        id,
                        arg.getHistoryLocal()[id][0]
                    ],
                    (err) => {
                        if (err) {
                            console.log("error insert history");
                            reject(err);
                        }
                        resolve();
                });
            }
        });
    }

    async insertMeme(arg: Meme) : Promise<void> {
        return new Promise((resolve, reject) => {
            sqlite3.verbose();
            try {
                this.db.run('INSERT OR REPLACE INTO memes (id, name, price, url) VALUES (?, ?, ?, ?);', [
                        arg.getIdLocal(),
                        arg.getNameLocal(),
                        arg.getPriceLocal(),
                        arg.getUrlLocal()
                    ],
                    (err) => {
                        if (err) {
                            console.log("error insert price");
                            reject(err);
                        }

                        this.insertToHistory(0, arg.getHistoryLocal().length, arg).then(() => {
                            resolve();
                        })
                });
            }
            catch (error) {
                console.log("insert error");
                reject(error);
            }
        });
    }

    async getMeme(id : number) : Promise<Meme> {
        return new Promise<Meme>((resolve, reject) => {
            let name : string;
            let price : number;
            let url : string;
            let history : [number, string][];
            sqlite3.verbose();
            try{
                    let sql = `SELECT *
                    FROM memes
                    WHERE id = ?`;
                    let promise = this.db.all(sql, [id], (err, rows) => {
                        if (err) {
                            console.log("error select");
                            reject(err);
                        }

                        rows.forEach((row) => {
                            name = row.name;
                            price = row.price;
                            url = row.url;
                        });

                        const sql2 = `SELECT *
                        FROM histories
                        WHERE meme_id = ?`;
                        let historyLength = 0;
                        this.db.all(sql2, [id], (err, rows) => {
                            if (err) {
                                console.log("error select");
                                reject(err);
                            }
                            rows.forEach((row) => {
                                historyLength++;
                            });
                            history = new Array<[number, string]>(historyLength);
                            this.db.all(sql2, [id], (err, rows) => {
                                if (err) {
                                    console.log("error select");
                                    reject(err);
                                }
                                rows.forEach((row) => {
                                    history[row.generation] = [row.price, row.commiter];
                                });

                                const resMeme = new Meme();
                                resMeme.init(id, name, price, url, history, this);
                                resolve(resMeme);
                            });
                        })
                    });
            }
            catch(error) {
                console.log("get error");
                reject(error);
            }
        });
    }



    closeDatabase() : void {
        this.db.close();
    }


}