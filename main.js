const Discord = require("discord.js");
const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]}); // its bot and not client, fight me
const secrets = require("./secrets.json");
const langs = require("./lang");
const commands = require("./commands");

bot.on("ready", () => {
    console.log("[Discord Bot] Ready and logged in as " + bot.user.tag);
    console.log("[Discord Bot] In " + bot.guilds.cache.size + " servers");
    setStatusBasedOnBranch();
    langs.load();
    commands.load(bot);
    commands.register(bot);
    require("./events")(bot);
});

function setStatusBasedOnBranch() {
    const { exec } = require("child_process");
    exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
        if(err) throw err;

        if(typeof stdout === "string") {
            const branch = stdout.trim();
            if(branch == "main") {
                bot.user.setPresence({
                    status: "online",
                    activities: [{
                        name: "a bot duel",
                        type: "COMPETING"
                    }]
                });
            } else {
                bot.user.setPresence({
                    status: "dnd",
                    activities: [{
                        name: "for new code on branch " + branch,
                        type: "WATCHING"
                    }]
                })
            }
        }
    });
}

bot.on("rateLimit", (info) => {
    console.error(`[Discord Bot] Hit ${info.global ? "global " : ""}rate limit! ${info.timeout}ms timeout.`);
});

bot.login(secrets.token);
