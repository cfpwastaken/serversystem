const canvacord = require("canvacord");
const Discord = require("discord.js");
const xp = require("../xp");

module.exports = {
    name: "level",
    description: "Shows your level and xp",
    category: "xp",
    hide: false,
    guildOnly: true,
    options: [
        {
            type: 6,
            name: "user",
            description: "The user to show the level of",
            required: false
        }
    ],
    run: async (bot, interaction, lang) => {
        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        console.log(member.presence);
        const userXP = await xp.get(user.id, interaction.guild.id);
        const card = new canvacord.Rank()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setLevel(userXP.level)
            .setCurrentXP(userXP.xp)
            .setRequiredXP(userXP.reqxp)
            .setStatus(member.presence.status, true)
            .setAvatar(user.displayAvatarURL({format: "png", size: 1024}));
        
        const img = await card.build();

        interaction.reply({ files: [ new Discord.MessageAttachment(img, "card.png")] });
    }
}
