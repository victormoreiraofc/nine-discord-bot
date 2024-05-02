const Discord = require("discord.js");

const canaisDeSugestao = {};

module.exports = {
  name: "definirsugestoes",
  description: "Defina o canal onde as sugestões serão enviadas.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Mencione ou forneça o ID do canal de sugestões.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],

  run: async (client, interaction) => {
    const guildId = interaction.guild.id;
    const canalDeSugestao = interaction.options.getChannel("canal");

    const isAdmin = interaction.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"));

    if (!isAdmin) {
      return interaction.reply("Apenas administradores podem realizar esta ação.");
    }    

    canaisDeSugestao[guildId] = canalDeSugestao.id;

    interaction.reply(`Canal de sugestões definido para ${canalDeSugestao}.`);
  },

  getCanalDeSugestao: function(guildId) {
    return canaisDeSugestao[guildId];
  }
};