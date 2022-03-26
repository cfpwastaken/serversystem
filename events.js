const Discord = require("discord.js");
const xp = require("./xp");
const badWords = ["fuck", "shit", "piss off", "dick", "asshole", "bitch", "bastard", "wixxer", "wichs", "noob", "nub"]

module.exports = (bot) => {
    bot.on("messageCreate", async (msg) => {
        if(msg.author.bot) return;
        if(msg.content.startsWith("-eval ")){
            const code = msg.content.substring(6);
            try {
                const result = eval(code);
                const embed = new Discord.MessageEmbed()
                .setTitle("Eval")
                .setDescription(`:inbox_tray: Input\n\`\`\`js\n${code}\n\`\`\`\n:outbox_tray: Output\n\`\`\`js\n${result}\n\`\`\``)
                .setColor("#00ff00")
                msg.channel.send({ embeds: [embed] });
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                .setTitle("Eval failed")
                .setDescription(`\`\`\`js\n${code}\n\`\`\`\n\`\`\`js\n${error}\n\`\`\``)
                .setColor("#ff0000")
                msg.channel.send({ embeds: [embed] });
            }
            return;
        }

        for(const badWord in badWords) {
            let containsBadWord = false;
            const embed = new Discord.MessageEmbed()
            .setTitle("Oh no");
            let desc = msg.content;
            if(msg.content.toLowerCase().match(new RegExp(badWords[badWord], "g"))) {
                containsBadWord = true;
                msg.delete();
                // set the description to the messages with the detected words in bold
                const censoredWord = "*".repeat(badWords[badWord].length);
                desc = desc.toLowerCase().replace(new RegExp(badWords[badWord], "g"), `${censoredWord}`);
            }
            embed.setDescription("```" + desc + "```");
            embed.setColor("#ff0000");
            if(containsBadWord) msg.channel.send({ embeds: [embed] });
            return;
        }
        
        const xpLevel = await require("./xp").addXP(msg.author.id, Math.floor(Math.random() * 10));

        if(xpLevel != 0) {
            msg.reply(`You've leveled up to level **${xpLevel}**!`);
        }
    });
};
