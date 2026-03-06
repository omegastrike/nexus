module.exports = async (message) => {

  const inviteRegex = /(discord\.gg|discord\.com\/invite)/i;

  if (inviteRegex.test(message.content)) {

    if (message.member.permissions.has("Administrator")) return;

    await message.delete();

    message.channel.send(`${message.author} invite links are not allowed.`)
      .then(msg => setTimeout(() => msg.delete(), 4000));
  }

};
