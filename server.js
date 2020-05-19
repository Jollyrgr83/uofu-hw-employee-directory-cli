const mysql = require("mysql");
const inquirer = require("inquirer");
// function library
const Employee = require("./lib/Employee");
const Department = require("./lib/Department");
// inquirer prompt library
const questions = require("./lib/questions");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // var query1 = connection.query("SELECT * FROM employee", function(err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         console.log(`ID: ${res[i].id}, Name: ${res[i].first_name} ${res[i].last_name}, Role ID: ${res[i].role_id}, Manager ID: ${res[i].manager_id}`);
    //     }
    // });
    // var query2 = connection.query("SELECT * FROM role", function(err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         console.log(`ID: ${res[i].id}, Title: ${res[i].title}, Salary: $${res[i].salary}, Department ID: ${res[i].department_id}`);
    //     }
    // });
    // var query3 = connection.query("SELECT * FROM department", function(err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         console.log(`ID: ${res[i].id}, Name: ${res[i].name}`);
    //     }
    // });
    // var query4 = connection.query("SELECT * FROM employee WHERE ?", {"manager_id": 1}, function(err, res) {
    //     if (err) throw err;
    //     for (let i = 0; i < res.length; i++) {
    //         console.log(`ID: ${res[i].id}, Name: ${res[i].first_name} ${res[i].last_name}, Role ID: $${res[i].role_id}, Manager ID: ${res[i].manager_id}`);
    //     }
    // });
    var query5 = connection.query(`
    SELECT * 
    FROM employee
    INNER JOIN role
    ON (employee.role_id = role.id)`, function(err, res) {
        if (err) throw err;
        console.log(res);
    })
    connection.end();
});

// `SELECT 
// employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id 
// FROM 
// employee 
// INNER JOIN 
// role 
// ON 
// (top_albums.artist = top5000.artist 
// AND 
// top_albums.year = top5000.year) 
// WHERE 
// (top_albums.artist = ? AND top5000.artist = ?) 
// ORDER BY 
// top_albums.year, top_albums.position`;