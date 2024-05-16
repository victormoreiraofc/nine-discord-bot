const Discord = require("discord.js")

module.exports = {
  name: "unlock",
  description: "Desbloqueie um canal.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione um canal para o desbloquear o chat.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
      const embed_reply = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Gerenciar Canais.`);

      interaction.reply({ embeds: [embed_reply], ephemeral: true });  
      } else {
        const canal = interaction.options.getChannel("canal")

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).then( () => {
            const embed_reply = new Discord.EmbedBuilder()
                  .setColor("#FBBD23")
                  .setDescription(`⚠️ • O canal de texto ${canal} foi desbloqueado.`);

            interaction.reply({ embeds: [embed_reply], ephemeral: true });
            if (canal.id !== interaction.channel.id) return canal.send({ content: `🔓 • Este canal foi desbloqueado!` })
        }).catch(e => {
            const embed_reply = new Discord.EmbedBuilder()
                  .setColor("#ED4245")
                  .setDescription(`⛔ • Algo deu errado ao tentar desbloquear um canal.`);
            
            interaction.reply({ embeds: [embed_reply], ephemeral: true });
        })
    }
    
  }
}