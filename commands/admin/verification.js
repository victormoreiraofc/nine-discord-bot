const Discord = require("discord.js")

module.exports = {
  name: "verificar",
  description: "Crie um sistema de verificação.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "cargo",
        description: "Mencione o cargo de verificado.",
        type: Discord.ApplicationCommandOptionType.Role,
        required: true,
    },
    {
        name: "imagem",
        description: "URL da imagem para exibir na mensagem de verificação.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
      }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
        interaction.reply({ content: `❌ | Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let cargo = interaction.options.getRole("cargo");
        let imagemURL = interaction.options.getString("imagem");

        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setDescription(`Este servidor solicita que você faça uma verificação para acessar seus canais. Você pode facilmente fazer isso clicando no botão de verificação.`);

        if (imagemURL) {
            embed.setImage(imagemURL);
          } else {
            embed.setImage("https://i.imgur.com/bHq1yWz.gif");
          }

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("cargo_b" + interaction.id)
            .setLabel("🔓 Verificar")
            .setStyle(Discord.ButtonStyle.Success)
        );

        interaction.reply({ embeds: [embed], components: [botao] }).then( () => {

            let coletor = interaction.channel.createMessageComponentCollector();

            coletor.on("collect", (c) => {
                if (!c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.add(cargo.id)
                    c.reply({ content: `✅ | Olá **${c.user.username}**, Você foi verificado com sucesso e recebeu acesso a novas salas do discord.`, ephemeral: true })
                } else if (c.member.roles.cache.get(cargo.id)) {
                    c.reply({ content: `🚫 | Olá **${c.user.username}**, Você já foi verificado. Se estiver tendo problemas para encontrar as salas, entre em contato com a administração.`, ephemeral: true })
                }
                
            })
        })
    }


  }
}