const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "rose",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const listPhotos = [
            'https://i.pinimg.com/originals/cf/9f/aa/cf9faad17b14cef8e77573bd4c923392.jpg',
            'https://static.wikia.nocookie.net/blinks/images/f/fb/Ros%C3%A9_On_The_Ground_Teaser_Infobox_.png/revision/latest?cb=20210307225943',
            'https://images.bisnis-cdn.com/thumb/posts/2021/03/23/1371168/rose-blackpink-100-hot.jpg?w=744&h=465',
            'https://awsimages.detik.net.id/community/media/visual/2021/07/16/rose-blackpink-3_34.jpeg?w=375',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfYNNzd1aRwnZTgPn4k3sBx_4thchu221LlQ&usqp=CAU',
        ];

        const rosePhoto = new MessageEmbed().setImage(listPhotos[Math.floor(Math.random() * listPhotos.length)])
        message.reply({ content: 'She is Cute 🌹', embeds: [rosePhoto] });
        message.react('🌹');
    },
};
