
const Discord = require('discord.js')

module.exports = {
    name: "beijar",
    description: "Dê um beijo em uma pessoa.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "membro",
            description: "Mencione um usuário",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("membro")

        var lista1 = [
            'https://i.imgur.com/4WPOgUl.gif',
            'https://i.imgur.com/TigyQ7w.gif',
            'https://i.imgur.com/WH6Wntt.gif',
            'https://i.imgur.com/Mcnm3x8.gif',
            'https://i.imgur.com/UiXpbjE.gif'
        ];

        var lista2 = [
            'https://i.imgur.com/4WPOgUl.gif',
            'https://i.imgur.com/TigyQ7w.gif',
            'https://i.imgur.com/WH6Wntt.gif',
            'https://i.imgur.com/Mcnm3x8.gif',
            'https://i.imgur.com/UiXpbjE.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**👨‍❤️‍💋‍👨 ${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(`${random1}`)
            .setColor("#2B2D31")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Retribuir')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
            .setColor("#2B2D31")
            .setImage(`${random2}`)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Retribuir')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)

                            )
                    ]
                })
            })
        })
    }
}
