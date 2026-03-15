const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resume the music"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue || !queue.player)
      return interaction.reply("❌ Nothing is playing.");

    queue.player.setPaused(false);

    interaction.reply("▶ Music resumed.");

  }

};
