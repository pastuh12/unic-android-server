/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as sqlite3 from "sqlite3";
import Promise from "bluebird";

class AppDAO {
    db: sqlite3.Database;

    constructor(dbFilePath = "database.db") {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log("Could not connect to database", err);
            } else {
                console.log("Connected to database");
            }
        });
    }

    run(sql: string, params: unknown[] = []): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log("Error running sql " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    get(sql: string, params: unknown[] = []): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql: string, params: unknown[] = []): Promise<unknown> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

export default AppDAO;
