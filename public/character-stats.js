const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();

class ClassStats {
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

    async displayStats(name, classType) {
        // pulls the specific class stats based on name
        const sql = `SELECT * FROM classes WHERE name = '${classType}';`
        try {
            const trimmedName = name.trim();
            // pull the query results
            const [results] = await this.db.query(sql);
            // work with the data
            console.log(`Hello ${trimmedName}! You are a ${results[0].name}, with a strength of ${results[0].strength}, health of ${results[0].health}, defense of ${results[0].defense}, and intelligence of ${results[0].intelligence}!`);
            return results[0];
        } catch (err) {
            console.log(err);
        }
    }

    async pullClassOptions() {
        // pulls all the classes avaible and displays them
        const sql = `SELECT name AS class_name FROM classes;`;
        try {
            // use the query to get results back
            const [results] = await this.db.query(sql);
            // use the results and do a for loop to turn it into an array which is usable by inqruirer
            const options = [];
            for (let i = 0; i < results.length; i++) {
                options.push(results[i].class_name);
            }
            return options;
        } catch (err) {
            console.log(err)
        }
    };

    static async promptClassStats(options) {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your character's name?"
            },
            {
                type: "list",
                name: "class",
                message: "What is your class?",
                choices: options
            }
        ])
    }
}

module.exports = {
    ClassStats
}
