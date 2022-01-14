const Discord = require("discord.js");
const xp = require("./xp");

module.exports = (bot) => {
    bot.on("messageCreate", (msg) => {
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
        var addXP = Math.floor(Math.random() * 10) + 0;

        if(!xp[msg.author.id]) {
            xp[msg.author.id] = {
                xp: 0,
                level: 1,
                reqxp: 100
            };
        }

        xp[msg.author.id].xp += addXP;

        if(xp[msg.author.id].xp > xp[msg.author.id].reqxp) {
            xp[msg.author.id].xp -= xp[msg.author.id].reqxp;
            xp[msg.author.id].level++;
            xp[msg.author.id].reqxp = Math.floor(xp[msg.author.id].reqxp * 1.25);

            msg.reply(`You've leveled up to level **${xp[msg.author.id].level}**!`);
        }
    });
};