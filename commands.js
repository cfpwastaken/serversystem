const fs = require("fs");
const langs = require("./lang");

module.exports.load = (bot) => {
    bot.commands = this.loadCommands();
}

module.exports.loadCommands = () => {
    let commands = {};
    // For every file in the commands folder
    fs.readdirSync("./commands/").forEach(file => {
        console.log("[Commands] Loading command: " + file);
        // Require the file
        const command = require(`./commands/${file}`);
        // Add the command to the commands object
        commands[command.name] = command;
    });
    return commands;
}

module.exports.register = (bot) => {
    bot.on("interactionCreate", async interaction => {
        if(!interaction.isCommand()) return;

        const lang = langs.get("en");

        if(bot.commands[interaction.commandName]) {
            if(bot.commands[interaction.commandName].guildOnly && !interaction.guildId) return interaction.reply(lang.get("command_guild_only"));
            if(bot.commands[interaction.commandName].perms) {
                // if it is a string
                if(typeof bot.commands[interaction.commandName].perms === "string" && !interaction.member.permissions.has(bot.commands[interaction.commandName].perms)) return interaction.reply({ content: lang.get("command_no_perms").replace("{perm}", bot.commands[interaction.commandName].perms), ephemeral: true });
                
                for(const perm of bot.commands[interaction.commandName].perms) {
                    if(!interaction.member.permissions.has(perm)) return interaction.reply({ content: lang.get("command_no_perms").replace("{perm}", perm), ephemeral: true });
                }
            }
            try {
                await bot.commands[interaction.commandName].run(bot, interaction, lang);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: lang.get("command_exec_error").replace("{error}", error), ephemeral: true });
            }
        } else {
            console.error("[Commands] Unknown command received: " + interaction.commandName);
            interaction.reply({ content: lang.get("unknown_command"), ephemeral: true });
        }
    });
}