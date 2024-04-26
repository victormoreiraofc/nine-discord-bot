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

        if (interaction.user.id !== Develope) return interaction.reply({ content: `Apenas o meu dono pode utilizar este comando!`, ephemeral: true })

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
            return console.log(`Ops ${interaction.user}, algo deu errado ao executar este comando.`)
        }
    }
}