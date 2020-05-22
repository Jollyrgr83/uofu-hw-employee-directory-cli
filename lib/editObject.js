const inquirer = require("inquirer");
const q = require("./questions");
const SQL = require("./sql");
const Vw = require("./viewObject");

class Edit {
    constructor() {
        this.empText = `
        SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
        FROM employee 
        INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department 
        ON (role.department_id = department.id)`;
        this.mgrText = `
        SELECT id, first_name, last_name 
        FROM employee 
        WHERE manager_status = true`;
        this.rolesText = `
        SELECT id, title 
        FROM role`;
        this.depText = `
        SELECT id, department 
        FROM department`;
        this.addEmpText = `
        INSERT INTO employee 
        (first_name, last_name, role_id, manager_id, manager_status) 
        VALUES (?, ?, ?, ?, ?)`;
        this.addRoleText = `
        INSERT INTO role 
        (title, salary, department_id) 
        VALUES (?, ?, ?)`;
        this.addDeptText = `
        INSERT INTO department 
        (department) 
        VALUES (?)`;
    }
    // id, first_name, last_name, role_id, manager_id, manager_status
    getRoles() {
        return SQL.search(this.rolesText).then(function(data) {
            let choices = data.map(x => `${x.id} - ${x.title}`);
            choices.push("Add new role");
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Please select a role for this employee:",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    getMgrs() {
        return SQL.search(this.mgrText).then(function(data) {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            choices.push("This employee does not have a manager");
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Please select a manager for this employee:",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    getEmps() {
        return SQL.search(this.empText).then(function(data) {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name} - ${x.title}`);
            var inquiry = {
                name: "answer",
                type: "checkbox",
                message: "Please select the employee(s) that report to this manager:",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    getDepts() {
        return SQL.search(this.depText).then(function(data) {
            let choices = data.map(x => `${x.id} - ${x.department}`);
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Please select this role's department:",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    updateNames() {
        return inquirer.prompt([q.firstName, q.lastName]).then(function(data) {
            return data;
        });
    }
    updateEmpRole() {
        return this.getRoles().then(function(inquiry) {
            return inquirer.prompt([inquiry]).then(function(data) {
                var arr = data.answer.split(" ");
                return parseInt(arr[0]);
            });
        });
    }
    updateMgr() {
        return this.getMgrs().then(function(inquiry) {
            return inquirer.prompt([inquiry]).then(function(data) {
                var arr = data.answer.split(" ");
                return parseInt(arr[0]);
            });
        });
    }
    updateReports() {
        return this.getEmps().then(function(inquiry) {
            return inquirer.prompt([inquiry]).then(function(data) {
                var arr = data.answer;
                for (let i = 0; i < arr.length; i++) {
                    var a = arr[i].split(" ");
                    arr[i] = parseInt(a[0]);
                }
                return arr;
            });
        });
    }
    updateRoleInfo() {
        return inquirer.prompt([q.title, q.salary]).then(function(data) {
            return data;
        });
    }
    updateRoleDept() {
        return this.getDepts().then(function(inquiry) {
            return inquirer.prompt([inquiry]).then(function(data) {
                var arr = data.answer.split(" ");
                return parseInt(arr[0]);
            });
        });
    }
    editEmp() {
        const empObject = {
            first_name: "",
            last_name: "",
            role_id: 0,
            manager_id: 0,
            manager_status: false
        };
        return this.updateNames().then((data) => {
            empObject.first_name = data.firstName;
            empObject.last_name = data.lastName;
            return this.updateEmpRole().then((data) => {
                empObject.role_id = data;
                return this.updateMgr().then((data) => {
                    empObject.manager_id = data;
                    return inquirer.prompt([q.mgrStatus]).then(function(data) {
                        if (!data.mgrStatus) {
                            empObject.manager_status = false;
                        }
                        else {
                            empObject.manager_status = true;
                        }
                        return [empObject.first_name, empObject.last_name, empObject.role_id, empObject.manager_id, empObject.manager_status];
                    });
                });
            }); 
        });
    }
    editRole() {
        const roleObject = {
            title: "",
            salary: 0,
            department_id: 0
        };
        return this.updateRoleInfo().then((data) => {
            roleObject.title = data.title;
            roleObject.salary = data.salary;
            return this.updateRoleDept().then((data) => {
                roleObject.department_id = data;
                return [roleObject.title, roleObject.salary, roleObject.department_id];
            });
        });
    }
    addEmp() {
        return this.editEmp().then((data) => {
            return SQL.insert(this.addEmpText, data).then(function(res) {
                return res;
            });
        });
    }
    addRole() {
        return this.editRole().then((data) => {
            return SQL.insert(this.addRoleText, data).then(function(res) {
                return res;
            });
        });
    }
    addDept() {
        return inquirer.prompt([q.department]).then((data) => {
            return SQL.insert(this.addDeptText, [data.department]).then(function(res) {
                return res;
            });
        });
    }
}

module.exports = new Edit();
