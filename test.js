const Minesweeper = require("discord.js-minesweeper");

const ms = new Minesweeper({
  rows: 10,
  columns: 10,
  mines: 5,
  emote: "bomb",
  returnType: "emoji",
  revealFirstCell: true
});

console.log(ms.start());