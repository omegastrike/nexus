const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const CustomCommand = require("../database/models/customCommandModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("removecommand")
    .setDescription("Delete a custom command")

    .addStringOption(option =>
      option
        .setName("name")
        .setDescription("Command name")
        .setRequired(true))

    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {

    const name = interaction.options.getString("name").toLowerCase();

    await CustomCommand.deleteOne({
      guildId: interaction.guild.id,
      name
    });

    interaction.reply(`Command **${name}** removed.`);

  }

};
