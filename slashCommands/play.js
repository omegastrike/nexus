const { SlashCommandBuilder } = require("discord.js");
const play = require("play-dl");
const { queues, playSong, joinVoiceChannel, createAudioPlayer } = require("../systems/music/musicPlayer");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play music from YouTube")
    .addStringOption(option =>
      option.setName("song")
        .setDescription("Song name or URL")
        .setRequired(true)
    ),

  async execute(interaction) {

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply("Join a voice channel first.");
    }

    const query = interaction.options.getString("song");

    const result = await play.search(query, { limit: 1 });

    const song = {
      title: result[0].title,
      url: result[0].url
    };

    let queue = queues.get(interaction.guild.id);

    if (!queue) {

      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
      });

      const player = createAudioPlayer();

      queue = {
        connection,
        player,
        songs: []
      };

      queues.set(interaction.guild.id, queue);

      connection.subscribe(player);

    }

    queue.songs.push(song);

    if (queue.songs.length === 1) {
      playSong(interaction.guild, queue.songs[0]);
    }

    interaction.reply(`🎵 Playing **${song.title}**`);

  }

};
