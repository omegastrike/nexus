const { SlashCommandBuilder } = require("discord.js");
const { getQueue, createQueue } = require("../systems/music/musicManager");
const { createMusicControls } = require("../systems/music/musicControls");

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

    await interaction.deferReply();

    const voiceChannel = interaction.member.voice.channel;
    const botChannel = interaction.guild.members.me.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply("❌ Join a voice channel first.");
    }

    if (botChannel && voiceChannel.id !== botChannel.id) {
      return interaction.editReply("❌ You must be in the same voice channel as the bot.");
    }

    const node = [...interaction.client.lavalink.nodes.values()][0];

    if (!node) {
      return interaction.editReply("❌ Lavalink node not connected.");
    }

    const query = interaction.options.getString("query");

    const result = await node.rest.resolve(`ytsearch:${query}`);

    if (!result || !result.tracks.length) {
      return interaction.editReply("❌ No results found.");
    }

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

        if (!queue.loop) queue.songs.shift();

        if (queue.songs.length) {
          player.playTrack({ track: queue.songs[0].encoded });
        }

      });

    }

    queue.songs.push(track);

    if (queue.songs.length === 1) {
      await queue.player.playTrack({ track: track.encoded });
    }

    interaction.editReply({
      content: `🎵 Now playing **${track.info.title}**`,
      components: [createMusicControls()]
    });

  }

};
