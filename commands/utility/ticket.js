const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "ticket",

  async execute(message) {

    const embed = new EmbedBuilder()
      .setTitle("Support Tickets")
      .setDescription("Click the button below to create a support ticket.")
      .setColor("Blue");

    const button = new ButtonBuilder()
      .setCustomId("create_ticket")
      .setLabel("Create Ticket")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    message.channel.send({
      embeds: [embed],
      components: [row]
    });

  }
};
