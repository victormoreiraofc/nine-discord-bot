const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "contador-membros",
    description: "Mostra a quantidade de membros no servidor.",
    type: 1,

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            try {
                let channel = await interaction.guild.channels.create({
                    name: `🗣️‼️ Membros: ${interaction.guild.memberCount}`,
                    type: Discord.ChannelType.GuildVoice,
                    permissionOverwrites: [{
                        id: interaction.guild.id,
                        deny: [Discord.PermissionFlagsBits.Connect]
                    }]
                });

                interaction.reply(`O sistema foi ativado em: ${channel}.`);
                db.set(`contador_${interaction.guild.id}`, channel.id);
            } catch (error) {
                console.error("Error creating channel:", error.message);
                interaction.reply({ content: "Ocorreu um erro ao criar o canal.", ephemeral: true });
            }
        }
    },
};