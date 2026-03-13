const { SlashCommandBuilder } = require("discord.js");
const { getQueue, createQueue } = require("../systems/music/musicManager");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption(option =>
      option.setName("query")
        .setDescription("Song name or URL")
        .setRequired(true)
    ),

  async execute(interaction) {

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel)
      return interaction.reply("Join a voice channel first.");

    const query = interaction.options.getString("query");

    const node = interaction.client.lavalink.nodes.first();

    const result = await node.rest.resolve(query);

    if (!result.tracks.length)
      return interaction.reply("No results found.");

    const track = result.tracks[0];

    let queue = getQueue(interaction.guild.id);

    if (!queue) {

      queue = createQueue(interaction.guild.id);

      const player = await node.joinChannel({
        guildId: interaction.guild.id,
        channelId: voiceChannel.id,
        shardId: 0
      });

      queue.player = player;

      player.on("end", () => {
        queue.songs.shift();

        if (queue.songs.length) {
          player.playTrack({ track: queue.songs[0].encoded });
        }
      });

    }

    queue.songs.push(track);

    if (queue.songs.length === 1) {
      await queue.player.playTrack({ track: track.encoded });
    }

    interaction.reply(`🎵 Now playing **${track.info.title}**`);

  }

};
