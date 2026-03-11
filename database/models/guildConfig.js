const mongoose = require("mongoose");

const guildConfigSchema = new mongoose.Schema({

  guildId: String,

  logChannel: String,

  welcomeChannel: String,

  modRole: String

});

module.exports = mongoose.model("GuildConfig", guildConfigSchema);
