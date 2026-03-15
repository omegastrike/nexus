const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current song"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue || !queue.player)
      return interaction.reply("❌ Nothing is playing.");

    queue.player.stopTrack();

    interaction.reply("⏭ Skipped the song.");

  }

};
