const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../database/models/warnModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("View warnings of a user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to check warnings")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {

    await interaction.deferReply();

    const user = interaction.options.getUser("user");

    const data = await Warn.findOne({
      guildId: interaction.guild.id,
      userId: user.id
    });

    if (!data || data.warnings.length === 0) {
      return interaction.editReply(`${user.tag} has no warnings.`);
    }

    const warningList = data.warnings
      .map((w, i) => `${i + 1}. ${w.reason}`)
      .join("\n");

    await interaction.editReply(
      `Warnings for ${user.tag}\n\n${warningList}`
    );

  }

};
