const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Create role selection panel"),

  async execute(interaction) {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("role_gamer")
          .setLabel("Gamer")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("role_developer")
          .setLabel("Developer")
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId("role_designer")
          .setLabel("Designer")
          .setStyle(ButtonStyle.Secondary)
      );

    await interaction.reply({
      content: "Choose your role:",
      components: [row]
    });

  }

};
