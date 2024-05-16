const Discord = require("discord.js");

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

        let numero = interaction.options.getNumber('quantidade');

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            const embed_reply = new Discord.EmbedBuilder()
                .setColor("#ED4245")
                .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Gerenciar Mensagens.`);

            return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
        }

        if (parseInt(numero) > 200 || parseInt(numero) <= 0) {
            let embed = new Discord.EmbedBuilder()
                .setColor("#2B2D31")
                .setTitle('🧹 MENSAGENS FALHARAM EM SER DELETADAS!')
                .setDescription(`Nenhuma mensagem deletada em ${interaction.channel}! Você só pode deletar entre **0 a 200** mensagens.`)
                .setFooter({ text: `Tentado por ${interaction.user.username} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

            return interaction.reply({ embeds: [embed] });
        }

        try {
            const fetched = await interaction.channel.messages.fetch({ limit: parseInt(numero) + 1 });

            if (fetched.size > 1) {
                interaction.channel.bulkDelete(fetched);

                let embed = new Discord.EmbedBuilder()
                    .setColor("#2B2D31")
                    .setTitle('🧹 MENSAGENS DELETADAS!')
                    .setDescription(`O canal de texto ${interaction.channel}, teve as últimas **${numero}** mensagens deletadas.`)
                    .setFooter({ text: `Apagado por ${interaction.user.username} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

                interaction.reply({ embeds: [embed] });

                let apagar_mensagem = "sim";

                if (apagar_mensagem === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply().catch(console.error);
                    }, 5000);
                }
            } else {
                const embed_reply = new Discord.EmbedBuilder()
                    .setColor("#FBBD23")
                    .setDescription(`⚠️ • Não há mensagens para serem deletadas.`);

                interaction.reply({ embeds: [embed_reply], ephemeral: true });
            }
        } catch (error) {
            if (error.message.includes("Unknown Message")) {
                const embed_reply = new Discord.EmbedBuilder()
                    .setColor("#FBBD23")
                    .setDescription(`⚠️ • Não foi possivel apagar porque as mensagens foram enviadas há mais de 14 dias.`);

                interaction.reply({ embeds: [embed_reply], ephemeral: true });        
            } else {
                console.error("Erro ao limpar mensagens:", error);
                const embed_reply = new Discord.EmbedBuilder()
                    .setColor("#ED4245")
                    .setDescription(`⛔ • Algo deu errado ao tentar limpar as mensagens.`);

                interaction.reply({ embeds: [embed_reply], ephemeral: true });
            }
        }
    }
};
