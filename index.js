require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load handlers AFTER client is created
eventHandler(client);
commandHandler(client);

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.login(process.env.TOKEN);
