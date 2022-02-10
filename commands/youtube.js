const canvacord = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "youtube",
    description: "Generate a YouTube comment",
    category: "fun",
    hide: false,
    guildOnly: false,
    options: [
        {
            type: 3,
            name: "username",
            description: "Username of the YouTube comment",
            required: true
        },
        {
            type: 3,
            name: "content",
            description: "The content of the YouTube comment, duh.",
            required: true
        },
        {
            type: 6,
            name: "avatar",
            description: "The avatar to use, duh. If omitted, the bot will use the author",
            required: false
        }
    ],
    run: async (bot, interaction, lang) => {
        const avatar = (interaction.options.getUser("avatar") || interaction.user).displayAvatarURL({ format: "png", size: 1024 });
        const content = interaction.options.getString("content");
        const username = interaction.options.getString("username");

        let img = await canvacord.Canvas.youtube({username, content, avatar, dark: true});
        // const img = await canvacord.Canvas.clyde(interaction.options.getString("text"));
        // get profile picture
        // const profilepic = interaction.user.displayAvatarURL({format: "png", size: 1024});
        // const img = await canvacord.Canvas.hitler(profilepic);

        interaction.reply({ files: [ new Discord.MessageAttachment(img, `meme.png`)] });
    }
}
