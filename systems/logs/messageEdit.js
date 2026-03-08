const { EmbedBuilder } = require("discord.js");
const config = require("../../config/config");

module.exports = async (oldMessage, newMessage) => {

  if (!oldMessage.guild) return;

  const logChannel = oldMessage.guild.channels.cache.get(config.logChannel);

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("Message Edited")
    .setColor("Orange")
    .addFields(
      { name: "User", value: oldMessage.author.tag, inline: true },
      { name: "Channel", value: `${oldMessage.channel}`, inline: true },
      { name: "Before", value: oldMessage.content || "None" },
      { name: "After", value: newMessage.content || "None" }
    )
    .setTimestamp();

  logChannel.send({ embeds: [embed] });

};
