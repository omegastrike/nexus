const Giveaway = require("../../database/models/giveawayModel");

module.exports = async (client) => {

  setInterval(async () => {

    const giveaways = await Giveaway.find({ ended: false });

    for (const giveaway of giveaways) {

      if (Date.now() >= giveaway.endTime) {

        const channel = await client.channels.fetch(giveaway.channelId);
        const message = await channel.messages.fetch(giveaway.messageId);

        const reaction = message.reactions.cache.get("🎉");

        const users = await reaction.users.fetch();
        const entries = users.filter(u => !u.bot);

        if (entries.size === 0) {
          channel.send("No valid entries, giveaway cancelled.");
          continue;
        }

        const winners = entries.random(giveaway.winners);

        channel.send(
          `🎉 Congratulations ${winners}! You won **${giveaway.prize}**`
        );

        giveaway.ended = true;
        await giveaway.save();

      }

    }

  }, 10000);

};
