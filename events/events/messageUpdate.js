const logEdit = require("../systems/logs/messageEdit");

module.exports = {
  name: "messageUpdate",

  execute(oldMessage, newMessage) {
    logEdit(oldMessage, newMessage);
  }
};
