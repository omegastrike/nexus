module.exports = {
  name: "ban",
  async execute(message, args) {

    if (!message.member.permissions.has("BanMembers")) {
      return message.reply("You don't have permission to ban members.");
    }

    const member = message.mentions.members.first();

    if (!member) {
      return message.reply("Please mention a user to ban.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    try {
      await member.ban({ reason });
      message.channel.send(`${member.user.tag} was banned.\nReason: ${reason}`);
    } catch (error) {
      message.reply("I cannot ban this user.");
    }
  }
};
