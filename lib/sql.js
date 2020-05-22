const mysql = require("mysql");
const util = require("util");
const {promisify} = require("util");

class SQL {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "company_db"
        });
    }
    search(searchString, searchInputs) {
        return new Promise((resolve , reject) => {
            this.connection.query(searchString, searchInputs, function (err, res) {
            if (err) reject(err);
            resolve(res);
            });
        });
    }
}

module.exports = new SQL();