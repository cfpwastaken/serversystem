const { createTranscript } = require('discord-html-transcripts');

module.exports = {
  name: "transcript",
  description: "Generate a transcript of this channel",
  category: "advanced",
  hide: false,
  guildOnly: false,
  perms: ["MANAGE_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
  options: [
    {
      type: 4,
      name: "amount",
      description: "The amount of messages to include in the transcript",
      required: false
    }
  ],
  run: async (bot, interaction, lang) => {
    const amount = interaction.options.getInteger("amount") || -1;

    interaction.deferReply();
    const attachment = await createTranscript(interaction.channel, {
      limit: amount,
      returnBuffer: false,
      fileName: "transcript.html"
    });
    interaction.editReply({
      files: [attachment]
    });
  }
}