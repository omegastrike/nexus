module.exports = {
  name: "kick",
  async execute(message, args) {

    if (!message.member.permissions.has("KickMembers")) {
      return message.reply("You don't have permission to kick members.");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("Please mention a user to kick.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    try {
      await member.kick(reason);
      message.channel.send(`${member.user.tag} was kicked.\nReason: ${reason}`);
    } catch (error) {
      message.reply("I cannot kick this user.");
    }
  }
};
