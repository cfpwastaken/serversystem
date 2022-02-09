const canvacord = require("canvacord");
const Discord = require("discord.js");

module.exports = {
    name: "image",
    description: "Image",
    category: "fun",
    hide: false,
    guildOnly: false,
    options: [
        {
            name: "type",
            description: "The type of meme to generate",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Beautiful",
                    value: "beautiful"
                },
                {
                    name: "Bed",
                    value: "bed"
                },
                {
                    name: "Blur",
                    value: "blur"
                },
                {
                    name: "Burn",
                    value: "burn"
                },
                {
                    name: "Change my mind",
                    value: "changemymind"
                },
                // {
                //     name: "Distracted Boyfriend",
                //     value: "distracted"
                // },
                {
                    name: "Facepalm",
                    value: "facepalm"
                },
                {
                    name: "Jail",
                    value: "jail"
                },
                {
                    name: "Triggered",
                    value: "trigger"
                },
                {
                    name: "Wanted",
                    value: "wanted"
                },
                {
                    name: "Wasted",
                    value: "wasted"
                },
                {
                    name: "Trash",
                    value: "trash"
                },
                {
                    name: "Deepfry",
                    value: "deepfry"
                }
            ]
        },
        {
            type: 3,
            name: "text",
            description: "The text, duh. Only works for some memes",
            required: false
        },
        {
            type: 6,
            name: "user1",
            description: "The first user to use, duh. Only works for some memes. If omitted, the bot will use the author",
            required: false
        },
        {
            type: 6,
            name: "user2",
            description: "The second user to use, duh. Only works for some memes. If omitted, the bot will use the author",
            required: false
        }
    ],
    run: async (bot, interaction, lang) => {
        const textMemes = [
            "changemymind",
        ];
        const user1 = (interaction.options.getUser("user1") || interaction.user).displayAvatarURL({ format: "png", size: 1024 });
        const user2 = (interaction.options.getUser("user2") || interaction.user).displayAvatarURL({ format: "png", size: 1024 });
        const text = interaction.options.getString("text");
        const type = interaction.options.getString("type");
        let isGIF = false;

        let img;

        if(textMemes.includes(type)) {
            if(!text) return interaction.reply({ content: lang.get("image_text_required"), ephemeral: true });
            img = await canvacord.Canvas[type](text);
        } else {
            if(type === "trigger") isGIF = true;
            switch(type) {
                case "burn":
                    img = await canvacord.Canvas.burn(user1, 10);
                    break;
                default:
                    img = await canvacord.Canvas[type](user1, user2);
                    break;
            }
        }
        // const img = await canvacord.Canvas.clyde(interaction.options.getString("text"));
        // get profile picture
        // const profilepic = interaction.user.displayAvatarURL({format: "png", size: 1024});
        // const img = await canvacord.Canvas.hitler(profilepic);

        interaction.reply({ files: [ new Discord.MessageAttachment(img, `meme.${isGIF ? "gif" : "png"}`)] });
    }
}
