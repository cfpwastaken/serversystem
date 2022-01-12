const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [{
	name: 'ping',
	description: 'Replies with Pong!'
}];

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