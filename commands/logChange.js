const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "logchange",
    aliases: ['lc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let date = new Date().toJSON().slice(0, 10);
        let formatDate = date.slice(8, 10) + '/'
            + date.slice(5, 7) + '/'
            + date.slice(0, 4);

        const filter = m => {
            if (m.author.id === "197359832557289472") {
                return true;
            } else {
                return false;
            }
        };

        const collector = message.channel.createMessageCollector({ filter, time: 60000 });

        collector.on('collect', m => {
            m.delete();
            if (m.content === 'log stop') {
                collector.stop('manualStopped')
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason == 'manualStopped' || reason == 'time') {
                let output = '';
                collected.forEach((value) => {
                    if (value.content != 'log stop') {
                        output += '- ' + value.content + '\n'
                    }
                });

                let embed = new MessageEmbed()
                    .setColor(client.color)
                    .setTitle(`Log changes`)
                    .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                    .setDescription(`Log changes ${formatDate}`)
                    .addFields(
                        { name: 'List Changes', value: output },
                    )
                    .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                    .setTimestamp()
                    .setFooter(client.user.tag, client.user.displayAvatarURL(client.user.avatarURL));

                message.channel.send({ embeds: [embed] });
                message.delete();
            }
        });
    },
};

// ${new Date(Date.now()).toLocaleString().split(',')[0]}