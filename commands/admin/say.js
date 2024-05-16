const Discord = require("discord.js")

module.exports = {
  name: "say",
  description: "Faça com que o bot fale o que você deseje.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "embed",
        description: "Falarei em forma de embed.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "normal",
        description: "Falarei normal (sem embed).",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        const embed_reply = new Discord.EmbedBuilder()
      .setColor("#ED4245")
      .setDescription(`⛔ • Você não possui permissão para utilizar este comando, para executar esse comando você precisa ter a permissão de Administrador.`);

    return interaction.reply({ embeds: [embed_reply], ephemeral: true }); 
    } else {
        let embed_fala = interaction.options.getString("embed");
        let normal_fala = interaction.options.getString("normal");
        
        if (!embed_fala && !normal_fala) {
            interaction.reply(`Escreva pelo menos em uma das opções.`)
        } else {
            if (!embed_fala) embed_fala = "⠀";
            if (!normal_fala) normal_fala = "⠀";

            let embed = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(embed_fala);

            if (embed_fala === "⠀") {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}` })
            } else if (normal_fala === "⠀") {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ embeds: [embed] })
            } else {
                interaction.reply({ content: ` Sua mensagem foi enviada!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })
            }
        }
    }


  }
}
