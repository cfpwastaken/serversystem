const ms = require("ms");

module.exports = {
    name: "timeout",
    description: "Timeout a user",
    category: "basic",
    hide: false,
    guildOnly: false,
    options: [
        {
            type: 6,
            name: "user",
            description: "The user to timeout",
            required: true
        },
        {
            type: 3,
            name: "length",
            description: "The length of the timeout in seconds",
            required: true
        },
        {
            type: 3,
            name: "reason",
            description: "The reason for the timeout",
            required: false
        }
    ],
    run: async (bot, interaction, lang) => {
        const user = interaction.options.getUser("user");
        const length = interaction.options.getString("length");
        const reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(user.id);

        const timeInMs = ms(length);
        if(!timeInMs) return interaction.reply({ content: lang.get("invalid_time") });
        
        member.timeout(timeInMs, reason);
        if(!reason) interaction.reply({ content: lang.get("timed_out").replace("{user}", user.tag).replace("{time}", length) });
        if(reason) interaction.reply({ content: lang.get("timed_out_reason").replace("{user}", user.tag).replace("{time}", length).replace("{reason}", reason) });
    }
}