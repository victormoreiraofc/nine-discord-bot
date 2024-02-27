const client = require('../index')
const chalk = require('chalk')

client.on('ready', () => {
    console.log(chalk.green(`Iniciado com sucesso em ${client.guilds.cache.size} servidore(s).`))
})
