module.exports = {
    name: "ping",
    description: "Replies with Pong!",
    category: "basic",
    hide: false,
    guildOnly: false,
    run: async (bot, interaction, lang) => {
        await interaction.reply({ content: lang.get("pong").replace("{ms}", bot.ws.ping) });
    }
}