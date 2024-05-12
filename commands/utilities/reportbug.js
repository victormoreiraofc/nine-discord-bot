const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "reportarbug",
  description: "Implementa um sistema de relatório de bugs.",
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
      const embed_reply = new Discord.EmbedBuilder()
      .setColor("#ED4245")
      .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`);

      return interaction.reply({ embeds: [embed_reply], ephemeral: true });
    } else {
      const guildId = interaction.guild.id;
      const canal = interaction.options.getChannel("canal");
      const logs = interaction.options.getChannel("logs");
      const imagem = interaction.options.getString("imagem");

      if(canal.type !== Discord.ChannelType.GuildText) {
        const embed_reply = new Discord.EmbedBuilder()
        .setColor("#FBBD23")
        .setDescription(`⚠️ • O canal ${canal} não é um canal de texto.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      } else if (logs.type !== Discord.ChannelType.GuildText) {
        const embed_reply = new Discord.EmbedBuilder()
        .setColor("#FBBD23")
        .setDescription(`⚠️ • O canal ${logs} não é um canal de texto.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });
      } else {
        await db.set(`canal_${interaction.guild.id}`, canal.id)
        await db.set(`logs_${interaction.guild.id}`, logs.id)

        const embed_reply = new Discord.EmbedBuilder()
        .setColor("#22C55E")
        .setDescription(`✅ • Os canais foram definidos com sucesso.`);

        interaction.reply({ embeds: [embed_reply], ephemeral: true });

        let embed = new Discord.EmbedBuilder()
         .setColor("ff0000")
         .setTitle("🛑 Reporte um bug")
         .setDescription(`Clique no botão abaixo para abrir o formulário para reportar um bug!\n\n Após o envio do formulário nossa equipe irá revisar o bug e resolver o mais breve possivel.\n`)
         .setFooter({ text: "🔸Obrigado por contribuir conosco para resolver os bugs." });

        if (imagem) {
          embed.setImage(imagem);
        }

        let botao = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
          .setCustomId("formulario")
          .setLabel("Reportar")
          .setStyle(Discord.ButtonStyle.Danger)
      );

        canal.send({ embeds: [embed], components: [botao] })
      } 
    }

    
  },
}