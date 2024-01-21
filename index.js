const inquirer = require("inquirer");
const fs = require("fs");

function ClassStats(characterName, type) {
    this.characterName = characterName;
    this.type = type;
    this.strength = 0;
    this.health = 0;
    this.money = 20;
};

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
};

ClassStats.prototype.introduction = function () {
    console.log(`Hello ${this.characterName}! Your class is: ${this.type}. You have ${this.health} health and a strength of ${this.strength}. Your starting money is ${this.money}`);
};

ClassStats.prototype.listChoice = function (variableName, text, option1, option2, option3) {
   return new Promise(async (resolve, reject) => {
        try {
            const answers = await inquirer.prompt([
                {
                    type: "list",
                    name: `${variableName}`,
                    message: `${text}`,
                    choices: [`${option1}`, `${option2}`, `${option3}`]
                }
            ]);
            resolve(answers);
        } catch (error) {
            reject(error);
        }
    });
};

ClassStats.prototype.firstChoice = function (decision) {
    if (decision.firstChoice === "Right") {
        console.log("You fall down a steep hill, into a large lush forest");
    } else if (decision.firstChoice === "Left") {
        console.log("You run into an Orc. It looks really strong. Do you fight or run?");
    } else if (decision.firstChoice === "Turn Around") {
        console.log("You decide that adventuring isn't made for you, you turn around and go home.")
    } else {
        console.log(decision);
    }
}

ClassStats.prototype.death = function () {
    console.log(`Thank you for your adventure ${this.name}! You had ${this.money} when you died!`)
}

ClassStats.prototype.orcChoice = function (decision, value) {
    if (decision.firstOrc === "Run") {
        console.log("You get away safely, but trip down a hill in the process. You end up in the middle of a foreset.");
    } else if (decision.firstOrc === "Fight") {
        console.log("You are brave but foolish, you perish.")
        value.death();
    } else if (decision.firstOrc === "") {
        console.log("You are paralyzed with fear, the orc stares you down before beheading you.")
        value.death();
    }
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
        storedValues.listChoice("firstChoice", "You come across a fork in the path, do you go left, right, or turn around?", "Left", "Right", "Turn Around")
            .then((pathAnswer) => {
                storedValues.firstChoice(pathAnswer);
                if (pathAnswer.firstChoice === "Left") {
                    storedValues.listChoice("firstOrc", "What do you do?", "Run", "Fight", "Nothing")
                        .then((orcAnswer) => {
                            storedValues.orcChoice(orcAnswer, storedValues);
                        })
                }
            })
});
