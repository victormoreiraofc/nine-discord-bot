const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "userinfo",
  description: "Veja informações de um usuário.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],

  run: async (client, interaction) => {

    const icon = interaction.options.getUser("usuário").displayAvatarURL({ dynamic: true });

    const entradaDiscord = interaction.member.joinedAt.toLocaleString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const member = interaction.guild.members.cache.get(interaction.options.getUser("usuário").id);
    const dataAtual = new Date();
    const dataEntrada = member.joinedAt;
    const diferencaMembro = moment.duration(dataAtual - dataEntrada);
    const tempoDecorridoMembro = `há ${diferencaMembro.years()} anos, ${diferencaMembro.months()} meses`;

    const dataCriacaoConta = moment(interaction.options.getUser("usuário").createdAt);
    const dataAtualConta = moment();
    const diferencaCriacaoConta = moment.duration(dataAtualConta.diff(dataCriacaoConta));
    const tempoDecorridoCriacaoConta = `há ${diferencaCriacaoConta.years()} anos e ${diferencaCriacaoConta.months()} meses`;

    const memberCargo = member;
    const cargosUsuario = memberCargo.roles.cache.map(role => role.name).join(", ");

    let user = interaction.options.getUser("usuário");
    let data_conta = user.createdAt.toLocaleString();
    let id = user.id;
    let tag = user.tag;
    let is_bot = user.bot;

    if (is_bot === true) is_bot = "Sim";
    if (is_bot === false) is_bot = "Não";

    let embed = new Discord.EmbedBuilder()
    .setColor("#2B2D31")
    .setTitle(`🔎 Informações do Usuário: ${tag}`)
    .setThumbnail(icon)
    .addFields(
        {name: `🪪 Tag do Discord:`,value: `\`${tag}\`.`,inline: true},
        {name: `🆔 Id:`,value: `\`${id}\`.`,inline: true},
        {name: `📅 Data da Criação da conta:`,value: `\`${data_conta} (${tempoDecorridoCriacaoConta})\`.`,inline: true},
        {name: `🧩 Data de Entrada no Servidor:`,value: `\`${entradaDiscord} (${tempoDecorridoMembro})\``,inline: true},
        {name: `🤖 É um bot?`,value: `\`${is_bot}\`.`,inline: true},
        {name: `🏅 Cargos do Usuario:`,value: `\`${cargosUsuario}\`.`,inline: true}
    );

    interaction.reply({ embeds: [embed] });
  }
};
