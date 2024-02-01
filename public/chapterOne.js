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
        const orcSql = `SELECT * FROM monsters WHERE name = 'orc';`;
        try {
            const [result] = await this.db.query(orcSql);
            let isAlive = true;
            while (isAlive) {
                // your turn
                result[0].health -= stats.strength;
                console.log(`You attacked the orc for ${stats.strength} damage! It now has ${result[0].health} health remaining!`);
                if (result[0].health < 0){
                    isAlive = false;
                    console.log('You were able to survive and kill the orc!');
                } 
                // orcs turn
                stats.health -= result[0].strength;
                console.log(`You were attacked by the orc for ${result[0].strength} damage! You have ${stats.health} health remaining!`);
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
}

module.exports = {
    ChapterOne
};