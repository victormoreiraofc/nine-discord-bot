const Discord = require("discord.js")

module.exports = {
    name: "limpar",
    description: "Limpa mensagens de um canal de texto.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantidade',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 200 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("#2B2D31")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription('Nenhuma mensagem deletada! Você só pode deletar entre 0 a 200 mensagens.');

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("#2B2D31")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`O canal de texo ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`);

                interaction.reply({ embeds: [embed] })

                let apagar_mensagem = "nao"

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "nao") {
                    return;
                }

            }

        }

    }
}