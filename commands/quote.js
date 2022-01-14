const got = require('got');

module.exports = {
    name: "quote",
    description: "Get a random quote",
    category: "basic",
    hide: false,
    guildOnly: false,
    run: async (bot, interaction, lang) => {
        const res = await got('https://api.quotable.io/random');
        const quote = JSON.parse(res.body);

        await interaction.reply({ content: quote["content"] + " *~" + quote["author"] + "*" });
    }
}