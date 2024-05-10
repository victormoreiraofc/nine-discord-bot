const Discord = require('discord.js'), Client = require('../index'), Wait = require('wait'), Transcript = require('discord-html-transcripts');
const { QuickDB } = require('quick.db');
const DB = new QuickDB();

Client.on("interactionCreate", async interaction => {
    if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'Panel') {
            let Embed = new Discord.EmbedBuilder().setColor('#2B2D31').setTitle('Ticket de Suporte').setDescription('> Bem-vindo, lembre-se de só abrir o ticket caso tenha algo realmente importante.').setFooter({ text: "🎫 Sistema de Ticket - Nine BOT" });
            let Row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Primary).setCustomId('Create').setLabel('・Abrir Ticket').setEmoji('📩')
            );

            interaction.message.components[0].components[0].data.disabled = true;
            interaction.update({ components: [interaction.message.components[0]] });
            await interaction.guild.channels.cache.get(interaction.values[0]).send({ embeds: [Embed], components: [Row] });
        };
    };

    if (interaction.isButton()) {
        if (interaction.customId === 'Create') {
            if (interaction.guild.channels.cache.find(value => value.topic === interaction.user.id)) return interaction.reply({ content: "> **Atenção:** Limite de tickets atingido. Você já tem 1 ticket aberto.", ephemeral: true });

            await DB.add(`AMOUNT_${interaction.guildId}`, 1);
            interaction.deferReply({ ephemeral: true });
            await Wait(1000);

            const Quantidade = String(await DB.get(`AMOUNT_${interaction.guildId}`)).padStart(4, "0");
            let Canal = await interaction.guild.channels.create({
                name: `ticket-${Quantidade}`, type: Discord.ChannelType.GuildText,
                permissionOverwrites: [
                    { id: interaction.guildId, deny: [Discord.PermissionFlagsBits.ViewChannel] },
                    { id: interaction.user.id, allow: [Discord.PermissionFlagsBits.ViewChannel] },
                ]
            });

            let Embed = new Discord.EmbedBuilder().setColor('#2B2D31').setDescription('> O suporte entrará em contato com você em breve.\n> Para fechar este ticket, reaja com 🔒.').setFooter({ text: "🎫 Sistema de Ticket - Nine BOT" });
            let Row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Danger).setCustomId('Close').setLabel('Fechar').setEmoji('🔒')
            );

            Canal.setTopic(interaction.user.id);
            Canal.send({ content: `${interaction.user} Bem-Vindo.`, embeds: [Embed], components: [Row] });
            return interaction.editReply({ content: `Ticket criado ${Canal}`, ephemeral: true });
        };

        if (interaction.customId === 'Close') {
            let Row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Danger).setCustomId('Confirm').setLabel('Fechar'),
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Secondary).setCustomId('Cancel').setLabel('Cancelar')
            );

            return interaction.reply({ content: "Tem certeza de que deseja fechar este ticket?", components: [Row] });
        };

        if (interaction.customId === 'Cancel') interaction.message.delete();
        if (interaction.customId === 'Confirm') {
            let Embed = new Discord.EmbedBuilder().setColor('#2B2D31').setDescription(`Ticket fechado por ${interaction.user}.`);
            let Other_Embed = new Discord.EmbedBuilder().setColor('#2B2D31').setDescription('Controles de tickets da equipe de suporte.');

            let Row = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Secondary).setCustomId('Transcript').setLabel('Transcrição').setEmoji('📑'),
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Secondary).setCustomId('Open').setLabel('Abrir').setEmoji('🔓'),
                new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Secondary).setCustomId('Delete').setLabel('Deletar').setEmoji('⛔')
            );

            interaction.message.delete();
            await interaction.channel.setName(`closed-${interaction.channel.name.slice(-4)}`);
            return interaction.channel.send({ embeds: [Embed, Other_Embed], components: [Row] });
        };

        if (interaction.customId === 'Transcript') return interaction.reply({ files: [await Transcript.createTranscript(interaction.channel)] });

        if (interaction.customId === 'Open') {
            let Embed = new Discord.EmbedBuilder().setColor('#2B2D31').setDescription(`Ticket Aberto por ${interaction.user}.`);

            interaction.message.delete();
            interaction.channel.permissionOverwrites.edit(interaction.channel.topic, { 'ViewChannel': true, });
            return interaction.reply({ embeds: [Embed] });
        };

        if (interaction.customId === 'Delete') {
            interaction.message.components[0].components[2].data.disabled = true;
            interaction.update({ components: [interaction.message.components[0]] });
            await Wait(5000); return interaction.channel.delete();
        };
    };
});