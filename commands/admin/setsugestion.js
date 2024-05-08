const Discord = require("discord.js");

const canaisDeSugestao = {};

module.exports = {
  name: "configsugestoes",
  description: "Defina o canal onde as sugestões serão enviadas.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const isAdmin = interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"));

    if (!isAdmin) {
      return interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Adminstrador.`, ephemeral: true });
    }

    const embed_config = new Discord.EmbedBuilder()
      .setColor("#2B2D31")
      .setTitle(`\`💻 Painel de Configuração\``)
      .setDescription("¬ Bem-vindo ao painel de configuração de sugestões! \n¬ Marque o canal a qual deseja que fique a sala de sugestões.")
      .setFooter({text:`📌 Marque o canal de sugestões para que ele seja ativado.`});

    interaction.reply({ embeds: [embed_config], ephemeral: false });

    const filter = m => m.author.id === interaction.user.id && m.mentions.channels.size > 0;
    const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });

    collector.on('collect', async (message) => {
      const mentionedChannel = message.mentions.channels.first();
      canaisDeSugestao[guildId] = mentionedChannel.id;
      await interaction.followUp({ content: `\`✅ | Um novo canal foi definido como canal de sugestões.\`` });
      collector.stop();
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        interaction.followUp({ content: `\`⏲️ | Tempo esgotado. Você não selecionou nenhum canal.\`` });
      }
    });
  },

  getCanalDeSugestao: function(guildId) {
    return canaisDeSugestao[guildId];
  }
};
