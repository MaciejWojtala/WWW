"use strict";
exports.__esModule = true;
var sqlite3 = require("sqlite3");
function createDatabase(name) {
    return new sqlite3.Database(name);
}
var db = createDatabase('baza.db');
function startBase(db) {
    sqlite3.verbose();
    //let db = new sqlite3.Database('baza.db');
    db.run('CREATE TABLE IF NOT EXISTS wyswietlenia (sciezka VARCHAR(255), liczba INT);');
    //db.close();
}
startBase(db);
function insertData(db) {
    sqlite3.verbose();
    db.run('INSERT INTO wyswietlenia (sciezka, liczba) VALUES ("a", 1), ("b",2);');
}
insertData(db);
function readData() {
    sqlite3.verbose();
    db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], function (err, rows) {
        if (err)
            throw (err);
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var _a = rows_1[_i], sciezka = _a.sciezka, liczba = _a.liczba;
            console.log(sciezka, '->', liczba);
        }
    });
}
readData();
function closeDatabase(db) {
    db.close();
}
closeDatabase(db);
