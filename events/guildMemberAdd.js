const memberJoin = require("../systems/logs/memberJoin");

module.exports = {
  name: "guildMemberAdd",

  execute(member) {
    memberJoin(member);
  }
};
