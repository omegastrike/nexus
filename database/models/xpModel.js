const mongoose = require("mongoose");

const xpSchema = new mongoose.Schema({

  userId: String,
  guildId: String,

  xp: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  }

});

module.exports = mongoose.model("XP", xpSchema);
