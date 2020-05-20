const cTable = require("console.table");
const Inquiry = require("./inquiry");
const SQL = require("./sql");

class View {
    constructor() {
        this.viewAllEmployees = {
            text : "SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department FROM employee INNER JOIN role ON (employee.role_id = role.id) INNER JOIN department ON (role.department_id = department.id) WHERE ?"
        };
        this.searchDepartment = {};
    }
    menu() {
        var answer = Inquiry.ask("viewMenu", "answer");
        switch (answer) {
            case "View All Employees": 
                this.viewAllEmployees();
                break;
            case "View Employees by Department": 
                this.viewEmployeesByDepartment();
                break;
            case "View Employees by Manager": 
                this.viewEmployeesByManager();
                break;
            case "View All Roles": 
                this.viewAllRoles();
                break;
            case "View Payroll by Department": 
                this.viewPayrollByDepartment();
                break;
            case "View Total Payroll": 
                this.viewTotalPayroll();
                break;
        }
    }
    viewAllEmployees() {
        
    }
// var query = connection.query("SELECT department FROM department", function(err, res) {
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








    renderAll(res) {
        for (let i = 0; i < res.length; i++) {
            // add $ to salary
            res[i].salary = `$${res[i].salary}`;
            for (let j = 0; j < res.length; j++) {
                if (res[i].manager_id === res[j].id) {
                    res[i].manager_id = `${res[i].manager_id} ${res[j].first_name} ${res[j].last_name}`;
                }
            }
        }
        return res;
    }
}

module.exports = new View();
