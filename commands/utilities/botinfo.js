const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "botinfo",
  description: "Veja informações do bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const up = Math.floor(client.uptime / 60000) % 60;

    let embed = new Discord.EmbedBuilder()
    .setColor("#2B2D31")
    .setTitle(`🔎 Informações do BOT`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .addFields(
        {name: `🔧 Developer:`, value: `<@335268722061082635>`, inline: true},
        {name: `🪪 Nome:`, value: `\`${client.user.username}\``, inline: true},
        {name: `🆔 Id:`, value: `\`${client.user.id}\``, inline: true},
        {name: `👤 Servidores:`, value: `\`${client.guilds.cache.size}\``, inline: true },
        {name: `🔊 Canais:`, value: `\`${client.channels.cache.size}\``, inline: true},
        {name: `📢 Linguagem:`, value: `\`Java Script / Node.js / Discord.js\``, inline: true},
        {name: `🔔 Ping:`, value: `\`${client.ws.ping}ms de ping\``, inline: true },
        {name: `💻 Ram:`, value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}\``, inline: true},
        {name: `💾 Uptime:`, value: `\`${up} Minutos\``, inline: true })

        const botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setURL("https://discord.com/oauth2/authorize?client_id=1210605474114969720&permissions=8&scope=applications.commands+bot")
            .setLabel("Convidar")
            .setStyle(Discord.ButtonStyle.Link)
        )

        interaction.reply({ embeds: [embed], components: [botao] });
  }
}