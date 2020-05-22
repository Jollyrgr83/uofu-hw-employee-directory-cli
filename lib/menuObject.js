const inquirer = require("inquirer");
const cTable = require("console.table");

const q = require("./questions");
const Ed = require("./editObject");

class Menu {
    viewMenuHandler(viewMenuChoice) {
        switch (viewMenuChoice) {
            case "View All Employees":
                return Ed.viewAllEmp().then((data) => {
                    console.table(data.result);
                    return data;
                });
                break;
            case "View Employees by Department":
                return Ed.viewDeptEmp().then((data) => {
                    console.table(data.result);
                    return data;
                });
                break;
            case "View Employees by Manager":
                return Ed.viewMgrEmp().then((data) => {
                    console.table(data.result);
                    return data;
                });
                break;
            case "View All Roles":
                return Ed.viewAllRoles().then((data) => {
                    console.table(data);
                    return data;
                });
                break;
            case "View Payroll by Department":
                return Ed.viewDeptEmp().then((data) => {
                    console.table(data.result);
                    console.log(`Total: $${data.total}`);
                    return data;
                });
                break;
            case "View Total Payroll":
                return Ed.viewAllEmp().then((data) => {
                    console.table(data.result);
                    console.log(`Total: $${data.total}`);
                    return data;
                });
                break;
        }
    }
    updateMenuHandler(updateMenuChoice) {
        switch (updateMenuChoice) {
            case "Update Employee":
                return Ed.updateEmp().then((data) => {
                    return data;
                });
                break;
            case "Update Role":
                return Ed.updateRole().then((data) => {
                    return data;
                });
                break;
            case "Update Department":
                return Ed.updateDept().then((data) => {
                    return data;
                });
                break;
        }
    }
    addMenuHandler(addMenuChoice) {
        switch (addMenuChoice) {
            case "Add Employee":
                return Ed.addEmp().then((data) => {
                    return data;
                });
                break;
            case "Add Role":
                return Ed.addRole().then((data) => {
                    return data;
                });
                break;
            case "Add Department":
                return Ed.addDept().then((data) => {
                    return data;
                });
                break;
        }
    }
    removeMenuHandler(removeMenuChoice) {
        switch (removeMenuChoice) {
            case "Remove Employee":
                return Ed.delEmp().then((data) => {
                    return data;
                });
                break;
            case "Remove Role":
                return Ed.delRole().then((data) => {
                    return data;
                });
                break;
            case "Remove Department":
                return Ed.delDept().then((data) => {
                    return data;
                });
                break;
        }
    }
}

module.exports = new Menu();
