require('../index')

const Discord = require('discord.js')
const client = require('../index')

const { QuickDB } = require("quick.db")
const db = new QuickDB()

client.on("interactionCreate", async(interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === "formulario") {
        if (!interaction.guild.channels.cache.get(await db.get(`logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
        const modal = new Discord.ModalBuilder()
        .setCustomId("modal")
        .setTitle("Reporte de Bugs");
  
        const pergunta1 = new Discord.TextInputBuilder()
        .setCustomId("pergunta1")
        .setLabel("EM QUE SITUAÇÂO ESSE BUG ACONTECEU?")
        .setMaxLength(30)
        .setMinLength(5)
        .setPlaceholder("Escreva sua resposta.")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short)
  
        const pergunta2 = new Discord.TextInputBuilder()
        .setCustomId("pergunta2")
        .setLabel("QUAL FOI O BUG ENCONTRADO?")
        .setMaxLength(30)
        .setPlaceholder("Escreva sua resposta.")
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true)
  
        const pergunta3 = new Discord.TextInputBuilder()
        .setCustomId("pergunta3")
        .setLabel("DETALHE COMO ACONTECEU?")
        .setPlaceholder("Escreva sua resposta.")
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setRequired(true)

        const pergunta4 = new Discord.TextInputBuilder()
        .setCustomId("pergunta4")
        .setLabel("LINK DA IMAGEM (CASO TENHA)")
        .setMaxLength(30)
        .setPlaceholder("Coloque o link da Imagem.")
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(false)
  
        modal.addComponents(
          new Discord.ActionRowBuilder().addComponents(pergunta1),
          new Discord.ActionRowBuilder().addComponents(pergunta2),
          new Discord.ActionRowBuilder().addComponents(pergunta3),
          new Discord.ActionRowBuilder().addComponents(pergunta4)
        )
  
        await interaction.showModal(modal)
      }
    } else if (interaction.isModalSubmit()) {
      if (interaction.customId === "modal") {
        let resposta1 = interaction.fields.getTextInputValue("pergunta1")
        let resposta2 = interaction.fields.getTextInputValue("pergunta2")
        let resposta3 = interaction.fields.getTextInputValue("pergunta3")
        let resposta4 = interaction.fields.getTextInputValue("pergunta4")
  
        if (!resposta1) resposta1 = "Não informado."
        if (!resposta2) resposta2 = "Não informado."
        if (!resposta3) resposta3 = "Não informado."
        if (!resposta4) resposta4 = "Não informado."
  
        let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`O usuário ${interaction.user} enviou o formulário abaixo:`)
        .addFields(
          {
            name: `EM QUE SITUAÇÂO ESSE BUG ACONTECEU?`,
            value: `*Resposta:* \`${resposta1}\``,
            inline: false
          },
          {
            name: `QUAL FOI O BUG ENCONTRADO?`,
            value: `*Resposta:* \`${resposta2}\``,
            inline: false
          },
          {
            name: `DETALHE COMO ACONTECEU?`,
            value: `*Resposta:* \`${resposta3}\``,
            inline: false
          },
          {
            name: `LINK DA IMAGEM (CASO TENHA)`,
            value: `*Resposta:* \`${resposta4}\``,
            inline: false
          }
        );
  
        interaction.reply({ content: `Olá **${interaction.user.username}**, seu formulário foi enviado com sucesso!`, ephemeral: true})
        await interaction.guild.channels.cache.get(await db.get(`logs_${interaction.guild.id}`)).send({ embeds: [embed] })
      }
    }
  })