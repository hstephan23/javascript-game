const inquirer = require("inquirer");
const fs = require("fs");


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
        const fileName = `${data.name.toLowerCase().split(" ").join("")}.json`;
        fs.writeFile(fileName, JSON.stringify(data, null, "\t"), (error) => 
            error ? console.log(error) : console.log("Success!")
    )
});