const { EmbedBuilder } = require("discord.js");
const config = require("../../config/config");

module.exports = async (member) => {

  const logChannel = member.guild.channels.cache.get(config.logChannel);

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("Member Joined")
    .setColor("Green")
    .setDescription(`${member.user.tag} joined the server`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  logChannel.send({ embeds: [embed] });

};
