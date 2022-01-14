const Discord = require("discord.js");

module.exports = {
    name: "news",
    description: "Send a news message",
    category: "basic",
    hide: false,
    guildOnly: true,
    options: [
        {
            type: 3,
            name: "message",
            description: "The message to send",
            required: true
        }
    ],
    run: async (bot, interaction, lang) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(":loudspeaker: News :newspaper:")
            .setDescription(interaction.options.getString("message"))
            .setColor("RANDOM")
            .setFooter("News");
        interaction.channel.send({ embeds: [embed] }).then(msg => {
            if(msg.crosspostable) {
                msg.crosspost();
            }
        });
        interaction.reply({ content: lang.get("news_sent"), ephemeral: true });
    }
}