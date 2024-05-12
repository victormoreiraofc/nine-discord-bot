const Discord = require("discord.js");
const Develope = "335268722061082635";

module.exports = {
    name: "setstatus",
    description: "Configure meu status.",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Qual estilo você deseja aplicar (online, dnd, idle, invisible)?",
            required: true,
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descrição",
            description: "Qual será a descrição do status?",
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (interaction.user.id !== Develope) {
            const embed_reply = new Discord.EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Desenvolvedor do BOT.`);

            return interaction.reply({ embeds: [embed_reply], ephemeral: true });
        }

        try {

            let status = interaction.options.getString("status");
            let desc = interaction.options.getString("descrição");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let embed = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle('⏳ ALTERAÇÃO DO STATUS!')
            .setDescription(`O status do BOT foi alterado para **${status}**, e a descrição foi alterada para **${desc}**.`)
            .setFooter({ text: `Alterado por ${interaction.user.username} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            const embed_reply = new Discord.EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`⛔ • Algo deu errado ao executar o comando.`);

            return interaction.reply({ embeds: [embed_reply], ephemeral: true });
        }
    }
}