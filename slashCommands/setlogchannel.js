const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../database/models/guildConfig");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("setlogchannel")
    .setDescription("Set the moderation log channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel for logs")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {

    const channel = interaction.options.getChannel("channel");

    let config = await GuildConfig.findOne({
      guildId: interaction.guild.id
    });

    if (!config) {
      config = new GuildConfig({
        guildId: interaction.guild.id
      });
    }

    config.logChannel = channel.id;

    await config.save();

    interaction.reply(`✅ Log channel set to ${channel}`);

  }

};
