const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../database/models/warnModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to warn")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    let data = await Warn.findOne({
      guildId: interaction.guild.id,
      userId: user.id
    });

    if (!data) {
      data = new Warn({
        guildId: interaction.guild.id,
        userId: user.id,
        warnings: []
      });
    }

    data.warnings.push({
      moderator: interaction.user.id,
      reason: reason
    });

    await data.save();

    await interaction.reply(
      `${user.tag} has been warned.\nReason: ${reason}`
    );

  }

};
