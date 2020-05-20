const inquirer = require("inquirer");
const util = require("util");
const cTable = require("console.table");
// function library
const View = require("./lib/view");
const SQL = require("./lib/sql");

SQL.sqlSearch("SELECT * FROM employee");

View.menu();

// runs inquirer prompt and returns answer
// function inquiry(...args) {
//     let inquiries = args.map(arg => questions[arg]);
//     return inquirer.prompt(inquiries).then(data => data);
// }

// function singleInquiry(arg) {
//     return inquirer.prompt(questions[arg]).then(data => data);
// }

// var a = Employee.inquiry("menu", "viewMenu", "updateMenu", "addMenu", "removeMenu");

// inquirer.prompt([questions.menu, questions.viewMenu, questions.updateMenu, questions.addMenu, questions.removeMenu]).then(function(data) {
//     if (data.viewMenu) {
//         switch (data.viewMenu) {
//             case "View All Employees":
//                 var query = connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id)", function(err, res) {
//                     if (err) throw err;
//                     for (let i = 0; i < res.length; i++) {
//                         // add $ to salary
//                         res[i].salary = `$${res[i].salary}`;
//                         for (let j = 0; j < res.length; j++) {
//                             if (res[i].manager_id === res[j].id) {
//                                 res[i].manager_id = `${res[i].manager_id} ${res[j].first_name} ${res[j].last_name}`;
//                             }
//                         }
//                     }
//                     console.table(res);
//                 });
//                 break;
//             case "View Employees by Department":
//                 var query = connection.query("SELECT department FROM department", function(err, res) {
//                     if (err) throw err;
//                     let choices = res.map(x => x.department);
//                     var inquiry = {
//                         name: "answer",
//                         type: "list",
//                         message: "Which department would you like to view?",
//                         choices: [...choices]
//                     };
//                     console.log(inquiry);
//                     inquirer.prompt([inquiry]).then(function(data) {
//                         var query2 = connection.query(ViewClass.viewAllEmployees.text, {department : data.answer}, function(err, res) {
//                             if (err) throw err;
//                             console.table(ViewClass.renderAll(res));
//                         });
//                     });
//                 });
//                 break;
//         }
//     }
// });

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
