const Minesweeper = require("discord.js-minesweeper");

module.exports = {
  name: "minesweeper",
  description: "Play a game of minesweeper",
  category: "game",
  hide: false,
  guildOnly: false,
  options: [
    {
      type: 4,
      name: "rows",
      description: "The amount of rows for the game",
      required: true
    },
    {
      type: 4,
      name: "columns",
      description: "The amount of columns for the game",
      required: true
    },
    {
      type: 4,
      name: "mines",
      description: "The amount of mines for the game",
      required: true
    }
  ],
  run: async (bot, interaction, lang) => {
    const ms = new Minesweeper({
      rows: interaction.options.getInteger("rows"),
      columns: interaction.options.getInteger("columns"),
      mines: interaction.options.getInteger("mines"),
      emote: "bomb",
      returnType: "emoji",
      revealFirstCell: true,
      spaces: false
    });

    // console.log(ms.start());
    interaction.reply(ms.start());
  }
}