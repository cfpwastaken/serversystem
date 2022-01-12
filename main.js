const Discord = require("discord.js");
const bot = new Discord.Client({intents: ["GUILDS"]}); // its bot and not client, fight me
const secrets = require("./secrets.json");
const langs = require("./lang");
const commands = require("./commands");

bot.on("ready", () => {
    console.log("[Discord Bot] Ready!");
    langs.load();
    commands.load();
    commands.register(bot);
});

bot.on("rateLimit", (info) => {
    console.error(`[Discord Bot] Hit ${info.global ? "global " : ""}rate limit! ${info.timeout}ms timeout.`);
});

bot.login(secrets.token);