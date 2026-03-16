const { Shoukaku, Connectors } = require("shoukaku");

module.exports = (client) => {

  console.log("Attempting Lavalink connection...");

  const nodes = [
    {
      name: "railway",
      url: "lavalink-4-production-fb61.up.railway.app:2333",
      auth: "@octane@7659",
      secure: true
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
