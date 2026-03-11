const XP = require("../../database/models/xpModel");

module.exports = async (message) => {

  if (!message.guild || message.author.bot) return;

  let user = await XP.findOne({
    userId: message.author.id,
    guildId: message.guild.id
  });

  if (!user) {

    user = new XP({
      userId: message.author.id,
      guildId: message.guild.id
    });

  }

  const xpGain = Math.floor(Math.random() * 10) + 5;

  user.xp += xpGain;

  const nextLevel = user.level * 100;

  if (user.xp >= nextLevel) {

    user.level++;

    message.channel.send(
      `🎉 ${message.author} leveled up to **Level ${user.level}**!`
    );

  }

  await user.save();

};
