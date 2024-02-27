const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Mostra informações sobre a latência do nine ao discord.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let ping = client.ws.ping;
    
        let embed_1 = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Olá ${interaction.user}, meu ping é de \`calculando...\`.`)
        .setColor("#2B2D31");
    
        let embed_2 = new Discord.EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`Olá ${interaction.user}, meu ping é de \`${ping}ms\`.`)
        .setColor("#2B2D31");
    
        interaction.reply({ embeds: [embed_1] }).then( () => {
            setTimeout( () => {
                interaction.editReply({ embeds: [embed_2] })
            }, 2000)
        })
      }
    }