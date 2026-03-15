const fs = require("fs");
const path = require("path");

module.exports = (client) => {

  client.slashCommands = new Map();

  const commandsPath = path.join(__dirname, "../slashCommands");
  const commandFiles = fs.readdirSync(commandsPath);

  for (const file of commandFiles) {

    const command = require(`../slashCommands/${file}`);

    if (!command.data || !command.execute) {
      console.log(`⚠ Invalid slash command: ${file}`);
      continue;
    }

    client.slashCommands.set(command.data.name, command);

  }

};
