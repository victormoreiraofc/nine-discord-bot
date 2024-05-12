const Discord = require("discord.js");

const canaisDeSugestao = {};

module.exports = {
  name: "configsugerir",
  description: "Configure o sistema de sugestões no servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const isAdmin = interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"));

    if (!isAdmin) {
      const embed_reply = new Discord.EmbedBuilder()
      .setColor("#ED4245")
      .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`);

    return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
    }

    const embed_config = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`🔨 — Painel de Configuração`)
            .setThumbnail('https://i.imgur.com/oMErLS7.png')
            .addFields(
                { name: '> Bem-vindo ao painel de configuração de sugestões.', value: '> ・Selecione a sala a qual deseje que fique as sugestões.' },
            )
            .setTimestamp()
            .setFooter({text:`💡 Configure o sistema de sugestões para que ele seja ativado.`});

    interaction.reply({ embeds: [embed_config], ephemeral: true });

    const filter = m => m.author.id === interaction.user.id && m.mentions.channels.size > 0;
    const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });

    collector.on('collect', async (message) => {
      const mentionedChannel = message.mentions.channels.first();
      canaisDeSugestao[guildId] = mentionedChannel.id;
      const embed_reply = new Discord.EmbedBuilder()
      .setColor("#22C55E")
      .setDescription(`✅ • Um novo canal foi definido como canal de sugestões.`);

      await interaction.followUp({ embeds: [embed_reply], ephemeral: true });

      const embed_sugestao = new Discord.EmbedBuilder()
      .setColor("#2B2D31")
      .setTitle(`💡 Sistema de Sugestões!`)
      .setDescription("Para realizar uma **sugestão** digite o comando abaixo. ```/sugerir``` \n > Lembre-se de detalhar sua sugestão ao máximo, se possível, incluindo uma imagem para ilustrar.\n")
      .setFooter({text:`🔸Obrigado por contribuir conosco para melhorar o servidor.`});

    mentionedChannel.send({ embeds: [embed_sugestao] });
    
    collector.stop();
  });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const embed_reply = new Discord.EmbedBuilder()
          .setColor("#3B82F6")
          .setDescription(`⏲️ • Seu tempo acabou e você não definiu nenhum canal.`);

        interaction.followUp({ embeds: [embed_reply], ephemeral: true });
      }
    });
  },

  getCanalDeSugestao: function(guildId) {
    return canaisDeSugestao[guildId];
  }
};
