const CustomCommand = require("../database/models/customCommandModel");
const antiSpam = require("../systems/automod/antiSpam");
const antiInvite = require("../systems/automod/antiInvite");
const badWords = require("../systems/automod/badWords");
const xpSystem = require("../systems/levels/xpSystem");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {

    if (message.author.bot) return;

    // Automod systems
    antiSpam(message);
    antiInvite(message);
    badWords(message);

    // XP system
    xpSystem(message);

    const prefix = "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName);

    if (command) {
      return command.execute(message, args);
    }

    const customCommand = await CustomCommand.findOne({
      guildId: message.guild.id,
      name: commandName
    });

    if (customCommand) {
      message.channel.send(customCommand.response);
    }

  }
};
