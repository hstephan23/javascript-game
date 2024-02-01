const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();

class ChapterOne {
    constructor () {
        // the this.db is the creating a connection to the database, will be reused frequently
        this.db = mysql.createPool({
            // used dotenv to protect data
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    };

    async fightOrc(stats) {
        // query to chose everything from the monster table about orcs
        const orcSql = `SELECT * FROM monsters WHERE name = 'orc';`;
        try {
            const [result] = await this.db.query(orcSql);
            let isAlive = true;

            // a function to delay the console.logs printing out 
            async function delay(ms) {
                return new Promise(resolve => setTimeout(resolve,  ms));
            }

            while (isAlive) {
                // your turn
                result[0].health -= stats.strength;
                console.log(`You attacked the orc for ${stats.strength} damage! It now has ${result[0].health} health remaining!`);
                await delay(2000);
                if (result[0].health < 0){
                    isAlive = false;
                    console.log('You were able to survive and kill the orc!');
                } 
                // orc's turn
                stats.health -= result[0].strength;
                console.log(`You were attacked by the orc for ${result[0].strength} damage! You have ${stats.health} health remaining!`);
                await delay(2000);
                if (stats.health < 0) {
                    isAlive = false;
                    console.log('You died!!');
                }
            }
            return stats
        }
        catch (err) {
            console.log(err);
        }
    };

    async fightGoblin(stats) {
        // query to select stats by goblin
        const goblinSql = `SELECT * FROM monsters WHERE name = 'goblin';`
        try {
            const [result] = await this.db.query(goblinSql);
            let isAlive = true;

            // a function to delay the console.logs printing out 
            async function delay(ms) {
                return new Promise(resolve => setTimeout(resolve,  ms));
            }
            
            while (isAlive) {
                // your turn
                result[0].health -= stats.strength;
                console.log(`You attacked the goblin for ${stats.strength} damage! It now has ${result[0].health} health remaining!`);
                await delay(2000);
                if (result[0].health < 0){
                    console.log('You were able to survive and kill the goblin!');
                    return true;
                } 
                // goblin's turn
                stats.health -= result[0].strength;
                console.log(`You were attacked by the goblin for ${result[0].strength} damage! You have ${stats.health} health remaining!`);
                await delay(2000);
                if (stats.health < 0) {
                    console.log('You died!!');
                    return false;
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    static async promptPath() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'path',
                message: 'You see a fork in the path, do you turn right or left? Or do you turn back?',
                choices: ['Right', 'Left', 'Turn Around']
            }
        ]);
    };

    static async promptGoblin() {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'goblin',
                message: 'You see a goblin ahead, what do you do?',
                choices: ['Fight it!', 'Hide!', 'Run!']
            }
        ])
    };
}

module.exports = {
    ChapterOne
};