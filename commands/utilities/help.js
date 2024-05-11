const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "ajuda",
  description: "Obtenha assistência instantânea e descubra os recursos disponíveis do bot com o comando de ajuda. ",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const up = Math.floor(client.uptime / 60000) % 60;

    let embed = new Discord.EmbedBuilder()
    .setColor("#2B2D31")
    .setDescription(`Olá! Me chamo Nine e sou um bot para o Discord, estou aqui para ajudar você a resolver problemas de forma simples e divertida!\n\n Possuo uma variedade de comandos, desde moderação e diversão até utilidades e roleplay. Para acessá-los, basta digitar / no chat e verá todos os comandos disponíveis.\n\n Se encontrar algum problema comigo, entre em contato conosco através do nosso [Servidor de Suporte](https://discord.gg/r8uQxUfRqq).`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

        interaction.reply({ embeds: [embed] });
  }
}