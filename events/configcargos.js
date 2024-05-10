require('../index')

const Discord = require('discord.js')
const client = require('../index')

const { QuickDB } = require("quick.db")
const db = new QuickDB(); // npm i quick.db better-sqlite3

client.on("interactionCreate", (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === "painel_reacao") {
        let opc = interaction.values[0]
        if (opc === "opc1") {
            
            const embed_pergunta1 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será o titulo do Embed?`)
            .setDescription("¬ Você pode definir o que aparecerá no topo da Embed.");

            interaction.reply({ embeds: [embed_pergunta1], ephemeral: false });

            const embed_pergunta2 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a descrição do Embed?`)
            .setDescription("¬ Você pode definir o que aparecerá na descrição da Embed.");

            interaction.reply({ embeds: [embed_pergunta2], ephemeral: false });

            const embed_pergunta3 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a imagem do Embed?`)
            .setDescription("¬ Você pode definir uma imagem para aparecer na Embed.");

            interaction.reply({ embeds: [embed_pergunta3], ephemeral: false });

            const embed_pergunta4 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`O que estará escrito no botão?`)
            .setDescription("¬ Você pode definir o que estará escrito no botão onde permitirá acessar o formulário.");

            interaction.reply({ embeds: [embed_pergunta4], ephemeral: false });

            const embed_pergunta5 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Marque o cargo que será dado.`)
            .setDescription("¬ Você pode definir o que cargo que será dado após concluir o formulário.");

            interaction.reply({ embeds: [embed_pergunta5], ephemeral: false });

            const embed_pergunta6 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a 1º Pergunta do Formulário?`)
            .setDescription("¬ Você pode definir as perguntas do formulário.");

            interaction.reply({ embeds: [embed_pergunta6], ephemeral: false });

            const embed_pergunta7 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a 2º Pergunta do Formulário?`)
            .setDescription("¬ Você pode definir as perguntas do formulário.");

            interaction.reply({ embeds: [embed_pergunta7], ephemeral: false });

            const embed_pergunta8 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a 3º Pergunta do Formulário?`)
            .setDescription("¬ Você pode definir as perguntas do formulário.");

            interaction.reply({ embeds: [embed_pergunta8], ephemeral: false });

            const embed_pergunta9 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a 4º Pergunta do Formulário?`)
            .setDescription("¬ Você pode definir as perguntas do formulário.");

            interaction.reply({ embeds: [embed_pergunta9], ephemeral: false });

            const embed_pergunta10 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual será a 5º Pergunta do Formulário?`)
            .setDescription("¬ Você pode definir as perguntas do formulário.");

            interaction.reply({ embeds: [embed_pergunta10], ephemeral: false });

            const embed_pergunta11 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual sala será enviado o embed?`)
            .setDescription("¬ Você pode definir a sala onde será enviado o embed.");

            interaction.reply({ embeds: [embed_pergunta11], ephemeral: false });

            const filter = m => m.author.id === interaction.user.id && m.mentions.channels.size > 0;
            const collector = interaction.channel.createMessageCollector({ filter, time: 60000, max: 1 });

            collector.on('collect', async (message) => {
                const mentionedChannel = message.mentions.channels.first();
                canaisDeSugestao[guildId] = mentionedChannel.id;

             const embed_sugestao = new Discord.EmbedBuilder()
                 .setColor("#2B2D31")
                 .setTitle(`💡 De sua sugestão!`)
                 .setDescription("Esta é a nova sala de sugestões. Fique à vontade para enviar suas sugestões aqui! ```/sugerir para enviar sua sugestão.``` ")
                 .setFooter({text:`📌 Sua sugestão poderá nos ajudar a melhorar cada dia mais.`});

             mentionedChannel.send({ embeds: [embed_sugestao] });
    
             collector.stop();
            });

            collector.on('end', (collected, reason) => {
             if (reason === 'time') {
             interaction.followUp({ content: `⏲️ | ${interaction.user} seu tempo acabou e você não definiu nenhum canal!` });
             }
            });

            const embed_pergunta12 = new Discord.EmbedBuilder()
            .setColor("#2B2D31")
            .setTitle(`Qual sala receberá uma copia das respostas?`)
            .setDescription("¬ Você pode definir a sala onde será enviado uma copia das respostas dadas.");

            interaction.reply({ embeds: [embed_pergunta12], ephemeral: false });
  
        } else if (opc === "opc2") {
  
  
        } else if (opc === "opc3") {
  
          
    }
}
}
})