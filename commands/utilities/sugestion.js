const Discord = require("discord.js");
const definirCanalSugestoes = require("../admin/setsugestion.js");

module.exports = {
  name: "sugerir",
  description: "Faça sua sugestão.",
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
      interaction.reply({ content: `Olá ${interaction.user}, o canal de sugestões ainda não foi configurado no script!`, ephemeral: true });
    } else {  
      let sugestao = interaction.options.getString("sugestão");
      let topico = interaction.options.getString("tópico");
      let imagemAnexada = interaction.options.getString("imagem");

      let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle(`💡 NOVA SUGESTÃO - ${interaction.guild.name}`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Tópico:** \`${topico}\`\n**Sugestão de ${interaction.user}:** \`${sugestao}\``);

        if (imagemAnexada) {
          embed.setImage(imagemAnexada);
        }

      canal.send({ embeds: [embed] }).then(sentMessage => {
        sentMessage.react("👍").then(() => sentMessage.react("👎")).catch(() => {
          interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!` });
        });

        canal.threads.create({
          name: `Discussão sobre a sugestão: ${topico}`,
          autoArchiveDuration: 1440,
          reason: `Thread criada para discussão da sugestão de ${interaction.user.username}`,
          startMessage: sentMessage
        }).catch(error => {
          console.error("Erro ao criar thread:", error);
          interaction.reply({ content: `Ops ${interaction.user}, algo deu errado ao criar a thread de discussão!` });
        });
      }).catch(() => {
        interaction.reply({ content: `Ops ${interaction.user}, algo deu errado ao enviar a sugestão!` });
      });
    }
  }
};
