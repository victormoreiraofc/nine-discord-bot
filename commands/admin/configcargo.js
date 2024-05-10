const Discord = require("discord.js");

const canaisDeSugestao = {};

module.exports = {
  name: "configreacoes",
  description: "Configure o sistema de recebimento de cargo no servidor.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `⛔ | ${interaction.user} Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Adminstrador.`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle(`\`💻 Painel de Configuração\``)
        .setDescription("¬ Bem-vindo ao painel de configuração de recebimento de cargo! \n¬ Escolha qual tipo de recebimento de cargo você prefere.")
        .setFooter({text:`📌 Configure o sistema de recebimento de cargo para que ele seja ativado.`});

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_reacao")
            .setPlaceholder("Selecione uma opção")
            .addOptions(
                {
                    label: "Configurar Formulário",
                    emoji: "🧾",
                    description: "Recebimento de cargos por formulário.",
                    value: "opc1"
                },
                {
                    label: "Configurar Botão",
                    emoji: "🧩",
                    description: "Recebimento de cargos por botão.",
                    value: "opc2"
                },
                {
                    label: "Configurar Emoji",
                    emoji: "😀",
                    description: "Recebimento de cargos por reação.",
                    value: "opc3"
                }
            )
        );

        interaction.reply({ content: `✅ | ${interaction.user} Você está configurando o sistema de recebimento de cargo!`, ephemeral: true });
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}
