const inquirer = require("inquirer");

const q = require("./lib/questions");
const Menu = require("./lib/menuObject");


function initMenu() {
    inquirer.prompt([q.menu, q.viewMenu, q.updateMenu, q.addMenu, q.removeMenu]).then(function(data) {
        if (data.viewMenu) {
            Menu.viewMenuHandler(data.viewMenu).then(function(data) {
                continuePrompt();
            });
        }
        else if (data.updateMenu) {
            Menu.updateMenuHandler(data.updateMenu).then(function(data) {
                continuePrompt();
            });
        }
        else if (data.addMenu) {
            Menu.addMenuHandler(data.addMenu).then(function(data) {
                continuePrompt();
            });
        }
        else if (data.removeMenu) {
            Menu.removeMenuHandler(data.removeMenu).then(function(data) {
                continuePrompt();
            });
        }
    });
}

function continuePrompt() {
    inquirer.prompt([q.continue]).then(function(data) {
        if (data.continue === true) {
            initMenu();
        }
        else {
            console.log("Have a good day!");
        }
    });
}

initMenu();
