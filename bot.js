const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, () => {
    console.clear() 
    console.log(`Started successfully in (${client.guilds.cache.size}) servers.`); // Mensagem de carregamento concluído.
});

client.login(token);