const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../database/models/guildConfig");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("setwelcomechannel")
    .setDescription("Set the welcome channel")
    .addChannelOption(option =>
      option
        .setName("channel")
        .setDescription("Channel for welcome messages")
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

    config.welcomeChannel = channel.id;

    await config.save();

    interaction.reply(`👋 Welcome channel set to ${channel}`);

  }

};
