const {subbey} = require('subbey');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    description: "Get a meme from a random subreddit",
    category: "fun",
    hide: false,
    guildOnly: false,
    run: async (bot, interaction, lang) => {

        const subreddits = [
            "memes"
        ];
        let subreddit = subreddits[Math.floor(Math.random()*(subreddits.length))];
        const img = (await subbey({ sub: subreddit, max: 1, nfsw: false, top: false }))[0];
        const embed = new Discord.MessageEmbed()
        .setTitle(img.title)
        .setDescription(img.ups + "/" + img.downs)
        .setColor("RANDOM")
        .setImage(img.media)
        .setFooter(img.author + " | " + img.subreddit)
        .setURL(img.link);

        interaction.reply({ embeds: [embed] });
    }
}