const inquirer = require("inquirer");
const util = require("util");
const cTable = require("console.table");
const questions = require("./lib/questions");
const View = require("./lib/view");
const SQL = require("./lib/sql");

// var a = Employee.inquiry("menu", "viewMenu", "updateMenu", "addMenu", "removeMenu");

inquirer.prompt([questions.menu, questions.viewMenu, questions.updateMenu, questions.addMenu, questions.removeMenu]).then(function(data) {
    if (data.viewMenu) {
        switch (data.viewMenu) {
            case "View All Employees":
                var sqlResult = SQL.search("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id)");    
                // var rendered = View.renderAllEmployees(sqlResult);
                // console.table(rendered);
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
                    console.log(inquiry);
                    inquirer.prompt([inquiry]).then(function(data) {
                        var query2 = connection.query(ViewClass.viewAllEmployees.text, {department : data.answer}, function(err, res) {
                            if (err) throw err;
                            console.table(ViewClass.renderAll(res));
                        });
                    });
                });
                break;
        }
    }
});

// View Options
// Employees by Department
// Employees by Manager
// Roles by Department
// Payroll Budget by Department
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
