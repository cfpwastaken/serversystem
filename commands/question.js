const Discord = require("discord.js");

module.exports = {
    name: "question",
    description: "Ask a question",
    category: "basic",
    hide: false,
    guildOnly: true,
    options: [
        {
            type: 3,
            name: "question",
            description: "The question to ask",
            required: true
        }
    ],
    run: async (bot, interaction, lang) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("Question")
            .setDescription(interaction.options.getString("question"))
            .setColor("RANDOM")
            .setFooter("Questions");
        interaction.channel.send({ embeds: [embed] }).then(async msg => {
            await msg.react('👍');
            await msg.react('👎');
            interaction.reply({ content: lang.get("question_sent"), ephemeral: true });
        });
    }
}