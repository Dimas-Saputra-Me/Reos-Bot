const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const exampleEmbed = new MessageEmbed()
                .setColor(client.color)
                .setTitle(`${interaction.user.tag}'s avatar`)
                .setImage(interaction.user.displayAvatarURL)
                .setTimestamp()
                .setFooter(interaction.user.displayAvatarURL);
        
            message.channel.send({ embeds: [exampleEmbed] });
    },
};
