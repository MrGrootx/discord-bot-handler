const { Interaction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    // DEV INTERACTION
    if (!command) return;
    const devID = process.env.DEV_CMD
    if(command.developerCmd && !devID.includes(interaction.user.id)){
      return interaction.reply({
        content: `This command is for Develepors only`,
        ephemeral: true
      })
    }

    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
