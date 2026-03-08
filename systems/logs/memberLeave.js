const { EmbedBuilder } = require("discord.js");
const config = require("../../config/config");

module.exports = async (member) => {

  const logChannel = member.guild.channels.cache.get(config.logChannel);

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("Member Left")
    .setColor("Grey")
    .setDescription(`${member.user.tag} left the server`)
    .setTimestamp();

  logChannel.send({ embeds: [embed] });

};
