const inquirer = require("inquirer");
const SQL = require("./sql");

class View {
    constructor() {
        // text used for SQL functions
        this.allEmpText = `
        SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
        FROM employee 
        INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department 
        ON (role.department_id = department.id)`;
        this.empByDeptText = `
        SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
        FROM employee 
        INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department 
        ON (role.department_id = department.id) 
        WHERE department.id = ?`;
        this.empByMgrText = `
        SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
        FROM employee 
        INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department 
        ON (role.department_id = department.id) 
        WHERE manager_id = ?`;
        this.deptText = `
        SELECT id, department 
        FROM department`;
        this.mgrText = `
        SELECT id, first_name, last_name 
        FROM employee 
        WHERE manager_status = true`;
        this.allRolesText = `
        SELECT id, title 
        FROM role`;
    }
    // builds inquirer prompt objects based on SQL search lists
    inquiry(choices, type, message) {
        return {
            name: "answer",
            type: type,
            message: message,
            choices: [...choices]
        };
    }
    // returns all employees and associated data from SQL search
    getAllEmp() {
        return SQL.search(this.allEmpText);
    }
    // renders employee data by replacing ids with associated text and calculates payroll
    renderAllEmp(result) {
        var data = {
            total: 0,
            result: [...result]
        };
        for (let i = 0; i < data.result.length; i++) {
            data.total += parseInt(data.result[i].salary);
            data.result[i].salary = `$${data.result[i].salary}`;
            if (data.result[i].manager_id === null) {
                data.result[i].manager_id = "N/A";
            }
            for (let j = 0; j < data.result.length; j++) {
                if (data.result[i].manager_id === data.result[j].id) {
                    data.result[i].manager_id = `${data.result[i].manager_id} - ${data.result[j].first_name} ${data.result[j].last_name}`;
                }
            }
        }
        return data;
    }
    // get department list for inquirer prompt
    getDeptList() {
        return SQL.search(this.deptText).then((data) => {
            let choices = data.map(x => `${x.id} - ${x.department}`);
            return this.inquiry(choices, "list", "Please select a department:");
        });
    }
    // get manager list for inquirer prompt
    getMgrList() {
        return SQL.search(this.mgrText).then((data) => {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            return this.inquiry(choices, "list", "Which manager would you like to view?");
        });
    }
    // returns list of all employees
    viewAllEmp() {
        return this.getAllEmp().then((data) => {
            return this.renderAllEmp(data);
        });
    }
    // returns list of all employees in selected department
    viewDeptEmp() {
        return this.getDeptList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return SQL.search(this.empByDeptText, [parseInt(arr[0])]).then((data) => {
                    return this.renderAllEmp(data);
                });
            });
        });
    }
    // returns list of all employees reporting to selected manager
    viewMgrEmp() {
        return this.getMgrList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return SQL.search(this.empByMgrText, [parseInt(arr[0])]).then((data) => {
                    return this.renderAllEmp(data);
                });
            });
        });
    }
    // returns list of all roles
    viewAllRoles() {
        return SQL.search(this.allRolesText);
    }
}

module.exports = View;
