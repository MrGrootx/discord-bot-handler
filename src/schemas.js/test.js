const { model, Schema } = require("mongoose");

const testSchema = new Schema({
  guildID: String,
  userID: String,
});

module.exports = model("testSchema", testSchema);
