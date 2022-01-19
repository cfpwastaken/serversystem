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
        const userXP = await xp.get(interaction.user.id);
        const card = new canvacord.Rank()
            .setUsername(interaction.user.username)
            .setDiscriminator(interaction.user.discriminator)
            .setLevel(userXP.level)
            .setCurrentXP(userXP.xp)
            .setRequiredXP(userXP.reqxp)
            .setAvatar(interaction.user.displayAvatarURL({format: "png", size: 1024}));
        
        const img = await card.build();

        interaction.reply({ files: [ new Discord.MessageAttachment(img, "card.png")] });
    }
}
