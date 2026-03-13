const { Shoukaku, Connectors } = require("shoukaku");

module.exports = (client) => {

  const nodes = [
    {
      name: "lavalink",
      url: "localhost:2333",
      auth: "youshallnotpass"
    }
  ];

  const shoukaku = new Shoukaku(
    new Connectors.DiscordJS(client),
    nodes
  );

  return shoukaku;

};
