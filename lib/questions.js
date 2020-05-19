const questions = {
    name: {
        type: "input",
        name: "name",
        message: "Question text goes here"
    },
    name2: {
        type: "list",
        name: "name",
        message: "Question text goes here",
        choices: [
            "Choice 1",
            "Choice 2"
        ]
    }
};

module.exports = questions;