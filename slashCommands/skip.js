const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current song"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue)
      return interaction.reply("Nothing playing.");

    queue.player.stopTrack();

    interaction.reply("⏭ Skipped song");

  }

};
