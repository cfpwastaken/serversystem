const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require("@discordjs/builders");

/*

https://discord.com/developers/docs/interactions/application-commands

Option types:
SUB_COMMAND = 1
SUB_COMMAND_GROUP = 2
STRING = 3
INTEGER = 4
BOOLEAN = 5
USER = 6
CHANNEL = 7
ROLE = 8
MENTIONABLE = 9
NUMBER = 10

*/

const commands = [];

const cmds = require("./commands").loadCommands();

for(const command of Object.values(cmds)) {
	const opts = {
		name: command.name,
		description: command.description,
		options: command.options || []
	};
	commands.push(opts);
}

// const commands = [{
// 	name: 'ping',
// 	description: 'Replies with Pong!'
// }, {
// 	name: 'help',
// 	description: 'Shows all the available commands'
// }, {
// 	name: "clear",
// 	description: "Bulk delete messages",
// 	options: {
// 		type: 4,
// 		name: "count",
// 		description: "The amount of messages to delete",
// 		required: true,
// 		min_value: 1,
// 		max_value: 100
// 	}
// }];

if(!require("fs").existsSync("secrets.json")) {
	require("fs").writeFileSync("secrets.json", JSON.stringify({
		token: "",
		client_id: "",
		comment: "Add a guild_id here to only update that guild with update.js"
	}, null, 4));
	console.log("Please fill in secrets.json and run this script again.");
	process.exit(2);
}

const rest = new REST({ version: '9' }).setToken(require("./secrets.json").token);

const CLIENT_ID = require("./secrets.json").client_id;
const GUILD_ID = require("./secrets.json").guild_id;

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        if(GUILD_ID) {
            console.log("Guild ID found, only refreshing commands for that guild. Dont set GUILD_ID in secrets.json if you want to refresh commands for all guilds.");
            await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commands },
            );
        } else {
            await rest.put(
                Routes.applicationCommands(CLIENT_ID),
                { body: commands },
            );
        }

        console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();