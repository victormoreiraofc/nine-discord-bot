const Discord = require("discord.js");

let isInstagramActive = false;

module.exports = {
  name: "instagram",
  description: "Defina o canal onde as fotos serão enviadas.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      description: "Mencione ou forneça o ID do canal de fotos do instagram.",
      type: Discord.ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],

  run: async (client, interaction) => {
    if (isInstagramActive) {
      return interaction.reply("O envio de fotos do Instagram já está ativo. Para parar, aguarde até que uma nova mensagem seja enviada.");
    }

    const channel = interaction.options.getChannel("canal");

    const messageListener = async (message) => {
      if (!message.author.bot && message.channel.id === channel.id) {
        const description = message.content;

        const newMessage = await channel.send({
          content: `**Postado por:** ${message.author}\n**Descrição:** ${description}`,
          files: [message.attachments.first().url]
        });

        await newMessage.react("👍");
        await newMessage.react("👎");

        await message.delete().catch(console.error);
        
        newMessage.startThread({
          name: `Comentários do Instagram`,
          autoArchiveDuration: 1440,
          reason: `Thread criada para comentários da foto`,
        }).catch(error => {
          console.error("Erro ao criar thread:", error);
          interaction.reply({ content: `Ops ${interaction.user}, algo deu errado ao criar a thread de discussão!` });
        });

        isInstagramActive = true;
      }
    };

    client.on("messageCreate", messageListener);

    interaction.reply(`Canal ${channel} definido para receber fotos do Instagram!`);
  }
};
