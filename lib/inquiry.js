const inquirer = require("inquirer");
const questions = require("./questions");

class Inquiry {
    constructor() {

    }
    ask(question, answer) {
        if (answer === undefined) {
            answer = question;
        }
        var data = inquirer.prompt(questions[question]).then(function(data) {
            return data;
        });
        console.log("data", data);
        return data[answer];
    }
}

module.exports = new Inquiry();