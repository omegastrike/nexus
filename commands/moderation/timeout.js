module.exports = {
  name: "timeout",
  async execute(message, args) {

    if (!message.member.permissions.has("ModerateMembers")) {
      return message.reply("You don't have permission.");
    }

    const member = message.mentions.members.first();
    const minutes = args[1];

    if (!member) return message.reply("Mention a user.");
    if (!minutes) return message.reply("Provide timeout duration in minutes.");

    try {
      await member.timeout(minutes * 60 * 1000);
      message.channel.send(`${member.user.tag} was timed out for ${minutes} minutes.`);
    } catch {
      message.reply("Failed to timeout the user.");
    }
  }
};
