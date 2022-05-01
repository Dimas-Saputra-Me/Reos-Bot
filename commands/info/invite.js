const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "invite",
    aliases: ['inv'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Invite ME :>')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=846361994214899733&permissions=8&scope=bot')
            );

        const embed = new MessageEmbed()
            .setColor(client.color)
            .setTitle('Invite me :>')
            .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
            .setDescription(client.user.username)
            .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
            .setDescription("[Click me to invite](https://discord.com/api/oauth2/authorize?client_id=846361994214899733&permissions=8&scope=bot)")
            .setTimestamp()

        message.channel.send({ embeds: [embed], components: [button] });
    },
};
