const Discord = require("discord.js")

module.exports = {
  name: "avatar",
  description: "Veja o avatar de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],

    run: async (client, interaction) => {

        const user = interaction.options.getUser('usuário');

        let embed = new Discord.EmbedBuilder()
        .setTitle(`🖼 ${user.username}`)
        .setFooter({ text: `Uh-oh! Parece que o avatar está tão bem escondido quanto uma batata em um jogo de 'esconde-esconde'! 🥔` })
        .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setURL(user.displayAvatarURL({ dynamic: true }))
            .setStyle(Discord.ButtonStyle.Link)
            .setLabel(`✨ Abrir avatar de ${user.username}.`)
        )
    
        interaction.reply({ embeds: [embed], components: [botao] })
    
    
        
      }
    }