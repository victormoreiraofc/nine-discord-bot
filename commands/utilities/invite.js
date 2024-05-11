const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "convidar",
  description: "Envia o link do convite para me adicionar em outros servidores.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const up = Math.floor(client.uptime / 60000) % 60;

    let embed = new Discord.EmbedBuilder()
    .setColor("#2B2D31")
    .setDescription(`Quer me adicionar a outros servidores do Discord? Clique no botão abaixo para me adicionar a outro servidor!\n\n Se você quiser personalizar algumas configurações, como meus sistemas, acesse o painel de configuração usando comandos iniciados com /config.\n\n Além disso, sinta-se à vontade para entrar no nosso servidor de suporte, o [Nine Discord](https://discord.gg/r8uQxUfRqq), onde você pode dar sugestões, relatar bugs e muito mais!`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        const botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setURL("https://discord.com/oauth2/authorize?client_id=1210605474114969720&permissions=8&scope=applications.commands+bot")
            .setLabel("Convidar")
            .setStyle(Discord.ButtonStyle.Link)
        )

        interaction.reply({ embeds: [embed], components: [botao] });
  }
}