const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Show the current song"),

  async execute(interaction) {

    const queue = getQueue(interaction.guild.id);

    if (!queue || !queue.songs.length)
      return interaction.reply("❌ Nothing is playing.");

    const song = queue.songs[0];

    const embed = new EmbedBuilder()
      .setTitle("🎵 Now Playing")
      .setDescription(`**${song.info.title}**`)
      .addFields(
        { name: "Author", value: song.info.author, inline: true },
        { name: "Duration", value: `${Math.floor(song.info.length / 60000)}m`, inline: true }
      )
      .setColor("Green");

    interaction.reply({ embeds: [embed] });

  }

};
