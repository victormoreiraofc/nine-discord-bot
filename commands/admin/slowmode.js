const Discord = require("discord.js");
const ms = require("ms");
const { QuickDB } = require("quick.db");

const db = new QuickDB();

module.exports = {
  name: "slowmode",
  description: "Configure o modo lento em um canal de texto.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "tempo",
      description: "Coloque o tempo do modo lento [s|m|h].",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "canal",
      description: "Mencione um canal de texto.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: false,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
      const embed_reply = new Discord.EmbedBuilder()
      .setColor("#ED4245")
      .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Gerenciar Canais.`);

    return interaction.reply({ embeds: [embed_reply], ephemeral: true });     
  }

    let t = interaction.options.getString("tempo");
    let tempo = ms(t);
    let channel = interaction.options.getChannel("canal");

    if (!channel || channel === null) channel = interaction.channel;

    if (!tempo && t !== "0s") {
      const embed_reply = new Discord.EmbedBuilder()
          .setColor("#FBBD23")
          .setDescription(`⚠️ • Forneça um tempo válido: [s|m|h].`);

      return interaction.reply({ embeds: [embed_reply], ephemeral: true });
    }

    if (t === "0s") {
      db.delete(`slowmode.${channel.id}`);
      channel.setRateLimitPerUser(0).then(() => {
        const embed_reply = new Discord.EmbedBuilder()
              .setColor("#22C55E")
              .setDescription(`✅ • O modo lento foi desativado para o canal ${channel}.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      }).catch(() => {
        const embed_reply = new Discord.EmbedBuilder()
              .setColor("#ED4245")
              .setDescription(`⛔ • Algo deu errado ao desativar o modo lento.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      });
    } else {
      db.set(`slowmode.${channel.id}`, tempo / 1000);

      channel.setRateLimitPerUser(tempo / 1000).then(() => {
        const embed_reply = new Discord.EmbedBuilder()
         .setColor("#22C55E")
         .setDescription(`✅ • O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      }).catch(() => {
        const embed_reply = new Discord.EmbedBuilder()
          .setColor("#ED4245")
          .setDescription(`⛔ • Algo deu errado ao executar este comando, verifique minhas permissões.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      });
    }
  }
};
