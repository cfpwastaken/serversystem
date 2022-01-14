const ascii = require("ascii-art");

module.exports = {
    name: "ascii",
    description: "Create ASCII art from your text",
    category: "basic",
    hide: false,
    guildOnly: false,
    options: [
        {
            type: 3,
            name: "text",
            description: "The text to convert to ASCII art",
            required: true
        }
    ],
    run: async (bot, interaction, lang) => {
        ascii.font(interaction.options.getString("text"), "Doom", function(err, result){
            if(err) throw err;
            // if result too long
            if(result.length > 2000) return interaction.reply({ content: lang.get("ascii_too_long") });
            interaction.reply({ content: "```" + result + "```" });
        });
    }
}