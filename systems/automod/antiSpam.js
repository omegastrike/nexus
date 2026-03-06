const userMessages = new Map();

module.exports = async (message) => {

  const limit = 5; // messages
  const interval = 5000; // 5 seconds

  if (!userMessages.has(message.author.id)) {
    userMessages.set(message.author.id, []);
  }

  const timestamps = userMessages.get(message.author.id);
  const now = Date.now();

  timestamps.push(now);

  const filtered = timestamps.filter(time => now - time < interval);

  userMessages.set(message.author.id, filtered);

  if (filtered.length >= limit) {

    await message.delete();

    message.channel.send(`${message.author} please stop spamming.`)
      .then(msg => setTimeout(() => msg.delete(), 3000));
  }

};
