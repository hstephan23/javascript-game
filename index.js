const { ClassStats } = require('./public/character-stats');
const { ChapterOne } = require('./public/chapterOne');
const { Death } = require('./public/death');

let gold = 0;

async function main() {
    console.log('Welcome to your next great adventure!!!');
    // instances
    const ClassStatsInstance = new ClassStats();
    const ChapterOneInstance = new ChapterOne();
    const DeathInstance = new Death()
    // introduction to game
    const classOptions = await ClassStatsInstance.pullClassOptions();
    const character = await ClassStats.promptClassStats(classOptions);
    const stats = await ClassStatsInstance.displayStats(character.name, character.class);
    const pathChoice = await ChapterOne.promptPath();
    // switch case for pathChoice
    switch (pathChoice.path) {
        case 'Right':
            console.log('You made a poor decision, you run into an orc!');
            console.log('It is time to fight! He looks stronger than you though!! :(')
            const orc = await ChapterOneInstance.fightOrc(stats);
            const orcDeath = await DeathInstance.endGame(character, gold);
            break;
        case 'Left':
            console.log('You trip while going to the left, you fall down a hill into a forest.');
            break;
        case 'Turn Around':
            console.log("You decide adventuring isn't for you, you turn around and go home to live out your days");
            const turnAround = await DeathInstance.endGame(character, gold);
            break;
        default:
            console.log('error');
            break;
    }
};

main();




