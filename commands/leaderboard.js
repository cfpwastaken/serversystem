const canvacord = require("canvacord");
const Discord = require("discord.js");
const xp = require("../xp");

module.exports = {
    name: "leaderboard",
    description: "Shows xp leaderboard",
    category: "xp",
    hide: false,
    guildOnly: true,
    options: [
        {
            name: "type",
            description: "The type of leaderboard to show",
            type: 3,
            required: false,
            choices: [
                {
                    name: "Global",
                    value: "global"
                },
                {
                    name: "Server",
                    value: "server"
                }
            ]
        }
    ],
    run: async (bot, interaction, lang) => {
        const type = interaction.options.getString("type") || "global";
        if(type === "global") {
            const global = await xp.getAll();
            const embed = new Discord.MessageEmbed()
                .setTitle("Global XP Leaderboard")
                .setDescription("Top 10 users with the most xp");
            for(let i = 0; i < global.length; i++) {
                const user = await bot.users.fetch(global[i].user);
                const guild = await bot.guilds.fetch(global[i].server);
                console.log(global[i], user.username);
                embed.addField(`${i + 1}. ${user.username}#${user.discriminator} in ${guild.name}`, global[i].xp + " xp", true);
            }
            interaction.reply({ embeds: [embed] });
        } else if(type === "server") {
            const global = await xp.getAllFromGuild(interaction.guild.id);
            const embed = new Discord.MessageEmbed()
                .setTitle("XP Leaderboard")
                .setDescription("Top 10 users with the most xp in this guild");
            for(let i = 0; i < global.length; i++) {
                const user = await bot.users.fetch(global[i].user);
                console.log(global[i], user.username);
                embed.addField(`${i + 1}. ${user.username}#${user.discriminator}`, global[i].xp + " xp", true);
            }
            interaction.reply({ embeds: [embed] });
        }
    }
}
