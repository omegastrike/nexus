const { Shoukaku, Connectors } = require("shoukaku");

module.exports = (client) => {

  const nodes = [
    {
      name: "nexus",
      url: "93.177.64.145:4827",
      auth: "youshallnotpass",
      secure: false
    }
  ];

  const shoukaku = new Shoukaku(
    new Connectors.DiscordJS(client),
    nodes
  );

  shoukaku.on("ready", (name) => {
    console.log(`✅ Lavalink node ${name} connected`);
  });

  shoukaku.on("error", (name, error) => {
    console.error(`❌ Lavalink ${name} error:`, error);
  });

  shoukaku.on("close", (name, code) => {
    console.log(`⚠ Lavalink ${name} closed: ${code}`);
  });

  shoukaku.on("disconnect", (name) => {
    console.log(`⚠ Lavalink ${name} disconnected`);
  });

  return shoukaku;
};
