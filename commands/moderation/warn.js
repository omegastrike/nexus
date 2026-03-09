const Warn = require("../../database/models/warnModel");

module.exports = {
  name: "warn",

  async execute(message, args) {

    if (!message.member.permissions.has("KickMembers")) {
      return message.reply("You don't have permission to warn.");
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply("Mention a user.");

    const reason = args.slice(1).join(" ") || "No reason provided";

    let userWarn = await Warn.findOne({
      guildId: message.guild.id,
      userId: member.id
    });

    if (!userWarn) {
      userWarn = new Warn({
        guildId: message.guild.id,
        userId: member.id,
        warnings: []
      });
    }

    userWarn.warnings.push({
      moderator: message.author.id,
      reason: reason
    });

    await userWarn.save();

    message.channel.send(
      `${member.user.tag} has been warned.\nReason: ${reason}`
    );
  }
};
