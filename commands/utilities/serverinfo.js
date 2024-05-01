
const Discord = require("discord.js");
const { link } = require("fs");
const moment = require('moment');

module.exports = {
  name: "serverinfo",
  description: "Envia as informações do atual servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const nome = interaction.guild.name;
    const id = interaction.guild.id;
    const icon = interaction.guild.iconURL({ dynamic: true });
    const membros = interaction.guild.memberCount;

    const criacao = interaction.guild.createdAt.toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dataCriacao = interaction.guild.createdAt;
    const dataAtual = new Date();
    const diferenca = moment.duration(dataAtual - dataCriacao);
    const tempoDecorrido = `há ${diferenca.years()} anos, ${diferenca.months()} meses`;

    const entradaDiscord = interaction.member.joinedAt.toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const dataEntrada = member.joinedAt;
    const diferencaMembro = moment.duration(dataAtual - dataEntrada);
    const tempoDecorridoMembro = `há ${diferencaMembro.years()} anos, ${diferencaMembro.months()} meses`;

    const canais_total = interaction.guild.channels.cache.size;
    const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;
    const membros_banidos = interaction.guild.bans.cache.size;
    const cargos_totais = interaction.guild.roles.cache.size;

    const embed1 = new Discord.EmbedBuilder()
    .setColor("#2B2D31")
    .setTitle(nome)
    .setThumbnail(icon)
    .addFields(
        {
            name: `🆔 ID:`,
            value: `\`${id}\``,
            inline: true
        },
        {
            name: `👥 Membros:`,
            value: `\`${membros}\``,
            inline: true
        },
        {
            name: `📅 Criado em:`,
            value: `\`${criacao} (${tempoDecorrido})\``,
            inline: true
        },
        {
            name: `🌟 Entrei aqui em:`,
            value: `\`${entradaDiscord} (${tempoDecorridoMembro})\``,
            inline: true
        },
        {
            name: `🚫 Membros Banidos:`,
            value: `\`${membros_banidos}\``,
            inline: true
        },
        {
            name: `📤 Canais:`,
            value: `\`${canais_total}\``,
            inline: true
        },
        {
            name: `📅 Categorias:`,
            value: `\`${canais_categoria}\``,
            inline: true
        },
        {
            name: `🌐 Total de Cargos:`,
            value: `\`${cargos_totais}\``,
            inline: true
        }
    );

    const botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(icon)
        .setLabel("✨ Ver ícone do servidor")
        .setStyle(Discord.ButtonStyle.Link)
    )

    interaction.reply({ embeds: [embed1], components: [botao] })
  }
}
