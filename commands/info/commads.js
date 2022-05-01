const { Message, Client, MessageEmbed, MessageManager } = require("discord.js");
module.exports = {
    name: "commands",
    aliases: ['cmds', 'help'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        //Default main page
        let embed = new MessageEmbed()
            .setColor(client.color)
            .setTitle('Command Page List')
            .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
            .setDescription("{} is optional, [] is required")
            .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
            .addFields(
                { name: 'Prefix', value: `\`${client.config.prefix}\` | \`${client.config.prefix}commands\`` },
                { name: 'Access Page', value: `\`${client.config.prefix}commands {page} {number}\`` },
                { name: 'Access Game Info', value: `\`${client.config.prefix}commands {game name}\`` },
                { name: 'Invite Bot', value: `\`${client.config.prefix}invite\` | \`${client.config.prefix}inv\`` },
                { name: 'Pages List', value: `Game, info, misc`, inline: true },
            )
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));

        // Command page
        if (args[0] === 'game') { //Game Page
            //Default Game Page
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Command Game List')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: `Guess The Number`, value: `\`${client.config.prefix}gtn\``, inline: true },
                    { name: `Rock Paper Scissors`, value: `\`${client.config.prefix}rps\``, inline: true },
                    { name: `Tic Tac Toe`, value: `\`${client.config.prefix}ttt\``, inline: true },
                    { name: `Hangman`, value: `\`${client.config.prefix}hangman\` | \`${client.config.prefix}hangman custom\``, inline: true },
                    { name: `Press The Button`, value: `\`${client.config.prefix}ptb\``, inline: true },
                    { name: `Connect4`, value: `\`${client.config.prefix}connect4\``, inline: true },
                    { name: `Word Scramble`, value: `\`${client.config.prefix}wordscramble\` | \`${client.config.prefix}ws\``, inline: true },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));

            //If arguments contains number page
            if (args.length === 2) {

                //Page 2
                // if (parseInt(args[1]) === 2) {} 

            }

        } else if (args[0] === 'info') { //Info Page
            //Default Info Page
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle(`Command Info List`)
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: `Commands`, value: `\`${client.config.prefix}commands\``, inline: true },
                    { name: `Invite`, value: `\`${client.config.prefix}invite\` | \`${client.config.prefix}inv\``, inline: true },
                    { name: `Ping`, value: `\`${client.config.prefix}ping\` | \`${client.config.prefix}p\``, inline: true },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));

            //If arguments contains number page
            if (args.length === 2) {

                //Page 2
                // if (parseInt(args[1]) === 2) {} 

            }

        } else if (args[0] === 'misc') { //Misc Page
            //Default Misc Page
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Command Misc List')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required, commands are Case Insensitive")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: `Avatar`, value: `\`${client.config.prefix}avatar\``, inline: true },
                    { name: `Rose`, value: `\`${client.config.prefix}rose\``, inline: true },
                    { name: `-`, value: `-`, inline: true },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));

            //If arguments contains number page
            if (args.length === 2) {

                //Page 2
                // if (parseInt(args[1]) === 2) {}

            }

        }

        // Single command info
        if (args[0] === 'gtn') { // Guess The Number
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Guess The Number')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `Guess the number, nothing to describe :>` },
                    { name: 'Default', value: `\`${client.config.prefix}gtn\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'rps') { // Rock Papper Scissors
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Rock Papper Scissors')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `... > Paper > Rock > Scissors > Paper > ...` },
                    { name: 'Default', value: `\`${client.config.prefix}rps\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'ttt') { // Tic Tac Toe
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Tic Tac Toe')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Descripton', value: `make one of horizontal, vertical, diagonal line` },
                    { name: 'Default', value: `\`${client.config.prefix}ttt\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'hangman') { // Hangman
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Hangman')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `You are given a random or custom word, your job is to guess the word by submitting any character.` },
                    { name: 'Default', value: `\`${client.config.prefix}hangman\`` },
                    { name: 'Custom word', value: `\`${client.config.prefix}hangman custom\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'ptb') { // Press The Button
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Press The Button')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `You are given 5 buttons to press, around 1-3 of them is a death button. Choose wisely and you will get a score. Get as many score as possible.` },
                    { name: 'Default', value: `\`${client.config.prefix}ptb\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'connect4' || args[0] === 'c4') { //Connect4
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Connect4')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `Connect 4 circle either vertical, horizontal, or diagonal` },
                    { name: 'Default', value: `\`${client.config.prefix}connect4\` | \`${client.config.prefix}connect4\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        } else if (args[0] === 'wordscramble' || args[0] === 'ws') {
            embed = new MessageEmbed()
                .setColor(client.color)
                .setTitle('Word scramble')
                .setAuthor(client.user.username, client.user.displayAvatarURL(client.user.avatarURL))
                .setDescription("{} is optional, [] is required")
                .setThumbnail(client.user.displayAvatarURL(client.user.avatarURL))
                .addFields(
                    { name: 'Description', value: `Guess the correct word from scrambled word` },
                    { name: 'Default', value: `\`${client.config.prefix}wordscramble\` | \`${client.config.prefix}ws\`` },
                    { name: 'Custom', value: `\`${client.config.prefix}wordscramble custom\` | \`${client.config.prefix}ws custom\`` },
                    { name: 'Race', value: `\`${client.config.prefix}wordscramble race\` | \`${client.config.prefix}ws race\`` },
                )
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL(message.author.avatarURL));
        }

        message.channel.send({ embeds: [embed] });
    },
};
