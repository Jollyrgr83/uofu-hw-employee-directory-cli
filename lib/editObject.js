const inquirer = require("inquirer");
const SQL = require("./sql");
const View = require("./viewObject");
const q = require("./questions");

class Edit extends View {
    constructor() {
        super();
        // text used for SQL functions
        this.deptText = `
        SELECT id, department 
        FROM department`;
        this.updateEmpText = `
        UPDATE employee 
        SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?, manager_status = ?  
        WHERE id = ?`;
        this.updateRoleText = `
        UPDATE role 
        SET title = ?, salary = ?, department_id = ?  
        WHERE id = ?`;
        this.updateDeptText = `
        UPDATE department
        SET department = ? 
        WHERE id = ?`;
        this.updateMgrText = `
        UPDATE employee 
        SET manager_id = ?
        WHERE id = ?`;
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
        this.delEmpText = `
        DELETE FROM employee 
        WHERE id = ?`;
        this.delRoleText = `
        DELETE FROM role
        WHERE id = ?`;
        this.delDeptText = `
        DELETE FROM department
        WHERE id = ?`;
    }
    // get employee list for employee update inquirer prompt
    getEmpList() {
        return this.getAllEmp().then((data) => {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            return this.inquiry(choices, "list", "Please select an employee:");
        });
    }
    // get employee list for updating manager links in employee update
    getEmpListCheckbox() {
        return this.getAllEmp().then((data) => {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            return this.inquiry(choices, "checkbox", "Which employees report to this manager?");
        });
    }
    // get manager list for inquirer prompt
    getMgrList() {
        return SQL.search(this.mgrText).then((data) => {
            let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
            choices.push("This employee does not report to a manager")
            return this.inquiry(choices, "list", "Which manager does this employee report to?");
        });
    }
    // get role list for inquirer prompt
    getRoleList() {
        return this.viewAllRoles().then((data) => {
            let choices = data.map(x => `${x.id} - ${x.title}`);
            return this.inquiry(choices, "list", "Please select a role:");
        });
    }
    // build employee using inquirer prompts
    buildEmp() {
        const emp = {
            first_name: "",
            last_name: "",
            role_id: 0,
            manager_id: 0,
            manager_status: false,
            reports: []
        };
        return inquirer.prompt([q.firstName, q.lastName]).then((data) => {
            emp.first_name = data.firstName;
            emp.last_name = data.lastName;
            return this.getRoleList().then((inquiry) => {
                return inquirer.prompt([inquiry]).then((data) => {
                    var arr = data.answer.split(" ");
                    emp.role_id = parseInt(arr[0]);
                    return this.getMgrList().then((inquiry) => {
                        return inquirer.prompt([inquiry]).then((data) => {
                            if (data.answer === "This employee does not report to a manager") {
                                emp.manager_id = null;
                            }
                            else {
                                var arr = data.answer.split(" ");
                                emp.manager_id = parseInt(arr[0]);
                            }
                            return inquirer.prompt([q.mgrStatus]).then((data) => {
                                if (!data.mgrStatus) {
                                    emp.manager_status = false;
                                }
                                else {
                                    emp.manager_status = true;
                                    return this.getEmpListCheckbox().then((inquiry) => {
                                        return inquirer.prompt([inquiry]).then((data) => {
                                            var reports = [...data.answer];
                                            for (let i = 0; i < reports.length; i++) {
                                                var a = reports[i].split(" ");
                                                reports[i] = parseInt(a[0]);
                                            }
                                            emp.reports = [...reports];
                                            return emp;
                                        });
                                    });
                                };
                            });
                        });
                    });
                });
            }); 
        });
    }
    // build role using inquirer prompts
    buildRole() {
        const role = {
            title: "",
            salary: 0,
            department_id: 0
        };
        return inquirer.prompt([q.title, q.salary]).then((data) => {
            role.title = data.title;
            role.salary = data.salary;
            return this.getDeptList().then((inquiry) => {
                return inquirer.prompt([inquiry]).then((data) => {
                    var arr = data.answer.split(" ");
                    role.department_id = parseInt(arr[0]);
                    return role;
                });
            });
        });
    }
    // build department using inquirer prompts
    buildDept() {
        const department = {
            department: ""
        };
        return inquirer.prompt([q.department]).then((data) => {
            department.department = data.department;
            return department;
        })
    }
    // update employee table with new information
    updateEmp() {
        return this.getEmpList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                const empID = parseInt(arr[0]);
                return this.buildEmp().then((data) => {
                    var inputs = [data.first_name, data.last_name, data.role_id, data.manager_id, data.manager_status, empID];
                    const reports = [...data.reports];
                    return SQL.update(this.updateEmpText, inputs).then((res) => {
                        for (let i = 0; i < reports.length; i++) {
                            SQL.update(this.updateMgrText, [empID, reports[i]]);
                        }
                    });
                });
            });
        });
    }
    // update role table with new information
    updateRole() {
        return this.getRoleList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                const roleID = parseInt(arr[0]);
                return this.buildRole().then((data) => {
                    var inputs = [data.title, data.salary, data.department_id, roleID];
                    return SQL.update(this.updateRoleText, inputs).then((res) => {
                        return res;
                    });
                });
            });
        });
    }
    // update department table with new information
    updateDept() {
        return this.getDeptList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                const deptID = parseInt(arr[0]);
                return this.buildDept().then((data) => {
                    return SQL.update(this.updateDeptText, [data.department, deptID]).then((res) => {
                        return res;
                    });
                });
            });
        });
    }
    // add new employee information to employee table
    addEmp() {
        return this.buildEmp().then((data) => {
            var inputs = [data.first_name, data.last_name, data.role_id, data.manager_id, data.manager_status];
            const FN = data.first_name;
            const LN = data.last_name
            const reports = [...data.reports];
            return SQL.insert(this.addEmpText, inputs).then((data) => {
                return SQL.search("SELECT id FROM employee WHERE first_name = ? AND last_name = ?", [FN, LN]).then((data) => {
                    for (let i = 0; i < reports.length; i++) {
                        SQL.update(this.updateMgrText, [data[0].id, reports[i]]);
                    }
                });
            });
        });
    }
    // add new role information to role table
    addRole() {
        return this.buildRole().then((data) => {
            var inputs = [data.title, data.salary, data.department_id];
            return SQL.insert(this.addRoleText, inputs).then(function(res) {
                return res;
            });
        });
    }
    // add new department information to department table
    addDept() {
        return inquirer.prompt([q.department]).then((data) => {
            return SQL.insert(this.addDeptText, [data.department]).then(function(res) {
                return res;
            });
        });
    }
    // removes selected employee information from employee table
    delEmp() {
        return this.getEmpList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return SQL.delete(this.delEmpText, [parseInt(arr[0])]).then((res) => {
                    return res;
                });
            });
        });
    }
    // removes selected role information from role table
    delRole() {
        return this.getRoleList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return SQL.delete(this.delRoleText, [parseInt(arr[0])]).then((res) => {
                    return res;
                });
            });
        });
    }
    // removes selected department information from department table
    delDept() {
        return this.getDeptList().then((inquiry) => {
            return inquirer.prompt([inquiry]).then((data) => {
                var arr = data.answer.split(" ");
                return SQL.delete(this.delDeptText, [parseInt(arr[0])]).then((res) => {
                    return res;
                });
            });
        });
    }
}

module.exports = new Edit();
