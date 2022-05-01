const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.mentions.members.first() != undefined) {
            const exampleEmbed = new MessageEmbed()
                .setColor(client.color)
                .setTitle(`${message.mentions.members.first().user.tag}'s avatar`)
                .setImage(message.mentions.members.first().displayAvatarURL(message.mentions.members.first()))
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        
            message.channel.send({ embeds: [exampleEmbed] });
        } else {
            const exampleEmbed = new MessageEmbed()
                .setColor(client.color)
                .setTitle(`${message.author.tag}'s avatar`)
                .setImage(message.author.displayAvatarURL(message.author.avatarURL))
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        
            message.channel.send({ embeds: [exampleEmbed] });
        }
    },
};



