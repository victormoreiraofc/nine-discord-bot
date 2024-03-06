#  Criando um Comando para Bot do Discord em JavaScript (v14)

Passo 1: Configurando o Local
    1. Vá ate a pasta /commands/ e crie um arquivo nomedocomando.js.
    
Passo 2: Preenchendo as Informações do Comando
    1. Preencha o campo name com o nome do comando que deseja criar.
    2. Descreva brevemente a função do comando no campo description.
    3. Para adicionar opções ao comando, como argumentos, preencha o array options. Cada opção deve conter um objeto com os seguintes campos:
        `name`: O nome da opção.
        `description`: Uma breve descrição da opção.
        `type`: O tipo da opção, como STRING, INTEGER, BOOLEAN, entre outros.
        `required`: Se a opção é obrigatória ou não.

    ```
    const Discord = require("discord.js")

    module.exports = {
    name: '', 
    description: '',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: '',
            description: '',
            type: Discord.ApplicationCommandOptionType,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        
    }
    }
    ```