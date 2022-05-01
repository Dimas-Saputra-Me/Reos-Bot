const { Message, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "test",
  aliases: ['test'],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const row = new MessageActionRow().addComponents(

      new MessageButton().setLabel("Invite Me!").setURL('https://discord.com/api/oauth2/authorize?client_id=846361994214899733&permissions=8&scope=bot').setStyle("LINK"),
      new MessageButton().setLabel("Support Server!").setURL('https://discord.gg/y9UGxQS32H').setStyle("LINK"),
    );
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const embed = new MessageEmbed()
      .setTitle('Bot stats!')
      .setColor(client.color)
      .addField('Ping', `${client.ws.ping}ms`)
      .addField('Uptime', `My Uptime is ${days}d ${hours}h ${minutes}m ${seconds}s`)
      .addField('server-count', `${client.guilds.cache.size} servers!`)
      .addField('member-count', `${client.users.cache.size} users!`)
      .setFooter(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))

    message.channel.send({ embeds: [embed], components: [row] });
  },
};
