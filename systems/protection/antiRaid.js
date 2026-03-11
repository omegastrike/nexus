const joinTracker = new Map();

module.exports = async (member) => {

  const guildId = member.guild.id;

  if (!joinTracker.has(guildId)) {
    joinTracker.set(guildId, []);
  }

  const joins = joinTracker.get(guildId);

  const now = Date.now();

  joins.push(now);

  const filtered = joins.filter(time => now - time < 10000);

  joinTracker.set(guildId, filtered);

  if (filtered.length >= 10) {

    const channel = member.guild.systemChannel;

    if (channel) {
      channel.send("⚠️ Possible raid detected! Lockdown recommended.");
    }

    console.log("Raid detected in", member.guild.name);

  }

};
