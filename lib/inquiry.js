const inquirer = require("inquirer");
const questions = require("./questions");

class Inquiry {
    constructor() {

    }
    ask(question, answer) {
        console.log(questions[question]);
        inquirer.prompt(questions[question]).then(function(data) {
            return data[answer];
        });
        return data[answer];
    }
}

module.exports = new Inquiry();