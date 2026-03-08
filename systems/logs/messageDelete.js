const { EmbedBuilder } = require("discord.js");
const config = require("../../config/config");

module.exports = async (message) => {

  if (!message.guild || message.author?.bot) return;

  const logChannel = message.guild.channels.cache.get(config.logChannel);

  if (!logChannel) return;

  const embed = new EmbedBuilder()
    .setTitle("Message Deleted")
    .setColor("Red")
    .addFields(
      { name: "User", value: `${message.author.tag}`, inline: true },
      { name: "Channel", value: `${message.channel}`, inline: true },
      { name: "Content", value: message.content || "No text" }
    )
    .setTimestamp();

  logChannel.send({ embeds: [embed] });

};
