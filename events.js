const Discord = require("discord.js");
const xp = require("./xp");
const check = require("./badWords");

module.exports = (bot) => {
    bot.on("messageCreate", async (msg) => {
        if(msg.author.bot) return;
        if(msg.content.startsWith("-eval ")){
            if(msg.author.id !== "318394797822050315") return;
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

        if(msg.content.startsWith("-recheck ")) {
            const messageID = msg.content.split(" ")[1];
            const message = await msg.channel.messages.fetch(messageID);
            msg.delete();
            const badWordCheck = check(message.content);
            if(badWordCheck.containsBadWord) {
                message.delete();
                const embed = new Discord.MessageEmbed()
                    .setTitle("Oh no")
                    .setDescription(message.author.tag + "```" + badWordCheck.censored + "```")
                    .setColor("#ff0000");
                msg.channel.send({ embeds: [embed] });
            }
            return;
        }

        const badWordCheck = check(msg.content);
        if(badWordCheck.containsBadWord) {
            msg.delete();
            const embed = new Discord.MessageEmbed()
                .setTitle("Oh no")
                .setDescription(msg.author.tag + "```" + badWordCheck.censored + "```")
                .setColor("#ff0000");
            msg.channel.send({ embeds: [embed] });
            return;
        }
        
        const xpLevel = await require("./xp").addXP(msg.author.id, msg.guild.id, Math.floor(Math.random() * /* 10 */ msg.content.length));

        if(xpLevel != 0) {
            msg.reply(`You've leveled up to level **${xpLevel}**!`);
        }
    });
};
