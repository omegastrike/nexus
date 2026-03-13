const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Giveaway = require("../database/models/giveawayModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("giveaway")
    .setDescription("Start a giveaway")

    .addStringOption(option =>
      option
        .setName("prize")
        .setDescription("Giveaway prize")
        .setRequired(true))

    .addIntegerOption(option =>
      option
        .setName("winners")
        .setDescription("Number of winners")
        .setRequired(true))

    .addStringOption(option =>
      option
        .setName("duration")
        .setDescription("Duration (10m, 1h, 1d)")
        .setRequired(true))

    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {

    const prize = interaction.options.getString("prize");
    const winners = interaction.options.getInteger("winners");
    const duration = interaction.options.getString("duration");

    const time = require("ms")(duration);

    if (!time) return interaction.reply("Invalid duration.");

    const endTime = Date.now() + time;

    const message = await interaction.channel.send(
`🎉 **GIVEAWAY** 🎉

Prize: **${prize}**
Winners: **${winners}**

React with 🎉 to enter!
Ends <t:${Math.floor(endTime/1000)}:R>`
    );

    await message.react("🎉");

    await Giveaway.create({
      guildId: interaction.guild.id,
      channelId: interaction.channel.id,
      messageId: message.id,
      prize,
      winners,
      endTime
    });

    interaction.reply({
      content: "Giveaway started!",
      ephemeral: true
    });

  }

};
