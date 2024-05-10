const Discord = require('discord.js');

module.exports = {
    name: "ticket",
    description: "Configurador e editor de ticket.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: "Você não possui permissão de utilizar este comando.", ephemeral: true });
        let Row = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder().setPlaceholder('Selecione uma opção.').setCustomId('Panel')
        );

        await interaction.guild.channels.fetch().then(response => {
            response.forEach(element => {
                if (element.type != 0) return;
                Row.components[0].addOptions({ label: element.name.toUpperCase(), value: element.id });
            });
        });

        const embed = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`\`🎲 Painel de Configuração\``)
            .addFields(
                { name: '> Bem-vindo ao painel de configuração de ticket.', value: '> ・Selecione a sala a qual deseje que fique o ticket.' },
            )
            .setTimestamp()
            .setFooter({text:`🎫 Configure o sistema de tickets para que ele seja ativado.`});

        return interaction.reply({ embeds: [embed], components: [Row], ephemeral: true });
    }
};