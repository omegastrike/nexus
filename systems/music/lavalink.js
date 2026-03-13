const { Shoukaku, Connectors } = require("shoukaku");

module.exports = (client) => {

  const nodes = [
    {
      name: "jirayu",
      url: "lavalink.jirayu.net:13592",
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

  return shoukaku;
};
