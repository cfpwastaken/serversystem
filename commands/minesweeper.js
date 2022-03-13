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
      required: true,
      min_value: 2,
      max_value: 20
    },
    {
      type: 4,
      name: "columns",
      description: "The amount of columns for the game",
      required: true,
      min_value: 2,
      max_value: 20
    },
    {
      type: 4,
      name: "mines",
      description: "The amount of mines for the game",
      required: true,
      min_value: 1
    }
  ],
  run: async (bot, interaction, lang) => {
    const rows = interaction.options.getInteger("rows");
    const columns = interaction.options.getInteger("columns");
    const mines = interaction.options.getInteger("mines");

    if(rows < 2 || rows > 20 || columns < 2 || columns > 20 || mines < 1) {
      return interaction.reply("No.");
    }

    if(mines > rows * columns) {
      return interaction.reply("No.");
    }

    const ms = new Minesweeper({
      rows,
      columns,
      mines,
      emote: "bomb",
      returnType: "emoji",
      revealFirstCell: true,
      spaces: false
    });

    // console.log(ms.start());
    const field = ms.start();

    interaction.reply(field ? field : "No.");
  }
}
