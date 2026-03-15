const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stop music and clear queue"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue)
      return interaction.reply("❌ Nothing is playing.");

    queue.player.stopTrack();
    queue.songs = [];

    interaction.reply("⏹ Music stopped.");

  }

};
