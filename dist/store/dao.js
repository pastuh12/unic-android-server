"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const sqlite3 = __importStar(require("sqlite3"));
const bluebird_1 = __importDefault(require("bluebird"));
class AppDAO {
    db;
    constructor(dbFilePath = "database.db") {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log("Could not connect to database", err);
            }
            else {
                console.log("Connected to database");
            }
        });
    }
    run(sql, params = []) {
        return new bluebird_1.default((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log("Error running sql " + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve({ id: this.lastID });
                }
            });
        });
    }
    get(sql, params = []) {
        return new bluebird_1.default((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    all(sql, params = []) {
        return new bluebird_1.default((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log("Error running sql: " + sql);
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}
exports.default = AppDAO;
//# sourceMappingURL=dao.js.map