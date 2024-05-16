const Discord = require("discord.js");

const intervals = {};
const autoMessageConfig = {}; // Object to store configurations

module.exports = {
  name: "automensagem",
  description: "Define uma mensagem para ser enviada em intervalos regulares.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const isAdmin = interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"));

    if (!isAdmin) {
      const embed_reply = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`);

      return interaction.reply({ embeds: [embed_reply], ephemeral: false });
    }

    const embed_config = new Discord.EmbedBuilder()
      .setColor("#2B2D31")
      .setTitle(`🔨 — Painel de Configuração`)
      .setThumbnail('https://i.imgur.com/oMErLS7.png')
      .addFields(
        {
          name: '> Bem-vindo ao painel de configuração de mensagens automáticas.',
          value: '> 🛖・Selecione a sala a qual deseja que a mensagem seja enviada clicando no botão **Canal**.\n> 💬・Defina a mensagem que será enviada clicando no botão **Mensagem** (você pode anexar imagens).\n> ⏲️・Defina o tempo do intervalo que a mensagem será enviada clicando no botão **Intervalo**.'
        },
      )
      .setTimestamp()
      .setFooter({ text: `💭 Configure o sistema de mensagens automáticas para que ele seja ativado.` });

    let actionRow = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("canal")
          .setLabel("🛖 — Canal")
          .setStyle(Discord.ButtonStyle.Primary)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("mensagem")
          .setLabel("💬 — Mensagem")
          .setStyle(Discord.ButtonStyle.Primary)
      )
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("tempo")
          .setLabel("⏲️ — Intervalo")
          .setStyle(Discord.ButtonStyle.Primary)
      );

    await interaction.reply({ embeds: [embed_config], components: [actionRow], ephemeral: false });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    collector.on('collect', async i => {
      if (!i.isButton()) return;

      if (i.customId === "canal") {
        let Row = new Discord.ActionRowBuilder().addComponents(
          new Discord.StringSelectMenuBuilder().setPlaceholder('Selecione uma opção.').setCustomId('painel_canal')
        );

        await interaction.guild.channels.fetch().then(response => {
          response.forEach(element => {
            if (element.type !== 0) return;
            Row.components[0].addOptions({ label: element.name.toUpperCase(), value: element.id });
          });
        });

        const embed = new Discord.EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle(`🔨 — Painel de Configuração`)
          .setThumbnail('https://i.imgur.com/oMErLS7.png')
          .addFields(
            { name: '> Selecione qual sala deseja que a mensagem seja enviada.', value: 'Clique na caixa abaixo.' },
          )
          .setTimestamp()
          .setFooter({ text: `💭 Configure o sistema de mensagens automáticas para que ele seja ativado.` });

        const message = await i.reply({ embeds: [embed], components: [Row], ephemeral: true });

      } else if (i.customId === "mensagem") {
        const embed = new Discord.EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle(`🔨 — Painel de Configuração`)
          .setThumbnail('https://i.imgur.com/oMErLS7.png')
          .addFields(
            { name: '> Digite qual será a mensagem a ser enviada e anexe uma imagem, se desejar.', value: 'Digite a mensagem e anexe a imagem abaixo.' },
          )
          .setTimestamp()
          .setFooter({ text: `💭 Configure o sistema de mensagens automáticas para que ele seja ativado.` });

        const questionMessage = await i.reply({ embeds: [embed], ephemeral: false });

        const messageFilter = response => response.author.id === interaction.user.id;
        const messageCollector = i.channel.createMessageCollector({ filter: messageFilter, time: 60000, max: 1 });

        messageCollector.on('collect', m => {
          autoMessageConfig[guildId] = autoMessageConfig[guildId] || {};
          autoMessageConfig[guildId].message = m.content;
          autoMessageConfig[guildId].attachment = m.attachments.first() ? m.attachments.first().url : null;

          const embed_reply = new Discord.EmbedBuilder()
            .setColor("#22C55E")
            .setDescription(`✅ • Mensagem configurada com sucesso: "${m.content}".`);

         m.reply({ embeds: [embed_reply], ephemeral: true });
            questionMessage.delete(); // Delete question message
            m.delete(); // Delete user response message
        });

      } else if (i.customId === "tempo") {
        const embed = new Discord.EmbedBuilder()
          .setColor("#2B2D31")
          .setTitle(`🔨 — Painel de Configuração`)
          .setThumbnail('https://i.imgur.com/oMErLS7.png')
          .addFields(
            { name: '> Digite qual será o intervalo da mensagem a ser enviada.', value: 'Digite o valor abaixo (mais de 10s).' },
          )
          .setTimestamp()
          .setFooter({ text: `💭 Configure o sistema de mensagens automáticas para que ele seja ativado.` });

        const questionMessage = await i.reply({ embeds: [embed], ephemeral: false });

        const intervalFilter = response => response.author.id === interaction.user.id;
        const intervalCollector = i.channel.createMessageCollector({ filter: intervalFilter, time: 60000, max: 1 });

        intervalCollector.on('collect', m => {
          const interval = parseInt(m.content) * 1000;
          if (isNaN(interval) || interval < 10000) {
            return m.reply({ content: "Por favor, insira um valor válido maior que 10 segundos.", ephemeral: false });
          }
          autoMessageConfig[guildId] = autoMessageConfig[guildId] || {};
          autoMessageConfig[guildId].interval = interval;

          m.reply({ content: `Intervalo configurado para: ${m.content} segundos`, ephemeral: false }).then(() => {
            questionMessage.delete();
            m.delete();

            if (intervals[guildId]) clearInterval(intervals[guildId]);

            const { channelId, message, attachment } = autoMessageConfig[guildId];
            if (channelId && message) {
              intervals[guildId] = setInterval(() => {
                const channel = interaction.guild.channels.cache.get(channelId);
                if (channel) {
                  channel.send({
                    content: message,
                    files: attachment ? [attachment] : []
                  });
                }
              }, interval);
            }
          });
        });
      }
    });

    client.on("interactionCreate", async interaction => {
      if (!interaction.isStringSelectMenu()) return;

      if (interaction.customId === "painel_canal") {
        const selectedChannelId = interaction.values[0];
        autoMessageConfig[guildId] = autoMessageConfig[guildId] || {};
        autoMessageConfig[guildId].channelId = selectedChannelId;

        const selectedChannel = interaction.guild.channels.cache.get(selectedChannelId);
        const embed_reply = new Discord.EmbedBuilder()
            .setColor("#22C55E")
            .setDescription(`✅ • Canal configurado com sucesso: ${selectedChannel.name}.`);

        await interaction.reply({ embeds: [embed_reply], ephemeral: true });

        const { interval, message, attachment } = autoMessageConfig[guildId];
        if (interval && message) {
          if (intervals[guildId]) clearInterval(intervals[guildId]);

          intervals[guildId] = setInterval(() => {
            const channel = interaction.guild.channels.cache.get(selectedChannelId);
            if (channel) {
              channel.send({
                content: message,
                files: attachment ? [attachment] : []
              });
            }
          }, interval);
        }
      }
    });
  }
}
