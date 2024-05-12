const Discord = require("discord.js");

const intervals = {};

module.exports = {
  name: "stopmessage",
  description: "Interrompe o envio da mensagem definida em intervalos regulares.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      const embed_reply = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`);

      return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
    }

    if (!intervals[interaction.guildId] || !(intervals[interaction.guildId] instanceof Object)) {
      const embed_reply = new Discord.EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`⛔ • Nenhuma mensagem está sendo enviada em intervalos regulares.`);

            return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
    }

    clearInterval(intervals[interaction.guildId]);
    delete intervals[interaction.guildId];

    const embed_reply = new Discord.EmbedBuilder()
      .setColor("#22C55E")
      .setDescription(`✅ • O envio da mensagem foi interrompido.`);

    interaction.reply({ embeds: [embed_reply], ephemeral: true });
  },
};

// Falta arrumar pois ainda não está funcionando.
