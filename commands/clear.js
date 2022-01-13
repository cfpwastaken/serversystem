const { sleep } = require("../util");

module.exports = {
    name: "clear",
    description: "Bulk delete messages",
    category: "basic",
    hide: false,
    guildOnly: true,
    options: [
        {
            type: 4,
            name: "count",
            description: "The amount of messages to delete",
            required: true,
            min_value: 1,
            max_value: 100
        },
        {
            type: 5,
            name: "hidden",
            description: "Makes the reply hidden",
            required: false
        }
    ],
    perms: ["MANAGE_MESSAGES"],
    cperms: [""],
    run: async (bot, interaction, lang) => {
        //let msgs = message.content.split(" ").slice(1).join("");
        let msgs = interaction.options.getInteger("count");
        let hidden = interaction.options.getBoolean("hidden");

        if(msgs == 1) {
            interaction.reply({ content: lang.get("clear_1"), ephemeral: hidden });
            return;
        }

        interaction.channel.bulkDelete(msgs).then(async (msgs) => {
            await interaction.reply({ content: lang.get("cleared_messages").replace("{count}", msgs.size), ephemeral: hidden });
            await sleep(2000);
            // delete reply
            if(!hidden) interaction.deleteReply();
        }).catch(e => {
            console.error(e);
            interaction.reply({ content: lang.get("error_clearing_messages"), ephemeral: true });
        });
    }
}