const GuildConfig = require("../database/models/guildConfig");

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {

    const config = await GuildConfig.findOne({
      guildId: member.guild.id
    });

    if (!config || !config.welcomeChannel) return;

    const channel = member.guild.channels.cache.get(config.welcomeChannel);

    if (!channel) return;

    channel.send(`👋 Welcome ${member} to the server!`);

  }

};
