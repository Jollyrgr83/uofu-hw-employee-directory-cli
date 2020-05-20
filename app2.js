const inquirer = require("inquirer");
const util = require("util");
const cTable = require("console.table");
const questions = require("./lib/questions");
const View = require("./lib/view");
const SQL = require("./lib/sql");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "company_db"
});

inquirer.prompt([questions.menu, questions.viewMenu, questions.updateMenu, questions.addMenu, questions.removeMenu]).then(function(data) {
    if (data.viewMenu) {
        switch (data.viewMenu) {
            case "View All Employees":
                var query = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id)", function(err, res) {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        res[i].salary = `$${res[i].salary}`;
                        if (res[i].manager_id === null) {
                            res[i].manager_id = "N/A";
                        }
                        for (let j = 0; j < res.length; j++) {
                            if (res[i].manager_id === res[j].id) {
                                res[i].manager_id = `${res[i].manager_id} - ${res[j].first_name} ${res[j].last_name}`;
                            }
                        }
                    }
                    console.table(res);
                });    
                break;
            case "View Employees by Department":
                var query = connection.query("SELECT department FROM department", function(err, res) {
                    if (err) throw err;
                    let choices = res.map(x => x.department);
                    var inquiry = {
                        name: "answer",
                        type: "list",
                        message: "Which department would you like to view?",
                        choices: [...choices]
                    };
                    inquirer.prompt([inquiry]).then(function(data) {
                        var query2 = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE ?", {department : data.answer}, function(err, res) {
                            if (err) throw err;
                            for (let i = 0; i < res.length; i++) {
                                res[i].salary = `$${res[i].salary}`;
                                if (res[i].manager_id === null) {
                                    res[i].manager_id = "N/A";
                                }
                                for (let j = 0; j < res.length; j++) {
                                    if (res[i].manager_id === res[j].id) {
                                        res[i].manager_id = `${res[i].manager_id} - ${res[j].first_name} ${res[j].last_name}`;
                                    }
                                }
                            }
                            console.table(res);
                        });
                    });
                });
                break;
            case "View Employees by Manager":
                var query = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, employee.manager_status FROM employee WHERE ?", {manager_status : true}, function(err, res) {
                    if (err) throw err;
                    let choices = res.map(x => `${x.id} ${x.first_name} ${x.last_name}`);
                    var inquiry = {
                        name: "answer",
                        type: "list",
                        message: "Which department would you like to view?",
                        choices: [...choices]
                    };
                    inquirer.prompt([inquiry]).then(function(data) {
                        var arr = data.answer.split(" ");
                        var query2 = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE ?", {manager_id : parseInt(arr[0])}, function(err, res) {
                            if (err) throw err;
                            for (let i = 0; i < res.length; i++) {
                                res[i].salary = `$${res[i].salary}`;
                                if (res[i].manager_id === null) {
                                    res[i].manager_id = "N/A";
                                }
                                for (let j = 0; j < res.length; j++) {
                                    if (res[i].manager_id === res[j].id) {
                                        res[i].manager_id = `${res[i].manager_id} - ${res[j].first_name} ${res[j].last_name}`;
                                    }
                                }
                            }
                            console.table(res);
                        });
                    });
                });
                break;
            case "View All Roles":
                var query = connection.query("SELECT role.title, role.salary, department.department FROM role INNER JOIN department ON (role.department_id = department.id) ORDER BY department", function(err, res) {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        res[i].salary = `$${res[i].salary}`
                    }
                    console.table(res);
                });  
                break;
            case "View Payroll by Department":
                var query = connection.query("SELECT department FROM department", function(err, res) {
                    if (err) throw err;
                    let choices = res.map(x => x.department);
                    var inquiry = {
                        name: "answer",
                        type: "list",
                        message: "Which department would you like to view?",
                        choices: [...choices]
                    };
                    inquirer.prompt([inquiry]).then(function(data) {
                        var query2 = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE ? ORDER BY role.salary DESC", {department : data.answer}, function(err, res) {
                            if (err) throw err;
                            var total = 0;
                            for (let i = 0; i < res.length; i++) {
                                total += parseInt(res[i].salary);
                                res[i].salary = `$${res[i].salary}`;
                                if (res[i].manager_id === null) {
                                    res[i].manager_id = "N/A";
                                }
                                for (let j = 0; j < res.length; j++) {
                                    if (res[i].manager_id === res[j].id) {
                                        res[i].manager_id = `${res[i].manager_id} - ${res[j].first_name} ${res[j].last_name}`;
                                    }
                                }
                            }
                            console.table(res)
                            console.log(`Department Payroll: $${total}`);
                        });
                    });
                });
                break;
            case "View Total Payroll":
                var query = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) ORDER BY role.salary DESC", function(err, res) {
                    if (err) throw err;
                    var total = 0;
                    for (let i = 0; i < res.length; i++) {
                        total += parseInt(res[i].salary);
                        res[i].salary = `$${res[i].salary}`;
                        if (res[i].manager_id === null) {
                            res[i].manager_id = "N/A";
                        }
                        for (let j = 0; j < res.length; j++) {
                            if (res[i].manager_id === res[j].id) {
                                res[i].manager_id = `${res[i].manager_id} - ${res[j].first_name} ${res[j].last_name}`;
                            }
                        }
                    }
                    console.table(res);
                    console.log(`Total Payroll: $${total}`);
                });  
                break;
        }
    }
});

// View Options
// Employees by Department
// Employees by Manager
// Roles by Department
// Payroll by Department
// Company Payroll Budget

// Update Options
// Update Employee
// Update Manager
// Update Role
// Update Department

// Add Options
// Add Employee
// Add Manager
// Add Role
// Add Department

// Remove Options
// Remove Employee
// Remove Manager
// Remove Role
// Remove Department
