const Discord = require("discord.js")

module.exports = {
  name: "sugerir",
  description: "Faça sua sugestão.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "tópico",
        description: "Defina o tópico.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "sugestão",
        description: "Escreva algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    let canal = interaction.guild.channels.cache.get("1213913180305236028")
    if (!canal) {
        interaction.reply(`Olá ${interaction.user}, o canal de sugestões ainda não foi configurado no script!`)
    } else {
        let sugestao = interaction.options.getString("sugestão");
        let topico = interaction.options.getString("topico");
        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle("💡 NOVA SUGESTÂO!")
        .setDescription(`**Tópico:** ${topico}\n**Sugestão de ${interaction.user}:**\n${sugestao}`);

        canal.send({ embeds: [embed] }).then( (sentMessage) => {

      sentMessage.react("👍");
      sentMessage.react("👎");
        }).catch( () => {
            interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!` })
        })
    }

  }
}