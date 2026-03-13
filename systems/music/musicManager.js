const queues = new Map();

function getQueue(guildId) {
  return queues.get(guildId);
}

function createQueue(guildId) {

  const queue = {
    songs: [],
    player: null
  };

  queues.set(guildId, queue);

  return queue;
}

module.exports = {
  queues,
  getQueue,
  createQueue
};
