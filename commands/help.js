const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows all the available commands, also how are you seeing this?",
    category: "basic",
    hide: true,
    guildOnly: false,
    run: async (bot, interaction, lang) => {
        // Get all the commands
        console.log(bot.commands);
        const commands = Object.values(bot.commands).filter(c => !c.hide);
        // Get the categories
        const categories = commands.map(c => c.category).filter((v, i, a) => a.indexOf(v) === i);

        const embed = new Discord.MessageEmbed()
            .setTitle(lang.get("help_title"))
            .setColor("RANDOM")
            .setFooter("Server System");
        
        categories.forEach(category => {
            embed.addField(category, commands.filter(c => c.category === category).map(c => `\`${c.name}\``).join(", "));
        });

        await interaction.reply({
            embeds: [embed]
        });
    }
}