import * as sqlite3 from 'sqlite3';

function createDatabase(name : string) : sqlite3.Database {
    return  new sqlite3.Database(name);
}

const db = createDatabase('baza.db');

function startBase(db : sqlite3.Database) {
    sqlite3.verbose();
    //let db = new sqlite3.Database('baza.db');
    db.run('CREATE TABLE IF NOT EXISTS wyswietlenia (sciezka VARCHAR(255), liczba INT);');
    //db.close();
}

startBase(db);

function insertData(db : sqlite3.Database) {
    sqlite3.verbose();
    db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES ("a", 1), ("b",2);');
}

insertData(db);

function readData() {
    sqlite3.verbose();

    db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {
        if (err) throw(err);

        for(let {sciezka, liczba} of rows) {
            console.log(sciezka, '->', liczba);
        }
    });
}

readData();

function closeDatabase(db : sqlite3.Database) {
    db.close();
}

closeDatabase(db);