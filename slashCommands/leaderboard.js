const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const XP = require("../database/models/xpModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("View the server XP leaderboard"),

  async execute(interaction) {

    await interaction.deferReply();

    const users = await XP.find({ guildId: interaction.guild.id })
      .sort({ xp: -1 })
      .limit(10);

    if (!users.length) {
      return interaction.editReply("No leaderboard data yet.");
    }

    const leaderboard = users.map((user, index) => {

      const member = interaction.guild.members.cache.get(user.userId);
      const name = member ? member.user.tag : "Unknown User";

      return `${index + 1}. ${name} — Level ${user.level} (XP: ${user.xp})`;

    }).join("\n");

    const embed = new EmbedBuilder()
      .setTitle("🏆 Server Leaderboard")
      .setDescription(leaderboard)
      .setColor("Gold");

    await interaction.editReply({ embeds: [embed] });

  }

};
