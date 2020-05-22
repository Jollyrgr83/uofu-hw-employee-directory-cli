const mysql = require("mysql");

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
        return new Promise((resolve, reject) => {
            this.connection.query(searchString, searchInputs, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
    insert(insertString, insertInputs) {
        return new Promise((resolve, reject) => {
            this.connection.query(insertString, insertInputs, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
    update(updateString, updateInputs) {
        return new Promise((resolve, reject) => {
            this.connection.query(updateString, updateInputs, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
    delete(deleteString, deleteInputs) {
        return new Promise((resolve, reject) => {
            this.connection.query(deleteString, deleteInputs, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
}

module.exports = new SQL();