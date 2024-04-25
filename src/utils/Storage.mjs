import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("./data.sqlite");

export default {
    createTable: () => {
        db.run("CREATE TABLE IF NOT EXISTS imageHostContent (hashName TEXT, originalName TEXT)")
        return true;
    },
    query: (query, args, callback) => {
        db.serialize(() => {
            const stmt = db.prepare(query, args);
            stmt.run((err) => {
                if (err) {
                    return callback(err);
                }
            })
        })
    },
    select: (query, args, callback) => {
        db.serialize(() => {
            const stmt = db.prepare(query, args);
            stmt.all((err, rows) => {
                if (err) {
                    return callback(err);
                } else return callback(null, rows);
            })
        })
    }
}