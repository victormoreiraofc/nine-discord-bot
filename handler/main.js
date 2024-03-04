const fs = require('fs')
const client = require('../index')

const slashCommands = []

fs.readdir('./commands', (err, files) => {
    if (err) return console.error('Erro ao ler o diretório de comandos:', err);
    
    files.forEach(file => {
        const command = require(`../commands/${file}`);
        if (!command.name) return console.warn(`O arquivo ${file} não possui um nome de comando válido.`);
        
        client.slashCommands.set(command.name, command);
        slashCommands.push(command);
    });
});

client.on('ready', () => {
    const guilds = client.guilds.cache
    for(let servidor of guilds) {
        servidor[1].commands.set(slashCommands)
    }
})  