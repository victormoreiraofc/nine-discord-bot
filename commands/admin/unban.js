const Discord = require("discord.js")

module.exports = {
  name: "unban",
  description: "Desbanir um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione um usuário para ser desbanido.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Insira um motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Você não possui poermissão para utilizar este comando.`);
    } else {
        let user = interaction.options.getUser("user");
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: 'Administração', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> O usuário ${user} (\`ID: ${user.id}\`) foi desbanido do servidor! **(By: ${interaction.user.username})**`)
        .setImage('https://i.imgur.com/6hgYTOt.png')
        .setTimestamp();

        let erro = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: 'Administração', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Não foi possível desbanir o usuário ${user} (\`ID: ${user.id}\`) do servidor!`);

        interaction.guild.members.unban(user.id, motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}