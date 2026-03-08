const logDelete = require("../systems/logs/messageDelete");

module.exports = {
  name: "messageDelete",

  execute(message) {
    logDelete(message);
  }
};
