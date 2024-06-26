const Discord = require("discord.js")

module.exports = {
  name: "ban",
  description: "Banir um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "user",
        description: "Mencione um usuário para ser banido.",
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
        const embed_reply = new Discord.EmbedBuilder()
        .setColor("#ED4245")
        .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Banir Membros.`);

      return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
    } else {
        let userr = interaction.options.getUser("user");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "Não definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: 'Administração', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`> O usuário ${user} (\`ID: ${user.id}\`) foi banido do servidor por ${motivo} **(By: ${interaction.user.username})**`)
        .setImage('https://i.imgur.com/qnePraA.png')
        .setTimestamp();

        let erro = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: 'Administração', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Não foi possível banir o usuário ${user} (\`ID: ${user.id}\`) do servidor!`);

        user.ban({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}