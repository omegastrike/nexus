const { SlashCommandBuilder } = require("discord.js");
const XP = require("../database/models/xpModel");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Check your level"),

  async execute(interaction) {

    const user = await XP.findOne({
      userId: interaction.user.id,
      guildId: interaction.guild.id
    });

    if (!user) {
      return interaction.reply("You have no XP yet.");
    }

    interaction.reply(
      `Level: ${user.level}\nXP: ${user.xp}`
    );

  }

};
