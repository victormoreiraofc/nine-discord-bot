const fs = require('fs');
const client = require('../index');

const slashCommands = [];

fs.readdir('./commands', (err, folders) => {
    if (err) return console.error('Erro ao ler o diretório de comandos:', err);
    
    folders.forEach(folder => {
        fs.readdir(`./commands/${folder}`, (err, files) => {
            if (err) return console.error(`Erro ao ler o diretório ${folder} de comandos:`, err);
            
            files.forEach(file => {
                const command = require(`../commands/${folder}/${file}`);
                if (!command.name) return console.warn(`O arquivo ${file} não possui um nome de comando válido.`);
                
                client.slashCommands.set(command.name, command);
                slashCommands.push(command);
            });
        });
    });
});

client.on('ready', () => {
    const guilds = client.guilds.cache;
    for (let server of guilds) {
        server[1].commands.set(slashCommands);
    }
});
