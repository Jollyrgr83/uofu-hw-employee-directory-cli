// validate function for non-numeric inputs
function validateString(answer) {
    if (answer != "" && isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}
// validate function for numeric inputs
function validateNumber(answer) {
    if (answer != "" && !isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}
// inquirer questions
const questions = {
    nameString: {
        type: "input",
        name: "name",
        message: "Answer is string and not empty",
        validate: validateString
    },
    nameNumber: {
        type: "input",
        name: "name",
        message: "Answer is number and not empty",
        validate: validateNumber
    },
    continue: {
        type: "confirm",
        name: "continue",
        message: "Would you like to perform another action?",
    },
    menu: {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
            "View",
            "Update",
            "Add",
            "Remove"
        ]
    },
    viewMenu: {
        type: "list",
        name: "viewMenu",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View Employees by Department",
            "View Employees by Manager",
            "View All Roles",
            "View Payroll by Department",
            "View Total Payroll"
        ],
        // when: (answers) => answers.menu === 'View',
    },
    updateMenu: {
        type: "list",
        name: "updateMenu",
        message: "What would you like to do?",
        choices: [
            "Update Employee",
            "Update Manager",
            "Update Role",
            "Update Department"
        ],
        when: (answers) => answers.menu === 'Update',
    },
    addMenu: {
        type: "list",
        name: "addMenu",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "Add Manager",
            "Add Role",
            "Add Department"
        ],
        when: (answers) => answers.menu === 'Add',
    },
    removeMenu: {
        type: "list",
        name: "removeMenu",
        message: "What would you like to do?",
        choices: [
            "Remove Employee",
            "Remove Manager",
            "Remove Role",
            "Remove Department"
        ],
        when: (answers) => answers.menu === 'Remove',
    }
};

module.exports = questions;
