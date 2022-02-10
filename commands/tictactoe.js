const { Canvas } = require("canvacord");
const { MessageActionRow } = require("discord.js");

const BUTTONSTYLE = "PRIMARY";

module.exports = {
    name: "timeout",
    description: "Timeout a user",
    category: "basic",
    hide: false,
    guildOnly: false,
    disabled: true,
    options: [
        {
            type: 6,
            name: "user",
            description: "The user to play with",
            required: true
        }
    ],
    perms: ["MODERATE_MEMBERS"],
    run: async (bot, interaction, lang) => {
        const user = interaction.options.getUser("user");
        const players = [interaction.user, user];
        let turn = players[0];
        let current = "X";
        let board = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];

        const img = await Canvas.tictactoe({ a1: board[0][0], a2: board[0][1], a3: board[0][2], b1: board[1][0], b2: board[1][1], b3: board[1][2], c1: board[2][0], c2: board[2][1], c3: board[2][2] },
            {});
        
        /*
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
        */

        const row1 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('a1')
                        .setLabel('a1')
                        .setStyle(BUTTONSTYLE),

                )
    }
}