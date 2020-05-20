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
        this.viewAllEmployees = {
            text : "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE ?"
        };
        this.searchDepartment = {};
    }
    sqlSearch(searchString, searchInputs) {
        var query = this.connection.query(searchString, searchInputs, function (err, res) {
            if (err) throw err;
            console.table(res);
        });
    }
}

module.exports = new SQL();