
const Discord = require("discord.js")
const ms = require('ms')
const db = require("quick.db");

module.exports = {
  name: "startticket",
  description: "Utilize essa função para enviar a mensagem de TICKET",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'canal_message',
      description: 'Canal que a mensagem de TICKET será enviada.',
      type: Discord.ApplicationCommandOptionType.Channel,
      channelTypes: [Discord.ChannelType.GuildText],
      required: true
    },
  ],

  run: async (client, interaction, message) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ content: `❌ **Calma! Você precisar ser um admin para usar o meu sistema de ticket!**`, ephemeral: true })

    else {
      let canal = interaction.options.getChannel('canal_message')

      
	  const style2 = new Discord.EmbedBuilder()
	    .setAuthor({ name: `📑 Ticket - ${interaction.guild.name}` })
        .setDescription(`\`ATENÇÃO!\`\n<:seta:1131066243839963156> Não abra um TICKET sem ter algo relevante. Leia nossas <#1131038490587562004>, apenas por abrir irá gerar punições.\n\nSelecione uma das **CATEGORIAS** abaixo para abrir um **TICKET**:`)
		.setColor("#2b2d31")

        const style2row = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Selecione a categoria para abrir um ticket.')
					.addOptions([
						{
							label: 'Suporte',
							emoji: '❔',
							value: 'suporte',
						},
						{
							label: 'Denúncia',
							emoji: '⚠️',
							value: 'denuncia',
						},
						{
							label: 'Parceria',
							emoji: '⭐',
							value: 'parceria',
						},
					]),
			);

        canal.send({embeds: [style2], components: [style2row]})
				interaction.reply({content: "Ok!", ephemeral: true})
    }
  }
}
