const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Mostra informações sobre a latência do nine ao discord.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let ping = client.ws.ping;
    
        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Meu ping atual é de ${ping}ms.`)
        .setColor("#2B2D31");
    
        interaction.reply({ embeds: [embed] }).then( () => {
        })
      }
    }