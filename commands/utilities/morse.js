const Discord = require('discord.js');

function encodeToMorse(message) {
    const morseCodeMap = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
        '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/'
    };
    return message.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
}

function decodeFromMorse(morse) {
    const morseCodeMap = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
        '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
        '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
        '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '/': ' '
    };
    return morse.split(' ').map(code => morseCodeMap[code] || code).join('');
}

module.exports = {
    name: 'morse',
    description: 'Codifica ou decodifica uma mensagem em código Morse.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "action",
            description: "Encode ou Decode.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "message",
            description: "A mensagem a ser codificada ou decodificada.",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        const action = interaction.options.getString('action');
        const message = interaction.options.getString('message');

        let result;
        if (action === 'encode') {
            result = encodeToMorse(message);
            let embed = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle("💱 SUA MENSAGEM FOI CODIFICADA!")
        .setDescription(`**Resultado:** ||${result}||`);
            interaction.reply({ embeds: [embed] })
        } else if (action === 'decode') {
            result = decodeFromMorse(message);
            let embed2 = new Discord.EmbedBuilder()
        .setColor("#2B2D31")
        .setTitle("💱 SUA MENSAGEM FOI DECODIFICADA!")
        .setDescription(`**Resultado:** ||${result}||`);
            interaction.reply({ embeds: [embed2] })
        } else {
            return interaction.reply({ content: 'Ação inválida. Use `encode` ou `decode`.', ephemeral: true });
        }

    }
};
