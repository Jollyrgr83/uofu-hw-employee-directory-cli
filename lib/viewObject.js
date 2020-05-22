const SQL = require("./sql");

class Vw {
    constructor() {
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
        WHERE department.department = ?`;
        this.empByMgrText = `
        SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.department 
        FROM employee 
        INNER JOIN role 
        ON (employee.role_id = role.id) 
        INNER JOIN department 
        ON (role.department_id = department.id) 
        WHERE manager_id = ?`;
        this.getMgrText = `
        SELECT employee.id, employee.first_name, employee.last_name 
        FROM employee 
        WHERE id = ?`
        this.deptText = `
        SELECT department 
        FROM department`;
        this.mgrText = `
        SELECT id, first_name, last_name 
        FROM employee 
        WHERE manager_status = true`;
        this.allRolesText = `
        SELECT title 
        FROM role`;
    }
    getAllEmp() {
        return SQL.search(this.allEmpText);
    }
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
    empByDeptChoice() {
        return SQL.search(this.deptText).then(function(data) {
            let choices = data.map(x => x.department);
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Which department would you like to view?",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    viewEmpByDept(department) {
        return SQL.search(this.empByDeptText, [department]);
    }
    empByMgrChoice() {
        return SQL.search(this.mgrText).then(function(data) {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Which manager would you like to view?",
                choices: [...choices]
            };
            return inquiry;
        });
    }
    viewEmpByMgr(manager) {
        return SQL.search(this.empByMgrText, [manager]);
    }
    viewAllRoles() {
        return SQL.search(this.allRolesText).then(function(data) {
            return data;
        });
    }
    deptPayrollChoice() {
        return SQL.search(this.deptText).then(function(data) {
            let choices = data.map(x => x.department);
            var inquiry = {
                name: "answer",
                type: "list",
                message: "Which department would you like to view?",
                choices: [...choices]
            };
            return inquiry;    
        });
    }
}

module.exports = new Vw();
