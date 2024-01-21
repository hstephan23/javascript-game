const inquirer = require("inquirer");
const fs = require("fs");

function ClassStats(characterName, type) {
    this.characterName = characterName;
    this.type = type;
    this.strength = 0;
    this.health = 0;
    this.money = 20;
    this.experience = 0;
};

// this defines the starting values that the character has 
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

// this is a prototype function that displays in the console the basic stats of the character. 
ClassStats.prototype.introduction = function () {
    console.log(`Hello ${this.characterName}! Your class is: ${this.type}. You have ${this.health} health and a strength of ${this.strength}. Your starting money is ${this.money}`);
};

// this is a reusable function that creates a list based on 3 given options
ClassStats.prototype.threeListChoice = function (variableName, text, option1, option2, option3) {
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

// this is a reusable funciton that creates a list basedo n 2 given options
ClassStats.prototype.twoListChoices = function (variableName, text, option1, option2) {
    return new Promise(async (resolve, reject) => {
        try {
            const answers = await inquirer.prompt([
                {
                    type: "list",
                    name: `${variableName}`,
                    message: `${text}`,
                    choices: [`${option1}`, `${option2}`]
                }
            ]);
            resolve(answers);
        } catch (error) {
            reject(error);
        }
    });
}

// this pulls what occurs in the first choice and displays the correct string
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

// this runs if you die, pulling from the constructor
ClassStats.prototype.death = function () {
    console.log(`Thank you for your adventure ${this.name}! You had ${this.money} when you died!`)
}

// this pulls what occurs from the orc decision and displays the correct line
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

// this function is for the second main choice and displays the correct string
ClassStats.prototype.secondChoice = function (decision, value) {
    if (decision.goblin === "Fight" && this.strength >= 15) {
        console.log("You defeat the goblin, you find 12 gold on his corpse. You gain 10 experience points");
        this.money += 12;
        this.experience += 10;
    } else if (decision.goblin === "Fight" && this.strength < 15) {
        console.log("You try your hardest, but utlimately are unsuccessful. You die!") 
        value.death();
    } else if (decision.goblin === "Run") {
        console.log("You make the safe decision, you get away safely. You don't gain anything, but didn't die either.");
    } else if (decision.goblin === "Hide" && this.type === "Archer") {
        console.log("You wait for the right chance, the goblin turns his back on you and you unleash a shot from your bow.");
        console.log("You find 12 gold and gain 10 experience.");
        this.money += 12;
        this.experience += 10;
    } else if (decision.goblin === "Hide" && this.strength >= 15) {
        console.log("You decide to hide, but realize that adventuring isn't for you. You decide to turn home while you still can");
        console.log(`Thanks for playing ${this.name}! You have ${this.money} gold.`);
    } else {
        console.log("Error");
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
        storedValues.threeListChoice("firstChoice", "You come across a fork in the path, do you go left, right, or turn around?", "Left", "Right", "Turn Around")
            .then((pathAnswer) => {
                storedValues.firstChoice(pathAnswer);
                if (pathAnswer.firstChoice === "Left") {
                    storedValues.threeListChoice("firstOrc", "What do you do?", "Run", "Fight", "Nothing")
                        .then((orcAnswer) => {
                            storedValues.orcChoice(orcAnswer, storedValues);
                        });
                } 
                storedValues.threeListChoice("goblin", "You see a goblin, what do you do?", "Run", "Fight", "Hide")
                    .then((goblinAnswer) => {
                        storedValues.secondChoice(goblinAnswer, storedValues);
                    })

            })
});
