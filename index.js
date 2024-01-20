const inquirer = require("inquirer");
const fs = require("fs");

function ClassStats(characterName, type) {
    this.characterName = characterName;
    this.type = type;
    this.strength = 0;
    this.health = 0;
    this.money = 20;
}

ClassStats.prototype.startingValues = function () {
    if (this.type === "Warrior") {
        this.strength = 20;
        this.health = 100;
    } else if (this.type === "Archer") {
        this.strength = 10;
        this.health = 150;
    } else if (this.type === "Wizard") {
        this.strength = 15;
        this.health = 125;
    } else {
        console.log("error");
    }
}

ClassStats.prototype.introduction = function () {
    console.log(`Hello ${this.characterName}! Your class is: ${this.type}. You have ${this.health} health and a strength of ${this.strength}. Your starting money is ${this.money}`);
}


inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your character's name?"
        },
        {
            type: "list",
            name: "class",
            message: "What is your class?",
            choices: ["Warrior", "Archer", "Wizard"]
        }
    ])
    .then((data) => {
        const storedValues = new ClassStats(data.name, data.class);
        storedValues.startingValues();
        storedValues.introduction();
});
