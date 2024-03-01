const os = require('os');
const client = require('../index');
const chalk = require('chalk');

client.on('ready', () => {
    const computerName = os.hostname();
    console.clear();
    console.log(chalk.green(`✔  bot started successfully!`));
    console.log(chalk.green(`✔  bot connected in ${client.guilds.cache.size} server(s),📦 version: 14.14.1.`));
    console.log(chalk.green(`\u{27A1}  connected as ${computerName}.`));
    console.log('');
    console.log(chalk.green(`✔  commands registered successfully!`));
    console.log(chalk.green(`✔  all system working successfully!`));
});