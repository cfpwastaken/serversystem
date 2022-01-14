const canvacord = require("canvacord");
const Discord = require("discord.js");
const xp = require("../xp");

module.exports = {
    name: "level",
    description: "Shows your level and xp",
    category: "xp",
    hide: false,
    guildOnly: true,
    run: async (bot, interaction, lang) => {
        const card = new canvacord.Rank()
            .setUsername(interaction.user.username)
            .setDiscriminator(interaction.user.discriminator)
            .setLevel(xp[interaction.user.id].level)
            .setCurrentXP(xp[interaction.user.id].xp)
            .setRequiredXP(xp[interaction.user.id].reqxp)
            .setAvatar(interaction.user.displayAvatarURL({format: "png", size: 1024}));
        
        const img = await card.build();

        interaction.reply({ files: [ new Discord.MessageAttachment(img, "card.png")] });
    }
}