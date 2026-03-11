const antiRaid = require("../systems/protection/antiRaid");
const memberJoinLog = require("../systems/logs/memberJoin");

module.exports = {
  name: "guildMemberAdd",

  async execute(member) {

    memberJoinLog(member);

    antiRaid(member);

  }
};
