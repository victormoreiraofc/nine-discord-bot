const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "reportarbug",
  description: "Crie um sistema de reporte de bug.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione ou forneça o ID do canal de reporte de bug.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
      name: "logs",
      description: "Mencione ou forneça o ID do canal que receberá o registros do reporte.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
        name: "imagem",
        description: "URL da imagem para exibir na mensagem de reporte de bug.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {
    
    if (!interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return interaction.reply({ content: "❌ | Você não possui permissão para utilizar este comando.", ephemeral: true })
    } else {
      const guildId = interaction.guild.id;
      const canal = interaction.options.getChannel("canal");
      const logs = interaction.options.getChannel("logs");
      const imagem = interaction.options.getString("imagem");

      if(canal.type !== Discord.ChannelType.GuildText) {
        interaction.reply({ content: `❌ | O canal ${canal} não é um canal de texto.`, ephemeral: true })
      } else if (logs.type !== Discord.ChannelType.GuildText) {
        interaction.reply({ content: `❌ | O canal ${logs} não é um canal de texto.`, ephemeral: true })
      } else {
        await db.set(`canal_${interaction.guild.id}`, canal.id)
        await db.set(`logs_${interaction.guild.id}`, logs.id)

        interaction.reply({ content: `✅ | O canal ${canal} foi definido como canal de reporte de bug e o ${logs} como canal de logs.`, ephemeral: true });

        let embed = new Discord.EmbedBuilder()
         .setColor("#2B2D31")
         .setTitle("👾 REPORTE DE BUGS")
         .setDescription(`> Se encontrou algum bug e deseja informar-nos para que possamos resolver, clique no botão abaixo.`)
         .setFooter({ text: "Obrigado por contribuir conosco para resolver os bugs." });

        if (imagem) {
          embed.setImage(imagem);
        }

        let botao = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setCustomId("formulario")
          .setEmoji("🚧")
          .setLabel("Reportar")
          .setStyle(Discord.ButtonStyle.Danger)
      );

        canal.send({ embeds: [embed], components: [botao] })
      } 
    }

    
  },
}