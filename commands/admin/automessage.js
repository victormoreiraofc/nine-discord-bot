const Discord = require("discord.js");

const intervals = {};

module.exports = {
  name: "setmessage",
  description: "Define uma mensagem para o bot enviar em intervalos regulares.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "mensagem",
      description: "A mensagem que o bot enviará.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "intervalo",
      description: "O intervalo em segundos entre cada mensagem.",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`, ephemeral: true });
    }

    const message = interaction.options.getString("mensagem");
    const interval = interaction.options.getInteger("intervalo");

    if (interval < 10) {
      return interaction.reply({ content: `⛔ | ${interaction.user} Por favor, aumente o intervalo para pelo menos 10 segundos.`, ephemeral: true });
    }

    if (intervals[interaction.guildId]) {
      return interaction.reply({ content: `📣 | ${interaction.user} Uma mensagem já está sendo enviada em intervalos regulares. Por favor, utilize o comando 'stopmessage' para interrompê-la antes de definir uma nova.`, ephemeral: true });
    }

    const sendMessage = () => {
      interaction.channel.send(message);
    };

    sendMessage();

    intervals[interaction.guildId] = setInterval(sendMessage, interval * 1000);

    interaction.reply({ content: `✅ | ${interaction.user} A mensagem foi definida para ser enviada a cada ${interval} segundos.`, ephemeral: true });
  },
};
