const Discord = require("discord.js");

const intervals = {};

module.exports = {
  name: "setmessage",
  description: "Define uma mensagem para o bot enviar em intervalos regulares.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "message",
      description: "A mensagem que o bot enviará.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "interval",
      description: "O intervalo em segundos entre cada mensagem.",
      type: Discord.ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`, ephemeral: true });
    }

    const message = interaction.options.getString("message");
    const interval = interaction.options.getInteger("interval");

    if (interval < 10) {
      return interaction.reply({ content: "O intervalo mínimo é de 10 segundos.", ephemeral: true });
    }

    if (intervals[interaction.guildId]) {
      return interaction.reply({ content: "Já existe uma mensagem sendo enviada em intervalos regulares. Use o comando 'stopmessage' para interromper antes de definir uma nova.", ephemeral: true });
    }

    const sendMessage = () => {
      interaction.channel.send(message);
    };

    sendMessage();

    intervals[interaction.guildId] = setInterval(sendMessage, interval * 1000);

    interaction.reply({ content: `Mensagem definida para ser enviada a cada ${interval} segundos.`, ephemeral: true });
  },
};
