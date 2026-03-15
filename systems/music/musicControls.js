const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function createMusicControls() {

  const row = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
      .setCustomId("music_pause")
      .setLabel("Pause")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("music_skip")
      .setLabel("Skip")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("music_stop")
      .setLabel("Stop")
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId("music_loop")
      .setLabel("Loop")
      .setStyle(ButtonStyle.Success)

  );

  return row;

}

module.exports = { createMusicControls };
