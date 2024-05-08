const Discord = require("discord.js");

const intervals = {};

module.exports = {
  name: "stopmessage",
  description: "Interrompe o envio da mensagem definida em intervalos regulares.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`, ephemeral: true });
    }

    if (!intervals[interaction.guildId] || !(intervals[interaction.guildId] instanceof Object)) {
      return interaction.reply({ content: "Nenhuma mensagem está sendo enviada em intervalos regulares.", ephemeral: true });
    }

    clearInterval(intervals[interaction.guildId]);
    delete intervals[interaction.guildId];

    interaction.reply({ content: "O envio da mensagem foi interrompido.", ephemeral: true });
  },
};

// Falta arrumar pois ainda não está funcionando.
