const memberLeave = require("../systems/logs/memberLeave");

module.exports = {
  name: "guildMemberRemove",

  execute(member) {
    memberLeave(member);
  }
};
