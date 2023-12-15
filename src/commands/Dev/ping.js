const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("ping pong"),
  developerCmd: true,
  async execute(interaction) {
    await interaction.reply("pong");
  },
};
