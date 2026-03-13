const CustomCommand = require("../database/models/customCommandModel");
const antiSpam = require("../systems/automod/antiSpam");
const antiInvite = require("../systems/automod/antiInvite");
const badWords = require("../systems/automod/badWords");
const xpSystem = require("../systems/levels/xpSystem");

module.exports = {
  name: "messageCreate",
  execute(message, client) {

    if (message.author.bot) return;

    antiSpam(message);
    antiInvite(message);
    badWords(message);
    xpSystem(message);

    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    command.execute(message, args);
  }
};
