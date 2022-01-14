module.exports = {
    name: "say",
    description: "Repeats your message",
    category: "basic",
    hide: false,
    guildOnly: false,
    options: [
        {
            type: 3,
            name: "message",
            description: "The message to repeat",
            required: true
        }
    ],
    run: async (bot, interaction, lang) => {
        const text = interaction.options.getString("message");
        
        if((text.includes("I") || text.includes("i")) && text.includes("dumb") && !text.includes("not")) {
            interaction.reply({ content: lang.get("say_i_know") });
        } else {
            interaction.channel.send({ content: text });
            interaction.reply({ content: lang.get("say_sent"), ephemeral: true });
        }
    }
}