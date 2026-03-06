module.exports = {
  name: "clear",
  async execute(message, args) {

    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply("You don't have permission to delete messages.");
    }

    const amount = parseInt(args[0]);

    if (!amount || amount < 1 || amount > 100) {
      return message.reply("Provide a number between 1 and 100.");
    }

    await message.channel.bulkDelete(amount, true);

    message.channel.send(`Deleted ${amount} messages.`)
      .then(msg => setTimeout(() => msg.delete(), 3000));
  }
};
