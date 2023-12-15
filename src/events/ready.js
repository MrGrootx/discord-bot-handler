const mongoose = require("mongoose"); //npm i mongoose
const mongodbURL = process.env.MONGODBURL;

const {
  ActivityType,
  EmbedBuilder,
  Embed,
  client,
  interaction,
} = require(`discord.js`);
mongoose.set("strictQuery", false);
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.application.commands
      .set(client.commands.map((v) => v.data))
      .then((cmds) => {
        console.table(`${cmds.size} commands loaded`);
        cmds.toJSON().forEach((cmd) => {
          const rawcommand = client.commands.get(cmd.name);
          rawcommand.id = cmd.id;

          client.commands.set(cmd.name, rawcommand);
          //   console.log(rawcommand);
        });
      });

    //MONGODB DataBase Connection
    if (!mongodbURL) return console.log("Error: Cannot find MONGODBURL");

    await mongoose.connect(mongodbURL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log(`%c Connected To DataBase`, `color:red`);
    } else {
      console.log("Connected with MONGODB: False");
    }
  },
};
