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
        var query = this.connection.query(searchString, searchInputs, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
}

module.exports = new SQL();