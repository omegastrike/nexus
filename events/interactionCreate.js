module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {

      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {

        await command.execute(interaction, client);

      } catch (error) {

        console.error(error);

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply("Command failed.");
        } else {
          await interaction.reply({ content: "Command failed.", flags: 64 });
        }

      }

    }

    if (interaction.isButton()) {

      if (interaction.customId === "create_ticket") {

        const channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: 0,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
            },
            {
              id: interaction.user.id,
              allow: ["ViewChannel", "SendMessages"]
            }
          ]
        });

        await interaction.reply({
          content: `Your ticket has been created: ${channel}`,
          flags: 64
        });

        channel.send(`Welcome ${interaction.user}, support will be with you shortly.`);

      }

    }

  }
};
