const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the current music queue"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue || !queue.songs.length)
      return interaction.reply("❌ The queue is empty.");

    const songs = queue.songs
      .map((song, index) => `${index + 1}. ${song.info.title}`)
      .slice(0, 10)
      .join("\n");

    const embed = new EmbedBuilder()
      .setTitle("🎶 Music Queue")
      .setDescription(songs)
      .setColor("Blue");

    interaction.reply({ embeds: [embed] });

  }

};
