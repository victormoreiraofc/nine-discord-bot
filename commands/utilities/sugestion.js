const Discord = require("discord.js");
const definirCanalSugestoes = require("../admin/setsugestion.js");

module.exports = {
  name: "sugerir",
  description: "Envia sugestões para o servidor atual.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "tópico",
      description: "Defina o tópico da sua sugestão.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "sugestão",
      description: "Descreva sua sugestão com detalhes.",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "imagem",
      description: "Anexe uma imagem (opcional).",
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    }
  ],

  run: async (client, interaction) => {
    const canalId = definirCanalSugestoes.getCanalDeSugestao(interaction.guild.id);
    const canal = interaction.guild.channels.cache.get(canalId);

    if (!canal) {
      interaction.reply({ content: `⛔ — **${interaction.user}, o canal de sugestões ainda não foi configurado, caso deseje configar digite /configsugestoes!**`, ephemeral: true });
    } else {  
      let sugestao = interaction.options.getString("sugestão");
      let topico = interaction.options.getString("tópico");
      let imagemAnexada = interaction.options.getString("imagem");

      let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: `${interaction.user.tag} - ${interaction.user.id}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Tópico:** \`${topico}\`\n**Sugestão de ${interaction.user}:** \`${sugestao}\``)
        .setTimestamp();

        if (imagemAnexada) {
          embed.setImage(imagemAnexada);
        }

      canal.send({ embeds: [embed] }).then(sentMessage => {
        sentMessage.react("👍").then(() => sentMessage.react("👎")).catch(() => {
          interaction.reply({ content: `⛔ — **Algo deu errado ao enviar as reações!**` });
        });

        canal.threads.create({
          name: `Discussão sobre a sugestão: ${topico}`,
          autoArchiveDuration: 1440,
          reason: `Thread criada para discussão da sugestão de ${interaction.user.username}`,
          startMessage: sentMessage
        }).catch(error => {
          console.error("Erro ao criar thread:", error);
          interaction.reply({ content: `⛔ — **Algo deu errado ao criar a thread de discussão!**` });
        });
      }).catch(() => {
        interaction.reply({ content: `⛔ — **Algo deu errado ao enviar a sugestão!**` });
      });

      interaction.reply({ content: `✅ — **${interaction.user} Você mandou sua sugestão com sucesso!**`, ephemeral: true });
    }
  }
};
