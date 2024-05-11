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
      return interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Gerenciar Canais.`, ephemeral: true });
    }

    let t = interaction.options.getString("tempo");
    let tempo = ms(t);
    let channel = interaction.options.getChannel("canal");

    if (!channel || channel === null) channel = interaction.channel;

    if (!tempo && t !== "0s") {
      return interaction.reply({ content: `Forneça um tempo válido: [s|m|h].`, ephemeral: true });
    }

    if (t === "0s") {
      db.delete(`slowmode.${channel.id}`);
      channel.setRateLimitPerUser(0).then(() => {
        interaction.reply({ content: `O modo lento foi desativado para o canal ${channel}.` });
      }).catch(() => {
        interaction.reply({ content: `Ops, algo deu errado ao desativar o modo lento.`, ephemeral: true });
      });
    } else {
      db.set(`slowmode.${channel.id}`, tempo / 1000);

      channel.setRateLimitPerUser(tempo / 1000).then(() => {
        interaction.reply({ content: `O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.` });
      }).catch(() => {
        interaction.reply({ content: `Ops, algo deu errado ao executar este comando, verifique minhas permissões.`, ephemeral: true });
      });
    }
  }
};
