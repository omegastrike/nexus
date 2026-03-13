module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    /* ---------------- SLASH COMMANDS ---------------- */

    if (interaction.isChatInputCommand()) {

      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {

        await command.execute(interaction, client);

      } catch (error) {

        console.error("Command Error:", error);

        if (interaction.deferred || interaction.replied) {

          await interaction.editReply({
            content: "❌ Command failed."
          });

        } else {

          await interaction.reply({
            content: "❌ Command failed.",
            ephemeral: true
          });

        }

      }

    }

    /* ---------------- BUTTON INTERACTIONS ---------------- */

    if (interaction.isButton()) {

      if (interaction.customId === "create_ticket") {

        try {

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
            content: `🎫 Your ticket has been created: ${channel}`,
            ephemeral: true
          });

          await channel.send(
            `Welcome ${interaction.user}, support will be with you shortly.`
          );

        } catch (error) {

          console.error("Ticket Error:", error);

          if (!interaction.replied) {
            await interaction.reply({
              content: "❌ Failed to create ticket.",
              ephemeral: true
            });
          }

        }

      }

    }

  }
};
