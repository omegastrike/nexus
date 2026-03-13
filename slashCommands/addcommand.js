const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const CustomCommand = require("../database/models/customCommandModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("addcommand")
    .setDescription("Create a custom command")

    .addStringOption(option =>
      option
        .setName("name")
        .setDescription("Command name")
        .setRequired(true))

    .addStringOption(option =>
      option
        .setName("response")
        .setDescription("Command response")
        .setRequired(true))

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {

    const name = interaction.options.getString("name").toLowerCase();
    const response = interaction.options.getString("response");

    await CustomCommand.create({
      guildId: interaction.guild.id,
      name,
      response
    });

    interaction.reply(`Custom command **${name}** created.`);

  }

};
