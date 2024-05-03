const Discord = require("discord.js")

module.exports = {
  name: "reportarbug",
  description: "Crie um sistema de reporte de bug.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Mencione ou forneça o ID do canal de sugestões.",
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

  }
}