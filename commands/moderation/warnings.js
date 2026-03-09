const Warn = require("../../database/models/warnModel");

module.exports = {
  name: "warnings",

  async execute(message, args) {

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    const data = await Warn.findOne({
      guildId: message.guild.id,
      userId: member.id
    });

    if (!data || data.warnings.length === 0) {
      return message.channel.send("This user has no warnings.");
    }

    let warnList = data.warnings
      .map((w, i) => `${i + 1}. ${w.reason}`)
      .join("\n");

    message.channel.send(
      `Warnings for ${member.user.tag}:\n${warnList}`
    );
  }
};
