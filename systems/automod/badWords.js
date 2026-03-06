const badWords = [
  "badword1",
  "badword2",
  "badword3"
];

module.exports = async (message) => {

  const content = message.content.toLowerCase();

  if (badWords.some(word => content.includes(word))) {

    await message.delete();

    message.channel.send(`${message.author} watch your language.`)
      .then(msg => setTimeout(() => msg.delete(), 4000));
  }

};
