const inquirer = require("inquirer");
const cTable = require("console.table");

const q = require("./questions");
const Vw = require("./viewObject");
const Ed = require("./editObject");

class Menu {
    viewMenuHandler(viewMenuChoice) {
        switch (viewMenuChoice) {
            case "View All Employees":
                return Vw.getAllEmp().then(function(data) {
                    var output = Vw.renderAllEmp(data);
                    console.table(output.result);
                    return output;
                });
                break;
            case "View Employees by Department":
                return Vw.empByDeptChoice().then(function(inquiry) {
                    return inquirer.prompt([inquiry]).then(function(data) {
                        return Vw.viewEmpByDept(data.answer).then(function(res) {
                            var output = Vw.renderAllEmp(res);
                            console.table(output.result);
                            return output;
                        });
                    });
                });
                break;
            case "View Employees by Manager":
                return Vw.empByMgrChoice().then(function(inquiry) {
                    return inquirer.prompt([inquiry]).then(function(data) {
                        var arr = data.answer.split(" ");
                        return Vw.viewEmpByMgr(parseInt(arr[0])).then(function(data) {
                            var output = Vw.renderAllEmp(data);
                            console.table(output.result);
                            return output;
                        });
                    });
                });
                break;
            case "View All Roles":
                return Vw.viewAllRoles().then(function(data) {
                    console.table(data);
                    return data;
                });
                break;
            case "View Payroll by Department":
                return Vw.deptPayrollChoice().then(function(inquiry) {
                    return inquirer.prompt([inquiry]).then(function(data) {
                        return Vw.viewEmpByDept(data.answer).then(function(data) {
                            var output = Vw.renderAllEmp(data);
                            console.table(output.result);
                            console.log(`Total: $${output.total}`);
                            return output;
                        });                            
                    });
                });
                break;
            case "View Total Payroll":
                return Vw.getAllEmp().then(function(data) {
                    var output = Vw.renderAllEmp(data);
                    console.table(output.result);
                    console.log(`Total: $${output.total}`);
                    return output;
                });
                break;
        }
    }
    updateMenuHandler(updateMenuChoice) {

    }
    addMenuHandler(addMenuChoice) {

    }
    removeMenuHandler(removeMenuChoice) {

    }
}

module.exports = new Menu();
