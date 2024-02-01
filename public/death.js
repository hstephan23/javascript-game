const mysql = require('mysql2/promise');
require('dotenv').config();

class Death {
    constructor() {
         // the this.db is the creating a connection to the database, will be reused frequently
         this.db = mysql.createPool({
            // used dotenv to protect data
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    // method to end the game when the user dies
    async endGame(character, gold) {
        // pull the name from the previously committed inquirer
        const name = character.name;
        const classType = character.class;
        const sql = `INSERT INTO scoreboard (name, gold, class) VALUES ('${name}', ${gold}, '${classType}');`;
        try {
            const [result] = await this.db.query(sql);
            console.log("Thanks for playing! You have been logged!");
            const scoreboardSql = `SELECT * FROM scoreboard ORDER BY gold;`;
            const [results] = await this.db.query(scoreboardSql);
            console.table(results);
        }
        catch (error) {
            console.log(error)
        }
    }
};

module.exports = { Death };


