module.exports = {
    name: "clear",
    description: "Bulk delete messages",
    category: "basic",
    hide: false,
    guildOnly: true,
    run: async (bot, interaction, lang) => {
        //let msgs = message.content.split(" ").slice(1).join("");
        let msgs = interaction.options.getInteger("count");

        interaction.channel.bulkDelete(msgs).then(async (msgs) => {
            await interaction.reply({ content: lang.get("cleared_messages").replace("{count}", msgs.size) });
        }).catch(e => {
            console.error(e);
            interaction.reply({ content: lang.get("error_clearing_messages"), ephemeral: true });
        });
    }
}