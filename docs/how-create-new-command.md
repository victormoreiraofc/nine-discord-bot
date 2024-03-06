# Como Criar um Comando para Bot do Discord em JavaScript (v14)

#### Passo 1: Configurando o Local

- Vá até a pasta `/commands/` e crie um arquivo `nomedocomando.js`.

#### Passo 2: Preenchendo as Informações do Comando

- Preencha o campo `name` com o nome do comando que deseja criar.
- Descreva brevemente a função do comando no campo `description`.
- Para adicionar opções ao comando, como argumentos, preencha o array `options`. Cada opção deve conter um objeto com os seguintes campos:
    - `name`: O nome da opção.
    - `description`: Uma breve descrição da opção.
    - `type`: O tipo da opção, como Discord.ApplicationCommandOptionType, entre outros.
    - `required`: Se a opção é obrigatória ou não.

#### 🚀 Código Base para Criar um Comando

```javascript
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