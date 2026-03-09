const fs = require("fs");

module.exports = (client) => {

  client.slashCommands = new Map();

  const commandFiles = fs
    .readdirSync("./slashCommands")
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {

    const command = require(`../slashCommands/${file}`);

    client.slashCommands.set(command.data.name, command);

  }

};
