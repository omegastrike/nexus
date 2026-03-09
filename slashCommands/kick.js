const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("User to kick")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("reason")
        .setDescription("Reason for the kick")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({
        content: "User not found.",
        ephemeral: true
      });
    }

    try {

      await member.kick(reason);

      await interaction.reply(
        `${user.tag} has been kicked.\nReason: ${reason}`
      );

    } catch (error) {

      console.error(error);

      interaction.reply({
        content: "Failed to kick user.",
        ephemeral: true
      });

    }

  }

};
