const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete multiple messages")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {

    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "Amount must be between 1 and 100.",
        flags: 64
      });
    }

    await interaction.deferReply({ flags: 64 });

    const messages = await interaction.channel.bulkDelete(amount, true);

    await interaction.editReply(
      `🧹 Deleted ${messages.size} messages.`
    );

  }

};
