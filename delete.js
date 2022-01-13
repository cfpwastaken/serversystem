const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const secrets = require("./secrets.json");
    
const rest = new REST({ version: '9' }).setToken(secrets.token);
rest.get(Routes.applicationGuildCommands(secrets.client_id, secrets.guild_id))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(secrets.client_id, secrets.guild_id)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
rest.get(Routes.applicationCommands(secrets.client_id, secrets.guild_id))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(secrets.client_id, secrets.guild_id)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });