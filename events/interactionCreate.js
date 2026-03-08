module.exports = {
  name: "interactionCreate",

  async execute(interaction) {

    if (!interaction.isButton()) return;

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
        ephemeral: true
      });

      channel.send(`Welcome ${interaction.user}, support will be with you shortly.`);

    }

  }
};
