import * as sqlite3 from 'sqlite3';


export class DbClass {
    private db : sqlite3.Database;

    constructor() {}
    async open() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db = new sqlite3.Database("database.db", async (err) => {
                if (err) {
                    console.log("Create/Open database error");
                    reject(err);
                }
                try {
                    await this.run('BEGIN TRANSACTION;', []);
                    resolve();
                }
                catch(err) {
                    console.log("Begin transaction error");
                    reject(err);
                }
            });
        });
    };

    run(sql : string, params : any[]) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.log("Database error");
                    this.close();
                    reject(err);
                }
                else {
                    resolve();
                }
            })
        })
    }

    all(sql : string, params : any[]) : Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log("Database error");
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            })
        })
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
        try{
            let sql = 'DROP TABLE IF EXISTS users;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS users (user_name VARCHAR(255) PRIMARY KEY, user_password VARCHAR(255) NOT NULL);',
            await this.run(sql, []);

            sql = 'INSERT OR REPLACE INTO users (user_name, user_password) VALUES (?, ?), (?, ?);';
            await this.run(sql, ["user1", "user1", "user2", "user2"]);

            sql = 'DROP TABLE IF EXISTS sessions;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS sessions(session_id VARCHAR(255) PRIMARY KEY, user_name VARCHAR(255), FOREIGN KEY(user_name) REFERENCES users(user_name));';
            await this.run(sql, []);

            sql = 'DROP TABLE IF EXISTS results;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS results(user_name VARCHAR(255), quiz_name VARCHAR(255), result REAL, PRIMARY KEY(user_name, quiz_name), FOREIGN KEY(user_name) REFERENCES users(user_name));';
            await this.run(sql, []);

            sql = 'DROP TABLE IF EXISTS question_results;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS question_results(question_nr INTEGER, user_name VARCHAR(255), quiz_name VARCHAR(255), time REAL, answer VARCHAR(255), correct_answer VARCHAR(255), punishment REAL, result REAL, PRIMARY KEY(question_nr, user_name, quiz_name), FOREIGN KEY(user_name) REFERENCES users(user_name));';
            await this.run(sql, []);
            
            sql = 'DROP TABLE IF EXISTS quizzes;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS quizzes (quiz_name VARCHAR(255) PRIMARY KEY, quiz_json VARCHAR(2047) NOT NULL);',
            await this.run(sql, []);

            let quiz_json = `{
                "name": "Quiz A",
                "questions": [
                    "2 + 2 = ",
                    "3 * 6 : 9 = ",
                    "8 - 7 * 15 = ",
                    "83 * (7 * 15 - 35 * 3) = ",
                    "80 : (9 * 7 - 8 * 8) = ",
                    "64 : 2 : 4 : 8 = "
                ],
                "correct_answers": [
                    "4",
                    "2",
                    "-97",
                    "0",
                    "-80",
                    "1"
                ],
                "introduction": "Quiz algebraiczny, w każdym zadaniu należy podać jako wynik liczbę całkowitą.<br>Nie należy podawać zer wiodących, poprzedzać liczb znakiem \\"+\\" lub poprzedzać zera znakiem \\"-\\".<br>Na wynik mają wpływ: poprawność odpowiedzi i czas wypełniania quizu."
            }`;

            let quiz_name = "Quiz A";

            sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
            await this.run(sql, [quiz_name, quiz_json]);

            quiz_json = `{
                "name": "Quiz B",
                "questions": [
                    "3 + 3 = ",
                    "8 * 19 : 4 = ",
                    "8 - 7 * 7 = ",
                    "16 * (7 * 8 - 6 * 9) = ",
                    "17 : (13 * 5 - 8 * 8) = ",
                    "13 * 68 : 2 : 17 = "
                ],
                "correct_answers": [
                    "6",
                    "38",
                    "-41",
                    "32",
                    "17",
                    "26"
                ],
                "introduction": "Quiz algebraiczny, w każdym zadaniu należy podać jako wynik liczbę całkowitą.<br>Nie należy podawać zer wiodących, poprzedzać liczb znakiem \\"+\\" lub poprzedzać zera znakiem \\"-\\".<br>Na wynik mają wpływ: poprawność odpowiedzi i czas wypełniania quizu."
            }`;

            quiz_name = "Quiz B";

            sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
            await this.run(sql, [quiz_name, quiz_json]);

            quiz_json = `{
                "name": "Quiz C",
                "questions": [
                    "1 + 1 = ",
                    "5 * 6 : 2 = ",
                    "(8 - 7) * 15 = ",
                    "433 * (7 * 15 - 35 * 3) = ",
                    "321 : (9 * 7 - 8 * 8) = ",
                    "128 : 2 : 4 : 8 = "
                ],
                "correct_answers": [
                    "2",
                    "15",
                    "15",
                    "0",
                    "-321",
                    "2"
                ],
                "introduction": "Quiz algebraiczny, w każdym zadaniu należy podać jako wynik liczbę całkowitą.<br>Nie należy podawać zer wiodących, poprzedzać liczb znakiem \\"+\\" lub poprzedzać zera znakiem \\"-\\".<br>Na wynik mają wpływ: poprawność odpowiedzi i czas wypełniania quizu."
            }`;

            quiz_name = "Quiz C";

            sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
            await this.run(sql, [quiz_name, quiz_json]);

            quiz_json = `{
                "name": "Quiz D",
                "questions": [
                    "10 - 0 = ",
                    "243 * 6 : 27 = ",
                    "13 * 6 = ",
                    "22 * (8 * 5 - 7 * 6) = ",
                    "(255 + 10 - 53 * 5) : (20 * 6 - 8 * 8) = ",
                    "3072 : 2 : 4 : 8 = "
                ],
                "correct_answers": [
                    "10",
                    "54",
                    "78",
                    "-44",
                    "0",
                    "48"
                ],
                "introduction": "Quiz algebraiczny, w każdym zadaniu należy podać jako wynik liczbę całkowitą.<br>Nie należy podawać zer wiodących, poprzedzać liczb znakiem \\"+\\" lub poprzedzać zera znakiem \\"-\\".<br>Na wynik mają wpływ: poprawność odpowiedzi i czas wypełniania quizu."
            }`;

            quiz_name = "Quiz D";

            sql = 'INSERT OR REPLACE INTO quizzes (quiz_name, quiz_json) VALUES (?, ?);';
            await this.run(sql, [quiz_name, quiz_json]);

            sql = 'DROP TABLE IF EXISTS quizzes_list;';
            await this.run(sql, []);

            sql = 'CREATE TABLE IF NOT EXISTS quizzes_list (quiz_list VARCHAR(255) PRIMARY KEY);',
            await this.run(sql, []);

            let quiz_list_json = `{
                "quizzes": [
                    "Quiz A",
                    "Quiz B",
                    "Quiz C",
                    "Quiz D"
                ]
            }`;

            sql = 'INSERT OR REPLACE INTO quizzes_list (quiz_list) VALUES (?);';
            await this.run(sql, [quiz_list_json]);
        }
        catch (error) {
            console.log("Database error");
            console.log(error);
        }
    };

}