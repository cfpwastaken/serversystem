module.exports = {
    name: "ping",
    description: "Replies with Pong!",
    run: async (bot, interaction, lang) => {
        await interaction.reply({ content: lang.get("pong") });
    }
}