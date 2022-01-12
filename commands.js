const fs = require("fs");
const langs = require("./lang");
const commands = {};

module.exports.load = () => {
    // For every file in the commands folder
    fs.readdirSync("./commands/").forEach(file => {
        console.log("[Commands] Loading command: " + file);
        // Require the file
        const command = require(`./commands/${file}`);
        // Add the command to the commands object
        commands[command.name] = command;
    });
}

module.exports.register = (bot) => {
    bot.on("interactionCreate", async interaction => {
        if(!interaction.isCommand()) return;

        const lang = langs.get("en");

        if(commands[interaction.commandName]) {
            try {
                await commands[interaction.commandName].run(bot, interaction, lang);
            } catch (error) {
                console.error(error);
                interaction.reply(lang.get("command_exec_error").replace("{error}", error));
            }
        } else {
            console.error("[Commands] Unknown command received: " + interaction.commandName);
            interaction.reply(lang.get("unknown_command"));
        }
    });
}