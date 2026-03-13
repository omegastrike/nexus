require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");
const slashHandler = require("./handlers/slashCommandHandler");
const giveawayManager = require("./systems/giveaways/giveawayManager");
const createLavalink = require("./systems/music/lavalink");

const connectDB = require("./database/connect");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();


eventHandler(client);
commandHandler(client);
slashHandler(client);


client.once("clientReady", async () => {

  console.log(`Bot online: ${client.user.tag}`);

  client.lavalink = createLavalink(client);

  // Start giveaway manager
  giveawayManager(client);

});


async function startBot() {

  try {

    await connectDB();
    console.log("MongoDB connected");

    await client.login(process.env.TOKEN);

  } catch (error) {

    console.error("Startup error:", error);

  }

}

startBot();
