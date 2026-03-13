const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const play = require("play-dl");

const queues = new Map();

async function playSong(guild, song) {

  const queue = queues.get(guild.id);

  if (!song) {
    queue.connection.destroy();
    queues.delete(guild.id);
    return;
  }

  const stream = await play.stream(song.url);

  const resource = createAudioResource(stream.stream);

  queue.player.play(resource);

}

module.exports = {
  queues,
  playSong,
  joinVoiceChannel,
  createAudioPlayer
};
